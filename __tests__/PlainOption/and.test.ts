import test from 'ava';

import { createSome, createNone } from '../../__dist/cjs/PlainOption/Option';
import { andForOption } from '../../__dist/cjs/PlainOption/and';

test('a=Some, b=Some', (t) => {
    const EXPECTED = Symbol('expected');
    const NOT_EXPECTED = Symbol('not expected');

    const a = createSome(NOT_EXPECTED);
    const b = createSome(EXPECTED);

    const actual = andForOption(a, b);

    t.is(actual, b, 'should return b');
    t.true(actual.ok, 'should be Some');
    t.is(actual.val, EXPECTED, 'should be the inner value');
});

test('a=Some, b=None', (t) => {
    const NOT_EXPECTED = Symbol('not expected');

    const a = createSome(NOT_EXPECTED);
    const b = createNone();

    const actual = andForOption(a, b);

    t.is(actual, b, 'should return b');
    t.false(actual.ok, 'should be None');
});

test('a=None, b=Some', (t) => {
    const NOT_EXPECTED = Symbol('not expected');

    const a = createNone();
    const b = createSome(NOT_EXPECTED);

    const actual = andForOption(a, b);

    t.is(actual, a, 'should return a');
    t.false(actual.ok, 'should be None');
});

test('a=None, b=None', (t) => {
    const a = createNone();
    const b = createNone();

    const actual = andForOption(a, b);

    t.is(actual, a, 'should return a');
    t.false(actual.ok, 'should be None');
});
