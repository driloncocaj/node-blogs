require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const blogRoutes = require("./routes/blogRoutes");
const app = express();
const DBusername = process.env.DB_USERNAME;
const DBpassword = process.env.DB_PASSWORD;
const dbURI = `mongodb+srv://${DBusername}:${DBpassword}@node-blogs.8i8jywj.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//register view engine
app.set("view engine", "ejs");

//Listen for requests

//middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new blog2",
    snippet: "about my new  blog",
    body: "i read",
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/single-blog", (req, res) => {
  Blog.findById("64ae9b57676522e665fb98ce")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/", (req, res) => {
  res.redirect("/blogs");
});
app.get("/about", (req, res) => {
  //res.send("<p>About</p>");
  res.render("about", { title: "About" });
});

app.use("/blogs", blogRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
