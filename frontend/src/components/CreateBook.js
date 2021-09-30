import "../App.css";
import React from "react";

export default function CreateBook() {
  let [bookTitle, setBookTitle] = React.useState("");
  let [bookDescription, setBookDescription] = React.useState("");
  let [bookContent, setBookContent] = React.useState("");

  const onSubmit = async (e) => {
    try {
      const cover = bookTitle;
      const description = bookDescription;
      const content = bookContent;

      const body = { cover, description, content };
      const response = await fetch("http://localhost:5000/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.log("lmao my sides ", error.message);
    }
  };
  return (
    <div className="create-container">
      <h2>Create Book</h2>
      <form className="create-form" onSubmit={onSubmit}>
        <input
          required={true}
          className="create-input"
          type="text"
          placeholder="Book Title"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
        />
        <input
          required={true}
          className="create-input"
          type="text"
          placeholder="Description (500 characters)"
          value={bookDescription}
          onChange={(e) => setBookDescription(e.target.value)}
        />
        <textarea
          required={true}
          className="create-content"
          spellCheck="true"
          placeholder="Content - supports Markdown syntax (# title, - list, **fat**, *cursive*)"
          value={bookContent}
          onChange={(e) => setBookContent(e.target.value)}
        />
        <button className="create-button">Publish Book</button>
      </form>
    </div>
  );
}
