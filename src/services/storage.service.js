// import { AES } from "crypto-js/aes";
import CryptoJS from "crypto-js";
const baseUrl = process.env.baseUrl;

export const storageService = {
    add,
    remove,
    get,
    checkRole,
    getToken,
    getName
}

function add(itemName, value) {
    const encrypted = encryptAES(value)
    localStorage.setItem(itemName, encrypted);
}

function remove(itemName) {
    localStorage.removeItem(itemName)
}

function get(itemName) {
    const encrypted = localStorage.getItem(itemName);
    const decrypted = decryptAES(encrypted);
    return decrypted;
}

function encryptAES(plaintext) {
    const e = CryptoJS.AES.encrypt(plaintext, 'process.env.SECRET_KEY')
    return e

}

function decryptAES(chipertext) {
    if(chipertext == null || chipertext == undefined || chipertext == "") {
        return
    }
    const d = CryptoJS.AES.decrypt(chipertext, 'process.env.SECRET_KEY').toString(CryptoJS.enc.Utf8)
    if(d == "true") {
        return true;
    }
    if(d == "false") {
        return false;
    }
    return d.toString(CryptoJS.enc.Utf8)

}

function checkRole(role_id) {
    if(role_id === 'cdfd72c4-b80b-4658-b255-af519dde1fb2')
        return 'Administrator'
    else if(role_id === '397d5ca4-c888-4114-b8fe-3ebe4098898d')
        return 'Guru'
    else if(role_id === 'eba37e02-67e2-4729-84f4-1c15e045508e')
        return 'Kepala Sekolah'
    else if(role_id === 'e49fae29-ba2c-4e56-87b5-fd10f147e0f4')
        return 'Kepala Cabang'
    else if(role_id === '3dc0b2b6-e421-4364-9699-8e5227b3837f')
        return 'Kepala Bidang'
    else if(role_id === '407e4e7a-6915-4d72-b3ef-6ae4efa99a64')
        return 'Kepala Dinas'
    else if(role_id === '8dd82579-43ef-4525-89b7-b8f43522f2dc')
        return 'Jabatan Pimpinan Tinggi'
    else if(role_id === 'a3269024-aa32-488b-949f-908e1fdeb047')
        return 'Publik'
}

function getToken() {
    let userString = get('user');
    let user;
    if(userString) {
        user = JSON.parse(userString)
    }
    return 'Bearer ' + user.token;
}

function getName() {
    let userString = get('user');
    let user;
    if(userString) {
        user = JSON.parse(userString)
    }
    return user.name;
}
