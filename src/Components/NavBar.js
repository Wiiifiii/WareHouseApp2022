import React from "react";
import { NavLink } from "react-router-dom";
import { VscHome, VscSearch, VscGraph,VscSquirrel,VscDiffAdded } from "react-icons/vsc";
import { Navbar,Container,Card, Button} from "react-bootstrap";



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
        <VscHome size={30} />
      </NavLink>
      <NavLink style={{ color: "#ff650b" }} to={"/Search"}>
        <VscSearch size={25} />
      </NavLink>
      <NavLink to={"/Inventory"}>
        <VscGraph style={{ color: "#ff650b" }} size={25} />
      </NavLink>
      <NavLink to={`/AddItem/`}>
                <VscDiffAdded
                  style={{ color: "#ff650b"}}
                  size={30}
                />
              </NavLink>
  </Navbar>
  </nav>
 
</div>
  );
};
