import test from 'ava';

import { mapOrForNullable } from '../../__dist/cjs/Nullable/mapOr';
import { nonNullableValue } from '../utils';

for (const value of nonNullableValue) {
    test('pass the value: ' + String(value), (t) => {
        t.plan(3);

        const EXPECTED = value;

        const result = mapOrForNullable(EXPECTED, Symbol('def'), (v) => {
            t.pass('should call selector fn');
            t.is(v, EXPECTED);
            return v;
        });

        t.is(result, EXPECTED);
    });
}

test('pass null', (t) => {
    t.plan(1);

    const DEFAULE_VAL = Symbol('');
    const COMPUTED_VAL = Symbol('');
    const result = mapOrForNullable(null, DEFAULE_VAL, (_v) => {
        t.fail('should not call selector fn');
        return COMPUTED_VAL;
    });

    t.is(result, DEFAULE_VAL);
});

test('pass undefined', (t) => {
    t.plan(3);

    const DEFAULE_VAL = Symbol('');
    const COMPUTED_VAL = Symbol('');
    const result = mapOrForNullable(undefined, DEFAULE_VAL, (v) => {
        t.pass('should call selector fn');
        t.is(v, undefined);
        return COMPUTED_VAL;
    });

    t.is(result, COMPUTED_VAL);
});

{
    const testcases = [[1, 2, null]];
    for (const [src, def, selectorResult] of testcases) {
        test(`assert that do not return Nullable<*> as the selector's result, v = ${String(
            src
        )}, def = ${String(def)}, selectorResult=${String(selectorResult)}`, (t) => {
            t.throws(
                () => {
                    mapOrForNullable(src, def, (_v) => selectorResult);
                },
                { instanceOf: TypeError }
            );
        });
    }
}

{
    const testcases = [[null, null, '']];
    for (const [src, def, selectorResult] of testcases) {
        test(`assert that def is not Nullable<*>', v = ${String(src)}, def = ${String(
            def
        )}, selectorResult=${String(selectorResult)}`, (t) => {
            t.throws(
                () => {
                    mapOrForNullable(src, def, (_v) => selectorResult);
                },
                { instanceOf: TypeError }
            );
        });
    }
}
