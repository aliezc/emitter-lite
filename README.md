# emitter-lite

简单的事件触发器，兼容node和浏览器

## API

### Class: EventEmitter

#### Node.js

```javascript
var EE = require('emitter-lite');

var em = new EE();
```

#### 浏览器

```javascript
var em = new EventEmitter();
```

### em.on

添加事件监听器，支持链式调用

* 事件名称
* 监听器函数

```javascript
em.on('done', function(n){
	console.log(n + 1);
}).on('done', function(n){
	console.log(n - 1);
});
```

### em.once

添加一次性监听器，该监听器只触发一次，可以和on链式调用

* 事件名称
* 监听器函数

```javascript
em.on('done', function(n){
	console.log(n + 1);
}).once('done', function(n){
	console.log(n - 1);
});
```

### em.emit

触发事件

* 事件名称
* ...参数...

```javascript
em.emit('done', 10);
```

### em.rmListener

删除监听器

* 事件名称
* 监听器函数

```javascript
em.rmListener('done', func);
```

### em.clearListener

清空监听器

* 事件名称

```javascript
em.clearListener('done');
```

### em.setMaxListeners

设置事件最大监听器数量，默认10

* 数字，最大监听器数量

```javascript
em.setMaxListeners(20);
```

## Demo

```javascript
'use strict';

var ee = require('emitter-lite');

var a = new ee();

a.on('sb', function(){
	console.log('1');
}).on('sb', function(){
	console.log('2');
}).once('sb', function(){
	console.log('3');
}).on('bye', function(){
	console.log('4');
});

a.emit('sb');
a.emit('sb');

```
