import React from "react";
import { NavLink } from "react-router-dom";
import { VscHome, VscSearch, VscGraph,VscSquirrel,VscAdd,VscEdit } from "react-icons/vsc";
import { Navbar,Container,Card, Button} from "react-bootstrap";
import { HiViewGridAdd} from "react-icons/hi";

//Navbar component to navigate between the single pages application.
export const NavBar = () => {
  return (
    <div>
    <nav> 
  <Navbar variant="dark">
      <Navbar.Brand href="/Home">
    <VscSquirrel style={{ color: "#ff650b" , paddingRight: 7}} size={45}/>
      WareHouse App 
      </Navbar.Brand>
      <NavLink style={{ color: "#ff650b" }} to={"/Home"}>
        <Button variant="outline-secondary">
        <VscHome style={{ color: "#ff650b" }} size={30} />
        </Button>
      </NavLink>
      <NavLink style={{ color: "#ff650b" }} to={"/Search"}>
        <Button variant="outline-secondary">
        <VscSearch style={{ color: "#ff650b" }}size={25} />
        </Button>
      </NavLink>
      <NavLink to={"/Inventory"}>
        <Button variant="outline-secondary">
        <VscGraph style={{ color: "#ff650b" }} size={25} />
        </Button>
      </NavLink>
      <NavLink to={"/AddItem"}>
      <Button variant="outline-secondary">
        <VscAdd style={{ color: "#ff650b" }} size={30} />
        </Button>
      </NavLink>
  </Navbar>
  </nav>
</div>
  );
};
