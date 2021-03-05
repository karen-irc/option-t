import test from 'ava';

import { unwrapOrElseFromNullable } from '../../__dist/cjs/Nullable/unwrapOrElse';
import { nonNullableValue } from '../utils';

for (const value of nonNullableValue) {
    test('pass the value: ' + String(value), (t) => {
        t.plan(2);

        const DEFAULT_VAL = Math.random();
        const EXPECTED = value;

        let result;
        t.notThrows(() => {
            result = unwrapOrElseFromNullable(EXPECTED, () => {
                t.fail('should not call recover fn');
                return DEFAULT_VAL;
            });
        });

        t.is(result, EXPECTED);
    });
}

test('pass null', (t) => {
    t.plan(2);

    const DEFAULT_VAL = Math.random();
    const result = unwrapOrElseFromNullable(null, () => {
        t.pass('should call recover fn');
        return DEFAULT_VAL;
    });

    t.is(result, DEFAULT_VAL);
});

test('pass undefined', (t) => {
    t.plan(1);

    const DEFAULT_VAL = Math.random();
    const result = unwrapOrElseFromNullable(undefined, () => {
        t.fail('should not call recover fn');
        return DEFAULT_VAL;
    });

    t.is(result, undefined);
});

const testcases = [[null, null]];
for (const [src, def] of testcases) {
    test(`should not accept Maybe<*> as default, v = ${String(src)}, def = ${String(def)}`, (t) => {
        t.throws(
            () => {
                unwrapOrElseFromNullable(src, () => def);
            },
            { instanceOf: TypeError }
        );
    });
}
