import test from 'ava';

import { unwrapOrFromMaybe } from '../../__dist/esm/Maybe/unwrapOr.mjs';
import { nonNullableValue } from '../utils.mjs';

for (const value of nonNullableValue) {
    test('pass the value: ' + String(value), (t) => {
        t.plan(2);

        const DEFAULT_VAL = Math.random();
        const EXPECTED = value;
        let result;
        t.notThrows(() => {
            result = unwrapOrFromMaybe(EXPECTED, DEFAULT_VAL);
        });

        t.is(result, EXPECTED);
    });
}

test('pass null', (t) => {
    const DEFAULT_VAL = Math.random();
    const result = unwrapOrFromMaybe(null, DEFAULT_VAL);

    t.is(result, DEFAULT_VAL);
});

test('pass undefined', (t) => {
    const DEFAULT_VAL = Math.random();
    const result = unwrapOrFromMaybe(undefined, DEFAULT_VAL);
    t.is(result, DEFAULT_VAL);
});

{
    const testcases = [
        [undefined, undefined],
        [undefined, null],
        [null, undefined],
        [null, null],
    ];
    for (const [src, def] of testcases) {
        test(`should not accept Maybe<*> as default, v = ${String(src)}, def = ${String(
            def
        )}`, (t) => {
            t.plan(1);
            t.throws(
                () => {
                    unwrapOrFromMaybe(src, def);
                },
                {
                    instanceOf: TypeError,
                    message: '`defaultValue` must not be `null` or `undefined`',
                }
            );
        });
    }
}
