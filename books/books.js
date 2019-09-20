const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

var amqp = require("amqplib/callback_api");

const rabitMqConnectionString = process.env.CLOUDAMQP_URL;

require("./Book");
mongoose.connect(
  "mongodb://daniel.shenkutie:ict4rd2012@ds211865.mlab.com:11865/gql-nenja",
  { useNewUrlParser: true },

  err => {
    console.log(err);

    console.log("db connected");
  }
);

const Book = mongoose.model("Book");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("This is book endpoint");
});

app.post("/book", (req, res) => {
  console.log(req.body);
  const newBook = {
    title: req.body.title,
    author: req.body.author
  };

  const book = new Book(newBook);
  book
    .save()
    .then(res => {
      console.log("new book created", res);
    })
    .catch(er => {
      console.log(er);
    });

  res.send("book end point");
});

app.get("/books", (req, res) => {
  Book.find()
    .then(books => {
      if (books) {
        res.json(books);
      } else {
        res.send("no book found");
      }
    })
    .catch(er => {
      throw er;
    });
});

app.get("/book/:id", (req, res) => {
  const id = req.params.id;
  Book.findById(id)
    .then(book => {
      if (book) {
        res.json(book);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(er => {
      if (er) {
        throw er;
      }
    });
});

app.delete("/book/:id", (req, res) => {
  const id = req.params.id;
  Book.findByIdAndRemove(id)
    .then(doc => {
      if (doc) {
        res.json(doc);
      }
    })
    .catch(er => {
      throw er;
    });
});

app.listen(4545, port => {
  console.log("Book service up on port", port);
});
