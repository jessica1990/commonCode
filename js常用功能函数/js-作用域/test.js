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
	解释如下述代码：
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
