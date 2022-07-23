import React, { useState } from "react";
import Admin from "../component/admin";
import Updateuser from "./updateuser";
function Admindashboard() {
  let [db, setdb] = useState({});
  let [edit, setEdit] = useState(true);
  return (
    <div className="admindashboard">
      {edit ? (
        <Admin
          Removeedit={(user) => {
            setdb(user);
            setEdit(!edit);
            console.log(db);
          }}
        />
      ) : (
        <Updateuser
          db={db}
          Removeedit={(user) => {
            setdb(user);
            setEdit(!edit);
            console.log(db);
          }}
        />
      )}
    </div>
    // <Routes>
    //   {/* <Route
    //     path="/"
    //     element={
    //       edit ? (
    //         <Updateuser userdb={userdb} />
    //       ) : (
    //         <Admin
    //           Removeedit={(user) => {
    //             setUserdb(user);
    //             setEdit(!edit);
    //             // console.log(userdb);
    //           }}
    //         />
    //       )
    //     }
    //   ></Route> */}
    //   <Route path="" element={<Admin />}></Route>
    // </Routes>

    //   </div>
    // </Router>
  );
}

export default Admindashboard;
