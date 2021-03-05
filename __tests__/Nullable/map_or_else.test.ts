import test from 'ava';

import { mapOrElseForNullable } from '../../__dist/cjs/Nullable/mapOrElse';
import { nonNullableValue } from '../utils';

for (const value of nonNullableValue) {
    test('pass the value: ' + String(value), (t) => {
        t.plan(2);

        const DEFAULT_VAL = Symbol('def');
        const EXPECTED = value;

        const result = mapOrElseForNullable(
            EXPECTED,
            () => DEFAULT_VAL,
            (v) => {
                t.is(v, EXPECTED, 'the arg is the input');
                return v;
            }
        );

        t.is(result, EXPECTED);
    });
}

test('pass null', (t) => {
    t.plan(1);

    const DEFAULE_VAL = Symbol('');
    const COMPUTED_VAL = Symbol('');
    const result = mapOrElseForNullable(
        null,
        () => DEFAULE_VAL,
        (_v) => {
            t.fail('do not call this');
            return COMPUTED_VAL;
        }
    );

    t.is(result, DEFAULE_VAL);
});

test('pass undefined', (t) => {
    t.plan(2);

    const DEFAULE_VAL = Symbol('');
    const COMPUTED_VAL = Symbol('');

    const result = mapOrElseForNullable(
        undefined,
        () => DEFAULE_VAL,
        (v) => {
            t.is(v, undefined);
            return COMPUTED_VAL;
        }
    );

    t.is(result, COMPUTED_VAL);
});

{
    const testcases = [[1, 2, null]];
    for (const [src, def, selectorResult] of testcases) {
        test(`assert that do not return Nullable<*> as the selector's result: v = ${String(
            src
        )}, def = ${String(def)}, selectorResult=${String(selectorResult)}`, (t) => {
            t.throws(
                () => {
                    mapOrElseForNullable(
                        src,
                        () => def,
                        (_v) => selectorResult
                    );
                },
                { instanceOf: TypeError }
            );
        });
    }
}

{
    const testcases = [[null, null, '']];
    for (const [src, def, selectorResult] of testcases) {
        test(`assert that def is not Nullable<*>: v = ${String(src)}, def = ${String(
            def
        )}, selectorResult=${String(selectorResult)}`, (t) => {
            t.throws(
                () => {
                    mapOrElseForNullable(
                        src,
                        () => def,
                        (_v) => selectorResult
                    );
                },
                { instanceOf: TypeError }
            );
        });
    }
}
