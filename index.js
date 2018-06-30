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
