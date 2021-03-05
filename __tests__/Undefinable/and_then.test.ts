import test from 'ava';

import { andThenForUndefinable } from '../../__dist/cjs/Undefinable/andThen';
import { nonNullableValue } from '../utils';

const RESULT_VAL = Symbol('result val');

for (const value of nonNullableValue) {
    test('pass the value' + String(value), (t) => {
        const EXPECTED = value;

        const result = andThenForUndefinable(EXPECTED, (v) => {
            t.pass('should call selector fn');
            return v;
        });

        t.is(result, EXPECTED, 'should the expected result');
    });
}

test('pass null', (t) => {
    t.plan(2);

    const result = andThenForUndefinable(null, (_v) => {
        t.pass('should call selector fn');
        return RESULT_VAL;
    });

    t.is(result, RESULT_VAL, 'should be the expected result');
});

test('pass undefined', (t) => {
    t.plan(1);

    const result = andThenForUndefinable(undefined, (_v) => {
        t.fail('should not call selector fn');
        return RESULT_VAL;
    });

    t.is(result, undefined, 'should be the expected result');
});
