const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("successfully connected to mongo-exercises db"))
  .catch(err => console.log("db connection error : " + err.message));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model("Course", courseSchema);

// async function getCourses() {
// return await Course.find({ isPublished: true, price: {$gte:15} , name: /.*by.*/i })
//     .or([{ tags: "frontend" }, { tags: "backend" }])
//     .sort("-price")
//     .select({ name: 1, author: 1, price: 1 });
// }

async function getCourses() {
  return await Course.find({
    //if syntax below not or!
    // isPublished: true,
    // price: { $gte: 15 },
    // name: /.*by.*/i
    //should be
    isPublished: true
  })
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
    .sort("-price")
    .select({ name: 1, author: 1, price: 1 });
}

getCourses()
  .then(result => console.log(result))
  .catch(err => {
    console.log("fetch data error : " + err.message);
  });

// async function run() {
//   const courses = await getCourses();
//   console.log(courses);
// }

// run();
