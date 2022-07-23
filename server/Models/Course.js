const mongoose = require("mongoose");
//const moment=require("react-moment")
const courseschema = new mongoose.Schema({
  name: { type: String, required: true },
  favourites: [
    {
      cover: { type: String, required: true },
      title: { type: String, required: true },
      author: { type: String, required: true },
      genre: { type: String, required: true },
      year: { type: Number, required: true },
    },
  ],
});

const courseemodel = mongoose.model("course", courseschema);

module.exports = courseemodel;
