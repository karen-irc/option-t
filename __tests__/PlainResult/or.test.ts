import test from 'ava';

import { createOk, createErr } from '../../__dist/cjs/PlainResult/Result';
import { orForResult } from '../../__dist/cjs/PlainResult/or';

test('a=Ok, b=Ok', (t) => {
    const EXPECTED = Symbol('expected');
    const NOT_EXPECTED = Symbol('not expected');

    const a = createOk(EXPECTED);
    const b = createOk(NOT_EXPECTED);

    // @ts-expect-error ts-migrate(2345) FIXME: Type 'typeof NOT_EXPECTED' is not assignable to ty... Remove this comment to see the full error message
    const actual = orForResult(a, b);

    t.is(actual, a, 'should return a');
    t.true(actual.ok, 'should be Ok');
    t.is(actual.val, EXPECTED, 'should be the inner value');
});

test('a=Ok, b=Err', (t) => {
    const EXPECTED = Symbol('expected');
    const NOT_EXPECTED = Symbol('not expected');

    const a = createOk(EXPECTED);
    const b = createErr(NOT_EXPECTED);

    const actual = orForResult(a, b);

    t.is(actual, a, 'should return a');
    t.true(actual.ok, 'should be Ok');
    t.is(actual.val, EXPECTED, 'should be the inner value');
});

test('a=Err, b=Ok', (t) => {
    const EXPECTED = Symbol('expected');
    const NOT_EXPECTED = Symbol('not expected');

    const a = createErr(NOT_EXPECTED);
    const b = createOk(EXPECTED);

    const actual = orForResult(a, b);

    t.is(actual, b, 'should return b');
    t.true(actual.ok, 'should be Ok');
    t.is(actual.val, EXPECTED, 'should be the inner value');
});

test('a=Err, b=Err', (t) => {
    const EXPECTED = Symbol('expected');
    const NOT_EXPECTED = Symbol('not expected');

    const a = createErr(NOT_EXPECTED);
    const b = createErr(EXPECTED);

    const actual = orForResult(a, b);

    t.is(actual, b, 'should return b');
    t.false(actual.ok, 'should be Err');
    t.is(actual.err, EXPECTED, 'should be the inner value');
});
