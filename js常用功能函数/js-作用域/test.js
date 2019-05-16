/*
	函数及变量提升规则：
	函数会首先被提升，然后才是变量，然后运行到相应地方赋值
	class类不存在提升
*/

/*--------------------------------题目1--------------------------------------*/
var a = 1;
function fn(){
	console.log(a); 
	var a = 5;
	console.log(a);  
	a++;
	var a;
	fn3();
	fn2();
	console.log(a);
	function fn2(){
		console.log(a); 
		a = 20;
	}
}
function fn3(){
	console.log(a)
	a = 200;
}
fn();
console.log(a); 


/*
	答案：undefined, 5, 1, 6, 20, 200
*/
var a = 1;
function fn(){
	console.log(a); 
	/* 
		答案：undefined
		解释：① var a 提升至函数作用域顶部，因此函数外部的a此时不会被访问
			 ② 只提升变量声明不提升赋值，因此此时为undefined
	*/

	var a = 5;
	console.log(a);
	/* 
		答案：5
		解释：函数内部的a被赋值为5，此时访问的也是函数内部的变量a
	*/

	a++; //-->函数内部变量a变为6
	var a; //-->这个没赋值，不起啥作用
	fn3();
	fn2();
	console.log(a); // 输出20 --> 经过fn2，函数内部的变量a已被赋值为20
	function fn2(){
		console.log(a); // 输出6 --> 此时访问的是函数内部的变量a，a已经过++变为6
		a = 20; // --> 函数内部的变量a被赋值为20
	}
}
function fn3(){
	console.log(a); // 输出1 --> 函数的作用域在于它在哪里定义，而不在于在哪里执行，因此这里访问的a是函数外部的变量a
	a = 200; //--> 函数外部的变量a被赋值为200
}
fn();
console.log(a); // 输出200 --> 之前经过fn3的调用已经将函数外部的变量a赋值为200


/*--------------------------------题目2--------------------------------------*/
(function() {
	var a = b = 20;
})();
console.log(b); // 20，b是全局变量
console.log(a); // 报错 a is not defined，因为a是局部变量

/*--------------------------------题目3--------------------------------------*/
var a = 1;        
(function a () {   
	// 非匿名自执行函数，函数变量为 只读 状态         
    a = 2; // 立即调用的函数表达式（IIFE）中其函数名冲突的变量指向的是函数本身，并且可能是只读的（猜测）， 所以不能赋值，也因此 最外面的console.log输出的是1        
    console.log(a);  //输出function a的定义
})();
console.log(a); // 1

//与上面对比，只修改了立即执行函数的名称，输出就变成了2，2
var a = 1;        
(function x () {            
    a = 2;            
    console.log(a);  // 2      
})();
console.log(a);  // 2

/*
	造成上面现象的原因如下：
	立即调用的函数表达式（IIFE）有一个自己独立的作用域，如果函数名称与内部变量名称冲突，就会永远执行函数本身，所以前者会输出函数本身
*/


/*--------------------------------题目4--------------------------------------*/
var a = 10;         
function aaa(){             
    console.log(a);//10        
};                    
function bbb(){            
	var a = 20; 
	console.log(a, window.a); // 20, 10           
    aaa();    
}        
bbb();
/*
	解释：虽然在bbb函数中定义了a为20,但是js函数作用域只与函数定义位置有关，与调用位置无关，
	而aaa函数虽然是在函数bbb中调用却是在window定义，因此输出为10
*/


/*--------------------------------题目5--------------------------------------*/
var a = 10;        
function aaa(a){             
    console.log(a); //10            
	var a = 20; //因为 a 是形参，优先级高于 var a; 所以 局部变量a的声明其实被忽略了，类似于var a = 10; var a; console.log(a) => 10
	console.log(a); //20 当a被赋值后就覆盖原值，因此这里是新值20，类似于var a = 10; var a; a = 20; console.log(a) => 20
}         
aaa(a);


/*--------------------------------题目6--------------------------------------*/
console.log(a); //输出函数a的定义，而非undefined，因为函数会首先被提升，然后才是变量，所以函数定义会覆盖之前的变量，又或者是因为变量a是undefined所以被忽略于是输出function ？
function a() {
	console.log(1);
}
var a;

// 稍加修改
var a = 2;
function a() {
	console.log(1);
}
console.log(a); // 2, 函数会首先被提升，然后才是变量，然后运行到相应地方赋值