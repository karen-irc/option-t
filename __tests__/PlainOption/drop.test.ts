/* eslint-disable no-param-reassign */
import test from 'ava';

import { createSome, createNone } from '../../__dist/cjs/PlainOption/Option';
import { unsafeDropForOption } from '../../__dist/cjs/PlainOption/drop';

test('unsafeDropForOption() with Some', (t) => {
    const expected = Symbol('');
    const actual = createSome(null);
    unsafeDropForOption(actual, (v) => {
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'false' is not assignable to type 'true'.
        v.ok = false;
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'unique symbol' is not assignable to type 'nu... Remove this comment to see the full error message
        v.val = expected;
    });

    t.is(actual.ok, false);
    t.is(actual.val, expected);
});

test('unsafeDropForOption() with None', (t) => {
    const actual = createNone();
    unsafeDropForOption(actual, (_v) => {
        t.fail('Do not enter this path.');
    });

    t.is(actual.ok, false);
});
