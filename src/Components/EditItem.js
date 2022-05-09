import { Form, Col, Row, Button, Modal, Alert } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { VscHome, VscSearch, VscGraph,VscSquirrel,VscAdd,VscEdit ,VscClose} from "react-icons/vsc";
// import Inventory from "./Inventory";
import { useParams } from "react-router-dom";
import {
  VscTrash,
 
  VscInfo,
 
  VscCheck,
} from "react-icons/vsc";

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
  const [input, setInput] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  const [Message, setMessage] = useState(false);
  const [showBtn, setBtnState] = useState(true);

  function getUsers() {
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
    getUsers();
    // seletItem();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function getAllItems() {
    fetch(url).then((result) => {
      result.json().then((res) => {
        setproducts(res);
      });
    });
  }
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
      <td>{item.quantity}</td>
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
            setBtnState(true);
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
                    Your new product was successfully Updated!
                  </Alert.Heading>
                  <p>
                    <VscCheck size={30} />
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
        <VscSearch style={{ color: "#ff650b" }}size={25} />
        </Button>
      </Link>
          <Button
            variant="outline-secondary"
            onClick={() => {
              setMessage(false);
              handleClose();
              setShow(false);
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
              setBtnState(false);
              updateProduct();
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
              <th>ACTION</th>
              <th>PRODUCT QUANTITY</th>
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
