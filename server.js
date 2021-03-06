const express = require("express");
const path = require("path");
const fs = require("fs");

var app = express();
var PORT = process.env.PORT || 3000;

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));



// HTML Routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// API Routes
app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.post("/api/notes", function(req, res) {
    let newNote = req.body;
    newNote.id = Math.floor(Math.random() * 1000);

    let noteArray = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    noteArray.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(noteArray), "utf8");
    res.json(noteArray);
});

app.delete("/api/notes/:id", function(req, res) {
    const { id } = req.params;
    let noteArray = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    console.log(noteArray)
    console.log(id);
    for (let i = 0; i < noteArray.length; i++) {
        if (noteArray[i].id == id) {
            noteArray.splice(i, 1);
            fs.writeFileSync("./db/db.json", JSON.stringify(noteArray), "utf8");
            res.json(noteArray);
            break;
        }
    }
});


// Server listener
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});