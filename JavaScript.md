## eval() ??
把括号里的字符串当做js代码来执行，但是有缺点。
+ 耗性能，先解析成js语句，再执行

# JS变量类型
## 原始值
1. string
2. number
3. symbol
4. null
5. boolean
6. undefined
## 引用值
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
+ typeof(a) --> undefined(字符串类型) 唯一一个不定义变量不会出错的情况
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
```
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
```
## Boolean 转换
除了以下数据，其余转换皆为 true
+ false 
+ 0 
+ null
+ -0
+ ''
+ undefined
+ NaN

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

## {}等于true/false
var a = {};
a == true; -->false
a == false; -->false
+ a.toString() --> '[object Object]' --> NaN

## 区别对象(Object)和数组(Array)
1. constructor 属性返回对创建此对象的函数的引用
+ obj.constructor === Array
+ obj.constructor === Object
2. instanceof
+ obj instanceof Array
+ obj instanceof Object
3. 最好的方法
`Object.prototype.toString.call(obj) == '[object Array]'`

## hasOwnProperty()
+ 用来检测一个对象是否含有特定的自身属性
+ 和 in 运算符不同，该方法会忽略掉那些从原型链上继承到的属性
+ 返回值为 true/false
+ in 只能判断能不能访问这个属性，而不能判断是否是自己身上的属性

## 深度克隆
1. 先把要克隆的数据遍历一遍，区分是原始值还是引用值。for(var prop in obj) 数组、对象都可以用。
2. 判断是原始值还是引用值。 typeof() == obj 即为引用值，原始值就直接拷贝。
3. 引用值，判断是[]/{}。用toString()方法，随后简历空的 []/{}.
4. 依次看看原始对象是什么，判断是[]/{}
5. 递归

```
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
```

## obj.toString() 和 Object.prototype.toString.call(obj) 结果为什么不一样？
这是因为 toString 为 Object 的原型方法，而 Array, function 等类型作为Object的实例，都重写了 toString 方法。不同的对象类型调用 toString 方法时，根据原型链的知识，调用的是对应的重写之后的 toString 方法（function类型返回内容为函数体的字符串，Array类型返回元素组成的字符串.....），而不会去调用Object上原型toString方法（返回对象的具体类型），所以采用obj.toString()不能得到其对象类型，只能将obj转换为字符串类型；因此，在想要得到对象的具体类型时，应该调用Object上原型toString方法。

# this
## this 指向？
1. 函数预编译过程中，this --> window
2. 全局作用域里，this --> window
3. call/apply/bind 可以改变 this 的指向
4. 作为某对象的方法调用，this通常指向调用的对象
5. 在构造函数中，this指向新创建的对象
6. 箭头函数没有单独的this值，this在箭头函数创建时确定，它与声明所在的上下文相同
7. 箭头函数的 this 一旦被绑定，就不会再被任何方式所改变

#函数
##函数声明
1. function 函数名(){} 函数名要小驼峰式命名规则
2. 命名函数表达式 var test = function abc(){...}
3. 匿名函数表达式（函数表达式）最常用 var demo = function(){...}

## 组成形式
1. 形参相当于在函数体里面 var 一个变量
2. 形参个数可以不等于实参个数
3. 实参会放到一个argument[]数组里面，argument数组可以求 length，可以遍历元素
4. 也可以通过函数名求length
5. 实参个数 = 形参个数时候，更改 argument 里的值或更改实参，形参都会发生改变。但二者不是同一个东西，一个变另一个跟着变。
6. 形参个数 > 实参个数时候，实参列表出生几个就是几个，后面给形参赋值也不会往实参里面加，不映射。

## JS执行三步
1. 语法分析 通篇扫描是否有语法错误
2. 预编译 发生在函数执行的前一刻
3. 解释执行 一行行执行

## 函数体里面的预编译（发生在函数执行的前一刻）
1. 创建AO(Activation Object执行期上下文)对象
2. 找形参和变量声明，将变量和形参作为AO属性名值为undefined
3. 将实参和形参相统一
4. 在函数体里面找函数声明(function xx(){..})，放到AO里面，其值为其本身的函数体

## 全局变量
1. imply global 暗示全局变量，即任何变量如果未经声明就赋值，此变量就为全局对象所有 window
2. 一切声明的全局变量，全是window的属性 var a = 123; <==> window.a = 123;

