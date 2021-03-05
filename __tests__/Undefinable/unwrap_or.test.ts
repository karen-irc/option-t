import test from 'ava';

import { unwrapOrFromUndefinable } from '../../__dist/cjs/Undefinable/unwrapOr';
import { nonNullableValue } from '../utils';

for (const value of nonNullableValue) {
    test('pass the value' + String(value), (t) => {
        const DEFAULT_VAL = Math.random();
        const EXPECTED = value;
        let result;
        let e = null;
        try {
            result = unwrapOrFromUndefinable(EXPECTED, DEFAULT_VAL);
        } catch (expected) {
            e = expected;
        }

        t.is(result, EXPECTED, 'should the expected result');
        t.is(e, null, 'should not throw error');
    });
}

test('pass null', (t) => {
    const DEFAULT_VAL = Math.random();
    const result = unwrapOrFromUndefinable(null, DEFAULT_VAL);

    t.is(result, null, 'should be the default');
});

test('pass undefined', (t) => {
    const DEFAULT_VAL = Math.random();
    const result = unwrapOrFromUndefinable(undefined, DEFAULT_VAL);
    t.is(result, DEFAULT_VAL, 'should be the default');
});

test('should not accept Maybe<*> as default', (t) => {
    const testcases = [[undefined, undefined]];
    for (const [src, def] of testcases) {
        t.throws(
            () => {
                unwrapOrFromUndefinable(src, def);
            },
            { instanceOf: TypeError },
            `v = ${String(src)}, def = ${String(def)}`
        );
    }
});
