"use strict";
class Obj{
    static accessible(value = {}){
        return Object.prototype.toString.call(value) === '[object Object]';
    }

    static get(value, key,defaults = null){
        if (!this.accessible(value)){
            return defaults;
        }

        if (key === null || key === ''){
            return value;
        }

        if (value.hasOwnProperty(key)){
            return value[key];
        }

        let keys = key.split(".");
        if (keys.length === 1){
            return value.hasOwnProperty(key)?value[key]:defaults;
        }
        keys.forEach(item => {
            if (this.accessible(value) && value.hasOwnProperty(item)){
                value = value[item];
            }else {
                return value[item];
            }
        })

        return value;
    }

    static set(obj, key, value){
        if (key === null || key === ''){
            return value;
        }

        let keys = key.split(".");

        let _obj = obj;
        for (let i = 0; i < keys.length-1;i++){
            if (!_obj.hasOwnProperty(keys[i]) || !this.accessible(_obj[keys[i]])){
                _obj[keys[i]] = {}
            }
            _obj = _obj[keys[i]]
        }
        _obj[keys[keys.length - 1]] = value

        return obj;
    }
}
Object.defineProperty(Object.prototype,'pGet',{
    writable:false,
    enumerable:false,
    configurable:true,
    value:function (key,defaults = null) {
        return Obj.get(Object(this),key,defaults)
    }
})

Object.defineProperty(Object.prototype,'pSet',{
    writable:false,
    enumerable:false,
    configurable:true,
    value:function (key,value) {
        return Obj.set(Object(this),key,value)
    }
})

module.exports = Obj;