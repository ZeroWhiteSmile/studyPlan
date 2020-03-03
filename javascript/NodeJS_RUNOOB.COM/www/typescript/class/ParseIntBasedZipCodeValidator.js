"use strict";
exports.__esModule = true;
var ParseIntbasedZipCodeValidator = /** @class */ (function () {
    function ParseIntbasedZipCodeValidator() {
    }
    ParseIntbasedZipCodeValidator.prototype.isAcceptable = function (s) {
        return s.length === 5 && parseInt(s).toString() === s;
    };
    return ParseIntbasedZipCodeValidator;
}());
exports.ParseIntbasedZipCodeValidator = ParseIntbasedZipCodeValidator;
//导出原先的验证器但做了重命名
var ZipCodeValidator_1 = require("./ZipCodeValidator");
exports.RegExpBasedZipCodeValidator = ZipCodeValidator_1.ZipCodeValidator;
