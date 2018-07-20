function log(req, res, next) {
  console.log("starting 1st middleware function...");
  console.log("Logging...");
  next(); //if next() not called webapi will hang...
}

module.exports = log;
