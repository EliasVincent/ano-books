import React from "react";
//import { Redirect } from "react-router-dom";
import Markdown from "react-markdown";

import "../App.css"

export default function Book(props) {
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
  }, []);
  // or book_id
  const validId = parseInt(props.match.params.id);
  if (!validId) {
    return <h1>ERROR valid id not parseInt(props.match.params.id)</h1>;
  }

  // create obj to bring data in
  const fetchedBook = {};
  let bookExists = false;
  // loop over postlist and assign object keys
  books.forEach((book) => {
    if (validId === book.book_id) {
      fetchedBook.title = book.cover ? book.cover : "no title";
      fetchedBook.description = book.description
        ? book.description
        : "no description";
      fetchedBook.content = book.content ? book.content : "no content";

      bookExists = true
    }
  });

  if (bookExists === false) {
    return <h1>ERROR</h1>;
  }

  return (
    <div className="App">
      <div className="header-container">
        <h1 className="header">Ano Books</h1>
        <h3 className="subheader">Create and Edit Books</h3>
      </div>
      <hr/>

        <div className="book-container">
            <div className="book-title">
                <h1>{fetchedBook.title}</h1>
                </div>
                <div className="book-description">
                    <p>{fetchedBook.description}</p>
                </div>
                <div className="book-content">
                    <Markdown children={fetchedBook.content} />
                </div>
        </div>
    </div>
  );
}
