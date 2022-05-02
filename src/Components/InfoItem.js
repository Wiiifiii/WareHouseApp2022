import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";
import { VscTrash, VscEdit, VscInfo, VscGraphLine } from "react-icons/vsc";

function ItemInfo() {
  const url = "http://localhost:8000/stock/";
  const params = useParams();
  console.log(params.productnumber);

  const [info, setInfo] = useState([]);

  async function fetchData() {
    let response = await fetch("http://localhost:8000/stock?productnumber=" + params.productnumber);
    let data = await response.json();
    console.log(data);
    setInfo(data);
  }
  useEffect(() => {
    fetchData();
  }, []);

  const stockTotal = info.reduce((accumulater, currentElement) => {
    return accumulater + currentElement.quantity;
  }, 0);

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
      <td>{item.actiondate}</td>
      <td>{item.quantity}</td> 

      <td>
        <Link to={`/InfoItem/${item.id}`}>
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
            <th>#</th>
            <th>IMG</th>
            <th>NAME</th>
            <th>CATEGORIE</th>
            <th>CODE</th>
            <th>SHELF ID</th>
            <th>ACTION</th>
            <th>ACTION DATE</th>
            <th>QUANTITY</th>
            <th colSpan="3">OPTIONS</th>
          </tr>
        </thead>
        <tbody>{outPutData}</tbody>
      </table>
      <div>
        <VscGraphLine size={50} style={{ color: "#ff650b" }}/>
        <h1 ><b> In stock: <span style={{ color: "#ff650b" }}>{stockTotal} </span> Pcs</b> </h1>
      </div>
    </div>
  );
}

export default ItemInfo;
