import test from 'ava';

import { createSome, createNone } from '../../__dist/cjs/Option';

test('self is `None`, param is `Some<T>`', function (t) {
    const EXPECTED = 1;
    const none = createNone();
    const option = none.or(createSome(EXPECTED));
    t.is(option.isSome, true, 'the returned value shoule be `Some<T>`: 1');
    t.is(option.unwrap(), EXPECTED, 'the returned value shoule be `Some<T>`: 2');
});

test('self is `None`, param is `None`', function (t) {
    const none = createNone();
    const option = none.or(createNone());
    t.is(option.isNone, true, 'the returned value shoule be `None`');
});

test('self is `Some<T>`, param is `Some<T>`', function (t) {
    const EXPECTED = 1;

    const some = createSome(EXPECTED);
    const option = some.or(createSome(3));

    t.is(option.isSome, true, 'the returned value shoule be `Some<T>`: 1');
    t.is(option.unwrap(), EXPECTED, 'the returned value shoule be `Some<T>`: 2');
});

test('self is `Some<T>`, param is `None`', function (t) {
    const EXPECTED = 1;
    const some = createSome(EXPECTED);
    const option = some.or(createNone());
    t.is(option.isSome, true, 'the returned value shoule be `Some<T>`: 1');
    t.is(option.unwrap(), EXPECTED, 'the returned value shoule be `Some<T>`: 2');
});
