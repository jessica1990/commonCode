/*
	示例一
	变量 + 函数声明
*/
var a = 12;
function a () {
	return 'a';
}
console.log(typeof a);

var a = function() {
	return 'a'
};
console.log(typeof a);

/*
	答案：number, function
	解释：函数的优先权是最高的，它永远被提升至作用域最顶部，然后才是函数表达式和变量按顺序执行
	代码等价于下述：
*/
function a () {
	return 'a';
}
var a;
a = 12;
console.log(typeof a);
a = function() {
	return 'a'
};
console.log(typeof a);

/*--------------------------------------------------------------------------------------------*/



function Foo() {  
    getName = function () {  
        alert(1);  
    };  
    return this;  
}  
Foo.getName = function () {  
    alert(2);  
};  
Foo.prototype.getName = function () {  
    alert(3);  
};  
var getName = function () {  
    alert(4);  
};  
function getName() {  
    alert(5);  
}  

Foo.getName();  
getName();  
Foo().getName();  
getName();  
new Foo.getName();  
new Foo().getName();  
new new Foo().getName();