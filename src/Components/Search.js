import React, { useState, useEffect } from "react";
import {
  VscTrash,
  VscEdit,
  VscInfo,
  VscSymbolNamespace,
} from "react-icons/vsc";
import { FaSitemap } from "react-icons/fa";
import { ImSad } from "react-icons/im";
import { Link } from "react-router-dom";
import { Form, Col, Row, Button, Table, Card } from "react-bootstrap";

const url = "http://localhost:8000/stock/";

function Search() {
  const [products, setproducts] = useState([]);
  const [name, setname] = useState("");
  const [categorie, setcategorie] = useState("");
  const [productnumber, setProductNumber] = useState("");
  const [shelfid, setShelfId] = useState("");
  const [action, setAction] = useState("");
  const [quantity, setQuantity] = useState("");
  const [input, setInput] = useState("");
  const [Message, setMessage] = useState("");
  const [isDisable, setDisable] = useState(false);

  const handleInputClick = () => {
    if (name !== "") {
      setInput("?name=" + name.charAt(0).toUpperCase() + name.slice(1));
    }
    if (categorie !== "") {
      setInput(
        "?categorie=" + categorie.charAt(0).toUpperCase() + categorie.slice(1)
      );
    }
    if (productnumber !== "") {
      setInput(
        "?productnumber=" +
          productnumber.charAt(0).toUpperCase() +
          productnumber.slice(1)
      );
    }
    if (shelfid !== "") {
      setInput(
        "?shelfid=" + shelfid.charAt(0).toUpperCase() + shelfid.slice(1)
      );
    }
    if (action !== "") {
      setInput("?action=" + action.charAt(0).toUpperCase() + action.slice(1));
    }
    if (quantity !== "") {
      setInput(
        "?quantity=" + quantity.charAt(0).toUpperCase() + quantity.slice(1)
      );
    }
    if (
      name === "" &&
      categorie === "" &&
      productnumber === "" &&
      shelfid === "" &&
      action === "" &&
      quantity === ""
    ) {
      setInput("/");
    }
    setDisable(true);
  };
  const handleClearClick = () => {
    setname("");
    setcategorie("");
    setProductNumber("");
    setShelfId("");
    setAction("");
    setQuantity("");
  };
  
  useEffect(() => {
    if (input !== "") {
      fetch(url + `${input}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("data:", data);
          if (data.length === 0) {
            setMessage("No Data Found");
            setproducts([]);
          } else {
            setproducts(data);
            setMessage("");
          }
        });
    }
  }, [input]);

  let filterIn = products.filter((stock) => stock.action === "In");
  console.log("filter-In", filterIn);

  let filterOut = products.filter((stock) => stock.action === "Out");
  console.log("filter-Out", filterOut);

  const stockIn = filterIn.reduce((total, currentElement) => {
    return JSON.parse(total) + JSON.parse(currentElement.quantity);
  }, 0);

  const stockOut = filterOut.reduce((total, currentElement) => {
    return JSON.parse(total) + JSON.parse(currentElement.quantity);
  }, 0);

  const stockTotal = stockIn - stockOut;

  const shelfSpace = () => {
    let Space = 0;
    if (products.length > 2 && products.shelfid !== shelfid) {
      Space = 26 * 100 - stockTotal; //26 is the number of shelves.
      
    }  if (stockTotal < 100 && products.length !== 0 ) {
      Space = 100 - stockTotal;
    }
    return Space;
  };
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
        getAllItems();
      });
    });

    alert("The item has been successfully deleted");
  }

  const outPutData = products.map((item) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>
        <img src={item.img} alt={""} />
      </td>
      <td>{item.name}</td>
      <td>{item.categorie}</td>
      <td>{item.productnumber}</td>
      <td>{item.shelfid}</td>
      <td>{item.quantity}</td>
      <td>{item.action}</td>
      <td>{item.actionDate}</td>

      <td>
        <Link to={`/InfoItem/${item.productnumber}`}>
          <VscInfo style={{ color: "#d6d6d6" }} />
        </Link>
      </td>
      <td>
        <Link to={`/EditItem/${item.id}`}>
          <VscEdit style={{ color: "#d6d6d6" }} />
        </Link>
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
      <Form>
        <Row className="mb-3">
          <Col xs={7}>
            {" "}
            <Form.Label style={{ color: "#ff600b" }}>Product Name</Form.Label>
            <Form.Control
              action="text"
              placeholder="Product name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </Col>
          <Col>
            {" "}
            <Form.Label style={{ color: "#ff600b" }}>
              Product Category
            </Form.Label>
            <Form.Control
              action="text"
              placeholder="Product Category"
              value={categorie}
              onChange={(e) => setcategorie(e.target.value)}
            />
          </Col>
          <Col>
            {" "}
            <Form.Label style={{ color: "#ff600b" }}>Product Code</Form.Label>
            <Form.Control
              action="text"
              placeholder="Product code"
              value={productnumber}
              onChange={(e) => setProductNumber(e.target.value)}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
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
          <Col xs={3}>
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
        <div>
          <Button
            variant="outline-secondary"
            disabled={isDisable}
            onClick={() => {
              handleInputClick();
              // changeBtnState();
            }}
          >
            Search
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            variant="outline-secondary"
            onClick={() => {
              handleClearClick();
              getAllItems();
              setDisable(false);
              setMessage(false);
            }}
          >
            Clear
          </Button>
        </div>
      </Form>
      <div className="row gx-5">
        <div className="col">
          <Card style={{ width: "20rem", background: "#1b1b1b" }}>
            <Card.Body>
              <FaSitemap style={{ color: "#ff650b" }} size={100} />

              <Card.Text>
                <h3 style={{ color: "#ff650b" }}>STOCK ON THE SHELVES</h3>
                <h1 style={{ color: "#fbfbfb" }}>{stockTotal}</h1>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col">
          <Card style={{ width: "20rem", background: "#1b1b1b" }}>
            <Card.Body>
              <VscSymbolNamespace style={{ color: "#ff650b" }} size={100} />

              <Card.Text>
                <h3 style={{ color: "#ff650b" }}>SHELF SPACE AVAILABLE</h3>
                <h1 style={{ color: "#fbfbfb" }}>{shelfSpace()}</h1>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div>
        <Table className="table table-hover table-dark">
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
              <th>ACTION DATE</th>
              <th colSpan="3">OPTIONS</th>
            </tr>
          </thead>
          <tbody>{outPutData}</tbody>
        </Table>
        {Message && (
          <Card style={{ width: "20rem", background: "#1b1b1b" }}>
            <Card.Body>
              <h1 style={{ color: "#fbfbfb" }}>{Message}</h1>
              <ImSad style={{ color: "#ff650b", paddingRight: 7 }} size={45} />
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
}
export default Search;
