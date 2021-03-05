import test from 'ava';

import { unwrapMaybe } from '../../__dist/cjs/Maybe/unwrap';
import { nonNullableValue } from '../utils';

for (const value of nonNullableValue) {
    test('value:' + String(value), (t) => {
        const EXPECTED = value;

        let result;
        t.notThrows(() => {
            result = unwrapMaybe(EXPECTED);
        });

        t.is(result, EXPECTED);
    });
}

test('pass null', (t) => {
    t.throws(
        () => {
            unwrapMaybe(null);
        },
        { instanceOf: TypeError }
    );
});

test('pass undefined', (t) => {
    t.throws(
        () => {
            unwrapMaybe(undefined);
        },
        { instanceOf: TypeError }
    );
});
