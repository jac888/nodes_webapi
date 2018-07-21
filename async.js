console.log("program starting...");

getUser(1, cb => {
  console.log(cb);
  //get repositories..
  getRepositories(cb.username, repos => {
    console.log(repos);
  });
});

console.log("program ends");

function getUser(id, cb) {
  setTimeout(() => {
    console.log("getting user from database...");
    cb({ id: id, name: "jackson" });
  }, 2000);
}

function getRepositories(username, cb) {
  setTimeout(() => {
    console.log("getting repo from github...");
    cb(["repo1", "repo2", "repo3"]);
  }, 2000);
}
