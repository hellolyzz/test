## 盒子模型
+ 标准盒子模型
  box-sizing: content-box;
  内容区域 content = width + height
+ ie盒子模型（怪异盒子模型）
  box-sizing: border-box;
  内容区域 content = width + height + padding + border

## 单行文本溢出用省略号显示
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
## 多行文本溢出用省略号显示？？

## display:none 和 visibility:hidden 的区别
  相同：都可以让元素不可见
  区别：
  1. display:none;会让元素完全从渲染树中消失，渲染时不会占据任何的空间。visibility:hidden;不会让元素从渲染树消失，渲染时元素依然会占据空间只不过该内容不可见。
  2. 修改常规流中元素的 display 通常会造成文档重排。修改 visibility 属性只会造成本元素的重绘。
  3. display: none;是非继承属性，子孙节点的消失是由于父元素从渲染树中消失造成的，通过修改子孙节点对应属性还是无法显示；visibility: hidden;是继承属性，子孙节点会消失是由于继承了父元素的 hidden，通过设置 visibility: visible;可以让子孙节点显式

## CSS单位
  1. px 绝对单位
  2. em 相对单位 不同的属性有不同的参照值
      1. 对于字体大小属性 font-size 来说，em 的计算方式是相对于父元素的字体大小
      2. 在 border, width, height, padding, margin, line-height 这些属性中，使用 em 单位的计算方式是参照该元素的 font-size，1em 等于该元素设置的字体大小。如果该元素没有设置，则一直向父级元素查找，直到找到，如果都没有设置大小，则使用浏览器默认的字体大小（16px）。
  3. % 父元素宽度的比例
      如果对 html 元素设置 font-size 为某个百分比值，则是以浏览器默认的字体大小 16px 为参照计算的。
  4. rem 是相对于根元素 html 的 font-size 来计算的，所以其参照物是固定的。当我们修改 html 的 font-size 的时候，所有以 rem 为单位的数据都会发生相应的改变。

## 如何水平居中一个元素？
  + 如果需要居中的元素为 inline 或 inline-block ，为父元素设置 text-align: center;即可实现
  + 如果要居中的元素为一个块级元素的话，一般使用 margin: 0 auto; 进行居中。
  

## 如何垂直居中一个元素？
  + 单行文本垂直居中 line-height = height;
  + 图片： vertical-align: middle; 前提是需要设置父级元素为块级元素并且设置高度
  1. position:aboslute; 把元素变成定位元素
     left: 50%; 设置元素的定位位置，距离上、左都为50%
     right: 50%;
     transform:translate(-50%,-50%); 设置元素的相对于自身的偏移度为负50%(也就是元素自身尺寸的一半)
     + 兼容性不好，只支持IE9+的浏览器
  2. position:aboslute; 把元素变成定位元素
     left: 50%; 设置元素的定位位置，距离上、左都为50%
     right: 50%;
     margin-left: -width/2; 设置元素的左外边距、上外边距为宽高的负1/2
     mergin-top: -height/2;
     + 兼容性好，但是必须知道元素的宽高
  3. position: absolute;
     right: 0;
     left: 0;
     bottom :0;
     top: 0;
     margin: auto;
     + 兼容性较好，但是不支持IE7以下的浏览器
  4. 父元素样式属性 display:flex; 子元素使用 margin:auto;

## 用纯CSS代码画一个三角形
  .box{
  width: 0px;
  height: 0px;
  border: 100px solid black;
  border-left-color:red;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-top-color: transparent;
}
也可以把 border-width 、border-style、 border-color 分开写，如下：
 .box{
   height: 0px;
   width: 0px;
   border-width: 100px;
   border-style: solid;
   border-color: black transparent transparent transparent;
 }

## transform(http://www.w3school.com.cn/cssref/pr_transform.asp)
    属性向元素应用 2D 或 3D 转换。该属性允许我们对元素进行旋转、缩放、移动或倾斜。
  + none 定义不进行转换
  + translate(x,y) 定义2D转换
  + scale(x,y) 定义2D缩放转换
  + rotate(angle) 定义2D旋转
  + skew(x-angle,y-angle) 定义沿着 X 和 Y 轴的 2D 倾斜转换。

## CSS 优化、提高性能的方法有哪些？
  1. 多个 css 合并，尽量减少 HTTP 请求
  2. css 雪碧图。即把网页中一些背景图片整合到一张图片文件中，再利用 CSS 的 "background-image" ，"background- repeat" ，"background-position" 的组合进行背景定位访问图标。
  3. 抽象提取公共样式，减少代码量
  4. 属性值为 0 时，不加单位
  5. 选择器优化嵌套，尽量避免层级过深 （用'>'替换' '）
  6. 压缩CSS代码
  7. 避免使用 CSS Expression?????S

## link 和 @import 的区别
link 是 HTML 方式， @import 是 CSS 方式
link 最大限度支持并行下载，@import 过多嵌套导致串行下载，出现 FOUC
link 可以通过 rel="alternate stylesheet" 指定候选样式
浏览器对 link 支持早于@import ，可以使用 @import 对老浏览器隐藏样式
@import 必须在样式规则之前，可以在 css 文件中引用其他文件
总体来说：link 优于@import


## display:inline-block 什么时候会显示间隙？
 + 相邻的 inline-block 元素之间有换行或空格分隔的情况下会产生间距
 + 非 inline-block 水平元素设置为 inline-block 也会有水平间距
 + 可以借助 vertical-align:top; 消除垂直间隙
 + 可以在父级加 font-size：0; 在子元素里设置需要的字体大小，消除垂直间隙
 + 把 li 标签写到同一行可以消除垂直间隙，但代码可读性差
