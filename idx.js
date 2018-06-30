const Joi = require("joi"); //check webapi parameter schema
const Exp = require("express"); //webapi framework
const helmet = require("helmet");
const morgan = require("morgan"); //logger for http requests showing on terminal
//using middleware within a file
const logger = require("./logger");
//using middleware within a file
const authenticate = require("./Authenticate");
const config = require("config");
const app = Exp();

app.use(Exp.json());
//using urlencoded middleware enabled webapi in the body (x-www-form-urlencoded) with key/value pair
//with extened: true and we can send array or more complex format
app.use(Exp.urlencoded({ extended: true }));
//http server can access static resource in local directory
app.use(Exp.static("Public"));
app.use(helmet());

console.log("Application name : " + config.get("name"));
console.log("Mail Host: " + config.get("mail.host"));
console.log("Mail Username : " + config.get("mail.username"));
console.log("Mail Password : " + config.get("mail.password"));
//only works within development enviroment
if (app.get("env") === "development") {
  console.log(`app: ${app.get("env")}`);
  app.use(morgan("tiny"));
  console.log("morgan is enabled only on development env.");
}
//using middleware within a file
app.use(logger);
app.use(authenticate);

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
  console.log(req.params.year);
  console.log(req.params.month);
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
app.listen(port, () => console.log(`server listen on port ${port}...`));
