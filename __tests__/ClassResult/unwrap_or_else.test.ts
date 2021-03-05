/*
 * MIT License
 *
 * Copyright (c) 2016 Tetsuharu OHZEKI <saneyuki.snyk@gmail.com>
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
import test from 'ava';

import { createOk, createErr } from '../../__dist/cjs/Result';

test('Ok<T>', function (t) {
    t.plan(2);

    const EXPECTED = Symbol('EXPECTED');
    const NOT_EXPECTED = Symbol('NOT_EXPECTED');

    let acutual = null;
    const op = function () {
        t.fail('the `op` callback should not be called');
        return NOT_EXPECTED;
    };

    t.not(acutual, EXPECTED);

    const result = createOk(EXPECTED);
    // @ts-expect-error ts-migrate(2345) FIXME: Type 'symbol' is not assignable to type 'unique sy... Remove this comment to see the full error message
    acutual = result.unwrapOrElse(op);

    t.is(acutual, EXPECTED, 'the returned is expected');
});

test('Err<E>', function (t) {
    t.plan(5);

    const ORIGINAL = Symbol('ORIGINAL');
    const EXPECTED = Symbol('EXPECTED');

    let argument = null;
    let acutual = null;
    const op = function (v: any) {
        argument = v;
        t.pass();
        return EXPECTED;
    };

    t.not(argument, ORIGINAL);
    t.not(acutual, EXPECTED);

    const result = createErr(ORIGINAL);
    acutual = result.unwrapOrElse(op);

    t.is(argument, ORIGINAL, 'the argument of `op` is expeced');
    t.is(acutual, EXPECTED, 'the returned is expected');
});
