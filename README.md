## 使用点来进行操作对象

 我的其他packages：
[表单统一验证类](https://www.npmjs.com/package/form-validate-wm)

## 安装
```shell script
npm i obj-wm
```

## 使用
```javascript
import Obj from 'index'
Obj.get()
Object.pGet()
```

```javascript
var Obj  = require('index')
Obj.get()
Object.pGet()
```

```javascript
let user = {
    age: 18,
    sex:  0
}
```
添加属性
```javascript
Object.set(user,"info.name","xieshao")
console.log(user)
```
`{ age: 18, sex: 0, info: { name: 'xieshao' } }`

获取属性
```javascript
Obj.get(user,"age") // 18
Obj.get(user,"info.name") // xieshao
```
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
> 在`.`后面加一个`?`

扩展了Object的方法，可以使用
```javascript
Object.pGet()
Object.pSet()
```
来进行调用，例：
```javascript
user.pSet("info.name","xieshao")
user.pGet("info.name")
```