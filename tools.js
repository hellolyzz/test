

//获取样式getStyle
function getStyle(obj,name){//obj需要获取的样式的元素，name获取的样式名
    if(window.getComputedStyle){
        return getComputedStyle(obj,null)[name];
    }else{
        return obj.currentStyle[name];
    }
}


//给dom对象添加一个该事件类型的处理函数
function addEvent(elem,type,handle){//handle()是函数
    if(elem.addEventListener){
        elem.addEventListener(type,handle,false);
    }else if(elem.attachEvent){//因为this指向window所以call改变this指向
        elem.attachEvent('on' + type,function(){
            handle.call(elem);
        })
    }else{
        elem['on' + type] = handle;
    }
}


//取消冒泡函数
function stopBubble(event){
    if(event.stopPropagation){
        event.stopPropagation();
    }else{
        event.cancelBubble = true;
    }
}


//阻止默认事件的函数
function cancelHandler(event){
    if(event.preventDefault){
        event.preventDefault();
    }else{
        event.returnValue = false;
    }
}


//获取事件源对象的兼容性写法
function gain(e){
    var event = e || window.event;
    var target = event.target || event.srcElement;
    console.log(e);
}

//拖拽函数
function drag(obj){
    var disX,
        disY;//div的偏移量 = 鼠标.clientX - 元素的.offsetLeft（使鼠标与方块重合）
    obj.onmousedown = function (e) {
        // if(div.setCapture){
        //     div.setCapture();//包揽其他事件到自身上
        // }
        obj.setCapture && obj.setCapture();//同上意思一样
        var event = e || window.event;
        disX = event.clientX - obj.offsetLeft;
        disY = event.clientY - obj.offsetTop;

        document.onmousemove = function (e) {
            var event = e || window.event;
            var left = event.clientX;
            var top = event.clientY;
            obj.style.left = left - disX + "px";//移动div与使其鼠标重叠
            obj.style.top = top - disY + "px";
        }
        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
            obj.releaseCapture && obj.releaseCapture();
        }
        return false;//取消默认其去搜索选中的内容
    }
}


//移动函数
function move(obj, target, attr, speed, callback) {
    //obj为要执行动画的对象，targer移动的目标位置，
    //speed移动的速度+右-左,attr要执行动画的样式left/top,想改啥就改啥
    //callback会在动画执行完毕执行
    clearInterval(obj.timer);//关闭上一次产生的定时器,这样就不会运行的越来越快

    //判断speed正负
    //0--800speed为正
    //800--0speed为负

    //获取元素当前位置
    var current = parseInt(getStyle(obj, attr));
    if (current > target) {//当大于800时候向左移动 speed为负数
        speed = -speed;
    }
    // console.log(oldvalue);
    //保存自己的定时器的标识obj.timer
    obj.timer = setInterval(function () {//定时器持续向后移
        var oldvalue = parseInt(getStyle(obj, attr));
        var newvalue = oldvalue + speed;
        //向左移动speed<0时候 newvalue<target
        //向右移动speed>0时候 newvalue>target
        if ((speed < 0 && newvalue < target) || (speed > 0 && newvalue > target)) {
            newvalue = target;
        }
        obj.style[attr] = newvalue + "px";

        if (newvalue == target) {//移动到800px时候停止
            clearInterval(obj.timer);
            callback && callback();//不传函数这个参数时候不会报错。
        }
    }, 50)
}


//类的基本操作
function addClass(obj,cn){//obj要添加属性的元素，cn为classname
    if(! hasClass(obj,cn)){//检查是否有cn
        obj.className += " " + cn;
    }
}
// addClass(div,"demo1");


function hasClass(obj,cn){//判断某元素中含有指定class值
    // var reg = /\bb2\b/;//\b单词边界
    
    var reg = new RegExp("\\b" + cn + "\\b");
    // console.log(reg);
    return  reg.test(obj.className); //返回值为true或false
}
 // hasClass(div,"demo1");


function removeClass(obj,cn){//移除样式
    var reg = new RegExp("\\b" + cn + "\\b");
    obj.className = obj.className.replace(reg,"");
}
// removeClass(div,"demo1");


function toggleClass(obj,cn){//切换一个类，若有该类则删除，若无则添加该类
    if(! hasClass(obj,cn)){
        addClass(obj,cn);
    }else{
        removeClass(obj,cn);
    }
}