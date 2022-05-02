import React from "react";


function Footer() {
  return (
    <div className="footer" >
      <div className="container">
        <div className="row">
          <p className="col-sm">
          Copyright &copy;{new Date().getFullYear()} Wefky Hamed | WareHouse App 2022 |
            Tietotekniikan tutkinto-ohjelma | ET21KM
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;