import "./App.css";
import React from "react";
import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import cover from "./cover.jpg";

import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

import CreateBook from "./components/CreateBook";

function App() {
  let [collapse, setCollapse] = React.useState(true);

  // bookList logic
  const [books, setBooks] = React.useState([]);

  const deleteBook = async (id) => {
    console.log("called");
    try {
      await fetch(`/books/${id}`, {
        method: "DELETE",
      });
      setBooks(books.filter((book) => book.book_id !== id));
    } catch (error) {
      console.log(error.message);
    }
  }

  const getBooks = async () => {
    try {
      const response = await fetch("/books/");
      const books = await response.json();
      setBooks(books);
    } catch (error) {
      console.log(error.message);
    }
  };

  React.useEffect(() => {
    getBooks();
  }, []); // [] ~ = only once

  // searchbar logic
  let [search, setSearch] = React.useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/books/search/${search}`);
      const books = await res.json();
      setBooks(books);
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="App">
      <div className="header-container">
        <h1 className="header">
          <Link to={"/"} className="home-link">
            Ano Books
          </Link>
        </h1>
        <h3 className="subheader">Create and Edit Books</h3>
      </div>

      <div className="searchbar-container">
        <form onSubmit={handleSearch}>
        <input className="searchbar" type="search" placeholder="Search.." value={search} onChange={(e) => setSearch(e.target.value)} />
        </form>
      </div>
      <div className="control">
        <div className="control-container">
          <button onClick={() => setCollapse(!collapse)}>Create Book</button>

          <button>Filter Books (soon tm)</button>
        </div>

        <div className={collapse ? "hidden" : "create-form-container"}>
          <CreateBook />
        </div>
        <hr />
      </div>

      <div className="create-form"></div>

      <div className="books-container">
        {
          books.length === 0 ? <h1>No books found</h1> : books.map((book) => {
            return (
              <div className="book" key={book.book_id}>
                <Menu
                  menuButton={
                    <MenuButton className="book-menu">...</MenuButton>
                  }
                  transition
                >
                  <MenuItem>
                    <Link className="open-button" to={`/book/${book.book_id}`}>
                      Open
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      className="edit-link"
                      to={`/book/${book.book_id}/edit`}
                    >
                      Edit
                    </Link>
                  </MenuItem>
                  <MenuItem
                    onClick={() => deleteBook(book.book_id)}
                    className="delete-button"
                  >
                    Delete
                  </MenuItem>
                </Menu>

                <div className="book-cover-container">
                  <Link to={`/book/${book.book_id}`}>
                    <img
                      className="book-cover"
                      alt="loading cover.."
                      src={cover}
                    />
                  </Link>
                </div>
                <Link className="book-title link" to={`/book/${book.book_id}`}>
                  <p className="book-title">{book.cover}</p>
                </Link>
              </div>
            );
          })
        }
      </div>

      <div className="footer">
        <p>
          <small>
            <a href="mailto:riesyeti@outlook.de">report abuse</a> - this website
            does not store any of your personal data except the content you post
          </small>
        </p>
      </div>
    </div>
  );
}

export default App;
