import test from 'ava';

import { mapOrForMaybe } from '../../__dist/cjs/Maybe/mapOr';
import { nonNullableValue } from '../utils';

for (const value of nonNullableValue) {
    test('value:' + String(value), (t) => {
        t.plan(3);

        const EXPECTED = value;

        const result = mapOrForMaybe(EXPECTED, Symbol('def'), (v) => {
            t.pass('should call selector fn');
            t.is(v, EXPECTED, 'the input is the arg');
            return v;
        });
        t.is(result, EXPECTED);
    });
}

test('pass null', (t) => {
    const DEFAULE_VAL = Symbol('');

    // @ts-expect-error ts-migrate(2345) FIXME: Type 'void' is not assignable to type 'unique symb... Remove this comment to see the full error message
    const result = mapOrForMaybe(null, DEFAULE_VAL, (_v) => {
        t.fail('should not call selector fn');
    });
    t.is(result, DEFAULE_VAL);
});

test('pass undefined', (t) => {
    const DEFAULE_VAL = Symbol('');

    // @ts-expect-error ts-migrate(2345) FIXME: Type 'void' is not assignable to type 'unique symb... Remove this comment to see the full error message
    const result = mapOrForMaybe(undefined, DEFAULE_VAL, (_v) => {
        t.fail('should not call selector fn');
    });
    t.is(result, DEFAULE_VAL);
});

{
    const testcases = [
        [1, 2, undefined],
        [1, 2, null],
    ];
    for (const [src, def, selectorResult] of testcases) {
        test(`assert that do not return Maybe<*> as the selector's result v = ${String(
            src
        )}, def = ${String(def)}, selectorResult=${String(selectorResult)}`, (t) => {
            t.throws(
                () => {
                    mapOrForMaybe(src, def, (_v) => selectorResult);
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
        test(`assert that def is not Maybe<*> v = ${String(src)}, def = ${String(
            def
        )}, selectorResult=${String(selectorResult)}`, (t) => {
            t.throws(
                () => {
                    mapOrForMaybe(src, def, (_v) => selectorResult);
                },
                { instanceOf: TypeError }
            );
        });
    }
}
