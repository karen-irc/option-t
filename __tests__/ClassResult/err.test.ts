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

const EXPECTED_OK = 'expected_ok';
const EXPECTED_ERR = 'expected_err';

test('Ok<T>', function (t) {
    const ok = createOk(EXPECTED_OK);
    t.is(ok.err().isNone, true, 'return `None<E>`');
});

test('Err<E>', function (t) {
    const err = createErr(EXPECTED_ERR);

    t.is(err.err().isSome, true, 'return `Some<E>`');
    t.is(err.err().unwrap(), EXPECTED_ERR, 'the inner value is expected');
});
