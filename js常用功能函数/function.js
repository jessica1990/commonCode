/* 千分位 */
function format(value) {
	let valueArr = value.toString().split('.');
	if (valueArr.length > 1) {
		return (valueArr[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), '$1,') + '.' + valueArr[1]);
	}
	return value.toString().replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), '$1,');
}

/*
  add(1)(2)(3) = 6;
  add(1, 2, 3)(4) = 10;
  add(1)(2)(3)(4)(5) = 15;
*/
function add() {
	let args = Array.prototype.slice.call(arguments)
	console.log('----1----', arguments)

	let addr = function() { //此处不可用箭头函数，箭头函数没有arguments 和 this
		console.log('----2----', arguments)
		args.push(...arguments)
		console.log('----2-1----', args)
		return addr
	}
	addr.toString = () => {
		console.log('----3----', args)
		return args.reduce((a, b) => {
			return a + b
		})
	}
	return addr
}

/*
  函数的柯里化
*/
function currying(fn) {
	console.log(arguments)
	let args = Array.prototype.slice.call(arguments, 1) //将arguments变成真正的array
	return function() {
		console.log(args, arguments)
		var newArgs = args.concat(Array.prototype.slice.call(arguments)) //参数合并
		// 把合并后的参数通过apply作为fn的参数并执行
		return fn.apply(null, newArgs)
	}
}
/**
 * 节流 Throttle （第一个触发的执行）
 */
function throttle(fn, delay = 0) {
	let timer = null;
	return function() {
		let context = this;
		if (!timer) {
			timer = setTimeout(() => {
				timer = null;
			}, delay)
			return fn.apply(context, arguments) // 加return是因为fn可能会有返回值
		}
	}
}

/**
 * 防抖 Debounce （最后一个触发的执行）
 */
function debounce(fn, delay = 0) {
	let timer = null;
	return function() {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			return fn.apply(this, arguments)
		}, delay)
	}
}

//数字转换成千位分割字符串
const numToStr = (value) => {
	if (!value) return '';
	let valueArr = value.toString().split('.');
	if (valueArr.length > 1) { //有小数点
		return (
			valueArr[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), '$1,') +
			'.' +
			valueArr[1]
		);
	}
	return value.toString().replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), '$1,');
}

function deepClone(obj) {
	let copy;

	// Handle the 3 simple types, and null or undefined
	if (null == obj || "object" != typeof obj) return obj;

	// Handle Date
	if (obj instanceof Date) {
		copy = new Date();
		copy.setTime(obj.getTime());
		return copy;
	}

	// Handle Array
	if (obj instanceof Array) {
		copy = [];
		for (let i = 0, len = obj.length; i < len; i++) {
			copy[i] = deepClone(obj[i]);
		}
		return copy;
	}

	// Handle Object
	if (obj instanceof Object) {
		copy = {};
		for (let attr in obj) {
			if (obj.hasOwnProperty(attr)) copy[attr] = deepClone(obj[attr]);
		}
		return copy;
	}

	throw new Error("Unable to copy obj! Its type isn't supported.");
}