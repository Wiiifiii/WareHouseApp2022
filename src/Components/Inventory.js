import React, { useState, useEffect } from "react";
import { VscTrash, VscEdit, VscInfo } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { Navbar, Container, Card, Button, Badge } from "react-bootstrap";
const url = "http://localhost:8000/stock/";

function Inventory() {

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
       {
        fetch(url)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            
            if (data.length === 0) {
              setproducts([]);
            }
            else{
              setproducts(data);
            }
          });
      }
  }, []);
 
  function getAllItems() {
    fetch(url).then((result) => {
      result.json().then((res) => {
        console.log(res)
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
    // alert("Item has been deleted");
  }
  function seletItem(id){
    let item = products[id-1]
    setproducts(item)
          setname(item.name)
          setcategorie(item.categorie)
          setProductNumber(item.productnumber)
          setShelfId(item.shelfid)
          setAction(item.action)
          setQuantity(item.quantity)
          setImg(item.img)
          setActionDate(item.actionDate)
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
      <td>{item.actionDate}</td>
      <td>{item.quantity}</td>

      <td>
        <Link to={`/InfoItem/${item.productnumber}`}>
          <VscInfo  style={{ color: "#d6d6d6" }} />
        </Link>
      </td>
      <td>
        <Link to={`/EditItem/${item.id}`}  onClick={() => {
            // seletItem(item.id);
          }}>
          <VscEdit style={{ color: "#d6d6d6" }}/>
        </Link>
      </td>
      <td>
        <VscTrash
          style={{ color: "#d6d6d6" }}
          onClick={() => {
            deleteItem(item.id);
          }}
        />
      </td>
    </tr>
  ));

  return (
    
    <div>
        <div>
          <table className="table table-hover table-dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>IMG</th>
                <th>PRODUCT NAME</th>
                <th>PRODUCT CATEGORIE</th>
                <th>PRODUCT CODE</th>
                <th>SHELF CODE</th>
                <th>ACTION</th>
                <th>ACTION DATE</th>
                <th >PRODUCT QUANTITY</th>
                <th colSpan="3">OPTIONS</th>
              </tr>
            </thead>
            <tbody>
              {outPutData}
            </tbody>
          </table>

{/* <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={outPutData.item.img} />
  <Card.Body>
    <Card.Title>{products.name}</Card.Title>
    <Card.Text>
      {products.quantity}
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card> */}
        </div>
      
    </div>
  );
}

export default Inventory;
