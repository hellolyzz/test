var a = {};
console.log(a == true);
console.log(a == false);

//深度克隆
function deepClone(origin, target){
  var target = target || {};
  toStr = Object.prototype.toString;
  arrStr = "[Object Array]";
  for(var prop in origin){
    if(origin.hasOwnProperty(prop)){
      if(origin[prop] !== "null" && typeof(origin[prop]) == 'object'){
        target[prop] = toStr.call(origin[prop] == arrStr ? [] : {});
        deepClone(origin[prop],target[prop]);
      }else{
        target[prop] = origin[prop];
      }
    }
  }
  return target;
}

var obj = [];
var obj1 = {};
if(obj instanceof Array == true){
  console.log(88);
}

console.log(obj1.constructor);


var arr=[1,2,3];
console.log(Array.prototype.hasOwnProperty("toString"));    //true
console.log(arr.toString());

//产生闭包
function foo(){
  var num = 100;
  function b(){
    num ++;
    console.log(num);
  }
  return b;
}
var demo = foo();
demo(); //101
demo(); //102

//闭包作用
// 1  实现公有变量
function add(){
  var c = 0;
  function demo(){
    c ++;
    console.log(c);
  }
  return demo;
}
var counter = add();
counter();
counter();
counter();

// 2  做缓存结构
function test(){
  var num = 100;
  function a(){
    num ++;
    console.log(num);
  }
  function b(){
    num --;
    console.log(num);
  }
  return [a,b];
}
myArr = test();
myArr[0](); // 101
myArr[1](); // 100


// ## 闭包函数及其解决办法举例
// function test(){
//   var arr = [];
//   for(var i = 0; i < 10 ; i ++){
//     arr[i] = function(){
//       console.log(i);
//     }
//   }
//   return arr;
// }
// var myArr = test();
// for(var j = 0; j < 10; j++){
//   myArr[j]();
// }/// 10个10


function test(){
  var arr = [];
  for(var i = 0; i < 10; i++){
    (function(j){
      arr[j] = function(){
        console.log(j);
      }
    }(i))
  }
  return arr;
}
var myArr = test();
for(var j = 0; j < 10; j++){
  myArr[j]();
}/// 0123456789

console.log(typeof(typeof(khncnds)));  //string

var x = 1;
if(function f(){}){
  x += typeof f;
}
console.log(x);


// call/apply 实例
function School(grade, Class){
  this.grade = grade;
  this.Class = Class;
}
function Person(name, age){
  this.name = name;
  this.age = age;
}
function Student(grade, Class, name, age, tel, sex){
  this.tel = tel;
  this.sex = sex;
  // Person.call(this, name, age);
  // School.call(this, grade, Class);
  Person.apply(this,[name, age]);
  School.apply(this,[grade, Class]);
}
var student = new Student('grade1', 'class2', 'an', '20', '123456', 'male');
console.log(student);

// 最好的继承模式
function Father(){
  name: '123'
}
function Son(){
  age: '22'
}

function inherit(Target, Origin){
  function F(){}; // 私有化变量
  F.prototype = Origin.prototype;
  Target.prototype = new F();
  Target.prototype.constructor = Target;
  Target.prototype.uber = Origin.prototype;
}
Father.prototype.lastname = "Lee";
inherit(Son, Father);

var son = new Son();
var father = new Father();

console.log(son);

