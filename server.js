const http = require("http");
const fs = require("fs");
const app = require("express");
const { url } = require("inspector");
const loadash = require("lodash");

const server = http.createServer((req, res) => {
  //loadash
  const num = loadash.random(0, 20);
  console.log(num);

  const greet = loadash.once(() => {
    console.log("hello");
  });

  greet();
  greet();

  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      break;
    case "/about":
      path += "about.html";
      break;
    default:
      path += "404.html";
      break;
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("Listening for requests in port 3000! ");
});
