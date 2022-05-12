import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";
import { VscTrash, VscEdit, VscInfo, VscGraphLine } from "react-icons/vsc";
import { Card, Button } from "react-bootstrap";
import ReactLoading from "react-loading";

/**
 * this component to get the product infomormach such as. Stock ,actions, dates...
 */
function ItemInfo() {
  const url = "http://localhost:8000/stock/"; //db.resourc
  const params = useParams(); // get params from the react router dom.
  const [info, setInfo] = useState([]);
  const [isLoading, setisLoading] = useState(true) //info sap loading

  useEffect(() => {
    getProduct();
  }, []);
  /**
   * getProduct()=> Get the product given the unique product id and add it to the info list. 
   */
  async function getProduct() {
    let response = await fetch(
      "http://localhost:8000/stock?productnumber=" + params.productnumber
    );
    let data = await response.json();
    console.log(data);
    setInfo(data);

    if(data == 0 ){
      setisLoading(true)
      setInfo([]);
    }else
    setInfo(data);
    setisLoading(false)
    
  }
  /**
   * filter()=> and reduce()=> Calculate the product stock based on the in/out actions, then we get the stock amount.
   */

  let filterIn = info.filter(stock => stock.action === "In" )
  console.log('filter-In' , filterIn);

  let filterOut = info.filter(stock => stock.action === "Out" )
  console.log('filter-Out' , filterOut);

  const stockIn = filterIn.reduce((total, currentElement) => {
    return JSON.parse(total) + JSON.parse(currentElement.quantity);
  }, 0);

  const stockOut = filterOut.reduce((total, currentElement) => {
    return JSON.parse(total) + JSON.parse(currentElement.quantity);
  }, 0);

  const stockTotal = stockIn - stockOut;
  /**
  * map()=> map all info to html table element
  */
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
      <td>{item.quantity}</td>
      <td>{item.action}</td>
      <td>{item.actionDate}</td>
     
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
            deleteProduct(item.id);
          }}
        />
      </td>
    </tr>
  ));
   /**
   * deleteProduct(id)=> Get the product given the unique id and delete with icon click.
   */
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
            <th>PRODUCT QUANTITY</th>
            <th>ACTION</th>
            <th>ACTION DATE</th>
            <th colSpan="3">OPTIONS</th>
          </tr>
        </thead>
        <tbody>{outPutData}</tbody>
      </table>
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
    </div>
  );
}

export default ItemInfo;
