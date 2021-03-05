import test from 'ava';

import { createSome, createNone, OptionBase } from '../../__dist/cjs/Option';

test('`Some<T>`', function (t) {
    const option = createSome(1);
    t.is(option instanceof OptionBase, true);
});

test('`None`', function (t) {
    const option = createNone();
    t.is(option instanceof OptionBase, true);
});
