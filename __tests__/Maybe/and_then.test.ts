import test from 'ava';

import { andThenForMaybe } from '../../__dist/cjs/Maybe/andThen';
import { nonNullableValue } from '../utils';

for (const value of nonNullableValue) {
    test('pass the value: ' + String(value), (t) => {
        t.plan(2);

        const EXPECTED = value;
        const result = andThenForMaybe(EXPECTED, (v) => {
            t.pass('should call selector fn');
            return v;
        });

        t.is(result, EXPECTED);
    });
}

test('pass null', (t) => {
    const DEFAULT_VAL = Symbol('');
    const result = andThenForMaybe(null, (_v) => {
        t.fail('should not call selector fn');
        return DEFAULT_VAL;
    });

    t.is(result, null);
});

test('pass undefined', (t) => {
    const DEFAULT_VAL = Symbol('');
    const result = andThenForMaybe(undefined, (_v) => {
        t.fail('should not call selector fn');
        return DEFAULT_VAL;
    });

    t.is(result, undefined);
});
