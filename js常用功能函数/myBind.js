Function.prototype.myBind = function(context) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);
    return function() {
        self.call(context, ...args);  //利用闭包维持对函数本身的调用
    }
}

function say() {
    console.log(this.msg);
    console.log(...arguments);
}

let obj = {
    msg: 'hello'
};

let _say = say.myBind(obj, 'my bind', 'sss');
_say();

Function.prototype.myCall = function(context) {
    context.fn = this;
    let args = [...arguments].slice(1);
    let res = context.fn(...args);
    delete context.fn;
    return res;
}

Function.prototype.myApply = function(context) {
    context.fn = this;
    let args = arguments[1];
    let res = context.fn(...args);
    delete context.fn;
    return res;
}