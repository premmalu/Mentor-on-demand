const exp = require("express");
const app = exp();
const userapp = require("./Apis/userapi");

require("dotenv").config();

const mongoose = require("mongoose");
const path = require("path");

// connect express server with react
app.use(exp.static(path.join(__dirname, "./build")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});
const url =
  "mongodb+srv://Admin:Admin123@cluster0.zc3f5ki.mongodb.net/?retryWrites=true&w=majority";
mongoose
  // .connect(process.env.DATABASE_URL)
  .connect(
    url,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      // useFindAndModify: false,
    },
    (err) => {
      if (err) console.log(`Error in DB Connection ${err}`);
      console.log(`MongoDB Connection Suceeded...`);
    }
  );

app.use("/user", userapp);

const port = 5000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
