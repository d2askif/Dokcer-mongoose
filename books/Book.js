const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  author: {
    type: String,
    require: true
  },
  pageNumber: {
    type: String,
    required: false
  },

  publisher: {
    type: String,
    required: false
  }
});

bookSchema.methods.spitName = function(name) {
  console.log(name);
};

mongoose.model("Book", bookSchema);
