const exp = require("express");

const userapp = exp.Router();
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
userapp.use(exp.json());
const User = require("../Models/User");
const Mentor = require("../Models/Mentor");
const Favourite = require("../Models/Favourite");
const Comment = require("../Models/Comment");
const Course = require("../Models/Course");
const errorhandling = require("express-async-handler");
const verifytoken = require("./middleware/verifyToken");

// post userdata
userapp.post(
  "/createuser",
  errorhandling(async (req, res) => {
    // grt user from client and convert to js object
    let userobjfromclient = req.body;
    //search by user name
    let usercheck = await User.findOne({
      email: userobjfromclient.email,
    }).exec();

    if (usercheck != null) {
      res.send({ message: "already user exists in this email" });
    } else {
      let newuser = new User({ ...userobjfromclient });
      if (newuser.password == "") {
        res.send({ message: "password should not empty" });
      } else {
        let hashedpassword = await bcryptjs.hash(newuser.password, 5);
        // newuser.password = hashedpassword;
        let user = await newuser.save();
        res.status(201).send({ message: "user created", payload: user });
      }
    }
  })
);

// post mentordata
userapp.post(
  "/creatementor",
  errorhandling(async (req, res) => {
    // grt user from client and convert to js object
    let userobjfromclient = req.body;
    //search by user name
    let usercheck = await Mentor.findOne({
      email: userobjfromclient.email,
    }).exec();

    if (usercheck != null) {
      res.send({ message: "already mentor exists in this email" });
    } else {
      let newuser = new Mentor({ ...userobjfromclient });
      if (newuser.password == "") {
        res.send({ message: "password should not empty" });
      } else {
        let hashedpassword = await bcryptjs.hash(newuser.password, 5);
        // newuser.password = hashedpassword;
        let user = await newuser.save();
        res.status(201).send({ message: "mentor created", payload: user });
      }
    }
  })
);

// login by userdata
userapp.post(
  "/login",
  errorhandling(async (req, res) => {
    let usercredobj = req.body;
    var userfromdb = await User.findOne({ email: usercredobj.email }).exec();
    if (userfromdb == null) {
      userfromdb = await Mentor.findOne({
        email: usercredobj.email,
      }).exec();
      console.log(userfromdb);
      if (userfromdb == null) {
        res.send({ message: "Invalid user" });
      } else {
        // let status = await bcryptjs.compare(
        //   usercredobj.password,
        //   userfromdb.password
        // );
        let status = await (usercredobj.password == userfromdb.password
          ? true
          : false);

        if (status == false) {
          res.send({ message: "invalid password" });
        } else {
          let signedtoken = jwt.sign(
            { name: userfromdb.name },
            process.env.SECURITY_KEY,
            { expiresIn: 300 }
          );
          res.status(200).send({
            message: "login successfully",
            token: signedtoken,
            user: userfromdb,
          });
        }
      }
      // res.send({ message: "Invalid user1" });
    } else {
      // let status = await bcryptjs.compare(
      //   usercredobj.password,
      //   userfromdb.password
      // );
      let status = await (usercredobj.password == userfromdb.password
        ? true
        : false);

      if (status == false) {
        res.send({ message: "invalid password" });
      } else {
        let signedtoken = jwt.sign(
          { name: userfromdb.name },
          process.env.SECURITY_KEY,
          { expiresIn: 300 }
        );
        res.status(200).send({
          message: "login successfully",
          token: signedtoken,
          user: userfromdb,
        });
      }
    }
  })
);

// private routes
userapp.post(
  "/favourite",
  errorhandling(async (req, res) => {
    let itemobjfromclient = req.body;
    console.log(itemobjfromclient);

    let usercheck = await Favourite.findOne({
      name: itemobjfromclient.name,
    }).exec();

    if (usercheck == null) {
      let newcart = new Favourite({ ...itemobjfromclient });
      let favourites = await newcart.save();
      res
        .status(201)
        .send({ message: "book added to favourite", payload: favourites });
    } else {
      usercheck.favourites.push(itemobjfromclient.favourites[0]);
      let favourites = await usercheck.save();
      res.status(201).send({
        message: "book added to favourite exists",
        payload: favourites,
      });
    }
  })
);

