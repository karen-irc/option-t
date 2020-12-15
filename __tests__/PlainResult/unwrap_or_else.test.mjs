import test from 'ava';

import { createOk, createErr } from '../../__dist/esm/PlainResult/Result.mjs';
import { unwrapOrElseFromResult } from '../../__dist/esm/PlainResult/unwrapOrElse.mjs';

const VALUE_T = Math.random();
const DEFAULT_VAL = Math.random();
const ERROR_E = new Error();

test('input is Ok(T)', (t) => {
    t.plan(1);

    const input = createOk(VALUE_T);
    const actual = unwrapOrElseFromResult(input, () => {
        t.pass(true);
        return DEFAULT_VAL;
    });
    t.is(actual, VALUE_T);
});

test('input is Err(E)', (t) => {
    t.plan(2);

    const input = createErr(ERROR_E);
    const actual = unwrapOrElseFromResult(input, () => {
        t.pass(true);
        return DEFAULT_VAL;
    });
    t.is(actual, DEFAULT_VAL);
});
