import test from 'ava';

import { unwrapOrElseFromMaybe } from '../../__dist/cjs/Maybe/unwrapOrElse';
import { nonNullableValue } from '../utils';

for (const value of nonNullableValue) {
    test('pass the value: ' + String(value), (t) => {
        const DEFAULT_VAL = Math.random();
        const EXPECTED = value;
        let result;

        t.notThrows(() => {
            result = unwrapOrElseFromMaybe(EXPECTED, () => {
                t.fail('should not call recover fn');
                return DEFAULT_VAL;
            });
        });

        t.is(result, EXPECTED);
    });
}

test('pass null', (t) => {
    t.plan(2);

    const DEFAULT_VAL = Math.random();
    const result = unwrapOrElseFromMaybe(null, () => {
        t.pass('should call recover fn');
        return DEFAULT_VAL;
    });

    t.is(result, DEFAULT_VAL);
});

test('pass undefined', (t) => {
    t.plan(2);

    const DEFAULT_VAL = Math.random();
    const result = unwrapOrElseFromMaybe(null, () => {
        t.pass('should call recover fn');
        return DEFAULT_VAL;
    });

    t.is(result, DEFAULT_VAL);
});

{
    const testcases = [
        [undefined, undefined],
        [undefined, null],
        [null, undefined],
        [null, null],
    ];
    for (const [src, def] of testcases) {
        test(`should not accept Maybe<*> as default, v = ${String(src)}, def = ${String(
            def
        )}`, (t) => {
            t.throws(
                () => {
                    unwrapOrElseFromMaybe(src, () => def);
                },
                { instanceOf: TypeError }
            );
        });
    }
}
