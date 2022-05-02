import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import { useParams } from "react-router-dom";
import { Form, Col, Row, Button, Alert } from "react-bootstrap";
import { VscTrash, VscEdit, VscInfo, VscSearch, VscCheck } from "react-icons/vsc";

const url = "http://localhost:8000/stock/" 

function ItemEdit() {

  const params = useParams();
  console.log(params.id);
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
  const [Message, setMessage] = useState("");

  useEffect(() => {
    getUsers();
  }, [])
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
  function getUsers() {
    fetch( "http://localhost:8000/stock?id=" + params.id).then((result) => {
      result.json().then((resp) => {
        console.log(resp)
        setproducts(resp)
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
  function updateItem()  {
    let item = {name,categorie,productnumber,shelfid,action,actionDate,img}
   console.warn(name,categorie,productnumber,shelfid,action,actionDate,img);
    fetch(url + `${item.id}`, {
      method: "PUT",
      headers: {
        'Accept' : ' application/json',
        'Content-Type': ' application/json'
      },
      body: JSON.stringify(item)
    }).then((result) => {
      result.json().then((res) => {
        console.log(res);
        getAllItems();
      });
    });

    alert("Item has been updated");
  }
  
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
        <Link to={`/ItemInfo/${item.productnumber}`}>
          <VscInfo style={{ color: "#45bbfb" }} />
        </Link>
      </td>
      <td>
        <Link to={`/EditItem/${item.id}`}  onClick={() => {
            //  seletItem(item.id);
          }}>
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
                placeholder="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </Col>
            <Col>
              {" "}
              <Form.Control
                action="text"
                placeholder="categorie"
                value={categorie}
                onChange={(e) => setcategorie( e.target.value)}
              />
            </Col>
            <Col>
              {" "}
              <Form.Control
                action="text"
                placeholder="productnumber"
                value={productnumber}
                onChange={(e) => setProductNumber( e.target.value )}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              {" "}
              <Form.Control
                action="text"
                placeholder="shelfid"
                value={shelfid}
                onChange={(e) => setShelfId( e.target.value )}
              />
            </Col>
            <Col>
              {" "}
              <Form.Select
              value={action}
                onChange={(e) =>setAction(e.target.value )}>
                <option>Action...</option>
                <option>In</option>
                <option>Out</option>
              </Form.Select>
            </Col>
            <Col xs={3}>
              {" "}
              <Form.Control
                type="number"
                placeholder="quantity"
                value={quantity}
                onChange={(e) => setQuantity( e.target.value )}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              {" "}
              <Form.Control
                action="text"
                placeholder="img url"
                value={img}
                onChange={(e) => setImg( e.target.value )}
              />
            </Col>

            <Col xs={3}>
              {" "}
              <Form.Control
                type="date"
              
                value={actionDate}
                onChange={(e) => setActionDate(e.target.value)}
              />
            </Col>
          </Row>

          <div><Button   type='submit'  onClick={() => {
              updateItem();
              
            }}> Update </Button>
          </div>
          <div>{Message && (
            <Alert variant="success">
              <Alert.Heading>Item Updated Saved!</Alert.Heading>
              <p>
                <VscCheck size={30} />
              </p>
              <hr />
              <div className="d-flex justify-content-end">
                <Button type='submit' onClick={() =>  setMessage(false)} variant="outline-success">
                  Done!
                </Button>
              </div>
            </Alert>
          )}
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

export default ItemEdit;