//edit task
userapp.put(
  "/save-editedprofile",
  verifytoken,
  errorhandling(async (req, res) => {
    let editedobj = req.body;
    let email = editedobj.email;
    delete editedobj.username;
    //get user task obj
    var userprofileobj = await User.findOne({ email: email });
    if (userprofileobj == null) {
      userprofileobj = await Mentor.findOne({ email: email });
    }
    userprofileobj.name = editedobj.name;
    userprofileobj.phoneno = editedobj.phoneno;
    userprofileobj.location = editedobj.location;

    let profile = await userprofileobj.save();
    res.status(200).send({ message: "profile edited", payload: profile });
  })
);

userapp.get(
  "/viewprofile/:email",
  verifytoken,
  errorhandling(async (req, res) => {
    //console.log(req.params.username)
    emailfromclient = req.params.email;
    //if user is not find it return null
    var userfoundfromdb = await User.findOne({ email: emailfromclient }).exec();

    //send response
    if (userfoundfromdb == null) {
      userfoundfromdb = await Mentor.findOne({ email: emailfromclient }).exec();
      if (userfoundfromdb == null) {
        res.send({ message: "no user data found" });
      } else {
        res.status(200).send({ message: "userdata", payload: userfoundfromdb });
      }
      // res.send({ message: "no user data found" });
    } else {
      res.status(200).send({ message: "userdata", payload: userfoundfromdb });
    }
    //  res.send({message:"all task"})
  })
);

//get cart dishes
userapp.get(
  "/favourite/:name",
  errorhandling(async (req, res) => {
    let name = req.params.name;
    let datafromdb = await Favourite.findOne({ name: name }).exec();

    res.send({ message: "favourite books", payload: datafromdb });
  })
);

userapp.get(
  "/getcomments/:title",
  errorhandling(async (req, res) => {
    let title = req.params.title;

    //get all food

    let favouriteFromDB = await Comment.findOne({ title: title });

    //if food store is empty

    if (favouriteFromDB == null) {
      res.send({ message: "Currently No comments Available", payload: [] });
    }

    //if food is available
    else {
      //send res

      res.status(200).send({
        message: "Available Comments",
        payload: favouriteFromDB.comment,
      });
    }
  })
);

userapp.post(
  "/addcomments",
  errorhandling(async (req, res) => {
    //get favObj sent from client

    let ObjFromClient = req.body;

    //create userfavObj doc type

    let userFavouriteDoc = new Comment({ ...ObjFromClient });

    //find user fav Obj is already available or not

    let userFavouriteFromDB = await Comment.findOne({
      title: ObjFromClient.title,
    });

    //if no user fav obj available, save userfavDoc in DB

    if (userFavouriteFromDB == null) {
      let userfavourite = await userFavouriteDoc.save();

      res.status(201).send({ message: "Comment added Successfully" });
    }

    //if user fav obj available, update user fav Obj with new fav in DB
    else {
      //adding new cart to existing user cart obj

      userFavouriteFromDB.comment.push(ObjFromClient.comment[0]);

      //updating the updated user cart obj

      await userFavouriteFromDB.save();

      //send res

      res
        .status(200)
        .send({ message: "Added to Existing comment Successfully" });
    }
  })
);

userapp.get("/admin", (req, res) => {
  User.find((err, doc) => {
    if (err) console.log(err);
    res.json(doc);
    // res.send("Admin connected ...");
  });
});

userapp.put("/:_id", (req, res) => {
  User.findOneAndUpdate(
    {
      _id: req.params._id,
    },
    {
      name: req.body.name,
      email: req.body.email,
      password: req.params.password,
      phoneno: req.body.phoneno,
      location: req.body.loation,
    },
    {
      new: true,
    },
    (err, doc) => {
      if (err) console.log(err);
      res.json(doc);
    }
  );
  // User.findOneAndUpdate(
  //   {
  //     _id: req.params._id,
  //   },
  //   req.body,
  //   {
  //     new: true,
  //   },
  //   (err, doc) => {
  //     if (err) console.log(err);
  //     res.json(doc);
  //   }
  // );
});

userapp.delete("/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id, (err, doc) => {
    if (err) console.log(err);
    res.json(doc);
  });
});
//error handling middleware(syntax error)
userapp.use((err, req, res, next) => {
  res.send({ message: err.message });
});

userapp.get("/courses", (req, res) => {
  Course.find((err, doc) => {
    if ((err, doc)) console.log(err);
    res.json(doc);
    // res.send(doc);
  });
});
module.exports = userapp;
