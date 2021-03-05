import test from 'ava';

import { expectNotUndefined } from '../../__dist/cjs/Undefinable/expect';
import { nonNullableValue } from '../utils';

for (const value of nonNullableValue) {
    test('pass the value' + String(value), (t) => {
        const EXPECTED = value;
        const EXPECTED_MSG = 'expected test';
        let result;
        let e = null;
        try {
            result = expectNotUndefined(EXPECTED, EXPECTED_MSG);
        } catch (expected) {
            e = expected;
        }

        t.is(result, EXPECTED, 'should the expected result');
        t.is(e, null, 'should not throw error');
    });
}

test('pass null', (t) => {
    const EXPECTED_MSG = 'expected test';
    let result;
    let e = null;

    try {
        result = expectNotUndefined(null, EXPECTED_MSG);
    } catch (expected) {
        e = expected;
    }

    t.is(result, null, 'should the expected result');
    t.is(e, null, 'should not throw error');
});

test('pass undefined', (t) => {
    const EXPECTED_MSG = 'expected test';
    let e = null;
    try {
        expectNotUndefined(undefined, EXPECTED_MSG);
    } catch (expected) {
        e = expected;
    }

    t.is(e instanceof TypeError, true, 'should throw error');
    t.is(e.message.includes(EXPECTED_MSG), true, 'the error contains expected message');
});
