## eval() ??
把括号里的字符串当做js代码来执行，但是有缺点。
+ 耗性能，先解析成js语句，再执行

## JS变量类型
# 原始值
1. string
2. number
3. symbol
4. null
5. boolean
6. undefined
# 引用值
1. 数组 array
2. 对象 object
3. 函数 function

## JS中使用typeof能得到哪些类型？
1. number
2. string
3. undefined
4. boolean
5. object
6. function
注意：
+ typeof(typeof(a)) --> string  因为typeof(a)的返回值是"undefiend"字符串
+ NaN != NaN != 任何数
+ typeof(a) --> undefined  唯一一个不定义变量不会出错的情况
+ undefined == null; --> true
+ 1 + undefined --> NaN

## instanceof 干嘛用的？
+ 判断一个对象与构造函数是否在一个原型链上，返回值为 true/false
+ A instanceof B 即表示：A 是不是由 B 构造函数构造出来的/看 A 的原型链上有没有 B 的原型
const Person = function() {}
const p1 = new Person()
p1 instanceof Person // true

var str = 'hello world'
str instanceof String // false

var str1 = new String('hello world')
str1 instanceof String // true

## 判断类型函数（封装type方法）
1. 先判断是原始值还是引用值
2. 再区分引用值
3. 用object.prototype.toString.call(target);来判断引用类型
function type(target){
  var ret = typeof(target);
  var template = {
    "[object Array]" : "array",
    "[object Object]" : "object",
    "[object Number]" : "number-object",
    "[object Boolean]" : "boolean-object",
    "[object String]" : "string-object"
  }
if(target === null){ //null
  return "null";
}else if(ret == "object"){ //引用值
  var str = Object.prototype.toString.call(target);
  return template[str];
}else{ //原始值
  return ret;
}
}

## Boolean 转换
除了以下数据，其余转换皆为 true
false 0 null -0 '' undefined NaN

## 一个字符串为什么会有 length 属性？
通过字面量的方式创建：var a = 'string'; 这时 string 是基本类型值；通过构造函数的方式创建：var a = new String('string');这时它是对象类型。
基本类型是没有属性和方法的，但仍然可以使用对象才有的属性方法。因为这时在对基本类型使用属性方法的时候，后台会隐式的创建这个基本类型的对象，之后再销毁这个对象

## 显示类型转换
+ Number() 转化成数字`number()` 
   + true->1,false->0,null->0,undefined->NaN,a->NaN
+ parseInt(demo) 转换成整数（从数字位开始看到非数字位返回之前的数）
   + null/true/false->NaN,123.9->123 
+ parseInt(demo,radix) 转化为10进制的过程 radix范围(2,36)
   + parseInt(3,8)   8进制的3转化为10进制的3
+ parseFloat(string) 转化为浮点数，只保留一位小数
+ string() 转化为字符串
+ boolean() 转化成布尔值
+ .toString(radix)  10进制转为目标(radix)进制
    + undefined/null 不能用这个
+ toFixed(3) 保留三位小数

## 隐式类型转换
+ isNaN()  判断是不是NaN。先`number()`，再和NaN比较，是 true/否 false
+ ++/--/+/-  一元正负 先`number()`  无论转换成功与否都是number类型
+ 加号  + `string()` 当加号两边有一边是字符串的时候就会调用string()
+ +-*/  `number()`
+ && || ! `boolean()`
+ < > <= >= `number()`
+ == !=   结果true/false
+ 不发生类型转换 === !==

## == 操作符
对于 == 来说，如果对比双方的类型不一样的话，就会进行类型转换

判断流程：
1. 首先会判断两者类型是否相同。相同的话就是比大小了
2. 类型不相同的话，那么就会进行类型转换
3. 会先判断是否在对比 null 和 undefined，是的话就会返回 true
4. 判断两者类型是否为 string 和 number，是的话就会将字符串转换为 `number`
5. 判断其中一方是否为 boolean，是的话就会把 boolean 转为 number 再进行判断
6. 判断其中一方是否为 object 且另一方为 string、number 或者 symbol，是的话就会把 object 转为原始类型再进行判断
7. 两边都是对象的话，那么只要不是同一对象的不同引用，都为false
+ 注意，只要出现NaN，就一定是false，因为就连NaN自己都不等于NaN 对于NaN，判断的方法是使用全局函数 isNaN()