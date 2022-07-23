import { Form, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
function Mentorsignup() {
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const onformsubmit = async (userobj) => {
    console.log(userobj);
    let res = await axios.post(
      "http://localhost:5000/user/creatementor",
      userobj
    );
    let resobj = res.data;
    if (resobj.message === "mentor created") {
      navigate("/mentorlogin");
      alert(resobj.message);
    } else {
      alert(resobj.message);
    }
  };
  return (
    <div>
      <Form
        className="col-4 mx-auto mt-4"
        onSubmit={handleSubmit(onformsubmit)}
      >
        <h2 className="mb-3 text-start">Sign Up</h2>
        <Col className="mb-2">
          <Form.Label className="mb-2">Account Type</Form.Label>
          <br></br>
          <a className="btn border-success border-3 me-2" href="/signup">
            MENTEE
          </a>
          <a className="btn btn-success me-2 border-3 " href="/mentorsignup">
            MENTOR
          </a>
        </Col>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Full Name"
            {...register("name")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            {...register("email")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="phoneno">
          <Form.Label>Phone No</Form.Label>
          <Form.Control type="number" {...register("phoneno")} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="location">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" {...register("location")} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="qualifications">
          <Form.Label>Qualifications</Form.Label>
          <Form.Control type="text" {...register("qualifications")} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="experience">
          <Form.Label>Years of experience</Form.Label>
          <Form.Control type="number" {...register("experience")} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" {...register("password")} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="I agree to TutorCruise Terms of Service, Privacy Policy and Content Policies"
            className="text-success"
          />
        </Form.Group>
        <Button variant="success" type="submit" className="d-block mx-auto">
          Create Account
        </Button>
        <div className="mt-3 text-center">
          Already have a Account?
          <span
            className="text-success ms-2 login"
            onClick={() => navigate("/mentorlogin")}
          >
            Login
          </span>
        </div>
      </Form>
    </div>
  );
}

export default Mentorsignup;
