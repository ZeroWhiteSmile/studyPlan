"use strict";
exports.__esModule = true;
var numberRegexp = /^[0-9]+$/;
function default_1(s) {
    return s.length === 5 && numberRegexp.test(s);
}
exports["default"] = default_1;
