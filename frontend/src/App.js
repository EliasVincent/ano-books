import "./App.css";
import React from "react";
import { Link } from "react-router-dom";

import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

import CreateBook from "./components/CreateBook";
import  BooksList  from "./components/BooksList";

function App() {
  let [collapse, setCollapse] = React.useState(true);
  return (
    <div className="App">
      <div className="header-container">
        <h1 className="header"><Link to={"/"} className="home-link">Ano Books</Link></h1>
        <h3 className="subheader">Create and Edit Books</h3>
      </div>

      <div className="searchbar-container">
        <input className="searchbar" type="text" placeholder="Search.." />
      </div>
      <div className="control">
        <div className="control-container">
          <button onClick={() => setCollapse(!collapse)}>Create Book</button>

          <button>Filter Books (soon tm)</button>
        </div>

        <div className={collapse ? "hidden" : "create-form-container"}>
          <CreateBook  />
        </div>
        <hr />
      </div>

      <div className="create-form"></div>

      <BooksList />

      <div className="footer">
        <p>
          <small>Mautrau forever in our hearts meow</small>
        </p>
      </div>
    </div>
  );
}

export default App;

