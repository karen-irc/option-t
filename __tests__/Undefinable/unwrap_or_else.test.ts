import test from 'ava';

import { unwrapOrElseFromUndefinable } from '../../__dist/cjs/Undefinable/unwrapOrElse';
import { nonNullableValue } from '../utils';

for (const value of nonNullableValue) {
    test('pass the value' + String(value), (t) => {
        const DEFAULT_VAL = Math.random();
        const EXPECTED = value;
        let result;
        let e = null;

        t.plan(2);
        try {
            result = unwrapOrElseFromUndefinable(EXPECTED, () => {
                t.pass('should not call recover fn');
                return DEFAULT_VAL;
            });
        } catch (expected) {
            e = expected;
        }

        t.is(result, EXPECTED, 'should the expected result');
        t.is(e, null, 'should not throw error');
    });
}

test('pass null', (t) => {
    const DEFAULT_VAL = Math.random();

    t.plan(1);

    const result = unwrapOrElseFromUndefinable(null, () => {
        t.pass('should not call recover fn');
        return DEFAULT_VAL;
    });

    t.is(result, null, 'should the input result');
});

test('pass undefined', (t) => {
    const DEFAULT_VAL = Math.random();

    t.plan(2);

    const result = unwrapOrElseFromUndefinable(undefined, () => {
        t.pass('should call recover fn');
        return DEFAULT_VAL;
    });

    t.is(result, DEFAULT_VAL, 'should be the default');
});

test('should not accept Maybe<*> as default', (t) => {
    const testcases = [[undefined, undefined]];
    for (const [src, def] of testcases) {
        t.throws(
            () => {
                unwrapOrElseFromUndefinable(src, () => def);
            },
            { instanceOf: TypeError },
            `v = ${String(src)}, def = ${String(def)}`
        );
    }
});
