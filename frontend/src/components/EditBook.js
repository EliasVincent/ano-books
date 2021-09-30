import React from "react";
import "../App.css";
import { Redirect } from "react-router";

export default function EditBook(props) {
  let [bookTitle, setBookTitle] = React.useState("");
  let [bookDescription, setBookDescription] = React.useState("");
  let [bookContent, setBookContent] = React.useState("");

  const [books, setBooks] = React.useState([]);
  const [hasBeenEdited, setHasBeenEdited] = React.useState(false);
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

      bookExists = true;
    }
  });

  if (bookExists === false) {
    return <h1>ERROR</h1>;
  }

  const onSubmit = async (e) => {
      e.preventDefault();
    try {
      // oh well..
      if (bookTitle === "") {
        bookTitle = fetchedBook.title;
      }
      if (bookDescription === "") {
        bookDescription = fetchedBook.description;
      }
      if (bookContent === "") {
        bookContent = fetchedBook.content;
      }

      const response = await fetch(`http://localhost:5000/books/${validId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cover: bookTitle,
          description: bookDescription,
          content: bookContent,
        }),
      });

      setHasBeenEdited(true);
    } catch (error) {
      console.log("lmao my sides ", error.message);
    }
    
  };

  return (
    <div className="App">
        <div className={hasBeenEdited ? "successful-edit" : "hidden"}> 
            <p>Book has been edited!</p>
            <p>You can safely return to the homepage neow</p>
         </div>
      <div className="header-container">
        <h1 className="header">Ano Books</h1>
        <h3 className="subheader">Create and Edit Books</h3>
      </div>
      <hr />
      <h1>Edit Book</h1>
      <div className="book-container">
        <form className="create-form" onSubmit={onSubmit}>
          <input
            required={false}
            className="create-input"
            type="text"
            placeholder={fetchedBook.title}
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
          />
          <input
            required={false}
            className="create-input"
            type="text"
            placeholder={fetchedBook.description}
            value={bookDescription}
            onChange={(e) => setBookDescription(e.target.value)}
          />
          <textarea
            required={false}
            className="create-content"
            spellCheck="true"
            placeholder={fetchedBook.content}
            value={bookContent}
            onChange={(e) => setBookContent(e.target.value)}
          />
          <button className="create-button">Edit Book</button>
        </form>
      </div>
    </div>
  );
}
