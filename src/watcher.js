export function Watcher(vm, exp, cb){ // 现有订阅者，然后在发布时被通知
    this.cb = cb
    this.vm = vm
    this.exp = exp
}

Watcher.prototype.update=function(){ //订阅者被统一调用的接口
    this.cb.call(this.vm)
    //
}


export function Dep(){  // 订阅器
    this.watchers = []
}

Dep.prototype.addWatcher = function(watcher){
    this.watchers.push(watcher)
}

Dep.prototype.notify = function(){  //发布通知，循环数组，依次执行
    this.watchers.forEach(watcher=>watcher.update())
}