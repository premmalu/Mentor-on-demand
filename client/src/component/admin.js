import React, { useState, useEffect } from "react";
import axios from "axios";
// import adminservice from "../service/adminservice";
let url = "http://localhost:5000/user/";
function Admin(props) {
  const [users, setUsers] = useState([]);
  var id = 0;
  useEffect(() => {
    axios
      .get(`${url}/admin`)
      // adminservice
      //   .getUsers()
      .then((db) => {
        setUsers(db.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const edituser = (user) => {
    console.log(user);
    props.Removeedit(user);
  };

  const deleteuser = (userid) => {
    console.log(userid);
    axios.delete(`${url}${userid}`);
    axios
      .get(`${url}/admin`)
      .then((usersdb) => {
        setUsers(usersdb.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container mt-5 vh-100">
      <div>
      <h1 className="text-center text-dark">ADMIN</h1>
        <table className="table bg-light bg-gradient rounded">
          <thead>
            <tr className="text-center">
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Edit/Delete</th>
              {/* <th>Delete</th> */}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              id = id + 1;
              return (
                <tr key={id} className="text-center">
                  <td>{id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneno}</td>
                  <td>{user.location}</td>
                  <td
                    className="btn  btn-danger bg-success text-dark p-1 my-3"
                    onClick={() => {
                      edituser(user);
                    }}
                  >
                    Edit
                  </td>
                  <td
                    className="btn btn-danger bg- text-dark p-1 my-3"
                    onClick={() => {
                      deleteuser(user._id);
                    }}
                  >
                    Delete
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
