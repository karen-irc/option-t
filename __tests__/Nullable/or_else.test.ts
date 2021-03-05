import test from 'ava';

import { orElseForNullable } from '../../__dist/cjs/Nullable/orElse';
import { nonNullableValue } from '../utils';

for (const value of nonNullableValue) {
    test('pass the value ' + String(value), (t) => {
        t.plan(1);

        const DEFAULT_VAL = Math.random();
        const EXPECTED = value;
        const result = orElseForNullable(EXPECTED, () => {
            t.fail();
            return DEFAULT_VAL;
        });

        t.is(result, EXPECTED);
    });
}

test('pass null', (t) => {
    t.plan(2);

    const DEFAULT_VAL = Math.random();

    const result = orElseForNullable(null, () => {
        t.pass();
        return DEFAULT_VAL;
    });

    t.is(result, DEFAULT_VAL);
});

test('pass undefined', (t) => {
    t.plan(1);

    const DEFAULT_VAL = Math.random();

    const result = orElseForNullable(undefined, () => {
        t.fail();
        return DEFAULT_VAL;
    });

    t.is(result, undefined);
});
