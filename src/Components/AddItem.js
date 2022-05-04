import { Form, Col, Row, Button, Modal, Alert } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { VscCheck } from "react-icons/vsc";
import Inventory from "./Inventory";

function AddItem() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [products, setproducts] = useState([]);
  const [name, setname] = useState("");
  const [categorie, setcategorie] = useState("");
  const [productnumber, setProductNumber] = useState("");
  const [shelfid, setShelfId] = useState("");
  const [action, setAction] = useState("");
  const [quantity, setQuantity] = useState(new Number ());
  const [img, setImg] = useState("");
  const [actionDate, setActionDate] = useState(new Date());
  const [input, setInput] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  const [Message, setMessage] = useState(false);
  const [showBtn, setBtnState] = useState(true);

  function save() {
    fetch("http://localhost:8000/stock/", {
      method: "POST",
      headers: {
        Accept: "application/json",
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
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      });
  }
 
  function refreshPage() {
    window.location.reload(false);
  }
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
  const changeBtnState = () => {
    setBtnState(false);
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header style={{ backgroundColor: "#ff600b" }} >
          <Modal.Title>
            {" "}
            <b>Add New Product</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
                  id="quantity"
                  min={1}
                  max={100}
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
                  
                 disabled
                  value={actionDate}
                  onChange={(e) => setActionDate(e.target.value)}
                />
              </Col>
            </Row>
            <div>
              {Message && (
                <Alert variant="success">
                  <Alert.Heading>
                    Your new product was successfully added!
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
                save();
                setMessage(true);
                handleClearClick();
                changeBtnState();
              }}
            >
              ADD PRODUCT
            </Button>
          ) : (
            <Button
              variant="outline-secondary"
              onClick={() => {
                refreshPage();
                changeBtnState();
                setMessage(false);
              }}
            >
              ADD MORE PRODUCT
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      <div>
        <Inventory />
      </div>
    </div>
  );
}

export default AddItem;
