import { Form, Col, Row, Button, Modal, Alert } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Inventory from "./Inventory";
import { Link } from "react-router-dom";
import { BiCommentError } from "react-icons/bi";
import { VscHome, VscSearch, VscGraph, VscCheck, VscDiffAdded, } from "react-icons/vsc";

/**
 * this componenet to add an new products or stock actions either to in or out operations.
 */
function AddItem() {
  const [show, setShow] = useState(true); // Additem Mdoal show state.
  const handleClose = () => setShow(false); // Additem Mdoal show close handler.
  const handleShow = () => setShow(true); // Additem Mdoal show show handler.
  const [products, setproducts] = useState([]); 
  const [name, setname] = useState("");
  const [categorie, setcategorie] = useState("");
  const [productnumber, setProductNumber] = useState("");
  const [shelfid, setShelfId] = useState("");
  const [action, setAction] = useState("");
  const [quantity, setQuantity] = useState("");
  const [img, setImg] = useState("");
  const [actionDate, setActionDate] = useState(new Date());
  const [Message, setMessage] = useState(false); //If data is empty, set Message.
  const [showBtn, setBtnState] = useState(true);
  const [validation, setValidation] = useState(""); //Based on the input, set a validation message
  const [isValid, setIsValid] = useState(false); //Set the Alert message based on the validation output
  const [isDisable, setDisable] = useState(false); //Based on the status of the POST method, the save product button is disabled (true/false). 
  const url = "http://localhost:8000/stock/"; //db.resourc

  useEffect(() => {
    getProduct();
  }, [shelfid]);
  /**
   * getProduct()=> Get the product given the unique shelf id and add it to the product list. 
   */
  async function getProduct() {
    let response = await fetch(url + "?shelfid=" + shelfid);
    let data = await response.json();
    console.log(data);
    setproducts(data);
  }
  /**
   * reduce()=> Calculate the shelf stock from the product list using the reduce function () 
   */
  const shelfStock = products.reduce((accumulater, currentElement) => {
    return JSON.parse(accumulater) + JSON.parse(currentElement.quantity);
  }, 0);
  /**
   * shelfSapce()=> Calculate shelf space based on action in/out
   */
  function shelfSapce() {
    let space = 0;
    if (shelfStock < 100 && action === "Out") {
      space = shelfStock;
    }
    if (shelfStock < 100 && action === "In") {
      space = 100 - shelfStock;
    }
    return space;
  }
  console.log("space", shelfSapce);
  console.log("stock", shelfStock);
  /**
   * checkShelfStatus()=> Check the shelf space based on the current shelf stock. 
   */
  function checkShelfStatus() {
    if (shelfStock >= 100) {
      setValidation("Shelf is full");
      setMessage(false);
    }
    if (quantity > shelfSapce()) {
      setValidation("Only this value " + shelfSapce() + " can lead to action");
      setMessage(false);
      setIsValid(true);
    } else {
      addProduct();
      setMessage(true);
      setIsValid(false);
      setDisable(true);
    }
  }
  /**
   * inputValidation()=> Checker function for input validation.
   * Todo: add yup validation schema...
   */
  function inputValidation() {
    if (name === "") {
      setValidation("Product name should be required, please");
      setMessage(false);
      setIsValid(true);
    } else if (categorie === "") {
      setValidation("Product category should be required, please");
      setMessage(false);
      setIsValid(true);
    } else if (productnumber === "") {
      setValidation("Product code should be required, please");
      setIsValid(true);
    } else if (shelfid === "") {
      setValidation("Shelf code should be required, please");
      setIsValid(true);
    } else if (action === "") {
      setValidation("Operation action be required, please");
      setMessage(false);
      setIsValid(true);
    } else if (quantity < -100 || quantity > 100 || quantity === "") {
      setValidation("The shelf capacity is Max 100.");
      setMessage(false);
      setIsValid(true);
    } else if (img === "" || img == !"") {
      checkShelfStatus();
    } else {
      checkShelfStatus();
    }
  }
  /**
   * addProduct()=> Post JSON new product date to the server.
   */
  function addProduct() {
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
    setDisable(false)
    getProduct();
  }
  function refreshPage() {
    window.location.reload(false);
  }
  /**
   * handleClearClick()=> reset fields for a new entry
   */
  const handleClearClick = () => {
    setname("");
    setcategorie("");
    setProductNumber("");
    setShelfId("");
    setAction("");
    setQuantity("");
    setImg("");
    setActionDate("");
    setIsValid(false);
  };
  const changeBtnState = () => {
    setBtnState(false);
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header style={{ backgroundColor: "#ff600b" }}>
          <Modal.Title>
            {" "}
            <b>Add New Product</b>
            <VscDiffAdded
              style={{ color: "#1b1b1b", paddingLeft: 7 }}
              size={45}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                {" "}
                <Form.Label style={{ color: "#ff600b" }}>
                  Product Name
                </Form.Label>
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
                <Form.Label style={{ color: "#ff600b" }}>
                  Product Category
                </Form.Label>
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
                <Form.Label style={{ color: "#ff600b" }}>
                  Product Code
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Product code"
                  value={productnumber}
                  onChange={(e) => setProductNumber(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col style={{ paddingRight: 0 }}>
                {" "}
                <Form.Label style={{ color: "#ff600b" }}>Shelf Code</Form.Label>
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
              <Col style={{ paddingLeft: 0 }}>
                <Form.Label style={{ color: "#ff600b" }}>
                  Shelf Space Available
                </Form.Label>
                <Form.Control
                  type="text"
                  style={{ backgroundColor: "#e9e9ed" }}
                  disabled
                  value={shelfSapce()}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                {" "}
                <Form.Label style={{ color: "#ff600b" }}>Action</Form.Label>
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
                <Form.Label style={{ color: "#ff600b" }}>
                  Product Quantity
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Product Quantity"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
              //!Hide the image input field, no needs right now.
                {" "}
                <Form.Control
                  disabled
                  hidden
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

                  <VscCheck size={40} />

                  <hr />
                </Alert>
              )}
            </div>
            <div>
              {isValid && (
                <Alert variant="danger ">
                  <Alert.Heading>{validation}</Alert.Heading>

                  <BiCommentError size={40} />

                  <hr />
                </Alert>
              )}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Link style={{ color: "#ff650b" }} to={"/Home"}>
            <Button variant="outline-secondary">
              <VscHome style={{ color: "#ff650b" }} size={30} />
            </Button>
          </Link>
          <Link to={"/Inventory"}>
            <Button variant="outline-secondary">
              <VscGraph style={{ color: "#ff650b" }} size={25} />
            </Button>
          </Link>
          <Link style={{ color: "#ff650b" }} to={"/Search"}>
            <Button variant="outline-secondary">
              <VscSearch style={{ color: "#ff650b" }} size={25} />
            </Button>
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
          <Button
            type="submit"
            variant="outline-secondary"
            disabled={isDisable}
            onClick={() => {
              inputValidation();
              changeBtnState();
            }}
          >
            SAVE PRODUCT
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => {
              setMessage(false);
              handleClearClick();
              setDisable(false);
            }}
          >
            Clear
          </Button>
        </Modal.Footer>
      </Modal>
      <div style={{ padding: "20px" }}>
        <Link to={`/AddItem/`}>
          <Button
            variant="outline-secondary"
            onClick={() => {
              refreshPage();
              changeBtnState();
              setMessage(false);
            }}
          >
            Add Product
          </Button>
        </Link>
      </div>

      <div>
        <Inventory />
      </div>
    </div>
  );
}
export default AddItem;
