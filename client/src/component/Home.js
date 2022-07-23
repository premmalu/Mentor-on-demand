import axios from "axios";
import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Card,
  Container,
  Spinner,
  Modal,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Displaydetails from "./Displaydetails";
import { Search } from "react-bootstrap-icons";
import { useCart } from "react-use-cart";
import "./detail.css";

function Home() {
  let [books, setbooks] = useState([]);
  let [filterdata, setfilterdata] = useState([]);
  let [Obj, setObj] = useState();
  let [show, setshow] = useState(false);
  let navigate = useNavigate();
  let { obj } = useSelector((state) => state.users);

  const [searchField, setSearchField] = useState("");

  useEffect(async () => {
    // let res = await axios.get("https://jsonblob.com/api/976791543507861504");
    let res = await axios.get("http://localhost:5000/user/courses");
    let data = res.data;
    setbooks(data);
    setfilterdata(data);
  }, []);
  const { addItem } = useCart();

  const display = (Obj) => {
    setshow(true);

    setObj(Obj);
    console.log(Obj);
  };

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const searching = () => {
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchField.toLowerCase()) ||
        book.author.toLowerCase().includes(searchField.toLowerCase())
    );
    console.log(searchField);
    setfilterdata(filtered);
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <Col lg={6} className="px-0 float-left mx-auto">
            <InputGroup className=" searchfield justify-content-center my-3">
              <FormControl
                id="inlineFormInputGroupUsername"
                type="search"
                placeholder="Search using Mentor or Genere"
                aria-label="Search"
                onChange={handleChange}
              />
              <Button
                variant="secondary"
                id="button-addon2"
                onClick={() => searching()}
              >
                <Search />
              </Button>
            </InputGroup>
          </Col>
        </div>
      </div>
      <div>
        <Container>
          <Row>
            {filterdata.length == 0 && (
              <h2 className="mouse">No Mentor found!</h2>
            )}

            {filterdata.length != 0 &&
              filterdata.map((filterdata, index) => (
                <Col sm={12} md={6} lg={3} key={index}>
                  <Card style={{ width: "17rem" }} className="mt-4 card ">
                    <Card.Img
                      variant="top"
                      src={filterdata.cover}
                      height="250px"
                    />
                    <Card.Body>
                      <Card.Title className="text-center h3">
                        {filterdata.title}
                      </Card.Title>
                      <Card.Text>
                        <span>MentorName: {filterdata.author}</span>
                        <br></br>
                        <span>Genre: {filterdata.genre}</span>
                        <br></br>
                        <span>Experiance: {filterdata.year}</span>
                      </Card.Text>
                      <span className="space">
                        <Button id="read"
                          variant=""
                          onClick={() => display(filterdata)}
                        >
                          Read More
                        </Button>

                        <span className="d-flex-row  ">
                          <Button id="propose"
                            variant=""
                            onClick={(obj) => {
                              // addItem(obj);
                              console.log(filterdata);
                            }}
                          >
                            Propose
                          </Button>
                        </span>
                      </span>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
          <Modal show={show} fullscreen onHide={() => setshow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Mentor Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Displaydetails Obj={Obj} />
            </Modal.Body>
          </Modal>
        </Container>
      </div>
    </div>
  );
}

export default Home;
