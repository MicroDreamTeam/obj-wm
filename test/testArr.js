var chai = require('chai');
var expect = chai.expect;
var Obj =require('../index')

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

    test("# 一维数组存取",function () {
        Obj.set(testObj,"a",true)
        Obj.set(testObj,"b",123)
        Obj.set(testObj,"c","123")
        expect(testObj.a).to.be.true;
        expect(testObj.b).to.equal(123)
        expect(Obj.get(testObj,"c")).to.equal('123')
    })

    test("# 多维数组存取",function () {
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