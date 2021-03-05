/* eslint-disable no-param-reassign */
import test from 'ava';

import { createOk, createErr } from '../../../__dist/cjs/PlainResult/Result';
import { unsafeDropErrForResult } from '../../../__dist/cjs/PlainResult/drop';

test('with Ok', (t) => {
    const actual = createOk(1);

    unsafeDropErrForResult(actual, (_err) => {
        t.fail('Do not enter this path.');
    });

    t.is(actual.ok, true);
});

test('with Err', (t) => {
    const expected = Symbol('');
    const actual = createErr(1);

    unsafeDropErrForResult(actual, (err) => {
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'true' is not assignable to type 'false'.
        err.ok = true;
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'unique symbol' is not assignable to type 'nu... Remove this comment to see the full error message
        err.err = expected;
    });

    t.is(actual.ok, true);
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'unique symbol' is not assignable... Remove this comment to see the full error message
    t.is(actual.err, expected);
});
