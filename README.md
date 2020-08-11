使用点来进行操作对象
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