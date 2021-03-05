import test from 'ava';

import { createSome, createNone } from '../../__dist/cjs/Option';

test('self is `None`', function (t) {
    t.plan(2);

    const EXPECTED = 1;

    const none = createNone();
    const result = none.mapOrElse(
        function defaultFn() {
            t.pass('`defaultFn` function should be called');
            return EXPECTED;
        },
        // @ts-expect-error ts-migrate(2345) FIXME: Type 'void' is not assignable to type 'number'.
        function mapFn() {
            t.fail('`mapFn` should not be called');
        }
    );

    t.is(result, EXPECTED);
});

test('self is `Some<T>`', function (t) {
    t.plan(4);

    const EXPECTED = 1;
    const DEFAULT = 2;
    t.not(EXPECTED, DEFAULT);

    const some = createSome('bar');
    const result = some.mapOrElse(
        function defaultFn() {
            t.fail('`defaultFn` function should not be called');
            return DEFAULT;
        },
        function (val) {
            t.pass('`mapFn` should be called');
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '1' is not assignable to paramete... Remove this comment to see the full error message
            t.not(val, EXPECTED);
            return EXPECTED;
        }
    );
    t.is(result, EXPECTED);
});
