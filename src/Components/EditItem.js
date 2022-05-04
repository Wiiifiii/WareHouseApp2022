import { Form, Col, Row, Button, Modal, Alert } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import Inventory from "./Inventory";
import { useParams } from "react-router-dom";
import { VscTrash, VscEdit, VscInfo, VscSearch, VscCheck } from "react-icons/vsc";

const url = "http://localhost:8000/stock/" 



function EditItemII() {
    
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const params = useParams();
  
  const [products, setproducts] = useState([]);
  const [id, setId] = useState("");
  const [name, setname] = useState("");
  const [categorie, setcategorie] = useState("");
  const [productnumber, setProductNumber] = useState("");
  const [shelfid, setShelfId] = useState("");
  const [action, setAction] = useState("");
  const [quantity, setQuantity] = useState();
  const [img, setImg] = useState("");
  const [actionDate, setActionDate] = useState(new Date());
  const [input, setInput] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  const [Message, setMessage] = useState(false);
  const [showBtn, setBtnState] = useState(true);

  function getUsers() {
    fetch( "http://localhost:8000/stock?id=" + params.id).then((result) => {
      result.json().then((resp) => {
        console.log(resp)
        setproducts(resp)
        setId(resp[0].id)
        setname(resp[0].name)
        setcategorie(resp[0].categorie)
        setProductNumber(resp[0].productnumber)
        setShelfId(resp[0].shelfid)
        setAction(resp[0].action)
        setQuantity(resp[0].quantity)
        setImg(resp[0].img)
        setActionDate(resp[0].actionDate)
      })
      
    })
  }
  useEffect(() => {
    getUsers();
   
  }, [])

  function getAllItems() {
    fetch(url).then((result) => {
      result.json().then((res) => {
        setproducts(res);
      });
    });
  }
  function seletItem(id){
    let item = products[id-1];
    
          setname(item.name)
          setcategorie(item.categorie)
          setProductNumber(item.productnumber)
          setShelfId(item.shelfid)
          setAction(item.action)
          setQuantity(item.quantity)
          setImg(item.img)
          setActionDate(item.actionDate)
  }

  
  function updateProduct () {
    let products = {name,categorie,productnumber,shelfid,action,actionDate,img,quantity}
      console.log('products', products)
        fetch(`http://localhost:8000/stock/${id}`,{
            method: 'PUT',
            headers: 
            { 'Content-Type': 'application/json',
            'Accept': 'application/json'
        }, body:JSON.stringify(products)
   
    }).then(response =>{
        console.log(response);
    })
    }
   

  const outPutData = products.map((item) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>
        <img src={item.img} />
      </td>
      <td>{item.name}</td>
      <td>{item.categorie}</td>
      <td>{item.productnumber}</td>
      <td>{item.shelfid}</td>
      <td>{item.action}</td>
      <td>{item.actiondate}</td>
      <td>{item.quantity}</td>

      <td>
        <Link to={`/InfoItem/${item.productnumber}`}>
          <VscInfo style={{ color: "#d6d6d6" }} />
        </Link>
      </td>
      <td>
        <Link to={`/EditItem/${item.id}`}  onClick={() => {
             
              // updateProduct(item.id);
              seletItem(item.id);
              setShow(true);
              setBtnState(true);
          }}>
          <VscEdit style={{ color: "#d6d6d6" }} />
        </Link>
      </td>
      <td>
        <VscTrash
          style={{ color: "#d6d6d6" }}
          onClick={() => {
            // deleteItem(item.id);
          }}
        />
      </td>
    </tr>
  ));
  return (
      
    <div>
      <Modal show={show} onHide={handleClose} size="lg">
      
        <Modal.Header style={{ backgroundColor: "#ff600b" }}>
          <Modal.Title>
            {" "}
            <b>Edit Product</b>
          </Modal.Title>
        </Modal.Header>
       
        <Modal.Body>
          <Form>
          <Row>
              <Col>
                {" "}
                <Form.Control
                  type="text"
                  placeholder="ID"
                  value={id}
                  disabled
                  onChange={(e) => setId(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                {" "}
                <Form.Control
                  type="text"
                  placeholder="Product name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                {" "}
                <Form.Control
                  type="text"
                  placeholder="Product Category"
                  value={categorie}
                  onChange={(e) => setcategorie(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                {" "}
                <Form.Control
                  type="text"
                  placeholder="Product code"
                  value={productnumber}
                  onChange={(e) => setProductNumber(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                {" "}
                <Form.Control
                  type="text"
                  placeholder="Shelf code"
                  value={shelfid}
                  onChange={(e) => setShelfId(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                {" "}
                <Form.Select
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                >
                  <option>Action...</option>
                  <option>In</option>
                  <option>Out</option>
                </Form.Select>
              </Col>
            </Row>
            <Row>
              <Col>
                {" "}
                <Form.Control
                  type="number"
                  placeholder="Product Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                {" "}
                <Form.Control
                  type="text"
                  placeholder="Product Image URL"
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                {" "}
                <Form.Control
                   type="date"
                  
                  value={actionDate}
                  onChange={(e) => setActionDate(e.target.value)}
                />
              </Col>
            </Row>
            <div>
              {Message && (
                <Alert variant="success">
                  <Alert.Heading>
                    Your new product was successfully Updated!
                  </Alert.Heading>
                  <p>
                    <VscCheck size={30} />
                  </p>
                  <hr />
                  {/* <div className="d-flex justify-content-end">
                    <Button
                      type="submit"
                      onClick={() => {setMessage(false); {handleClose()}}}
                      variant="outline-success"
                    >
                      Done!
                    </Button>
                  </div> */}
                </Alert>
              )}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        
          <Button
            variant="outline-secondary"
            onClick={() => {
              setMessage(false);
              handleClose();
              
            }}
          >
            Close
          </Button>
        
          {showBtn ? (
              
            <Button
              type="submit"
              variant="outline-secondary"
              onClick={() => {
                // updateItem();
                setMessage(true);
                // handleClearClick();
                 setBtnState(false);
                 updateProduct()
               
             
              }}
            >
              SAVE CHANGES
            </Button>
           
          ) : (
            // <Button
            //   variant="outline-secondary"
            //   onClick={() => {
            //     refreshPage();
            //     changeBtnState();
            //     setMessage(false);
              
            //   }}
            // >
            //   Edit MORE PRODUCT
            // </Button>
            <div></div>
          )}
        </Modal.Footer>
      </Modal>
      <div>
        <table className="table table-striped table-dark">
          <thead>
            <tr>
            <th>ID</th>
                <th>IMG</th>
                <th>PRODUCT NAME</th>
                <th>PRODUCT CATEGORIE</th>
                <th>PRODUCT CODE</th>
                <th>SHELF CODE</th>
                <th>ACTION</th>
                <th>ACTION DATE</th>
                <th >PRODUCT QUANTITY</th>
                <th colSpan="3">OPTIONS</th>
            </tr>
          </thead>
          <tbody>
            {outPutData}
            {Message && (
              <tr>
                <td colSpan="12">
                  <b>{Message}</b>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export default EditItemII;
