import React from "react";
import { NavLink } from "react-router-dom";
import { VscHome, VscSearch, VscGraph,VscSquirrel } from "react-icons/vsc";
import { Navbar,Container,Card, Button} from "react-bootstrap";



//Navbar component to navigate between the single pages application.
export const NavBar = () => {
  return (
    <div>
    <nav> 
  <Navbar variant="dark">
      <Navbar.Brand href="/Home">
    <VscSquirrel style={{ color: "#45bbfb" , paddingRight: 7}} size={45}/>
      WareHouse App 
      </Navbar.Brand>
      <NavLink style={{ color: "#45bbfb" }} to={"/Home"}>
        <VscHome size={30} />
      </NavLink>
      <NavLink style={{ color: "#45bbfb" }} to={"/Search"}>
        <VscSearch size={25} />
      </NavLink>
      <NavLink to={"/stock"}>
        <VscGraph style={{ color: "#45bbfb" }} size={25} />
      </NavLink>
  </Navbar>
  </nav>
 
</div>
  );
};
