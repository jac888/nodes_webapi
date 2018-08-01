const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://localhost:27017/playground",
    { useNewUrlParser: true }
  )
  .then(() => console.log("connected to mongodb successfully"))
  .catch(err => console.log(err.message));

const Author = mongoose.model(
  "Author",
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    bio: {
      type: String,
      required: true
    },
    website: {
      type: String,
      required: true
    }
  })
);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author"
    }
  })
);

async function createAuthor(name, bio, website) {
  const author = new Author({
    name: name,
    bio: bio,
    website: website
  });
  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name: name,
    author: author
  });
  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  const result = await Course.find()
    .populate("author", " -_id website")
    .select("name author");
  console.log(result);
}

//createAuthor("jackson", "my bio", "www.ldh.com");

//createCourse("node course", "5b6181dcfe95d53b9c16167f");

getCourses();
