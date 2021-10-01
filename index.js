const express = require("express");
const expressApp = express();
const cors = require("cors");
const pool = require("./db");
const PORT = process.env.PORT || 5000; // || original_local_host

// Heroku Deploy
// process.env.PORT
// process.env.NODE_ENV => production or undefined

//cors middleware
expressApp.use(cors())
// get access to request.body
expressApp.use(express.json())


if(process.env.NODE_ENV === "production"){
    //when in this special environment, it will launch a server for the frontend
    expressApp.use(express.static("./frontend/build"));
}


// Routes - you have to specify all the actions that you want to do
// create a book
expressApp.post("/books", async(req, res) => {
    try {
        console.log(req.body)
        const requestObject = req.body;
        // pool will run a SQL Command
        const newBook = await pool.query("INSERT INTO book (description, cover, content) VALUES($1, $2, $3) RETURNING *", [requestObject.description, requestObject.cover, requestObject.content]); // *typescript screaming in the other room*
        
        res.json(newBook.rows[0])
    } catch(err) {console.log(err.message)}
})

// get all books

expressApp.get("/books", async(req, res) => {
    try {
        const allBooks = await pool.query("SELECT * FROM book"); // If this ever has more than two users you're f*cked :)
        res.json(allBooks.rows)
    } catch(err) {console.log(err.message)}
})

// get a book
// :id is a variable
expressApp.get("/books/:id", async(req, res) => {
    try {
        //console.log(req.params) // id: 1
        const idParamss = req.params
        const book = await pool.query("SELECT * FROM book WHERE book_id = $1", [idParamss.id])

        res.json(book.rows[0])
    } catch(err) {console.log(err.message)}
})

// update a book

expressApp.put("/books/:id", async(req, res) => {
    try {
        const putParams = req.params;
        const putBody = req.body;
        const updateBook = await pool.query("UPDATE book SET description = $1, cover = $2, content= $3 WHERE book_id = $4 ", [putBody.description, putBody.cover, putBody.content, putParams.id]) // PUT command has to fill out all the other ones with the existing content!

        res.json("Updated!")
    } catch(err) {console.log(err.message)}
})

// delete a book
expressApp.delete("/books/:id", async(req, res) => {
    try{
        const delParams = req.params;
        const deleteBook = await pool.query("DELETE FROM book WHERE book_id = $1", [delParams.id])

        res.json("Deleted!")
    } catch(err) {console.log(err.message)}
})

//catch all other routes and get thrown to home
expressApp.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

expressApp.listen(PORT, () => {
    console.log("express online on 5000 👂");
})
