import { Form, Col, Row, Button, Modal, Alert } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  VscTrash,
  VscInfo,
  VscCheck,
  VscHome,
  VscSearch,
  VscGraph,
  VscEdit,
  VscExclude
} from "react-icons/vsc";
import { BiCommentError } from "react-icons/bi";

const url = "http://localhost:8000/stock/";

function EditItem() {
  const [show, setShow] = useState(true);
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
  const [Message, setMessage] = useState(false);
  const [validation, setValidation] = useState("");
  const [isValid, setIsValid] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function getItem() {
    fetch("http://localhost:8000/stock?id=" + params.id).then((result) => {
      result.json().then((resp) => {
        console.log(resp);
        setproducts(resp);
        setId(resp[0].id);
        setname(resp[0].name);
        setcategorie(resp[0].categorie);
        setProductNumber(resp[0].productnumber);
        setShelfId(resp[0].shelfid);
        setAction(resp[0].action);
        setQuantity(resp[0].quantity);
        setImg(resp[0].img);
        setActionDate(resp[0].actionDate);
      });
    });
  }
  useEffect(() => {
    getItem();
  }, []);

  function deleteProduct(id) {
    fetch(url + `${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((res) => {
        console.log(res);
        getProduct();
      });
    });
    alert("The item has been successfully deleted");
  }
  function getProduct(id) {
    fetch("http://localhost:8000/stock?id=" + params.id).then((result) => {
      result.json().then((res) => {
        setproducts(res);
      });
    });
  }
  function updateProduct() {
    let products = {
      name,
      categorie,
      productnumber,
      shelfid,
      action,
      actionDate,
      img,
      quantity,
    };
    console.log("products", products);
    fetch(`http://localhost:8000/stock/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(products),
    }).then((response) => {
      console.log("res :", response);
    });
  }

  function checkShelfStatus() {
    if (shelfStock >= 100) {
      setValidation("Shelf is full");
      setMessage(false);
    }
    if (quantity > shelfSapce) {
      setValidation("Shelf has space for only " + shelfSapce + " items");
      setMessage(false);
      setIsValid(true);
    } else {
      updateProduct();
      setMessage(true);
      setIsValid(false);
    }
  }

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
      setValidation(
        "You can change the shelf capacity from -100 (Out) to +100 (In)."
      );
      setMessage(false);
      setIsValid(true);
    } else if (img === "" || img == !"") {
      checkShelfStatus();
    } else {
      checkShelfStatus();
    }
  }

  async function getProduct() {
    let response = await fetch(url + "?shelfid=" + shelfid);
    let data = await response.json();
    console.log(data);
    setproducts(data);
  }
  useEffect(() => {
    getProduct();
  }, [shelfid]);

  const shelfStock = products.reduce((accumulater, currentElement) => {
    return JSON.parse(accumulater) + JSON.parse(currentElement.quantity);
  }, 0);

  const shelfSapce = 100 - shelfStock;
  console.log("space", shelfSapce);
  console.log("stock", shelfStock);
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
      <td>{item.quantity}</td>
      <td>{item.action}</td>
      <td>
        <Link to={`/InfoItem/${item.productnumber}`}>
          <VscInfo style={{ color: "#d6d6d6" }} />
        </Link>
      </td>
      <td>
        <VscEdit
          style={{ color: "#d6d6d6" }}
          onClick={() => {
            setShow(true);
          }}
        />
      </td>
      <td>
        <VscTrash
          style={{ color: "#d6d6d6" }}
          onClick={() => {
            deleteProduct(item.id);
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
            <VscExclude style={{ color: "#1b1b1b" , paddingLeft: 7}} size={45}/>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                {" "}
                <Form.Label style={{ color: "#ff600b" }}>Product ID</Form.Label>
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
                  value={shelfSapce}
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
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              {/* <Col>
                {" "}
                <Form.Control
                  type="text"
                  placeholder="Product Image URL"
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                />
              </Col> */}
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
                    Your new product was successfully Updated!
                  </Alert.Heading>
                  <p>
                    <VscCheck size={40} />
                  </p>
                  <hr />
                </Alert>
              )}
            </div>
            <div>
              {isValid && (
                <Alert variant="danger ">
                  <Alert.Heading>{validation}</Alert.Heading>
                  <p>
                    <BiCommentError size={40} />
                  </p>
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
              getProduct();
            }}
          >
            Close
          </Button>
          <Button
            type="submit"
            variant="outline-secondary"
            onClick={() => {
              setMessage(true);
              inputValidation();
            }}
          >
            SAVE CHANGES
          </Button>
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
              <th>PRODUCT QUANTITY</th>
              <th>ACTION</th>
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

export default EditItem;
