import React from "react";
//import { Redirect } from "react-router-dom";
import Markdown from "react-markdown";
import { Link } from "react-router-dom";

import { pageVariants, pageTransition } from "../index";
import { motion } from "framer-motion";

import "../App.css"

export default function Book(props) {
  const [books, setBooks] = React.useState([]);
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
    //return <Redirect to="/404" />
  }

  return (
    <motion.div className="App"
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
    >
      <div className="header-container">
        <h1 className="header"><Link className="home-link" to={"/"}>Ano Books</Link></h1>
        <h3 className="subheader">Create and Edit Books</h3>
      </div>
      <hr/>

        <motion.div className="book-container"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >
            <div className="book-title">
                <h1>{fetchedBook.title ? fetchedBook.title : "Loading..."}</h1>
                </div>
                <div className="book-description">
                    <p>{fetchedBook.description ? fetchedBook.description : "Loading..."}</p>
                </div>
                <div className="book-content-container">
                    <Markdown className="book-content" children={fetchedBook.content ? fetchedBook.content : "Loading..."} />
                </div>
        </motion.div>
    </motion.div>
  );
}
