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

test('Ok<T>', (t) => {
    const EXPECTED = Symbol('EXPECTED');
    const NOT_EXPECTED = Symbol('NOT_EXPECTED');

    const result = createOk(EXPECTED);
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'typeof NOT_EXPECTED' is not assi... Remove this comment to see the full error message
    t.is(result.unwrapOr(NOT_EXPECTED), EXPECTED);
});

test('Err<E>', (t) => {
    const EXPECTED = Symbol('EXPECTED');
    const NOT_EXPECTED = Symbol('NOT_EXPECTED');

    const result = createErr(NOT_EXPECTED);
    t.is(result.unwrapOr(EXPECTED), EXPECTED);
});
