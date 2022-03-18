const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();

//Constants
const port = process.env.port || 3000

//Weather API Files
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//Path of directory to serve static pages from
const publicPath = path.join(__dirname, "../public/");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(publicPath));
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Aniket Aayush",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Aniket Aayush",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Aniket Aayush",
    message: "Please contact Mr.X for help.",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address must be provided.",
    });
  }
  let address = req.query.address;
  geocode(address, (err, geoCodeRes) => {
    if (err) return res.send({ error: err });
    forecast(geoCodeRes.longitude, geoCodeRes.latitude, (err, forecastRes) => {
      if (err) return res.send({ error: err });
      res.send({
        location: geoCodeRes.location,
        forecast: forecastRes,
        address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: 404,
    errorMsg: "Help article not found.",
    name: "Aniket Aayush",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: 404,
    errorMsg: "Page not found.",
    name: "Aniket Aayush",
  });
});

app.listen(port, () => {
  console.log("Server started successfully at port 3000");
});
