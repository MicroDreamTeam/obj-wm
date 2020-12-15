## 使用点来进行操作对象

我们的其他packages：

[表单统一验证类](https://www.npmjs.com/package/@itwmw/form-validate)

## 安装 Install
```shell script
npm i @itwmw/obj
```

## 使用 Use
```javascript
import Obj from 'index'
Obj.get()
```

```javascript
var Obj  = require('index')
Obj.get()
```

```javascript
let user = {
    age: 18,
    sex:  0
}
```
Set an object item to a given value using "dot" notation.
If no key is given to the method, the entire object will be replaced.

设置属性，如果Key值为空，则替换整个数组
```javascript
Object.set(user,"info.name","xieshao")
console.log(user)
```
`{ age: 18, sex: 0, info: { name: 'xieshao' } }`

Get an item from an object using "dot" notation.

获取属性
```javascript
Obj.get(user,"age") // 18
Obj.get(user,"info.name") // xieshao
```
Add an element to an array using "dot" notation if it doesn't exist.

添加属性，如果指定值不存在，则加入
```javascript
Obj.add(user,"name","itwmw")
```
If the object property contains "."：

取带点的属性，如：
```javascript
let testObj = {
        "a.a" : 1,
        "b.b":{
            "b.c.s" : "1.2.3"
        }
    }
Obj.get(testObj,"a.?a")
```
> Add a `?` after the `.`

> 在`.`后面加一个`?`
