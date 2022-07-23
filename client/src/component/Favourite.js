import {useSelector} from "react-redux"
import {Row,Col,Button,Card, Container,Modal} from "react-bootstrap"
import {useEffect,useState} from "react"
import { useNavigate } from "react-router"
import Displaydetails from "./Displaydetails"

import axios from "axios"

function Favourite(){
  let navigate = useNavigate()
 
    let {obj}=useSelector(state=>state.users)
let [favouritebook,setfavouritebook]=useState([])
let [Obj, setObj] = useState()
let [show, setshow] = useState(false)


  useEffect(async()=>{
let response=await axios.get(`http://localhost:5000/user/favourite/${obj.name}`)
let data=response.data
if(data.message=="favourite books"){
setfavouritebook(data.payload.favourites)
}

  },[])

 console.log(favouritebook)


const display = (Obj) => {
  setshow(true)

  setObj(Obj)
  console.log(Obj)
}



    return(<div>
        <Container>
          <h3 className="text-center text-success mt-3">Favourite Tutor of {obj.name}({favouritebook.length})</h3>
          <Row>
{
favouritebook.length === 0 &&
<h2 className="mt-5 text-danger text-center">No Tutor in favourite list</h2> 
}
{
   favouritebook.length !== 0 &&
    favouritebook.map((obj,index)=><Col sm={12} md={6} lg={4} >

    <Card style={{ width: '18rem' }} className="mt-3 card">
   <Card.Img variant="top" src={obj.cover} height="300px" />
   <Card.Body>
     <Card.Title className="text-center"><h3>{obj.title}</h3></Card.Title>
     <Card.Text>
       
      <h5>Author: {obj.author}</h5>
      
      <h5>Genre: {obj.genre}</h5>
      <h6>Year: {obj.year}</h6>
     
      
     </Card.Text>
     <div className="d-grid gap-2 my-2">
     <Button variant="warning" onClick={() => display(obj)}>Read More</Button>
     </div>
   </Card.Body>
 </Card>
 </Col>)
    
}


</Row>
<Modal show={show} fullscreen onHide={() => setshow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Book Details</Modal.Title>
        </Modal.Header>
        <Modal.Body><Displaydetails Obj={Obj} /></Modal.Body>
      </Modal>
</Container>
    </div>)
}

export default Favourite