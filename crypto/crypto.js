//aes :
// var crypto = require("crypto"),
//   algorithm = "aes-256-ctr",
//   password = "d6F3Efeq";

// function encrypt(text) {
//   var cipher = crypto.createCipher(algorithm, password);
//   var crypted = cipher.update(text, "utf8", "hex");
//   crypted += cipher.final("hex");
//   return crypted;
// }

// function decrypt(text) {
//   var decipher = crypto.createDecipher(algorithm, password);
//   var dec = decipher.update(text, "hex", "utf8");
//   dec += decipher.final("utf8");
//   return dec;
// }

// var hw = encrypt("hello world123");
// // outputs hello world
// console.log(decrypt(hw));

//nodejs 支持的hash算法
// var crypto = require("crypto"); //加载crypto库
// console.log(crypto.getHashes()); //支持的hash算法

///////////////////////////
// Hash算法
///////////////////////////
var crypto = require("crypto"),
  fs = require("fs");

function hashAlgorithm(algorithm) {
  var s1 = new Date();

  var filename = "package.json";
  var txt = fs.ReadStream(filename);

  var shasum = crypto.createHash(algorithm);
  txt.on("data", function(d) {
    shasum.update(d);
  });

  txt.on("end", function() {
    var d = shasum.digest("hex");
    var s2 = new Date();

    console.log(algorithm + "," + (s2 - s1) + "ms," + d);
  });
}

function doHash(hashs) {
  hashs.forEach(name => {
    hashAlgorithm(name);
  });
}

//var algs = crypto.getHashes();
var algs = [
  //   "md5",
  //   "sha",
  //   "sha1",
  "sha256"
  //   "sha512",
  //   "RSA-SHA",
  //   "RSA-SHA1",
  //   "RSA-SHA256",
  //   "RSA-SHA512"
];
doHash(algs);
