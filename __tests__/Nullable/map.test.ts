import test from 'ava';

import { mapForNullable } from '../../__dist/cjs/Nullable/map';
import { nonNullableValue } from '../utils';

for (const value of nonNullableValue) {
    test('pass the value:  ' + String(value), (t) => {
        t.plan(3);

        const EXPECTED = value;

        const result = mapForNullable(EXPECTED, (v) => {
            t.pass();
            t.is(v, EXPECTED, 'the arg is the input');
            return v;
        });

        t.is(result, EXPECTED);
    });
}

test('pass null', (t) => {
    t.plan(0);

    mapForNullable(null, (_v) => {
        t.fail('do not call this');
    });
});

test('pass undefined', (t) => {
    t.plan(2);

    const result = mapForNullable(undefined, (v) => {
        t.pass();
        return v;
    });

    t.is(result, undefined);
});

const testcases = [[1, null]];
for (const [src, def] of testcases) {
    test(`assert that do not return Nullable<*> as the selector's result, v = ${String(
        src
    )}, def = ${String(def)}`, (t) => {
        t.throws(
            () => {
                mapForNullable(src, (_v) => def);
            },
            { instanceOf: TypeError }
        );
    });
}
