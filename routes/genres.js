const Express = require("Express");
const router = Express.Router();
const morgan = require("morgan");
const apiDebug = require("debug")("genres");
const Joi = require("joi"); //check webapi parameter schema

//using urlencoded middleware enabled webapi in the body (x-www-form-urlencoded) with key/value pair
//with extened: true and we can send array or more complex format
router.use(Express.urlencoded({ extended: true }));
router.use(Express.json());
router.use(morgan("tiny"));
const Genres = [
  {
    id: 1,
    name: "Action"
  },
  {
    id: 2,
    name: "Horry"
  },
  {
    id: 3,
    name: "Comedy"
  }
];

router.get("/", (req, res) => {
  res.send(Genres);
});

router.get("/:id", (req, res) => {
  const Genre = Genres.find(c => c.id === parseInt(req.params.id));
  if (!Genre)
    return res.status(404).send("the Genre with given id was not found!");
  res.send(Genre);
});

router.put("/", (req, res) => {
  const { error } = validateGenresForPut(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const Genre = Genres.find(c => c.id === parseInt(req.body.id));
  if (!Genre)
    return res.status(404).send("the Genre with given id was not found!");

  Genre.name = req.body.name;
  res.send(Genre);
});

router.post("/", (req, res) => {
  const { error } = validateGenres(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const Genre = {
    id: Genres.length + 1,
    name: req.body.name //add name from post request body {name} parameter.
  };
  Genres.push(Genre);
  res.send(Genre);
});

function validateGenres(Genre) {
  const schema = Joi.object().keys({
    name: Joi.string()
      .min(5)
      .max(50)
      .required()
  });
  return Joi.validate(Genre, schema);
}

function validateGenresForPut(Genre) {
  const schema = Joi.object().keys({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(10),
    id: Joi.number()
      .integer()
      .min(1)
      .max(20)
      .required()
  });
  return Joi.validate(Genre, schema);
}

router.get("/:year/:month", (req, res) => {
  res.send(req.params);
  apiDebug(req.params.year);
  apiDebug(req.params.month);
});

router.delete("/:id", (req, res) => {
  const Genre = Genres.find(c => c.id === parseInt(req.params.id));
  if (!Genre)
    return res.status(404).send("the Genre with given id was not found!");

  const idx = Genres.indexOf(Genre);
  Genres.splice(idx, 1);
  res.send(Genre);
});

module.exports = router;
