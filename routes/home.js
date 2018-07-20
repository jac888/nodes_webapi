const Express = require("Express");
const homeDebug = require("debug")("homepage");
const Home = Express.Router();

Home.get("/", (req, res) => {
  // res.send("hello world from express");
  //return html template from pug path and pug file
  res.render("idx", {
    title: "My Home Title",
    message: "Hello from responds HomePage!"
  });
  homeDebug("title : My Site HomePage");
  homeDebug("Hello from HomePage!");
});

module.exports = Home;
