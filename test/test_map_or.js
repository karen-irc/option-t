/*
 * @license MIT License
 *
 * Copyright (c) 2015 Tetsuharu OHZEKI <saneyuki.snyk@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

var assert = require('power-assert');
var Some = require('../src/index').Some;
var None = require('../src/index').None;

describe('Option<T>.mapOr()', function(){
    describe('self is `None`', function () {
        var EXPECTED = 1;
        var result = 0;
        var isNotCalled = true;

        before(function(){
            assert.ok(result !== EXPECTED);

            var none = new None();
            result = none.mapOr(function(){
                isNotCalled = false;
            }, EXPECTED);
        });

        it('the returned value shoule be expected', function() {
            assert.strictEqual(result, EXPECTED);
        });

        it('the passed function should not be called', function() {
            assert.strictEqual(isNotCalled, true);
        });
    });

    describe('self is `Some<T>`', function () {
        var EXPECTED = 1;
        var DEFAULT = 2;
        var result = 0;

        before(function(){
            assert.ok(result !== EXPECTED);
            assert.ok(result !== DEFAULT);

            var some = new Some("bar");
            result = some.mapOr(function(val){
                assert.notStrictEqual(val, EXPECTED);
                return EXPECTED;
            }, DEFAULT);
        });

        it('the returned value shoule be `Some<T>`: 1', function() {
            assert.strictEqual(result, EXPECTED);
        });
    });
});
