"use strict";
class ObjHandler{
    constructor() {
        this.dot = Math.random().toString(36).slice(-6);
    }

    /**
     * Parse the data Object, converting dots and asterisks.
     *
     * @param data
     * @param newObj
     * @returns {{}}
     */
    parseData(data = {},newObj = true){
        let newData = {}
        Object.keys(data).forEach(key => {
            let value = data[key];
            if (this.accessible(value)){
                value = this.parseData(value);
            }

            let newKey = key.replace(/\./g,this.dot);
            if (newObj){
                newData[newKey] = value
            }else{
                if (newKey !== key){
                    data[newKey] = value
                    delete data[key]
                }
            }
        })
        if (newObj){
            return newData;
        }else{
            return data
        }

    }

    /**
     * Replace the placeholders used in data keys.
     *
     * @param data
     */
    replacePlaceholders(data = {}){
        let originalData = {}
        Object.keys(data).forEach(key => {
            let value = data[key];
            if (this.accessible(value)){
                value = this.replacePlaceholders(value)
            }

            let newKey = key.replace(new RegExp(this.dot,"g"),".");
            if (newKey !== key){
                originalData[newKey] = value
                delete data[key]
            }
        })
        return originalData;
    }

    /**
     * Determine whether the given value is object accessible.
     *
     * @param value
     * @returns {boolean}
     */
    accessible(value = {}){
        return Object.prototype.toString.call(value) === '[object Object]';
    }

    /**
     * Get an item from an object using "dot" notation.
     *
     * @param value
     * @param key
     * @param defaults
     * @returns {null|*}
     */
    get(value, key,defaults = null){
        key = key.replace(/\.\?/g,this.dot)
        if (!this.accessible(value)){
            return defaults;
        }

        if (key === null || key === ''){
            return value;
        }
        let _value = Object.assign({},value)
        _value = this.parseData(_value);

        if (_value.hasOwnProperty(key)){
            return _value[key];
        }

        let keys = key.split(".");
        if (keys.length === 1){
            return _value.hasOwnProperty(key)?_value[key]:defaults;
        }
        keys.some(item => {
            if (this.accessible(_value) && _value.hasOwnProperty(item)){
                _value = _value[item];
            }else {
                _value = null
                return true
            }
        })

        return _value;
    }

    /**
     * Set an object item to a given value using "dot" notation.
     *
     * If no key is given to the method, the entire object will be replaced.
     * @param obj
     * @param key
     * @param value
     * @returns {*}
     */
    set(obj, key, value){
        if (!this.accessible(obj)){
            throw new Error('It\'s not object')
        }
        key = key.replace(/\.\?/g,this.dot)
        if (key === null || key === ''){
            return value;
        }

        let keys = key.split(".");
        this.parseData(obj,false);

        for (let i = 0; i < keys.length-1;i++){
            // If the key doesn't exist at this depth, we will just create an empty object
            // to hold the next value, allowing us to create the objects to hold final
            // values at the correct depth. Then we'll keep digging into the object.
            if (!obj.hasOwnProperty(keys[i]) || !this.accessible(obj[keys[i]])){
                obj[keys[i]] = {}
            }
            obj = obj[keys[i]]
        }
        obj[keys[keys.length - 1]] = value
        Object.assign(obj,this.replacePlaceholders(obj))
        return obj;
    }
}
const Obj = new ObjHandler();

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
