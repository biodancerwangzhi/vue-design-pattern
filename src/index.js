import {Dep, Watcher} from './watcher.js'

export default function myVue(options = {}) {  // 防止没传，设一个默认值
    this.$options = options; // 配置挂载
    //this.$el = document.querySelector(options.el); // 获取dom
    this._data = options.data(); // 数据挂载
    this._deps = {}; // dep(watcher池)
    this._observer(this._data); // 传入数据，执行函数，重写数据的get set
    this._watchers = options.watch;
    this._initWatcher(this._watchers);
};

myVue.prototype._observer = function(obj){
    for(let key in obj){    
        let value = obj[key]
        this._deps[key] = new Dep() 
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,            
            get: ()=>{return value},
            set: newVal=>{
                if(value !== newVal){
                    value = newVal
                    this._deps[key].notify() //触发通知函数
                    console.log(key, 'change to', newVal)
                }
            }
        })
    }
}

myVue.prototype.$watch = function(key, watcher){
    this._deps[key].addWatcher(watcher)
}

myVue.prototype._initWatcher = function(watchers){
    for(let key in watchers){
        this.$watch(key, new Watcher(this, key, watchers[key]))
    }
}
