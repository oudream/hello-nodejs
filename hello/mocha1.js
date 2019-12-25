/**
 * Created by oudream on 2016/12/13.
 */

let expect = require('chai').expect;

let test1 = function() {
    'use strict';

    let assert = require('assert');

    describe('Array', function() {
        describe('#indexOf()', function() {
            it('should return -1 when the value is not present', function() {
                assert.equal(-1, [1, 2, 3].indexOf(4));
            });
        });
    });
};

// test1();

let test2 = function() {
    'use strict';

    let fs = require('fs');

    describe('File', function() {
        describe('#readFile()', function() {
            it('should read test.ls without error', function(done) {
                fs.readFile('f:\\test.ls', function(err) {
                    if (err) throw err;
                    done();
                    console.log('finish!!!');
                });
            });

            it('should read test.js without error', function(done) {
                fs.readFile('f:\\test.js', function(err) {
                    if (err) throw err;
                    done();
                    console.log('finish!!!');
                });
            });
        });
    });
};

// test2();

let test3 = function() {
    'use strict';
    describe('obj property test', function() {
        describe('simple obj property have', function() {
            // simple referencing
            let obj = {foo: 'bar'};

            it('property foo have', function() {
                expect(obj).to.have.property('foo');
            });

            it('property foo have and value', function() {
                expect(obj).to.have.property('foo', 'bar');
            });
        });

        describe('deep obj property have', function() {
            // deep referencing
            let deepObj = {
                green: {tea: 'matcha'},
                teas: ['chai', 'matcha', {tea: 'konacha'}],
            };

            it('property green.tea have value', function() {
                expect(deepObj).to.have.deep.property('green.tea', 'matcha');
            });

            it('property teas[1] have value', function() {
                expect(deepObj).to.have.deep.property('teas[1]', 'matcha');
            });

            it('property teas[2].tea have value', function() {
                expect(deepObj).to.have.deep.property('teas[2].tea', 'konacha');
            });
        });

        describe('array test', function() {
            // array item have
            let foo = [];
            foo.push('bar');
            foo.push('baz');
            // var foo = new Map();
            // foo.set('bar', "");
            // foo.set('baz', "");
            // var foo = {};
            // foo['bar'] = "";
            // foo['baz'] = "";
            console.log('array xxxxxxxxxxx: ');
            console.log(foo.toString());
            console.log(JSON.stringify(foo));

            it('Sets the any flag, (opposite of the all flag) later used in the keys assertion', function() {
                let sa1 = ['aa', 'bb', 'cc'];
                let sa2 = sa1.map(function(obj) {
                    return '(' + obj + ')';
                });
                let r1 = new RegExp(sa2.join('||'));
                console.log('r1 value = ' + r1.toString());
                expect('foor').to.match(r1);
                // expect((new Map([[1, 'a'], [5, 'b']])).has(1)).to.be.ok;
                // expect({"a":1}).to.include.keys('a');
                // expect(['a', 1]).to.deep.equal(['a', 1]);
                // expect({"foo":1, "baz":0}).to.have.any.keys('foo');
                // expect([1, 2, 3]).to.include.members([3, 2]);
                // expect(['bar', 'baz'].includes(['bar'])).to.be.ok;
                // console.log(foo.has('bar'));
                // expect(foo).to.include.members(['bar']);
                // expect([1, 2, 3]).to.include.members([3, 2]);
                // expect([1,2,3]).to.include(2);
            });
        });
    });
};

// test3();

let test4 = function() {
    'use strict';

    describe('test4', function() {
        it('item1', function() {
            let foo = {bar: 'baz'};
            expect(foo).to.equal({bar: 'baz'});
           // expect('hello').to.deep.equal('hello');
        });
    });
};

test4();
