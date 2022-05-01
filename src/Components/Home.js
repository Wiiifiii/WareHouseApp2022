import { Link } from "react-router-dom";
import { Navbar, Container, Card, Button, Badge } from "react-bootstrap";

import {
  MdAddCircleOutline,
  MdOutlineScreenSearchDesktop,
} from "react-icons/md";
import { FcStatistics } from "react-icons/fc";

function Home() {
  return (
    <div class="container px-4">
      <div class="row gx-5">
        <div class="col">
          <Card border="info" style={{ width: "20rem", background: "#011627" }}>
            <Link to={`/AddItem/`}>
              <Card.Body>
                <MdAddCircleOutline
                  style={{ color: "#45bbfb", paddingRight: 7 }}
                  size={100}
                />
                <Card.Text>
                  <h5>
                    {" "}
                    <Badge pill bg="secondary">
                      Add new item
                    </Badge>
                  </h5>
                  <Badge pill bg="secondary">
                    <h6></h6>
                  </Badge>
                </Card.Text>
              </Card.Body>
            </Link>
          </Card>
        </div>

        <div class="col">
          <Card border="info" style={{ width: "20rem", background: "#011627" }}>
            <Link to={`/Search/`}>
              <Card.Body>
                <MdOutlineScreenSearchDesktop
                  style={{ color: "#ffca28", paddingRight: 7 }}
                  size={100}
                />
                <Card.Text>
                  <h5>
                    {" "}
                    <Badge pill bg="secondary">
                      Search 
                    </Badge>
                  </h5>
                  <Badge pill bg="secondary">
                    <h6></h6>
                  </Badge>
                </Card.Text>
              </Card.Body>
            </Link>
          </Card>
        </div>
      </div>
      <Card border="info" style={{ width: "20rem", background: "#011627" }}>
      <Link to={`/Inventory/`}>
        <Card.Body>
          <FcStatistics
            style={{ color: "#ffca28", paddingRight: 7 }}
            size={100}
          />
          <Card.Text>
            <h5>
              {" "}
              <Badge pill bg="secondary">
                Inventory
              </Badge>
            </h5>
            <Badge pill bg="secondary">
              <h6></h6>
            </Badge>
          </Card.Text>
        </Card.Body>
        </Link>
      </Card>
    </div>
  );
}

export default Home;
