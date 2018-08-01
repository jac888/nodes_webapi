const { Customer, Validate } = require("../models/customer");
const Express = require("Express");
const router = Express.Router();
const morgan = require("morgan");
const apiDebug = require("debug")("genres");

router.use(Express.urlencoded({ extended: true }));
router.use(Express.json());
router.use(morgan("tiny"));

router.get("/", async (req, res) => {
  const customer = await Customer.find().sort("name");
  res.send(customer);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.find(req.params.id);
  if (!customer)
    return res.status(404).send("the Customer with given id was not found!");
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const { error } = Validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const customergenre = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name
    },
    {
      new: true
    }
  );
  if (!customer)
    return res.status(404).send("the customer with given id was not found!");
  res.send(customer);
});

router.post("/", async (req, res) => {
  const { error } = Validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: false
  });
  await customer.save();
  res.send(customer);
});

router.get("/:year/:month", (req, res) => {
  res.send(req.params);
  apiDebug(req.params.year);
  apiDebug(req.params.month);
});

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer)
    return res.status(404).send("the customer with given id was not found!");
  res.send(customer);
});

module.exports = router;
