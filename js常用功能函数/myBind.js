Function.prototype.myBind = function(context) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);
    console.log(args);
    return function() {
        self.call(context, ...args);  //利用闭包维持对函数本身的
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
