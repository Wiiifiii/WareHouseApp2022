import React, { useState, useEffect } from "react";
import { VscTrash, VscEdit, VscInfo, VscSearch } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { Form, Col, Row, Button } from "react-bootstrap";

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
  // const [isLoading, setIsLoading] = useState(false);
  const [Message, setMessage] = useState("");

  console.log(action);
  //To fetch the right data from api, handle click to take the input name or +ress
  //and + to the the end of the url.
  const handleInputClick = () => {
    if (name != "") {
      setInput("?name=" +
        name.charAt(0).toUpperCase() +
        name.slice(1));
      // setIsLoading(true);
    }
    if (categorie != "") {
      setInput(
        "?categorie=" +
        categorie.charAt(0).toUpperCase() +
        categorie.slice(1)
      );
      // setIsLoading(true);
    }
    if (productnumber != "") {
      setInput(
        "?productnumber=" +
        productnumber.charAt(0).toUpperCase() +
        productnumber.slice(1)
      );
      // setIsLoading(true);
    }
    if (shelfid != "") {
      setInput(
        "?shelfid=" +
        shelfid.charAt(0).toUpperCase() +
        shelfid.slice(1)
      );
      // setIsLoading(true);
    }
    if (action != "") {
      setInput("?action=" +
        action.charAt(0).toUpperCase() +
        action.slice(1));
      // setIsLoading(true);
    }
    if (quantity != "") {
      setInput(
        "?quantity=" + 
        quantity.charAt(0).toUpperCase() + 
        quantity.slice(1)
      );
      // setIsLoading(true);
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
      // setIsLoading(true);
    }
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
    setTimeout(() => {
      if (input !== "") {
        fetch(url + `${input}`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            if (data.length === 0) {
              setMessage("Data Not Found");
              setproducts([]);
            } else {
              setproducts(data);
              // setIsLoading(false);
              setMessage("");
            }
          });
      }
    }, 50); //to Do later
  }, [input]);
  // function refreshPage() {
  //   window.location.reload(false);
  // }
  function getAllItems() {
    fetch(url).then((result) => {
      result.json().then((res) => {
        setproducts(res);
      });
    });
  }

  function deleteItem(id) {
    fetch(url + `${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((res) => {
        console.log(res);
        getAllItems();
      });
    });

    alert("Item has been deleted");
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
          <VscInfo style={{ color: "#45bbfb" }} />
        </Link>
      </td>
      <td>
        <Link to={`/EditItem/${item.id}`}>
          <VscEdit />
        </Link>
      </td>
      <td>
        <VscTrash
          style={{ color: "#e3334f" }}
          onClick={() => {
            deleteItem(item.id);
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
            <Form.Control
              action="text"
              placeholder="Product name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </Col>
          <Col>
            {" "}
            <Form.Control
              action="text"
              placeholder="Product Category"
              value={categorie}
              onChange={(e) => setcategorie(e.target.value)}
            />
          </Col>
          <Col>
            {" "}
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
            <Form.Control
              action="text"
              placeholder="Shelf code"
              value={shelfid}
              onChange={(e) => setShelfId(e.target.value)}
            />
          </Col>
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
          <Col xs={3}>
            {" "}
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
            onClick={() => {
              handleInputClick();
              handleClearClick();
            }}
          >
            Search
          </Button>

          {/* {showBtn ? (
          <Button variant="outline-primary" onClick={() => { handleInputClick(); handleClearClick(); changeBtnState()}}>Search</Button>
          ) : (
        <Button variant="outline-dark" onClick={() => {refreshPage(); changeBtnState()}}>New Search</Button> )} */}
        </div>
      </Form>
      <div>
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th>#</th>
              <th>IMG</th>
              <th>PRODUCT NAME</th>
              <th>CATEGORIE</th>
              <th>CODE</th>
              <th>SHELF ID</th>
              <th>ACTION</th>
              <th>ACTION DATE</th>
              <th>QUANTITY</th>
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

export default Search;
