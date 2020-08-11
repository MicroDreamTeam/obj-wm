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
    test("#取g的值",function () {
        expect(Obj.get(testObj,"a.b.c.d.e.g")).to.equal(2)
    })

    test("#取f的值",function () {
        expect(Obj.get(testObj,"a.b.c.d.e.f")).to.equal(1)
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