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

const EXPECTED = Symbol('0');
const UNEXPECTED = Symbol('1');

function toLabel(input: any) {
    if (input.isOk()) {
        return 'Ok<T>';
    } else {
        return 'Err<E>';
    }
}

const testcaseList = [
    [createOk(EXPECTED), createOk(UNEXPECTED)],
    [createOk(EXPECTED), createErr(UNEXPECTED)],
    [createErr(UNEXPECTED), createOk(EXPECTED)],
];
for (const [lhs, rhs] of testcaseList) {
    test(`lhs: ${toLabel(lhs)}, rhs: ${toLabel(rhs)}`, (t) => {
        // @ts-expect-error ts-migrate(2349) FIXME: Each member of the union type '(<F>(res: Result<un... Remove this comment to see the full error message
        const result = lhs.or(rhs);
        t.true(result.isOk(), 'the returned value should be `Ok');
        t.is(result.unwrap(), EXPECTED, 'the returned value should wrap the expected value');
    });
}

const failureTestcaseList = [[createErr(UNEXPECTED), createErr(EXPECTED)]];
for (const [lhs, rhs] of failureTestcaseList) {
    test(`lhs: ${toLabel(lhs)}, rhs: ${toLabel(rhs)}`, (t) => {
        // @ts-expect-error ts-migrate(2345) FIXME: Type 'typeof EXPECTED' is not assignable to type '... Remove this comment to see the full error message
        const result = lhs.or(rhs);
        t.true(result.isErr(), 'the returned value should be `Err');
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'typeof EXPECTED' is not assignab... Remove this comment to see the full error message
        t.is(result.unwrapErr(), EXPECTED, 'the returned value should wrap the expected value');
    });
}
