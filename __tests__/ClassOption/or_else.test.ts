import test from 'ava';

import { createSome, createNone } from '../../__dist/cjs/Option';

test('self is `None`, param returns `Some<T>`', function (t) {
    const EXPECTED = 1;
    const none = createNone();
    const option = none.orElse(function () {
        return createSome(EXPECTED);
    });

    t.is(option.isSome, true);
    t.is(option.unwrap(), EXPECTED);
});

test('self is `None`, param returns `None`', function (t) {
    const none = createNone();
    const option = none.orElse(function () {
        return createNone();
    });

    t.is(option.isNone, true);
});

test("self is `None`, param don't return `Option<T>`", function (t) {
    const none = createNone();

    t.throws(
        () => {
            // @ts-expect-error ts-migrate(2345) FIXME: Type 'string' is not assignable to type 'Option<un... Remove this comment to see the full error message
            none.orElse(function () {
                return 'barfoo';
            });
        },
        {
            instanceOf: TypeError,
            message: "Option<T>.orElse()' param `fn` should return `Option<T>`.",
        }
    );
});

test('self is `Some<T>`, param returns `Some<T>`', function (t) {
    const EXPECTED = 1;
    const some = createSome(EXPECTED);
    const option = some.orElse(function () {
        t.fail('shoule not call callback');
        return createSome(3);
    });

    t.is(option.isSome, true);
    t.is(option.unwrap(), EXPECTED);
});

test('self is `Some<T>`, param returns `None`', function (t) {
    const EXPECTED = 1;

    const some = createSome(EXPECTED);
    const option = some.orElse(function () {
        t.fail('shoule not call callback');
        return createNone();
    });
    t.is(option.isSome, true);
    t.is(option.unwrap(), EXPECTED);
});
