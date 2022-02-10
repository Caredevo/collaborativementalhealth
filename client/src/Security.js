import CryptoJS from 'crypto-js';

const clientKey = 'caredevo-client';

export function clientDecryption(data) {
    var bytes = CryptoJS.AES.decrypt(data, clientKey);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    return decryptedData;
}
