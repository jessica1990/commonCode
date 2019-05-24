function myPromise(constructor) {
    let self = this;
    self.status = "pending";
    self.value = undefined;
    self.reason = undefined;

    function resolve(value) {
        if(self.status === "pending") {
            self.value = value;
            self.status = "resolved";
        }
    }
    function reject(reason) {
        if(self.status === "pending") {
            self.reason = reason;
            self.status = "rejected";
        }
    }
    try {
        constructor(resolve, reject);
    } catch(e) {
        reject(e);
    }
}
myPromise.prototype.then = function(success, error){
    let self = this;
    switch(self.status) {
        case "resolved": 
            success(self.value);
            break;
        case "rejected":
            error(self.reason);
            break;
        default:
            console.log(self.status);
    }
}