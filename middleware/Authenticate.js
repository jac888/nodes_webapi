function Authenticate(req, res, next) {
  console.log("starting 2nd middleware function...");
  console.log("Authenticating ...");
  next(); //if next() not called webapi will hang...
}
module.exports = Authenticate;
