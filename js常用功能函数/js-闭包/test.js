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
