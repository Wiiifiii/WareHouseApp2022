import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";
import { VscTrash, VscEdit, VscInfo, VscGraphLine } from "react-icons/vsc";
import { Card, Button } from "react-bootstrap";

function ItemInfo() {
  const url = "http://localhost:8000/stock/";
  const params = useParams();
  const [info, setInfo] = useState([]);

  async function fetchData() {
    let response = await fetch(
      "http://localhost:8000/stock?productnumber=" + params.productnumber
    );
    let data = await response.json();
    console.log(data);
    setInfo(data);
  }
  useEffect(() => {
    fetchData();
  }, []);

  const stockTotal = info.reduce((accumulater, currentElement) => {
    return JSON.parse(accumulater) + JSON.parse(currentElement.quantity);
  }, 0);

  // const thedate = info.map((item) => (
  //     new Date(item.actiondate) 
  //   ));

  const outPutData = info.map((item) => (
    
  
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
        <Link to={`/InfoItem/${item.id}`}>
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
            deleteItem(item.id);
          }}
        />
      </td>
    </tr>
  ));
  function deleteItem(id) {
    fetch(url + `${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((res) => {
        console.log(res);
        fetchData();
      });
    });
    alert("Item has been deleted");
  }

  return (
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
        <tbody>{outPutData}</tbody>
      </table>
    
      <Card style={{ width: "20rem", background: "#1b1b1b" }}>
        <Card.Body>
          <div>
            <VscGraphLine size={70} style={{ color: "#ff650b" }} />
            <h1 style={{ color: "#fbfbfb" }}>
              {" "}
              In stock: <span style={{ color: "#ff650b" }}>
                {stockTotal}{" "}
              </span>{" "}
              Pcs{" "}
            </h1>
            <Link to={`/Inventory/`}>
              <Button variant="outline-secondary" style={{ marginRight: '5px'}} >Go to Inventory</Button>
            </Link>
            <Link to={`/Search/`}>
              <Button variant="outline-secondary">Go to Search</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ItemInfo;
