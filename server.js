var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

var notes = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));


app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });

  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });

  app.get("/api/notes", function(req, res) {
    return res.json(notes);
  });

  app.get("/api/notes/:id", function(req, res) {
    var chosen = req.params.id;
  
    for (var i = 0; i < notes.length; i++) {
      if (chosen === notes[i].title) {
        return res.json(notes[i]);
      }
    }
  
    return res.json(false);
  });

  app.delete("/api/notes/:id", function(req,res) {
    var chosen = req.params.id;
  
    console.log(chosen);
    newNotes = [];
    wasDeleted = false;
    for (var i = 0; i < notes.length; i++) {
      if (chosen != notes[i].title) {
        newNotes.push(notes[i])
      }else{
        wasDeleted = true;
      }
    }
    notes = newNotes;
    res.json(wasDeleted);
  });

  app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    newNote.id = newNote.title.replace(/\s+/g, "").toLowerCase();
    notes.push(newNote);
    res.json(newNote);
  });

  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

  

  