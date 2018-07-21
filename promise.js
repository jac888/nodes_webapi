var Cust;
getCustomer(1)
  .then(customer => {
    Cust = customer;
    console.log(
      `Did find customer with id : ${Cust.id}, and is he a gold vip ? : ${
        Cust.isGold
      }`
    );
    if (!Cust.isGold) throw Error("customer not gold member!");
    return getTopMovies();
  })
  .then(movies => {
    if (movies.length <= 0) reject();
    console.log(movies);
    return sendEmail(Cust.email);
  })
  .then(result => {
    console.log(result);
    if (result) console.log("email sent to " + Cust.email);
  })
  .catch(err => console.log(err.message));

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("getting customer from database....");
      resolve({
        id: 1,
        name: "jack",
        email: "tekken1234@hotmail.com",
        isGold: false
      });
    }, 2000);
  });
}

function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("getting top movies from database for vip....");
      resolve(["movie1", "movie2"]);
    }, 2000);
  });
}

function sendEmail(emailAddress) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("sending emails to vip....");
      resolve(true);
    }, 2000);
  });
}
