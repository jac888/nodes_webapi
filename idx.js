const helmet = require("helmet"); //???
const morgan = require("morgan"); //showing logs for webapi http requests on terminal
const mongoose = require("mongoose");
//using middleware within a file example
const logger = require("./middleware/logger");
const authenticate = require("./middleware/Authenticate");

//npm config to seperate every different environment such as development and production settings in config/xxx.json
//sensitive data must store in customer-environment-variables.json and set it via export/set.
const config = require("config");

/* debugger area using environment variables to define different debug and enable / disable each senario */
/* by using all: export DEBUG=* || export DEBUG=env,config || set to none */
/* or start application by DEBUG=* nodemon idx.js */
const envDebug = require("debug")("env");
const configDebug = require("debug")("config");
const codeDebug = require("debug")("code");
const dbDebug = require("debug")("db");
const courses = require("./routes/courses");
const genres = require("./routes/genres");
const customer = require("./routes/customer");
const home = require("./routes/home");
const Express = require("express");
const app = Express();

mongoose
  .connect(
    "mongodb://localhost:27017/vidly",
    { useNewUrlParser: true }
  )
  .then(() => console.log("connected to vidly database"))
  .catch(err => console.log(err.message));
//set html engine to pug for rendering
app.set("view engine", "pug");
//overwrite views path with pug file path
app.set("views", "./views");

//import webapi js and use it:
//app.use("/api/courses", courses);
app.use("/api/genres", genres);
app.use("/api/customer", customer);
//import webapi home.js and render homepage:
app.use("/", home);

//http server can access static resource in local directory
app.use(Express.static("Public"));

//??
app.use(helmet());

//and replace console.log with every debug names
// configDebug("Application name : " + config.get("name"));
// configDebug("Mail Host: " + config.get("mail.host"));

dbDebug("testing db connections....");

//read sensitive data avoid from config json files! Instead of application environment variables.
//(use export sets prefix! : app_password=xxxx)
// configDebug("Mail Username : " + config.get("mail.username"));
// configDebug("Mail Password : " + config.get("mail.password"));

//only works within development enviroment
if (app.get("env") === "development") {
  envDebug(`app: ${app.get("env")}`);
  app.use(morgan("tiny"));
  envDebug("morgan is enabled only on development env.");
}

const port = process.env.Port || 3000;
app.listen(port, () => codeDebug(`server listen on port ${port}...`));
