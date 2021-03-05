import test from 'ava';

import { createSome, createNone } from '../../__dist/cjs/PlainOption/Option';
import { mapOrElseForOption } from '../../__dist/cjs/PlainOption/mapOrElse';

test('Some(T)', function (t) {
    t.plan(3);

    const INPUT = Symbol('input');
    const EXPECTED = Symbol('exptected');
    const DEFAULT = Symbol('default');

    const input = createSome(INPUT);
    const result = mapOrElseForOption(
        input,
        function defaultFn() {
            t.fail('`defaultFn` function should not be called');
            return DEFAULT;
        },
        function (val) {
            t.pass('`mapFn` should be called');
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'typeof EXPECTED' is not assignab... Remove this comment to see the full error message
            t.not(val, EXPECTED);
            return EXPECTED;
        }
    );
    t.is(result, EXPECTED);
});

test('None', function (t) {
    t.plan(2);

    const EXPECTED = Symbol('expected');

    const input = createNone();
    const result = mapOrElseForOption(
        input,
        function defaultFn() {
            t.pass('`defaultFn` function should be called');
            return EXPECTED;
        },
        // @ts-expect-error ts-migrate(2345) FIXME: Type 'void' is not assignable to type 'symbol'.
        function mapFn() {
            t.fail('`mapFn` should not be called');
        }
    );

    t.is(result, EXPECTED);
});
