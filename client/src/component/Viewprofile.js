import { Card, Button, Table, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import Editprofile from "./Editprofile";
function Viewprofile() {
  let { isuserlogin, obj } = useSelector((state) => state.users);
  let [modelshow, setmodelshow] = useState(false);
  let [editprofileobj, seteditprofileobj] = useState(null);
  let [profile, setprofile] = useState(obj);
  let token = localStorage.getItem("token");
  useEffect(async () => {
    let res = await axios.get(
      `http://localhost:5000/user/viewprofile/${obj.email}`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    let data = res.data.payload;
    setprofile(data);
  }, []);

  //on edit is clicked
  const seteditobj = (profileobj) => {
    setmodelshow(true);
    seteditprofileobj({ ...editprofileobj, ...profileobj });
  };

  const afteredit = async (editedobj) => {
    setmodelshow(false);
    seteditprofileobj(null);
    editedobj.email = editprofileobj.email;
    let response = await axios.put(
      "http://localhost:5000/user/save-editedprofile",
      editedobj,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    setprofile(response.data.payload);
  };

  return (
    <div>
      <h1 className="text-center text-dark mt-3 text-lg">PROFILE</h1>
      <Card className="col-5 mx-auto">
        <Card.Body className="text-start">
          <Table>
            <Row>
              <Col sm={12} md={6} lg={3}>
                <h5>User ID: </h5>
              </Col>
              <Col >
                <h6>{profile._id}</h6>
              </Col>
            </Row>

            <Row>
              <Col sm={12} md={6} lg={3}>
                <h5>Name: </h5>
              </Col>
              <Col>
                <h6>{profile.name}</h6>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6} lg={3}>
                <h5>Email: </h5>
              </Col>
              <Col>
                <h6>{profile.email}</h6>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6} lg={3}>
                <h5>Phone No: </h5>
              </Col>
              <Col>
                <h6>{profile.phoneno}</h6>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6} lg={3}>
                <h5> Location: </h5>
              </Col>
              <Col>
                <h6> {profile.location}</h6>
              </Col>
            </Row>
          </Table>
          <Button
            variant="primary"
            type="submit"
            onClick={() => seteditobj(profile)}
          >
            Edit Profile
          </Button>
        </Card.Body>
      </Card>
      {/* Edit modal */}
      {editprofileobj !== null && (
        <Editprofile
          show={modelshow}
          profileObj={editprofileobj}
          onHide={(editedprofileobj) => afteredit(editedprofileobj)}
        />
      )}
    </div>
  );
}

export default Viewprofile;
