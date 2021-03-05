import test from 'ava';

import { unwrapNullable } from '../../__dist/cjs/Nullable/unwrap';
import { nonNullableValue } from '../utils';

for (const value of nonNullableValue) {
    const EXPECTED = value;
    test('pass the value: ' + String(value), (t) => {
        let result;
        t.not(result, EXPECTED);

        t.notThrows(() => {
            result = unwrapNullable(EXPECTED);
        });

        t.is(result, EXPECTED);
    });
}

test('pass null', (t) => {
    t.throws(
        () => {
            unwrapNullable(null);
        },
        { instanceOf: TypeError }
    );
});

test('pass undefined', (t) => {
    let result = null;
    t.notThrows(() => {
        result = unwrapNullable(undefined);
    });
    t.is(result, undefined);
});
