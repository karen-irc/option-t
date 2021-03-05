import test from 'ava';

import { orElseForUndefinable } from '../../__dist/cjs/Undefinable/orElse';
import { nonNullableValue } from '../utils';

for (const value of nonNullableValue) {
    test('pass the value' + String(value), (t) => {
        const DEFAULT_VAL = Math.random();
        const EXPECTED = value;

        t.plan(1);

        const result = orElseForUndefinable(EXPECTED, () => {
            t.pass('should not call recover fn');
            return DEFAULT_VAL;
        });

        t.is(result, EXPECTED, 'should the expected result');
    });
}

test('pass null', (t) => {
    const DEFAULT_VAL = Math.random();

    t.plan(1);
    const result = orElseForUndefinable(null, () => {
        t.pass('should not call recover fn');
        return DEFAULT_VAL;
    });

    t.is(result, null, 'should be the default');
});

test('pass undefined', (t) => {
    const DEFAULT_VAL = Math.random();

    t.plan(2);
    const result = orElseForUndefinable(undefined, () => {
        t.pass('should call recover fn');
        return DEFAULT_VAL;
    });

    t.is(result, DEFAULT_VAL, 'should be the default');
});