## 闭包
+ 当内部的函数一旦被保存到了外部就会生成闭包，闭包会导致原有的作用域链不释放，造成内存的泄露。
+ 内部函数在外面执行的时候仍然可以调用在以前环境的额变量
```
function a(){
  var num = 100;
  function b(){
    num ++;
    console.log(num);
  }
  return b;
}
var demo = a();
demo(); // 101
demo(); // 102
```
解决办法：立即执行函数

## 闭包的作用
1. 实现公有变量（函数累加器）
2. 可以做缓存（存贮结构）
3. 实现封装，属性私有化
4. 模块化开发，防止污染全局变量

## 立即执行函数
+ 主要针对初始化功能的函数
+ 执行完立即释放
+ 被执行符号执行的表达式会自动忽略函数的名字
+ 只有`表达式`才能被执行符号('()')执行。test()
+ 表达方式
    + (function(){}()); 常用
    + (function(){})();
+ 例如：
var test = function(){...}()
+ +/-/*// function test(){...} 合成了表达式

## 闭包函数及其解决办法举例
+ 闭包函数
```
function test(){
  var arr = [];
  for(var i = 0; i < 10 ; i ++){
    arr[i] = function(){
      console.log(i);
    }
  }
  return arr;
}
var myArr = test();
for(var j = 0; j < 10; j++){
  myArr[j]();
}/// 10个10
```
+ 立即执行函数解决
```javascript
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
```
## , 逗号运算符
把逗号后面的运算表达式传出去
eg: var a = (1-1, 1+1)  ==>  a = 2;

## if/() 都会使函数变成表达式然后消失
eg: 
var x = 1;
if(function f(){}){
  x += typeof f;
}
console.log(x);  ==> 1undefined

## 构造函数的内部原理
1. 在函数的最前面隐式加上 this = { __proto__:test.prototype};
2. 执行 this.xxx = xxx;
3. 隐式的返回 this

## 创建对象的方式
1. 对象字面量
+ var obj1 = {};
2. 构造函数创建
+ var obj2 = new Object();
3. var obj3 = Object.create(test);

## 包装类
+ 属性、方法是对象所独有的
+ 给原始值赋属性会调用包装类

## 原型(prototype)
+ 定义：原型是function对象的一个属性，它定义了构造函数制造出的对象的公共祖先。通过该构造函数产生的对象，可以继承该原型的属性和方法。原型也是一个对象。
+ 不可以通过后代对象修改祖先属性，若修改的话也只是往自己身上添加属性
+ JavaScript 的所有对象中都包含了一个 `__proto__` 内部属性，这个属性所对应的就是该对象的原型
+ JavaScript 的函数对象，除了原型 `__proto__` 之外，还预置了 prototype 属性
+ 当函数对象作为构造函数创建实例时，该 prototype 属性值将被作为实例对象的原型 `__proto__`
+ 查看对象的构造函数 `.constructor`
+ 查看对象的原型 `__proto__`

## 原型链
+ object.prototype 是所有原型链的终端
+ 任何一个实例对象通过原型链可以找到它对应的原型对象，原型对象上面的实例和方法都是实例所共享的。
+ 一个对象在查找以一个方法或属性时，他会先在自己的对象上去找，找不到时，他会沿着原型链依次向上查找。
+ 注意： 函数才有prototype，实例对象只有有__proto__， 而函数有的__proto__是因为函数是Function的实例对象
+ object.create(null)没有object.prototype 原型，null undefined 无toString()这个属性

## call/apply 改变 this 指向
1. call(obj, para1, para2)
+ this 指向 obj, para1, para2 为参数
2. apply(obj, [tel, class)
3. 区别
+ call 把实参按照形参个数穿进去
+ apply 传一个 argument 数组，数组里面放的是参数

## call/apply 实例
```
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
  Person.apply(this,[name, age]);  //this指向Person里的this
  School.apply(this,[grade, Class]);
}
var student = new Student('grade1', 'class2', 'an', '20', '123456', 'male');
console.log(student);
```

## 继承
1. 通过原型链形式继承（传统形式） prototype
+ 原理：把子类的prototype（原型对象）直接设置为父类的实例
+ 缺点：会过多继承了没用的属性
2. 构造函数中 Parent.call(this) 的方法继承父类属性。
+ 原理： 将子类的this使用父类的构造函数走一遍
+ 缺点： 
    + Parent原型链上的属性和方法并不会被子类继承
```
function Parent() {
  this.name = 'parent'
}

function Child() {
  Parent.call(this);
  this.type = 'child'
}
```
3. 共享原型
+ 缺点：不能随便改动自己的原型
+ Son.prototype = Father.prototype;

4. 最优继承模式（圣杯模式）

