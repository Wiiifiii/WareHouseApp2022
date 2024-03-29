import React, { Component } from "react";
import { VscTrash, VscEdit, VscInfo } from "react-icons/vsc";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

const url = "http://localhost:8000/stock/"; //db.resource
/**
 * this component you can edit or update information about a product, Check the WareHouse situation, 
 */
class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      isLoading: true,
      IsError: false,
    };
  }
  componentDidMount() {
    this.getAllItems();
  }
  /**
   * getAllItems()=> GET all data from to the server.
   */
  async getAllItems() {
    this.setState({ isLoading: true });
    const result = await fetch(url);
    if (result.ok) {
      const products = await result.json();
      this.setState({ products, isLoading: false });
    } else {
      this.setState({ IsError: true, isLoading: false });
    }
  }
  /**
   * deleteProduct(id)=> Get the product given the unique id and delete with icon click.
   */
  async deleteItem(id) {
    await fetch(url + `${id}`, {
      method: "DELETE",
    });

    this.getAllItems();
    alert("The item has been successfully deleted");
  }
  /**
  * map()=> map all products to html table element
  */
  itemsTable = () => {
    return this.state.products.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.id} </td>
          <td>
            <img src={item.img} alt=" "/>
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
              <VscInfo  style={{ color: "#d6d6d6" }} />
            </Link>
          </td>
          <td>
            <Link
              to={`/EditItem/${item.id}`}>
              <VscEdit style={{ color: "#d6d6d6" }} />
            </Link>
          </td>
          <td>
            <VscTrash
              style={{ color: "#d6d6d6" }}
              onClick={() => {
                this.deleteItem(item.id);
              }}
            />
          </td>
        </tr>
      );
    });
  };
  render() {
    const { products, isLoading } = this.state;
    if (isLoading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <ReactLoading type="spin" color="#ff650bF" />
        </div>
      );
    }
    return products.length > 0 ? (
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
                <th>PRODUCT QUANTITY</th>
                <th>ACTION</th>
                <th>ACTION DATE</th>
                <th colSpan="3">OPTIONS</th>
              </tr>
            </thead>
            <tbody>{this.itemsTable()}</tbody>
          </table>
        </div>
      </div>
    ) : (
      <div></div>
    );

  }
}

export default Inventory;
