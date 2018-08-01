const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://localhost:27017/playground1",
    { useNewUrlParser: true }
  )
  .then(() => console.log("logged db!"));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: authorSchema
  })
);

async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });
  const result = await course.save();
  console.log(result);
}

async function listCourse(id) {
  const result = await Course.find().select();
  console.log(result);
}

//createCourse("vuejs course", new Author({ name: "ldh888" }));

async function updateAuthor(courseID) {
  const result = await Course.update(
    {
      _id: courseID
    },

    //embed document update $set
    //  {
    //      $set:
    //      {
    //          "author.name": "albert"
    //      }
    //  }

    //embed document delete $unset
    {
      $unset: {
        author: ""
      }
    }
  );
  console.log(result);
}

updateAuthor("5b6192060136833e38a72da5");
