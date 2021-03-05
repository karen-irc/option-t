import test from 'ava';

import { createSome, createNone } from '../../__dist/cjs/Option';

test('self is `None`', function (t) {
    const none = createNone();
    // @ts-expect-error ts-migrate(2345) FIXME: Type 'undefined' is not assignable to type 'Option... Remove this comment to see the full error message
    const option = none.flatMap(function () {
        t.fail('the passed function should not be called');
        return undefined;
    });
    t.is(option.isNone, true);
});

test('self is `Some<T>`, callback returns `None`', function (t) {
    const some = createSome(1);

    const option = some.flatMap(function () {
        return createNone();
    });

    t.is(option.isNone, true);
});

test('self is `Some<T>`, callback returns `Some<T>`', function (t) {
    const EXPECTED = '1';
    const some = createSome(1);

    const option = some.flatMap(function (val) {
        // @ts-expect-error ts-migrate(2367) FIXME: This condition will always return 'true' since the... Remove this comment to see the full error message
        t.is(val !== EXPECTED, true);
        return createSome(EXPECTED);
    });
    t.is(option.isSome, true);
    t.is(option.unwrap(), EXPECTED);
});

test("self is `Some<T>`, `fn` don't returns `Option<T>`", function (t) {
    const some = createSome(1);
    t.throws(
        () => {
            // @ts-expect-error ts-migrate(2345) FIXME: Type 'string' is not assignable to type 'Option<un... Remove this comment to see the full error message
            some.flatMap(function (val) {
                const rv = 'hoge';
                // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"hoge"' is not assignable to par... Remove this comment to see the full error message
                t.not(val, rv);
                return rv;
            });
        },
        {
            instanceOf: TypeError,
            message: "Option<T>.flatMap()' param `fn` should return `Option<T>`.",
        }
    );
});
