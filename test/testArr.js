var chai = require('chai');
var expect = chai.expect;
var Obj =require('../dist/index')

describe("# 测试取值",function () {
    let testObj = {
        a:{
            b:{
                c:{
                    d:{
                        e:{
                            f:1,
                            g:2
                        }
                    }
                }
            }
        }
    }
    test("# 取g的值",function () {
        expect(Obj.get(testObj,"a.b.c.d.e.g")).to.equal(2)
    })

    test("# 取f的值",function () {
        expect(Obj.get(testObj,"a.b.c.d.e.f")).to.equal(1)
    })

    test("# 取不存在的值",function (){
        expect(Obj.get(testObj,"s.s.ss.sss")).to.be.null
    })
})

describe('# 测试存值',function () {
    let testObj = {}

    test("# 一层对象存取",function () {
        Obj.set(testObj,"a",true)
        Obj.set(testObj,"b",123)
        Obj.set(testObj,"c","123")
        expect(testObj.a).to.be.true;
        expect(testObj.b).to.equal(123)
        expect(Obj.get(testObj,"c")).to.equal('123')
    })

    test("# 多层对象存取",function () {
        Obj.set(testObj,"a.b.c.d.e",true)
        expect(testObj.a.b.c.d.e).to.be.true
        expect(Obj.get(testObj,"a.b.c.d.e")).to.be.true
    })
})

describe('# 测试存在点的取值', function (){
    let testObj = {
        "a.a" : 1,
        "b.b":{
            "b.c.s" : "1.2.3"
        }
    }

    test("# 取Key为带点的值",function (){
        expect(Obj.get(testObj,"a.?a")).to.equal(1)
        expect(Obj.get(testObj,`b.?b.b.?c.?s`)).to.equal('1.2.3')
    })

    test("# 存key带点的值",function (){
        Obj.set(testObj,"s.?s",true)
        expect(testObj['s.s']).to.be.true
    })
})

describe('# 数组数据的存取',function (){
    let testObj = {}

    test('# 存取数组',function (){
        Obj.set(testObj,"test",[{a:1}])
        expect(Obj.get(testObj,"test")[0].a).to.equal(1)
    })

    test('# 给现有数组添加值',function (){
        let testArray = Obj.get(testObj,'test')
        testArray = testArray.concat([{b:2}])
        Obj.set(testObj,"test",testArray)
        expect(Obj.get(testObj,'test').length).to.equal(2)
    })
})

describe("# add方法测试",function (){
    let testObj = {}
    test('# 空对象添加数据',function(){
        Obj.add(testObj,'test',1)
        expect(testObj.test).to.equal(1)
    })

    test('# 对象存在指定属性添加数据',function(){
        Obj.add(testObj,'test',2)
        expect(testObj.test).to.equal(1)
    })
})
