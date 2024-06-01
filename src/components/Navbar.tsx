//import { SetStateAction, useState } from "react";
//import Contents from "./Contents";
import "./Navbar.css";
//import PricesContent from "./PricesContent";
//import AboutContent from "./AboutContent";
//import BookContent from "./BookContent";

interface Props {
  setContent: Function;
}

function Navbar({ setContent }: Props) {
  //type ContentType = "Prices/Location" | "Book Haircut" | "Log in" | null;

  const handleClick = (content: string) => {
    console.log(content);
    setContent(content);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Esh Cuts
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button
                  className="nav-link"
                  onClick={() => handleClick("PricesContent")}
                >
                  Prices/Location
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  onClick={() => handleClick("BookContent")}
                >
                  Book Haircut
                </button>
              </li>

              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">
                  Log in
                </a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
