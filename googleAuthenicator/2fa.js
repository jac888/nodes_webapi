const fs = require("fs");
var ba64 = require("ba64"); //to save base64 image
const speakeasy = require("speakeasy"); //google authenticator npm packages
const QRCode = require("qrcode"); //QRCode npm package

var secret = speakeasy.generateSecret({ length: 20 });
// Save secret.base32 value to your DB for the user
var directory = "./2faDirectory/" + secret.base32;
// Example:  JFBVG4R7ORKHEZCFHZFW26L5F55SSP2Y
// Save authenticator QRcode image
QRCode.toDataURL(secret.otpauth_url, function(err, data_url) {
  ba64.writeImage(directory, data_url, function(err) {
    if (err) throw err;
    console.log("2FA Image saved successfully");
  });
});

var secret = "MZWUKNLEJVCDMPTDFFGDA4JYGJUCKORZ";

var token = speakeasy.totp({
  secret: secret,
  encoding: "base32"
});

console.log(token);
