require('dotenv').config();

//RSA
const crypto = require('crypto');
const CryptoJS = require("crypto-js");
const fs = require('fs');
const privateKey  = fs.readFileSync('./private.key', 'utf8');

//backend sanitize
const mongoSanitize = require('express-mongo-sanitize');

function decryption(form) {

    //RSA decryption with private key to get cipherkey
    const rsaPrivateKey = {
        key: privateKey,
        passphrase: '',
        padding: crypto.constants.RSA_PKCS1_PADDING,
    };

    const decryptedKey = crypto.privateDecrypt(
        rsaPrivateKey,
        Buffer.from(form.key, 'base64'),
    );

    var cipherKey = decryptedKey.toString('utf8');

    //decryption of cipherdata using cipherkey 

    var bytes = CryptoJS.AES.decrypt(form.data, cipherKey);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    var payload = decryptedData[0];

    //data sanitation with mongoSanitize
    mongoSanitize.sanitize(payload, {
        replaceWith: '_'
        });

    return {data:payload, key:cipherKey};

}

function encryption(data, key) {
              
    //data encryption with key from front-end
    var encryptedData = CryptoJS.AES.encrypt(JSON.stringify([data]), key).toString();

    return (encryptedData);
}

   
module.exports = {decryption, encryption}