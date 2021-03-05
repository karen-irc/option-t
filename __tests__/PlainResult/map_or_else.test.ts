import test from 'ava';

import { createOk, createErr } from '../../__dist/cjs/PlainResult/Result';

import { mapOrElseForResult } from '../../__dist/cjs/PlainResult/mapOrElse';

const PLAN_COUNT = 2;

test('Ok<T>', (t) => {
    const INITIAL = 1;
    const EXPECTED = 3;

    t.plan(PLAN_COUNT);

    const input = createOk(INITIAL);
    const r = mapOrElseForResult(
        input,
        (_e) => {
            t.fail(`don't enter this path`);
        },
        (v) => {
            t.is(v, INITIAL, 'the argument');
            return EXPECTED;
        }
    );

    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '3' is not assignable to paramete... Remove this comment to see the full error message
    t.is(r, 3, 'the return value');
});

test('Err<E>', (t) => {
    const INITIAL = 1;
    const EXPECTED = 3;

    t.plan(PLAN_COUNT);

    const input = createErr(INITIAL);
    const r = mapOrElseForResult(
        input,
        (e) => {
            t.is(e, INITIAL, 'the argument');
            return EXPECTED;
        },
        // @ts-expect-error ts-migrate(2345) FIXME: Type 'void' is not assignable to type 'number'.
        (_v) => {
            t.fail(`don't enter this path`);
        }
    );

    t.is(r, 3, 'the return value');
});
