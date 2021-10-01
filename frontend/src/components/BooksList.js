import cover from "../cover.jpg";
import React from "react";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";

import { Link } from "react-router-dom";

export default function BooksList() {
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
  };

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


  return (
    <div className="books-container">
      {
        /* async mapping of books in database */
        books.map((book) => {
          return (
            <div className="book" key={book.book_id}>
              <Menu
                menuButton={<MenuButton className="book-menu">...</MenuButton>}
                transition
              >
                <MenuItem>
                  <Link
                    className="open-button"
                    to={`/book/${book.book_id}`}
                  >
                    Open
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link className="edit-link" to={`/book/${book.book_id}/edit`}>
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
              {/* <p>{book.description}</p>
              <p>
                Content: <p>{book.content}</p>
              </p> */}
            </div>
          );
        })
      }
    </div>
  );
}
