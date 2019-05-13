/*-------坑：for执行完了才输出-------*/
(function(){
	for(var i = 1; i < 3; i++) {
		setTimeout(function(){
			console.log(i);
		}, 100);
	}
})();

/*-------坑：setTimeout时间设为0-------*/
(function(){
	for(var i = 1; i < 3; i++) {
		setTimeout(function(){
			console.log(i);
		}, 0);
	}
})();

/*
	解决方式 - 1
	闭包 
*/
(function(){
	for(var i = 1; i < 3; i++) {
		(function(e){
			setTimeout(function(){
				console.log(e);
			}, 0);
		})(i)
	}
})();

/*
	解决方式 - 2
	ES6 let
*/
(function(){
	for(let i = 1; i < 3; i++) {
		setTimeout(function(){
			console.log(i);
		}, 0);
	}
})();

/*
	解决方式 - 3
	setTimeout第三个参数，当参数传给setTimeout中的function
*/
(function(){
	for(var i = 1; i < 3; i++) {
		setTimeout(function(j){
			console.log(j);
		}, 0, i);
	}
})();

/*   请问下面的代码执行结果,并对下面代码做适当改进,将输出从0到99按顺序输出(要求:不能改变主体的随机时延.)  */
function print(n) {
	setTimeout(() => {
	  console.log(n);
	}, Math.ceil(Math.random() * 1000));
}
for (var i = 0; i < 100; i++) {
  print(i);
}

/* 
  上述代码输出乱序的0-99，因为每次调用print函数都是个独立的执行上下文，已经把i带进去了
  如下修改代码来实现0-99按顺序输出
  利用then的链式调用，若前一个then的返回值是非promise（如 return 22），则会用promise包裹一下该值直接resolve，然后执行then中代码，
  若前一个then的返回值是promise，则等该promise resolve后执行then中的代码
*/
function print(n) {
	return new Promise(resolve => {
    setTimeout(() => {
      console.log(n);
      resolve();
    }, Math.ceil(Math.random() * 1000));
  })
} 
var promise = Promise.resolve();
for (let i = 0; i < 100; i++) {
  promise = promise.then(() => { //相当于100个then链式调用，每个then里都会返回一个promise包裹的print，因此会依次输出0-99
    return print(i);
  })
}