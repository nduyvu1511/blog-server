"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertViToEn = exports.validateUrl = exports.validateNoSpace = exports.validatePhoneNumber = exports.validatePassword = exports.validateEmail = void 0;
var constant_1 = require("./constant");
var validateEmail = function (email) { return constant_1.EMAIL_REGEX.test(email); };
exports.validateEmail = validateEmail;
var validatePassword = function (pw) { return constant_1.PASSWORD_REGEX.test(pw); };
exports.validatePassword = validatePassword;
var validatePhoneNumber = function (phone) { return constant_1.PHONE_NUMBER_REGEX.test(phone); };
exports.validatePhoneNumber = validatePhoneNumber;
var validateNoSpace = function (val) { return constant_1.NO_SPACE_REGEX.test(val); };
exports.validateNoSpace = validateNoSpace;
var validateUrl = function (val) { return constant_1.URL_REGEX.test(val); };
exports.validateUrl = validateUrl;
function convertViToEn(str, toUpperCase) {
    if (toUpperCase === void 0) { toUpperCase = false; }
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return toUpperCase ? str.toUpperCase() : str;
}
exports.convertViToEn = convertViToEn;
