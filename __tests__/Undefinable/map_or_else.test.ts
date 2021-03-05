import test from 'ava';

import { mapOrElseForUndefinable } from '../../__dist/cjs/Undefinable/mapOrElse';
import { nonNullableValue } from '../utils';

for (const value of nonNullableValue) {
    test('pass the value' + String(value), (t) => {
        const DEFAULT_VAL = Symbol('def');
        const EXPECTED = value;

        t.plan(2);

        const result = mapOrElseForUndefinable(
            EXPECTED,
            () => DEFAULT_VAL,
            (v) => {
                t.pass('should call selector fn');
                return v;
            }
        );

        t.is(result, EXPECTED, 'should the expected result');
    });
}

test('pass null', (t) => {
    const DEFAULE_VAL = Symbol('');
    const COMPUTED_VAL = Symbol('');

    t.plan(2);

    const result = mapOrElseForUndefinable(
        null,
        () => DEFAULE_VAL,
        (_v) => {
            t.pass('should call selector fn');
            return COMPUTED_VAL;
        }
    );

    t.is(result, COMPUTED_VAL, 'should be the expected');
});

test('pass undefined', (t) => {
    const DEFAULE_VAL = Symbol('');
    const COMPUTED_VAL = Symbol('');

    t.plan(1);

    const result = mapOrElseForUndefinable(
        undefined,
        () => DEFAULE_VAL,
        (_v) => {
            t.pass('should not call selector fn');

            return COMPUTED_VAL;
        }
    );

    t.is(result, DEFAULE_VAL, 'should be the expected');
});

test("assert that do not return Undefinable<*> as the selector's result", (t) => {
    const testcases = [[1, 2, undefined]];
    for (const [src, def, selectorResult] of testcases) {
        const LABEL = `v = ${String(src)}, def = ${String(def)}, selectorResult=${String(
            selectorResult
        )}`;

        t.throws(
            () => {
                mapOrElseForUndefinable(
                    src,
                    () => def,
                    (_v) => selectorResult
                );
            },
            { instanceOf: TypeError },
            LABEL
        );
    }
});

test('assert that def is not Undefinable<*>', (t) => {
    const testcases = [[undefined, undefined, '']];
    for (const [src, def, selectorResult] of testcases) {
        const LABEL = `v = ${String(src)}, def = ${String(def)}, selectorResult=${String(
            selectorResult
        )}`;
        t.throws(
            () => {
                mapOrElseForUndefinable(
                    src,
                    () => def,
                    (_v) => selectorResult
                );
            },
            { instanceOf: TypeError },
            LABEL
        );
    }
});
