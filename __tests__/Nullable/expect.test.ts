import test from 'ava';

import { expectNotNull } from '../../__dist/cjs/Nullable/expect';
import { nonNullableValue } from '../utils';

for (const value of nonNullableValue) {
    test('pass the value ' + String(value), (t) => {
        const EXPECTED = value;
        const EXPECTED_MSG = 'expected test';

        const result = expectNotNull(EXPECTED, EXPECTED_MSG);
        t.is(result, EXPECTED);
    });
}

test('pass null', (t) => {
    const EXPECTED_MSG = 'expected test';

    t.throws(
        () => {
            expectNotNull(null, EXPECTED_MSG);
        },
        {
            instanceOf: TypeError,
            message: EXPECTED_MSG,
        }
    );
});

test('pass undefined', (t) => {
    const EXPECTED_MSG = 'expected test';

    let result;
    t.notThrows(() => {
        result = expectNotNull(undefined, EXPECTED_MSG);
    });
    t.is(result, undefined);
});
