import { Form, Col, Row, Button, Modal, Alert } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import {
 
  VscCheck,
} from "react-icons/vsc";
import Inventory from "./Inventory";

function AddModal() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [products, setproducts] = useState([]);
  const [name, setname] = useState("");
  const [categorie, setcategorie] = useState("");
  const [productnumber, setProductNumber] = useState("");
  const [shelfid, setShelfId] = useState("");
  const [action, setAction] = useState("");
  const [quantity, setQuantity] = useState("");
  const [img, setImg] = useState("");
  const [actionDate, setActionDate] = useState("");
  const [input, setInput] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  const [Message, setMessage] = useState(false);

  function save() {
    fetch("http://localhost:8000/stock/", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        img,
        name,
        categorie,
        productnumber,
        shelfid,
        action,
        actionDate,
        quantity,
      }),
    }).then(response => response.json())
    .then((result) =>{
      console.log(result);
    });
  }
  // function refreshPage() {
  //   window.location.reload(false);
  // }
  const handleClearClick = () => {
    setname("");
    setcategorie("");
    setProductNumber("");
    setShelfId("");
    setAction("");
    setQuantity("");
    setImg("");
    setActionDate("");
  };
  return (
    <div>
      {/* <Button variant="primary" onClick={handleShow}>
        Add Item
      </Button> */}
      <Modal show={show} onHide={handleClose}  size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add new Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row >
              <Col>
                {" "}
                <Form.Control
                  type="text"
                  placeholder="name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </Col>
            </Row>

            <Row >
              <Col>
                {" "}
                <Form.Control
                  type="text"
                  placeholder="categorie"
                  value={categorie}
                  onChange={(e) => setcategorie(e.target.value)}
                />
              </Col>
            </Row>
            <Row >
              <Col>
                {" "}
                <Form.Control
                  type="text"
                  placeholder="productnumber"
                  value={productnumber}
                  onChange={(e) => setProductNumber(e.target.value)}
                />
              </Col>
            </Row>

            <Row >
              <Col>
                {" "}
                <Form.Control
                  type="text"
                  placeholder="shelfid"
                  value={shelfid}
                  onChange={(e) => setShelfId(e.target.value)}
                />
              </Col>
            </Row>

            <Row >
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
            <Row >
              <Col>
                {" "}
                <Form.Control
                  type="number"
                  placeholder="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Col>
            </Row>
            <Row >
              <Col>
                {" "}
                <Form.Control
                  type="text"
                  placeholder="img url"
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                />
              </Col>
            </Row>
            <Row >
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
                  <Alert.Heading>Item Updated Saved!</Alert.Heading>
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
          <Button variant="secondary" onClick={() => { setMessage(false); handleClose()} }>
            Close
          </Button>
          <div>
              <Button variant="primary" type="submit" onClick={() => {save(); setMessage(true); handleClearClick()} }>
                {" "}
                Send{" "}
              </Button>
            </div>
           
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
      <div>
        <Inventory />
      </div>
    </div>
  );
}

export default AddModal;
