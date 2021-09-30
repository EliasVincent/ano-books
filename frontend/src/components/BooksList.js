import cover from "../cover.jpg";
import React from "react";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";

export default function BooksList() {
  const [books, setBooks] = React.useState([]);

  const getBooks = async () => {
    try {
      const response = await fetch("http://localhost:5000/books/");
      const books = await response.json();

      setBooks(books);
    } catch (error) {
      console.log(error.message);
    }
  };

  React.useEffect(() => {
    getBooks();
  });

  return (
    <div className="books-container">
      {
        /* async mapping of books in database */
        books.map((book) => {
          return (
            <div className="book">
              <Menu
                menuButton={<MenuButton className="book-menu">...</MenuButton>}
                transition
              >
                <MenuItem>Open</MenuItem>
                <MenuItem>Edit</MenuItem>
                <MenuItem>Delete</MenuItem>
              </Menu>

              <div className="book-cover-container">
                <img className="book-cover" alt="loading cover.." src={cover} />
              </div>
              <p className="book-title">{book.cover}</p>
              <p>{book.description}</p>
              <p>
                Content: <p>{book.content}</p>
              </p>
            </div>
          );
        })
      }
    </div>
  );
}
