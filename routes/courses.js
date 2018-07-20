const Express = require("Express");
const router = Express.Router();
const morgan = require("morgan");
const apiDebug = require("debug")("api");
const Joi = require("joi"); //check webapi parameter schema

router.use(Express.json());
router.use(morgan("tiny"));
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

router.get("/", (req, res) => {
  res.send(Courses);
});

router.get("/:id", (req, res) => {
  const Course = Courses.find(c => c.id === parseInt(req.params.id));
  if (!Course)
    return res.status(404).send("the course with given id was not found!");
  res.send(Course);
});

router.put("/", (req, res) => {
  const { error } = validateCoursesForPut(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const Course = Courses.find(c => c.id === parseInt(req.body.id));
  if (!Course)
    return res.status(404).send("the course with given id was not found!");

  Course.name = req.body.name;
  res.send(Course);
});

router.post("/", (req, res) => {
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

router.get("/:year/:month", (req, res) => {
  res.send(req.params);
  apiDebug(req.params.year);
  apiDebug(req.params.month);
});

router.delete("/:id", (req, res) => {
  const Course = Courses.find(c => c.id === parseInt(req.params.id));
  if (!Course)
    return res.status(404).send("the course with given id was not found!");

  const idx = Courses.indexOf(Course);
  Courses.splice(idx, 1);
  res.send(Course);
});

module.exports = router;
