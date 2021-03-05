import test from 'ava';

import { unwrapUndefinable } from '../../__dist/cjs/Undefinable/unwrap';
import { nonNullableValue } from '../utils';

for (const value of nonNullableValue) {
    test('pass the value' + String(value), (t) => {
        const EXPECTED = value;
        let result;
        let e = null;
        try {
            result = unwrapUndefinable(EXPECTED);
        } catch (expected) {
            e = expected;
        }

        t.is(result, EXPECTED, 'should the expected result');
        t.is(e, null, 'should not throw error');
    });
}

test('pass null', (t) => {
    let result;
    let e = null;
    try {
        result = unwrapUndefinable(null);
    } catch (expected) {
        e = expected;
    }

    t.is(result, null, 'should the expected result');
    t.is(e, null, 'should not throw error');
});

test('pass undefined', (t) => {
    let e;
    try {
        unwrapUndefinable(undefined);
    } catch (expected) {
        e = expected;
    }

    t.true(e instanceof TypeError, 'should throw error');
});
