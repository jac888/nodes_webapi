const Exp = require("express"); //webapi framework
const Joi = require("joi"); //check webapi parameter schema

const helmet = require("helmet"); //???
const morgan = require("morgan"); //showing logs for webapi http requests on terminal

//using middleware within a file example
const logger = require("./logger");
const authenticate = require("./Authenticate");

//npm config to seperate every different environment such as development and production settings in config/xxx.json
//sensitive data must store in customer-environment-variables.json and set it via export/set.
const config = require("config");

/* debugger area using environment variables to define different debug and enable / disable each senario */
/* by using all: export DEBUG=* || export DEBUG=env,config || set to none */
const envDebug = require("debug")("env");
const configDebug = require("debug")("config");
const codeDebug = require("debug")("code");
const dbDebug = require("debug")("db");
const apiDebug = require("debug")("api");
const app = Exp();

//in express framework functions:
app.use(Exp.json());
//using urlencoded middleware enabled webapi in the body (x-www-form-urlencoded) with key/value pair
//with extened: true and we can send array or more complex format
app.use(Exp.urlencoded({ extended: true }));
//http server can access static resource in local directory
app.use(Exp.static("Public"));

//??
app.use(helmet());

//and replace console.log with every debug names
configDebug("Application name : " + config.get("name"));
configDebug("Mail Host: " + config.get("mail.host"));

dbDebug("testing db connections....");

//read sensitive data avoid from config json files! Instead of application environment variables.
//(use export sets prefix! : app_password=xxxx)
configDebug("Mail Username : " + config.get("mail.username"));
configDebug("Mail Password : " + config.get("mail.password"));

//only works within development enviroment
if (app.get("env") === "development") {
  envDebug(`app: ${app.get("env")}`);
  app.use(morgan("tiny"));
  envDebug("morgan is enabled only on development env.");
}

const Courses = [
  {
    id: 1,
    name: "Course one"
  },
  {
    id: 2,
    name: "Course two"
  },
  {
    id: 3,
    name: "Course three"
  }
];

app.get("/", (req, res) => {
  res.send("hello world from express");
});

app.get("/api/Courses", (req, res) => {
  res.send(Courses);
});

app.get("/api/Course/:id", (req, res) => {
  const Course = Courses.find(c => c.id === parseInt(req.params.id));
  if (!Course)
    return res.status(404).send("the course with given id was not found!");
  res.send(Course);
});

app.put("/api/Course/", (req, res) => {
  const { error } = validateCoursesForPut(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const Course = Courses.find(c => c.id === parseInt(req.body.id));
  if (!Course)
    return res.status(404).send("the course with given id was not found!");

  Course.name = req.body.name;
  res.send(Course);
});

app.post("/api/Course", (req, res) => {
  const { error } = validateCourses(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const Course = {
    id: Courses.length + 1,
    name: req.body.name //add name from post request body {name} parameter.
  };
  Courses.push(Course);
  res.send(Course);
});

function validateCourses(Course) {
  const schema = Joi.object().keys({
    name: Joi.string()
      .min(3)
      .max(50)
      .required()
  });
  return Joi.validate(Course, schema);
}

function validateCoursesForPut(Course) {
  const schema = Joi.object().keys({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(5),
    id: Joi.number()
      .integer()
      .min(1)
      .max(20)
      .required()
  });
  return Joi.validate(Course, schema);
}

app.get("/api/post/:year/:month", (req, res) => {
  res.send(req.params);
  apiDebug(req.params.year);
  apiDebug(req.params.month);
});

app.delete("/api/Course/:id", (req, res) => {
  const Course = Courses.find(c => c.id === parseInt(req.params.id));
  if (!Course)
    return res.status(404).send("the course with given id was not found!");

  const idx = Courses.indexOf(Course);
  Courses.splice(idx, 1);
  res.send(Course);
});

const port = process.env.Port || 3000;
app.listen(port, () => codeDebug(`server listen on port ${port}...`));
