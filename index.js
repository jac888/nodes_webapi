// function add (a,b)
// {
//     console.log(a+b);
// }
// add(1,2);

// const promise = new Promise(function(resolve, reject) {
//   resolve(2);
// });

// promise.then(function(value) {
//     console.log(value);
//     return value + 1;
//   }).then(function(value) {
//     console.log(value);
//     return value + 2;
//   }).then(function(value) {
//     console.log(value);
//   })

// const p1 = new Promise(function(resolve, reject) {
//   resolve(4);
// });

// p1.then(function(val) {
//   console.log(val); //4
//   return val + 2;
// })
//   .then(function(val) {
//     console.log(val); //6
//     throw new Error("error123!");
//   })
//   .catch(function(err) {
//     //catch無法抓到上個promise的回傳值
//     //console.log('val : ' + val);
//     console.log(err.message);
//     //這裡如果有回傳值，下一個then可以抓得到
//     return 100;
//   })
//   .then(function(val) {
//     console.log(val, "done");
//   }); //val是undefined，回傳值消息

const mongoose = require("mongoose");
//connect mongodb
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("connected to mongodb"))
  .catch(err => console.log(err.message));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tag: [String],
  date: { type: Date, default: Date.now },
  isPublish: Boolean
});

//create Course model
const Course = mongoose.model("Course", courseSchema);

//async function to save mongo db
async function CreateCourse() {
  const course = new Course({
    name: "solidity course",
    author: "gerg",
    tag: ["solidity", "frontend"],
    isPublish: true
  });
  const result = await course.save();
  //console.log(result);
}

CreateCourse();

async function getCourses() {
  const courses = await Course
    //gt greater than
    //eq equal to
    //gte greater than equal to
    //lt lesser than
    //lte lesser than equal to
    //in in
    //nin not in
    //.find({price: {$gte:10, $lte:20 } })
    //.find({price: {$in [10,20,30]} })

    //logical operators
    //and
    //or
    //.find().and([{ author:'jackson' },{ isPublish: true }])
    //.find().or([{ author: 'jackson' },{ isPublish: true }])

    //regular expression
    //start with...
    //.find({author: /^jackson/})
    //end with...
    //.find({author: /jackson$/})
    //contains .*
    //.find({author: /.*jackson.*/i}) //i means InCase-Sensitive;

    .find({ author: "jackson", isPublish: true }) //filter (where?)
    .limit(10) //show how many records
    .sort({ name: -1 }) //sort order acend: 1, descend: -1
    .select({ name: 1, tag: 1 }); //select with multiple columns you want to get

  console.log(courses);
}

//getCourses();

async function updateCourse(id) {
  /* first approach Query first
  const course = await Course.findById(id);
  //course not found
  if (!course) return;

  course.set({
    isPublish: false,
    author: "jake"
  });

  course.save();
  return course;
  */

  //second approach Update first
  //update : will not return updated document
  //   const course = await Course.update(
  //     { _id: id },
  //     {
  //       $set: {
  //         isPublish: true
  //       }
  //     }
  //   );

  //findByIdAndUpdate will return original updated document by default without the 3rd parameter {new: true}
  const course = await Course.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        isPublish: true
      }
    },
    { new: true } //if add 3rd parameter {new: true} will return updated document!
  );
  return course;
}

// updateCourse("5b5c7ddd87ebca20eff7a251")
//   .then(result => console.log(result))
//   .catch(err => console.log("error : " + err.message));

async function removeCourse(id) {
  //return await Course.deleteOne({_id:id});

  //delete 1st one
  //Course.deleteOne({isPublish : false});
  //delete many
  //Course.deleteMany(id);
  const deletedCourse = await Course.findByIdAndRemove(id);
  return deletedCourse;
  //if specify delete id is not in db, it will return null, otherwise return the document b4 deleted.
}

removeCourse("5b5cad1c2dfbbb2825fbb8e9").then(result => console.log(result));
