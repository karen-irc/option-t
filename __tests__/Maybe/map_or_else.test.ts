import test from 'ava';

import { mapOrElseForMaybe } from '../../__dist/cjs/Maybe/mapOrElse';
import { nonNullableValue } from '../utils';

for (const value of nonNullableValue) {
    test('value:' + String(value), (t) => {
        t.plan(3);

        const DEFAULT_VAL = Symbol('def');
        const EXPECTED = value;

        const result = mapOrElseForMaybe(
            EXPECTED,
            () => DEFAULT_VAL,
            (v) => {
                t.pass('should call selector fn');
                t.is(v, EXPECTED, 'the arg is the input');
                return v;
            }
        );

        t.is(result, EXPECTED);
    });
}

test('pass null', (t) => {
    const DEFAULE_VAL = Symbol('');
    const COMPUTED_VAL = Symbol('');

    const result = mapOrElseForMaybe(
        null,
        () => DEFAULE_VAL,
        (_v) => {
            t.fail('should not call selector fn');
            return COMPUTED_VAL;
        }
    );
    t.is(result, DEFAULE_VAL);
});

test('pass undefined', (t) => {
    const DEFAULE_VAL = Symbol('');
    const COMPUTED_VAL = Symbol('');

    const result = mapOrElseForMaybe(
        undefined,
        () => DEFAULE_VAL,
        (_v) => {
            t.fail('should not call selector fn');
            return COMPUTED_VAL;
        }
    );
    t.is(result, DEFAULE_VAL);
});

{
    const testcases = [
        [1, 2, undefined],
        [1, 2, null],
    ];
    for (const [src, def, selectorResult] of testcases) {
        test(`assert that do not return Maybe<*> as the selector's result. v = ${String(
            src
        )}, def = ${String(def)}, selectorResult=${String(selectorResult)}`, (t) => {
            t.throws(
                () => {
                    mapOrElseForMaybe(
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
    const testcases = [
        [null, undefined, ''],
        [null, null, ''],
        [undefined, undefined, ''],
        [undefined, null, ''],
    ];
    for (const [src, def, selectorResult] of testcases) {
        test(`v = ${String(src)}, def = ${String(def)}, selectorResult=${String(
            selectorResult
        )}`, (t) => {
            t.throws(
                () => {
                    mapOrElseForMaybe(
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
