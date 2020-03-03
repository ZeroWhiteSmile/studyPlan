"use strict";
//class Student {
//    fullName:string;
//    constructor(public firstName, public middleInital, public lastName){
//        this.fullName = firstName +" "+ middleInital +" "+ lastName;
//    }
//}
//interface Person{
//    firstName:string;
//    lastName:string;
//}
//function greeter(person:Person){
//    return "hello, "+person.firstName + "" + person.lastName;
//}
////let user = "Jane User";
//let user = new Student("Jane", "M.", "User");
//
//document.body.innerHTML = greeter(user);
exports.__esModule = true;
//interface lengthwise{
//    length:number;
//}
//function loggingIdentity<T extends lengthwise>(arg:T):T{ 
//    console.log(arg.length); //now we know it has a .length property,so more error
//    return arg;
//}
//console.log(loggingIdentity(["123",12]));
//function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {  //keyof T 索引类型查询操作符
//  return names.map(n => o[n]);
//}
//
//interface Person {
//    name: string;
//    age: number; 
//}
//let person: Person = {
//    name: 'Jarid',
//    age: 35
//};
//let strings: string[] = pluck(person, ['name']); // ok, string[]
//console.log(strings)
exports.numberRegexp = /^[0-9]+$/;
var ZipCodeValidator = /** @class */ (function () {
    function ZipCodeValidator() {
    }
    ZipCodeValidator.prototype.isAcceptable = function (s) {
        return s.length === 5 && exports.numberRegexp.test(s);
    };
    return ZipCodeValidator;
}());
exports.ZipCodeValidator = ZipCodeValidator;
exports.mainValidator = ZipCodeValidator;
