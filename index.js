!function(){
    'use strict';
    // 加入到下一个回调队列
    var next = function(cb, args){
        if(process){
            process.nextTick(function(){
                cb.apply(this, args);
            });
        }else{
            setTimeout(function(){
                cb.apply(this, args);
            }, 0);
        }
    }
    /*
     * Usage:
     * var ee = new EventEmitter();
     *
     */
    var EventEmitter = function(){
        // 每个事件最大监听器数量
        this._maxListeners = 10;
        // 监听器列表
        this._listeners = {};
        // 一次性监听器列表
        this._once = {};
    }
    /* 添加监听器
     * @param {string} 事件名称
     * @param {function} 监听器函数
     * @returns this 链式调用
     */
    EventEmitter.prototype.on = function(e, l){
        if('string' === typeof e && 'function' === typeof l){
            if(this._listeners[e]){
                if(this._listeners[e].length < this._maxListeners){
                    this._listeners[e].push(l);
                }
            }else{
                this._listeners[e] = [l];
            }
        }
        return this;
    }
    /* 添加一次性监听器，事件触发执行后删除所有监听器
     * @param {string} 事件名称
     * @param {function} 监听器函数
     * @returns this 链式调用
     */
    EventEmitter.prototype.once = function(e, l){
        if('string' === typeof e && 'function' === typeof l){
            if(this._once[e]){
                if(this._once[e].length < this._maxListeners){
                    this._once[e].push(l);
                }
            }else{
                this._once[e] = [l];
            }
        }
        return this;
    }
    /* 触发事件
     * @param {string} 要触发事件名称
     * @params {any} 触发事件传递的参数
     */
    EventEmitter.prototype.emit = function(e){
        if('string' === typeof e){
            if(this._listeners[e]){
                var args = [];
                for(var i = 1; i < arguments.length; i++) args.push(arguments[i]);
                // 执行监听器的方法
                for(var i = 0; i < this._listeners[e].length; i++){
                    next.call(this, this._listeners[e][i], args);
                }
            }
            if(this._once[e]){
                // 执行一次性事件
                for(var i = 0; i < this._once[e].length; i++){
                    next.call(this, this._once[e][i], args);
                }
                delete this._once[e];
            }
        }
    }
    /* 移除监听器，包括一次性的监听器
     * @param {string} 事件名称
     * @param {function} 监听器函数
     * @returns this 链式调用
     */
    EventEmitter.prototype.rmListener = function(e, f){
        var index;
        if(this._listeners[e]){
            index = this._listeners[e].indexOf(f);
            if(index != -1) this._listeners[e].splice(index, 1);
            if(this._listeners[e].length == 0) delete this._listeners[e];
        }
        if(this._once[e]){
            index = this._once[e].indexOf(f);
            if(index != -1) this._once[e].splice(index, 1);
            if(this._once[e].length == 0) delete this._once[e];
        }
        return this;
    }
    /* 设置最大监听器数量
     * @param {number} 最大监听器数量
     */
    EventEmitter.prototype.setMaxListeners = function(n){
        if('number' == typeof n){
            if(n > 0 && n < 100 && (Math.floor(n) == Math.ceil(n))){
                this._maxListeners = n;
            }
        }
    }
    /* 移除事件全部监听器
     * @param {string} 事件名称
     * @returns this
     */
    EventEmitter.prototype.clearListener = function(e){
        if(this._listeners[e]){
            delete this._listeners[e];
        }
        if(this._once[e]){
            delete this._listeners[e];
        }
        return this;
    }
    // 导出方法
    if(typeof window != 'undefined'){
        window.EventEmitter = EventEmitter;
    }else{
        module.exports = EventEmitter;
    }
}();
