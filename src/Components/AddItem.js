import { Form, Col, Row, Button, Modal, Alert } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { VscCheck } from "react-icons/vsc";
import Inventory from "./Inventory";
import { Link } from "react-router-dom";
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
  const [quantity, setQuantity] = useState();
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
                <Form.Select
              
              value={shelfid}
              onChange={(e) => setShelfId(e.target.value)}
            >
               <option>Shelf Code...</option>
               <option>A-01</option>
              <option>A-02</option>
              <option>B-01</option>
              <option>B-02</option>
              <option>C-01</option>
              <option>C-02</option>
              <option>D-01</option>
              <option>D-02</option>
              <option>C-01</option>
              <option>C-02</option>
              <option>D-01</option>
              <option>D-02</option>
              <option>E-01</option>
              <option>E-02</option>
              <option>F-01</option>
              <option>F-02</option>
              <option>G-01</option>
              <option>G-02</option>
              <option>H-01</option>
              <option>H-02</option>
              <option>I-01</option>
              <option>I-02</option>
              <option>J-01</option>
              <option>J-02</option>
              <option>K-01</option>
              <option>K-02</option>
              <option>L-01</option>
              <option>L-02</option>
              <option>M-01</option>
              <option>M-02</option>
              <option>N-01</option>
              <option>N-02</option>
              <option>O-01</option>
              <option>O-02</option>
              <option>P-01</option>
              <option>P-02</option>
              <option>Q-01</option>
              <option>Q-02</option>
              <option>R-01</option>
              <option>R-02</option>
              <option>S-01</option>
              <option>S-02</option>
              <option>T-01</option>
              <option>T-02</option>
              <option>U-01</option>
              <option>U-02</option>
              <option>V-01</option>
              <option>V-02</option>
              <option>W-01</option>
              <option>W-02</option>
              <option>X-01</option>
              <option>X-02</option>
              <option>Y-01</option>
              <option>Y-02</option>
              <option>Z-01</option>
              <option>Z-02</option>
             </Form.Select>
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
                  hidden
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
        <Link to={`/Inventory/`}>
              <Button variant="outline-secondary">Go to Inventory</Button>
            </Link>
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
      <div style={{padding: '20px'}}> 
      <Link to={`/AddItem/`}>
      <Button 
              variant="outline-secondary"
              onClick={() => {
                refreshPage();
                changeBtnState();
                setMessage(false);
              }}
            >Add Product</Button>
            </Link>
            </div>
      <div>
        <Inventory />
      </div>
    </div>
  );
}

export default AddItem;
