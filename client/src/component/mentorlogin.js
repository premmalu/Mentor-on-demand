import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginuser } from "../slices/userSlice";

import { useEffect } from "react";
// import axios from "axios"

function Mentorlogin() {
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let { obj, iserror, errmsg, ispending, isuserlogin } = useSelector(
    (state) => state.users
  );

  let dispatch = useDispatch();

  useEffect(() => {
    if (isuserlogin == true) {
      navigate("/");
    }
  }, [obj]);

  const onformsubmit = async (userobj) => {
    dispatch(loginuser(userobj));
    console.log(userobj);
  };

  return (
    <div className="my-4">
      {iserror && (
        <p className="text-danger mt-3 display-5 text-center">{errmsg}</p>
      )}

      <Form
        className="col-4 mx-auto mt-4"
        onSubmit={handleSubmit(onformsubmit)}
      >
        <h2 className="mb-3 text-start">Mentor Login</h2>
        <Col className="mb-2">
          <Form.Label className="mb-2">Account Type</Form.Label>
          <br></br>
          <a className="btn border-success border-3 me-2" href="/login">
            MENTEE
          </a>
          <a className="btn btn-success border-3" href="/mentorlogin">
            MENTOR
          </a>
        </Col>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            {...register("email")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" {...register("password")} />
        </Form.Group>
        <Button variant="success" type="submit" className="d-block mx-auto">
          Login
        </Button>
        <div className="mt-3 text-center">
          New to TutorCruise?
          <span
            className="text-danger ms-2 login"
            onClick={() => navigate("/mentorsignup")}
          >
            Create Account
          </span>
        </div>
      </Form>
    </div>
  );
}

export default Mentorlogin;
