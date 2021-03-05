import test from 'ava';

import { createSome, createNone } from '../../__dist/cjs/PlainOption';
import { okOrForPlainOption } from '../../__dist/cjs/PlainOption/okOr';
import { unwrapErrFromResult, unwrapFromResult } from '../../__dist/cjs/PlainResult/unwrap';

test('the input is Some', (t) => {
    const OK_VAL = Symbol('ok');
    const ERR_VAL = Symbol('err');

    const input = createSome(OK_VAL);
    const actual = okOrForPlainOption(input, ERR_VAL);

    t.true(actual.ok, 'the actual should be Ok');
    t.is(unwrapFromResult(actual), OK_VAL, 'the actual should be wrap the expect');
});

test('the input is None', (t) => {
    const ERR_VAL = Symbol('err');

    const input = createNone();
    const actual = okOrForPlainOption(input, ERR_VAL);

    t.false(actual.ok, 'the actual should be Err');
    t.is(unwrapErrFromResult(actual), ERR_VAL, 'the actual should be wrap the expect');
});
