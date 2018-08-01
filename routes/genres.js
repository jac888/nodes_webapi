const mongoose = require("mongoose");
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

// const genresSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     minlength: 5,
//     maxlength: 20
//   }
// });

const Genre = mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 20
    }
  })
);

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  const genre = await genre.find(req.params.id);
  if (!genre)
    return res.status(404).send("the Genre with given id was not found!");
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const { error } = validateGenres(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name
    },
    {
      new: true
    }
  );
  // const Genre = Genres.find(c => c.id === parseInt(req.body.id));
  if (!genre)
    return res.status(404).send("the Genre with given id was not found!");
  res.send(genre);
});

router.post("/", async (req, res) => {
  const { error } = validateGenres(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let genre = new Genre({ name: req.body.name }); //add name from post request body {name} parameter.
  await genre.save();
  res.send(genre);
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
    id: Joi.number().required()
  });
  return Joi.validate(Genre, schema);
}

router.get("/:year/:month", (req, res) => {
  res.send(req.params);
  apiDebug(req.params.year);
  apiDebug(req.params.month);
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre)
    return res.status(404).send("the Genre with given id was not found!");
  res.send(genre);
});

module.exports = router;
