class Event {
    constructor() {
      this.eventCon = {};
    }
    on(type, ele, cb) {
      if(type in this.eventCon) {
        let idx = this.eventCon.type.findIndex(it => it.node === ele);
        if(idx > -1) {
          let cbs = this.eventCon.type[idx].cbs;
          let cIdx = cbs.indexOf(cb);
          if(cIdx == -1) { //回调去重
            this.eventCon.type[idx].cbs.push(cb);
          }
        } else {
          this.eventCon.type.push({
            node: ele,
            cbs: [cb]
          });
        }
      } else {
        this.eventCon.type = [];
        this.eventCon.type.push({
          node: ele,
          cbs: [cb]
        })
      }
      return this;
    }
    off(type, ele) {
      if(type in this.eventCon) {
        let idx = this.eventCon.type.findIndex(it => it.node === ele);
        this.eventCon.type.splice(idx, 1);
      }
      return this;
    }
    trigger(type, ele, data) {
      if(type in this.eventCon) {
        let idx = this.eventCon.type.findIndex(it => it.node === ele);
        let cbs = this.eventCon.type[idx].cbs;
        for(let i = 0, l= cbs.length; i < l; i++) {
          cbs[i](data);
        }
      }
      return this;
    }
  }
  
  
  class Event {
    constructor () {
      // 储存事件的数据结构
      // 为查找迅速， 使用对象（字典）
      this._cache = {}
    }
   
    // 绑定
    on(type, callback) {
      // 为了按类查找方便和节省空间
      // 将同一类型事件放到一个数组中
      // 这里的数组是队列， 遵循先进先出
      // 即新绑定的事件先触发
      let fns = (this._cache[type] = this._cache[type] || [])
      if(fns.indexOf(callback) === -1) {
        fns.push(callback)
      }
      return this
    }
   
    // 触发
    trigger(type, data) {
      let fns = this._cache[type]
      if(Array.isArray(fns)) {
        fns.forEach((fn) => {
          fn(data)
        })
      }
      return this
    }
    
    // 解绑
    off (type, callback) {
      let fns = this._cache[type]
      if(Array.isArray(fns)) {
        if(callback) {
          let index = fns.indexOf(callback)
          if(index !== -1) {
            fns.splice(index, 1)
          }
        } else {
          // 全部清空
          fns.length = 0
        }
      }
      return this
    }
  }