import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { VscGraph } from "react-icons/vsc";
import {
  MdAddCircleOutline,
  MdOutlineScreenSearchDesktop,
} from "react-icons/md";

function Home() {
  return (
    <div  data-testid='div'>
    <div className="container px-4">
      <hr></hr>
      <h1 style={{ color: "#011627" }}>
        Maximize your <b> WareHouse</b> efficiency
      </h1>
      <span style={{ color: "#011627" }}>
        Inventory tracking can help you avoid selling products that have run out
        of stock, or let you know when you need to order or make more of your
        product. You can set up inventory tracking, view your inventory, and
        adjust your inventory levels in the Inventory area of 
        <b> WareHouse</b>. You can also view the history of inventory adjustments
        for products and variants whose inventory is being tracked by
        <b> WareHouse</b>.
      </span>
      <hr></hr>

      <Card className="col" style={{ width: "25rem", background: "#1b1b1b" }}>
        <Card.Body>
          <Link to={`/AddItem/`}>
            <MdAddCircleOutline style={{ color: "#ff650b" }} size={100} />
          </Link>
          <Card.Title style={{ color: "#ff650b" }}>ADD NEW PRODUCT</Card.Title>
          <Card.Text>
            <span style={{ color: "#fbfbfb" }}>
              The <b>WareHouse</b> Add section allows you to Add new products or stock actions either to inbound or outbound operations using <b>WareHouse</b> Add.
            </span>
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="col" style={{ width: "25rem", background: "#1b1b1b" }}>
        <Card.Body>
          <Link to={`/Search/`}>
            <MdOutlineScreenSearchDesktop
              style={{ color: "#ff650b" }}
              size={100}
            />
          </Link>
          <Card.Text>
            <Card.Title style={{ color: "#ff650b" }}>SEARCH</Card.Title>
            <span style={{ color: "#fbfbfb" }}>
              The <b>WareHouse</b> Search section allows you to look up any
              product in the <b>WareHouse</b>. In addition, you can check the status of your stocks and shelves.
            </span>
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="col" style={{ width: "25rem", background: "#1b1b1b" }}>
        <Card.Body>
          <Link to={`/Inventory/`}>
            <VscGraph style={{ color: "#ff650b" }} size={100} />
          </Link>
          <Card.Text>
            <Card.Title style={{ color: "#ff650b" }}>INVENTORY</Card.Title>
            <span style={{ color: "#fbfbfb" }}>
            You can edit or update information about a product , Check the <b>WareHouse</b> situation, such as the number of stocks and the number of available spaces on shelves,
            from the Inventory page in your <b>WareHouse</b> app.
            </span>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
    </div>
  );
}

export default Home;
