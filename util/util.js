require('dotenv').config();
const CryptoJS = require('crypto-js');

function encrypt(token) {
    return CryptoJS.AES.encrypt(token, process.env.PASSPHRASE);
}

function decrypt(token) {
    return CryptoJS.AES.decrypt(token, process.env.PASSPHRASE);
}

function getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

module.exports = { encrypt, decrypt, getRandomString };