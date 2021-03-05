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

const EXPECTED_OK = Symbol('expected_ok');
const EXPECTED_ERR = Symbol('expected_err');

test('Ok<T>', (t) => {
    let ok;
    t.notThrows(() => {
        ok = createOk(EXPECTED_OK);
        ok.drop();
    }, 'is callable');

    t.true(Object.isFrozen(ok), 'should be freezed');
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    t.is(ok.unwrap(), null, 'should be freed');
});

test('Err<E>', (t) => {
    let err;
    t.notThrows(() => {
        err = createErr(EXPECTED_ERR);
        err.drop();
    }, 'is callable');

    t.true(Object.isFrozen(err), 'should be freezed');
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    t.is(err.unwrapErr(), null, 'should be freed');
});
