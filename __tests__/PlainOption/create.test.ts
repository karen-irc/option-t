import test from 'ava';

import { createSome, createNone, isSome, isNone } from '../../__dist/cjs/PlainOption';

test('createSome', (t) => {
    const EXPECTED = Symbol('');
    const actual = createSome(EXPECTED);

    t.true(isSome(actual), 'actual should be Some');
    t.is(actual.val, EXPECTED, 'actual should be expected');
});

test('createNone', (t) => {
    const actual = createNone();

    t.true(isNone(actual));
});
