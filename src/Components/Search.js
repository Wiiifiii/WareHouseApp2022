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
import ReactLoading from "react-loading";
const url = "http://localhost:8000/stock/"; //db.resourc

function Search() {
  const [products, setproducts] = useState([]);
  const [name, setname] = useState("");
  const [categorie, setcategorie] = useState("");
  const [productnumber, setProductNumber] = useState("");
  const [shelfid, setShelfId] = useState("");
  const [action, setAction] = useState("");
  const [quantity, setQuantity] = useState("");
  const [Message, setMessage] = useState(""); //If data is empty, set Message.
  const [stockStatus, setStockStatus] = useState(false);
  const [suggestions, setSuggestions] = useState([]); //array to set the search suggestions.
  const [isLoading, setisLoading] = useState(true); //search loading message/rectloading.

  useEffect(() => {
    getAllItems();
  }, []);
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
    setSuggestions([]);
  };

  /**
   * handleNameInput = (name) => using RegEx() and match () for Searching with Regular Expressions
   */
  const handleNameInput = (name) => {
    let output = [];
    if (name.length >= 0) {
      output = products.filter((pro) => {
        const regex = new RegExp(`${name}`, "gi");
        return pro.name.match(regex);
      });
      if (output.length === 0) {
        setMessage("No Data Found");
        setproducts([]);
      } else {
        setproducts(output);
        setMessage("");
      }
      console.log("output", output);
      setSuggestions(name);
      console.log("suggestions", suggestions);
      setname(name);
      setproducts(output);
      setStockStatus(false);
    }
  };
  /**
   * handleCategoryInput = (categorie) => using RegEx() and match () for Searching with Regular Expressions
   */
  const handleCategoryInput = (categorie) => {
    let output = [];
    if (categorie.length >= 0) {
      output = products.filter((pro) => {
        const regex = new RegExp(`${categorie}`, "gi");
        return pro.categorie.match(regex);
      });
      if (output.length === 0) {
        setMessage("No Data Found");
        setproducts([]);
      } else {
        setproducts(output);
        setMessage("");
      }
      console.log("output", output);
      setSuggestions(categorie);
      setcategorie(categorie);
      setproducts(output);
      setStockStatus(false);
    }
  };
  /**
   * handleProductCodeInput = (productnumber) => using RegEx() and match () for Searching with Regular Expressions
   */
  const handleProductCodeInput = (productnumber) => {
    let output = [];
    if (productnumber.length >= 0) {
      output = products.filter((pro) => {
        const regex = new RegExp(`${productnumber}`, "gi");
        return pro.productnumber.match(regex);
      });
      if (output.length === 0) {
        setMessage("No Data Found");
        setproducts([]);
      } else {
        setproducts(output);
        setMessage("");
      }
      console.log("output", output);
      setSuggestions(productnumber);
      setProductNumber(productnumber);
      setproducts(output);
      setStockStatus(false);
    }
  };
  /**
   * handleShelfCodeInput = (shelfid) => using RegEx() and match () for Searching with Regular Expressions
   */
  const handleShelfCodeInput = (shelfid) => {
    let output = [];
    if (shelfid.length > 0) {
      output = products.filter((pro) => {
        const regex = new RegExp(`${shelfid}`, "gi");
        return pro.shelfid.match(regex);
      });

      if (output.length === 0) {
        setMessage("No Data Found");
        setproducts([]);
      } else {
        setproducts(output);
        setMessage("");
      }
      console.log("output", output);
      setSuggestions(shelfid);
      setShelfId(shelfid);
      setproducts(output);
      setStockStatus(false);
    }
  };
  /**
   * handleActionInput = (action) => using RegEx() and match () for Searching with Regular Expressions
   */
  const handleActionInput = (action) => {
    let output = [];
    if (action.length >= 0) {
      output = products.filter((pro) => {
        const regex = new RegExp(`${action}`, "gi");
        return pro.action.match(regex);
      });
      if (output.length === 0) {
        setMessage("No Data Found");
        setproducts([]);
      } else {
        setproducts(output);
        setMessage("");
      }
      console.log("output", output);
      setSuggestions(action);
      setAction(action);
      setproducts(output);
      setStockStatus(false);
    }
  };
  /**
   * handleQuantityInput = (quantity) => using RegEx() and match () for Searching with Regular Expressions
   */
  const handleQuantityInput = (quantity) => {
    let output = [];
    if (quantity.length >= 0) {
      output = products.filter((pro) => {
        const regex = new RegExp(`${quantity}`, "gi");
        return pro.quantity.match(regex);
      });
      if (output.length === 0) {
        setMessage("No Data Found");
        setproducts([]);
      } else {
        setproducts(output);
        setMessage("");
      }
      console.log("output", output);
      setSuggestions(quantity);
      setQuantity(quantity);
      setproducts(output);
      setStockStatus(false);
    }
  };
  
  /**
   * filter()=> and reduce()=> and includes()=> To Calculate the product 
   * stock based on the in/out actions and shelves uniqe Ids, 
   * then we get the stock amount and the shelves space.
   */
  const uniqueShelfIds = [];

  const filterShelves = products.filter(element => {
    const isDuplicate = uniqueShelfIds.includes(element.shelfid);

    if (!isDuplicate) {
      uniqueShelfIds.push(element.shelfid);

      return true;
    }

    return false;
  });

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
 console.log('stockIn',stockIn);
 console.log('stocOut',stockOut);
 console.log("filterShelves", filterShelves);
 console.log("action", action);

  const stockTotal =  () => {
    let stock = 0;
    if (filterOut.length > 0 && filterIn.length > 0)
    {
  stock =  stockIn - stockOut;
    }
    else if(filterOut.length > 0){
      stock = stockOut ;
    }
    else  if(filterIn.length > 0 ){
      stock = stockIn;
    }
   
   return stock;
  }
  /**
   * shelfSapce()=> Calculate shelf space based on action in/out
   */
  const shelfSpace = () => {
    let Space = 0;
    if (products.length > 0) {
      Space = (filterShelves.length * 100 ) - (stockTotal()); //100 is the shelf capacity
    }
   
    return Space;
  };
  /**
   * getAllItems()=> GET all data from to the server.
   */
  const getAllItems = () => {
    fetch(url).then((result) => {
      result.json().then((res) => {
        if (res === 0) {
          setisLoading(true);
          setproducts([]);
        } else setproducts(res);
        setisLoading(false);
      });
    });
  };
  /**
   * deleteProduct(id)=> Get the product given the unique id and delete with icon click.
   */
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
  /**
   * map()=> map all products to html table element
   */
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
            <Form.Label style={{ color: "#ff600b" }}>Product Name</Form.Label>
            <Form.Control
              action="text"
              placeholder="Product name"
              value={name}
              onChange={(e) => handleNameInput(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Label style={{ color: "#ff600b" }}>
              Product Category
            </Form.Label>
            <Form.Control
              action="text"
              placeholder="Product Category"
              value={categorie}
              onChange={(e) => handleCategoryInput(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Label style={{ color: "#ff600b" }}>Product Code</Form.Label>
            <Form.Control
              action="text"
              placeholder="Product code"
              value={productnumber}
              onChange={(e) => handleProductCodeInput(e.target.value)}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label style={{ color: "#ff600b" }}>Shelf Code</Form.Label>
            <Form.Select
              value={shelfid}
              onChange={(e) => handleShelfCodeInput(e.target.value)}
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
            <Form.Label style={{ color: "#ff600b" }}>Action</Form.Label>
            <Form.Select
              value={action}
              onChange={(e) => handleActionInput(e.target.value)}
            >
              <option>Action...</option>
              <option>In</option>
              <option>Out</option>
            </Form.Select>
          </Col>
          <Col xs={3}>
            <Form.Label style={{ color: "#ff600b" }}>
              Product Quantity
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Product Quantity"
              value={quantity}
              onChange={(e) => handleQuantityInput(e.target.value)}
            />
          </Col>
        </Row>
        <div>
          <Button
            style={{ marginLeft: 10 }}
            variant="outline-secondary"
            onClick={() => {
              handleClearClick();
              getAllItems();
              setMessage(false);
              setStockStatus(false);
            }}
          >
            Clear
          </Button>
          <Button
            data-testid="StockStatus"
            style={{ marginLeft: 10 }}
            variant="outline-secondary"
            onClick={() => {
              setStockStatus(true);
            }}
          >
            Stock Status
          </Button>
        </div>
      </Form>
      <div className="row gx-5">
        <div className="col">
          {stockStatus && (
            <div>
              <Card style={{ width: "27rem", background: "#1b1b1b" }}>
                <Card.Body>
                  <FaSitemap style={{ color: "#ff650b" }} size={100} />

                  <Card.Text>
                    <h3 style={{ color: "#ff650b" }}>STOCK ON THE SHELVES</h3>
                    <h1 style={{ color: "#fbfbfb" }}>{stockTotal()}</h1>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          )}
        </div>
        <div className="col">
          {stockStatus && (
            <Card style={{ width: "27rem", background: "#1b1b1b" }}>
              <Card.Body>
                <VscSymbolNamespace style={{ color: "#ff650b" }} size={100} />

                <Card.Text>
                  <h3 style={{ color: "#ff650b" }}>SHELF SPACE AVAILABLE</h3>
                  <h1 style={{ color: "#fbfbfb" }}>{shelfSpace()}</h1>
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </div>
      </div>
      
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
        <div>
        {isLoading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",

              height: "100vh",
            }}
          >
            <ReactLoading type="spin" color="#ff650bF" />
          </div>
        )}
        {Message && (
          <Card style={{ width: "20rem", background: "#1b1b1b" }}>
            <Card.Body>
              <h1 style={{ color: "#fbfbfb" }}>{Message}</h1>
              <ImSad style={{ color: "#ff650b", paddingRight: 7 }} size={45} />
            </Card.Body>
          </Card>
        )}
      </div>

      <div></div>
    </div>
  );
}
export default Search;
