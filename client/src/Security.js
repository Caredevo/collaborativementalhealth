import DOMPurify from 'dompurify';
import CryptoJS from 'crypto-js';

const clientKey = 'caredevo-client';

export function randomKey() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  

export function encryption(form, randomKey) {
    
    //sanitize form
    Object.keys(form).forEach(key => {
        form[key] = DOMPurify.sanitize(form[key]);
    });
    
    //form encryption with secret key
    var cipherform = CryptoJS.AES.encrypt(JSON.stringify([form]), randomKey).toString();

    return {"data":cipherform, "key":randomKey}
}

export function decryption(data,key) {

    //decryption of cipherdata using key 

    var bytes = CryptoJS.AES.decrypt(data, key);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    var payload = decryptedData[0];

    return payload;
}

export function clientEncryption(data) {
    var payload = CryptoJS.AES.encrypt(JSON.stringify(data), clientKey).toString();
    return payload;
}

export function clientDecryption(data) {
    var bytes = CryptoJS.AES.decrypt(data, clientKey);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
}
