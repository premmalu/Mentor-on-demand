const mongoose = require("mongoose");

const mentorschema = new mongoose.Schema(
  {
    name: { type: String, minlength: 4, required: [true, "name is required"] },
    email: { type: String, required: [true, "email is required"] },
    phoneno: { type: Number, required: [true, "phone no is required"] },
    location: { type: String, required: [true, "location is required"] },
    qualifications: { type: String, required: [true, "location is required"] },
    experience: { type: String, required: [true, "location is required"] },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: 4,
    },
  },
  { collection: "mentorscollection" }
);

const mentormodel = mongoose.model("mentor", mentorschema);

module.exports = mentormodel;
