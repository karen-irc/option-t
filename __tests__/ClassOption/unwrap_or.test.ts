import test from 'ava';

import { createSome, createNone } from '../../__dist/cjs/Option';

test('self is `None`', function (t) {
    const EXPECTED = 1;

    const option = createNone();
    const result = option.unwrapOr(EXPECTED);
    t.is(result, EXPECTED);
});

test('self is `Some<T>`', function (t) {
    const EXPECTED = 1;
    const DEFAULT = 10;

    t.not(EXPECTED, DEFAULT);

    const option = createSome(EXPECTED);
    const result = option.unwrapOr(DEFAULT);
    t.is(result, EXPECTED, 'shoule be the wrapped value');
});
