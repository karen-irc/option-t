import test from 'ava';

import { createSome, createNone } from '../../__dist/cjs/Option';

test('self is `None`, param is `Some<T>`', function (t) {
    const none = createNone();
    const option = none.and(createSome(1));
    t.is(option.isNone, true);
});

test('self is `None`, param is `None`', function (t) {
    const none = createNone();
    const option = none.and(createNone());
    t.is(option.isNone, true, 'the returned value shoule be `None`');
});

test('self is `Some<T>`, param is `Some<T>`', function (t) {
    const EXPECTED = '1';

    const some = createSome(1);
    const option = some.and(createSome(EXPECTED));
    t.is(option.isSome, true, 'the returned value shoule be `Some<T>`: 1');
    t.is(option.unwrap(), EXPECTED, 'the returned value shoule be `Some<T>`: 2');
});

test('self is `Some<T>`, param is `None`', function (t) {
    const some = createSome(1);
    const option = some.and(createNone());

    t.is(option.isNone, true, 'the returned value shoule be `None`');
});
