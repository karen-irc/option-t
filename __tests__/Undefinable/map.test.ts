import test from 'ava';

import { mapForUndefinable } from '../../__dist/cjs/Undefinable/map';
import { nonNullableValue } from '../utils';

for (const value of nonNullableValue) {
    test('pass the value' + String(value), (t) => {
        const EXPECTED = value;

        t.plan(2);

        const result = mapForUndefinable(EXPECTED, (v) => {
            t.pass('should call selector fn');
            return v;
        });
        t.is(result, EXPECTED, 'should the expected result');
    });
}

test('pass null', (t) => {
    t.plan(2);

    const result = mapForUndefinable(null, (v) => {
        t.pass('should call selector fn');
        return v;
    });

    t.is(result, null, 'should the expected result');
});

test('pass undefined', (t) => {
    t.plan(0);
    mapForUndefinable(undefined, (_v) => {
        t.pass('should not call selector fn');
    });
});

test("assert that do not return Undefinable<*> as the selector's result", (t) => {
    const testcases = [[1, undefined]];
    for (const [src, def] of testcases) {
        t.throws(
            () => {
                mapForUndefinable(src, (_v) => def);
            },
            { instanceOf: TypeError },
            `v = ${String(src)}, def = ${String(def)}`
        );
    }
});
