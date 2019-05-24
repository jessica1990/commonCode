class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    getXY() {
        return {
            x: this.x,
            y: this.y
        }
    }
}
var p1 = new Point(1,2);
p1.getXY();

class Point3D extends Point {
    constructor(x, y, z) {
        super(x, y); // super作为函数调用时，代表父类的构造函数
        this.z = z;
    }
    getXYZ() {
        return {
            x: this.x,
            y: this.y,
            z: this.z
        }
    }
    getXY2() {
        console.log('from child class');
        return super.getXY(); // super作为对象使用时，指向父类的原型
    }
}

var p2 = new Point3D(1, 2, 3);
p2.getXY();
p2.getXYZ();
p2.getXY2();