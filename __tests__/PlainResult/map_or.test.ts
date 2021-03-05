import test from 'ava';

import { createOk, createErr } from '../../__dist/cjs/PlainResult/Result';

import { mapOrForResult } from '../../__dist/cjs/PlainResult/mapOr';

test('Ok<T>', (t) => {
    const INITIAL = 1;
    const NOT_EXPECTED = 2;
    const EXPECTED = 3;

    t.plan(2);

    const input = createOk(INITIAL);
    const r = mapOrForResult(input, NOT_EXPECTED, (v) => {
        t.is(v, INITIAL, 'the argument');
        return EXPECTED;
    });

    t.is(r, EXPECTED, 'the return value');
});

test('Err<E>', (t) => {
    const INITIAL = 1;
    const EXPECTED = 3;

    t.plan(1);

    const input = createErr(INITIAL);
    // @ts-expect-error ts-migrate(2345) FIXME: Type 'void' is not assignable to type '3'.
    const r = mapOrForResult(input, EXPECTED, (_v) => {
        t.fail(`don't enter this path`);
    });

    t.is(r, EXPECTED, 'the return value');
});
