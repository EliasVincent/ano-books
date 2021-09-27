import "./App.css";
import cover from "./cover.jpg";
function App() {
  return (
    <div className="App">
      <div className="header-container">
        <h1 className="header">Ano Books</h1>
        <h3 className="subheader">Create and Edit Books</h3>
      </div>

      <div className="searchbar-container">
        <input className="searchbar" type="text" placeholder="Search.." />
      </div>
      <div className="control">
        <div className="control-container">
          <button>Create new Book</button>
          <button>Filter Books (soon tm)</button>
          
        </div>
        <hr />
      </div>

      <div className="create-form"></div>
      
      <div className="books-container">
        {/* async mapping of books in database */}
        <div className="book">
          <div className="book-cover-container"><img className="book-cover" alt="loading cover.." src={cover} /></div>
          <p className="book-title">Warrior Cats</p>

          <button>Edit</button>
          <button>Delete</button>
        </div>

        <div className="book">
          <img className="book-cover" alt="loading cover.." src={cover} />
          <p className="book-title">Warrior Cats</p>
        </div>

        <div className="book">
          <img className="book-cover" alt="loading cover.." src={cover} />
          <p className="book-title">Warrior Cats</p>
        </div>

        <div className="book">
          <img className="book-cover" alt="loading cover.." src={cover} />
          <p className="book-title">Warrior Cats</p>
        </div>

        <div className="book">
          <img className="book-cover" alt="loading cover.." src={cover} />
          <p className="book-title">Warrior Cats</p>
        </div>

        <div className="book">
          <img className="book-cover" alt="loading cover.." src={cover} />
          <p className="book-title">Warrior Cats</p>
        </div>
      </div>

      <div className="footer">
        <p><small>Mautrau forever in our hearts meow</small></p>
      </div>
    </div>
  );
}

export default App;
