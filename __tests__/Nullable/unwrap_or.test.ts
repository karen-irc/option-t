import test from 'ava';

import { unwrapOrFromNullable } from '../../__dist/cjs/Nullable/unwrapOr';
import { nonNullableValue } from '../utils';

for (const value of nonNullableValue) {
    test('pass the value: ' + String(value), (t) => {
        const DEFAULT_VAL = Math.random();
        const EXPECTED = value;

        const result = unwrapOrFromNullable(EXPECTED, DEFAULT_VAL);
        t.is(result, EXPECTED);
    });
}

test('pass null', (t) => {
    const DEFAULT_VAL = Math.random();
    const result = unwrapOrFromNullable(null, DEFAULT_VAL);

    t.is(result, DEFAULT_VAL);
});

test('pass undefined', (t) => {
    const DEFAULT_VAL = Math.random();
    const result = unwrapOrFromNullable(undefined, DEFAULT_VAL);

    t.is(result, undefined);
});

const testcases = [[null, null]];
for (const [src, def] of testcases) {
    test(`should not accept null for both, v = ${String(src)}, def = ${String(def)}`, (t) => {
        t.throws(
            () => {
                unwrapOrFromNullable(src, def);
            },
            { instanceOf: TypeError }
        );
    });
}
