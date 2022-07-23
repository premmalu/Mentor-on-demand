import axios from "axios";
// const bcryptjs = require("bcrypt");
import React, { useEffect, useState } from "react";
// import axios from "axios";
let url = "http://localhost:5000/user/";
const Updateuser = (props) => {
  let [db, setdb] = useState({});
  let [Id, setId] = useState({});
  let [name, setName] = useState({});
  let [email, setEmail] = useState({});
  let [password, setPassword] = useState({});
  let [phoneno, setPhoneno] = useState({});
  let [location, setLocation] = useState({});
  useEffect(() => {
    let dbedit = props.db;
    setdb(dbedit);
    setId(dbedit._id);
    setName(dbedit.name);
    setEmail(dbedit.email);
    setPassword(dbedit.password);
    setPhoneno(dbedit.phoneno);
    setLocation(dbedit.location);
  }, []);
  const Edituserdb = () => {
    let id = Id;
    let dbs = {
      id,
      name,
      email,
      password,
      phoneno,
      location,
    };
    // axios.delete(`${url}${id}`);
    axios.put(`http://localhost:5000/user/${id}`, dbs);
    console.log(dbs);
    props.Removeedit();
  };
  return (
    <div className="popup">
      <div className="popup-content">
        <div className="form col-5 mx-auto mt-4 bg-transparent p-4">
          <h1 className="text-center text-dark">EDIT USER</h1>
          <div className="form-group my-4">
            <label>Name :</label>
            <input
              className="form-control mt-2"
              type="text"
              placeholder="Name . . ."
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="form-group  my-4">
            <label>Email:</label>
            <input
              className="form-control mt-2"
              type="text"
              placeholder="Email . . ."
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="form-group my-4">
            <label>Phone:</label>
            <input
              className="form-control mt-2"
              type="number"
              placeholder="Phone No......"
              value={phoneno}
              onChange={(e) => {
                setPhoneno(e.target.value);
              }}
            />
          </div>
          <div className="form-group my-4">
            <label>Location :</label>
            <input
              className="form-control mt-2"
              type="text"
              placeholder="Location......"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
          </div>
          <div className="form-group my-4">
            <label></label>
            <button
              className="btn btn-primary"
              onClick={() => {
                Edituserdb();
              }}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Updateuser;
