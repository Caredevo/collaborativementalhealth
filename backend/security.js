
//Encryption
const CryptoJS = require("crypto-js");

//backend sanitize
const mongoSanitize = require('express-mongo-sanitize');

function decryption(form) {

    var bytes = CryptoJS.AES.decrypt(form.data, form.key);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    var payload = decryptedData[0];

    //data sanitation with mongoSanitize
    mongoSanitize.sanitize(payload, {
        replaceWith: '_'
        });

    return {data:payload, key:form.key};

}

function encryption(data, key) {
              
    //data encryption with key from front-end
    var encryptedData = CryptoJS.AES.encrypt(JSON.stringify([data]), key).toString();

    return (encryptedData);
}

   
module.exports = {decryption, encryption}