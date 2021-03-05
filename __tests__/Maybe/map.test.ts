import test from 'ava';

import { mapForMaybe } from '../../__dist/cjs/Maybe/map';
import { nonNullableValue } from '../utils';

for (const value of nonNullableValue) {
    test('value:' + String(value), (t) => {
        t.plan(3);

        const EXPECTED = value;
        const result = mapForMaybe(EXPECTED, (v) => {
            t.pass('should call selector fn');
            t.is(v, EXPECTED, 'the arg is the input');
            return v;
        });

        t.is(result, EXPECTED);
    });
}

test('pass null', (t) => {
    const result = mapForMaybe(null, (_v) => {
        t.fail('should not call selector fn');
    });
    t.is(result, null);
});

test('pass undefined', (t) => {
    const result = mapForMaybe(undefined, (_v) => {
        t.fail('should not call selector fn');
    });
    t.is(result, undefined);
});

{
    const testcases = [
        [1, undefined],
        [1, null],
    ];
    for (const [src, def] of testcases) {
        test(`assert that do not return Maybe<*> as the selector's resultv = ${String(
            src
        )}, def = ${String(def)}`, (t) => {
            t.throws(
                () => {
                    mapForMaybe(src, (_v) => def);
                },
                { instanceOf: TypeError }
            );
        });
    }
}
