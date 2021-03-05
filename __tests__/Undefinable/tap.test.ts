import test from 'ava';

import { tapUndefinable } from '../../__dist/cjs/Undefinable/tap';
import { nonNullableValue } from '../utils';

for (const input of nonNullableValue) {
    test('pass the value' + String(input), (t) => {
        t.plan(2);

        const result = tapUndefinable(input, (_v) => {
            t.pass('should call selector fn');
        });

        t.is(result, input, 'should be input');
    });
}

test('pass null', (t) => {
    t.plan(2);

    const result = tapUndefinable(null, (_v) => {
        t.pass('should call selector fn');
    });

    t.is(result, null, 'should be input');
});

test('pass undefined', (t) => {
    t.plan(1);

    const result = tapUndefinable(undefined, (_v) => {
        t.pass('should not call selector fn');
    });

    t.is(result, undefined, 'should be input');
});
