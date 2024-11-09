const express = require("express");
const app = express();
const db = require("./db");
const Person = require("./models/person");
const Menu = require('./models/Menu')
const bodyParser = require("body-parser"); //middleware
const personRoutes = require('./routes/personRoutes') //Import Person Router
const menuRoutes = require('./routes/menuRoutes')
//Import Menu Router

app.use(bodyParser.json()); //req.body



//Person Data Operations Router Integration
app.use('/person',personRoutes)

// Menu Data Operations Router Integration
app.use('/menus',menuRoutes)


app.get("/", (req, res) => {
  res.send("Welcome to my Resturants");
});

app.get("/mango", (req, res) => {
  res.send("Welcome to Chapai Nawabganj");
});

app.get("/games", (req, res) => {
  var gameDetails = {
    name: "FC25",
    creator: "EA",
    category: "Sports",
    popularity: "Very Popular",
    downloads: "11 Million+",
    ratings: 4.8 / 5.0,
  };
  res.send(gameDetails);
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
