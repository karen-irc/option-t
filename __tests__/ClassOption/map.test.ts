import test from 'ava';

import { createSome, createNone } from '../../__dist/cjs/Option';

test('self is `None`', function (t) {
    const none = createNone();
    const option = none.map(function (v) {
        t.fail('the passed function should not be called');
        return v;
    });

    t.is(option.isSome, false);
    t.is(option.isNone, true);
});

test('self is `Some<T>`', function (t) {
    const EXPECTED = '1';

    const some = createSome(1);
    const option = some.map(function (val) {
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"1"' is not assignable to parame... Remove this comment to see the full error message
        t.not(val, EXPECTED);
        return EXPECTED;
    });
    t.is(option.isSome, true);
    t.is(option.unwrap(), EXPECTED);
});
