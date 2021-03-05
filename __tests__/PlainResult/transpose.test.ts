import test from 'ava';

import { createSome, createNone, isSome, isNone } from '../../__dist/cjs/PlainOption/Option';
import { createOk, createErr, isOk, isErr } from '../../__dist/cjs/PlainResult/Result';
import { transposeForResult } from '../../__dist/cjs/PlainResult/transpose';

test('input is Ok<Some<T>>, the result should be Some(Ok(v))', (t) => {
    const val = Symbol('val');
    const inner = createSome(val);
    const input = createOk(inner);
    const actual = transposeForResult(input);

    const actualInner = actual.val;

    t.true(isSome(actual), 'the outer should Some<Ok<T>>');
    // @ts-expect-error ts-migrate(2345) FIXME: Type 'undefined' is not assignable to type 'Result... Remove this comment to see the full error message
    t.true(isOk(actualInner), 'the inner should Ok<T>');
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    t.is(actualInner.val, val, "the inner's inner should T");
    t.not(actual, input, 'the outer should be different from the input');
    // @ts-expect-error ts-migrate(2345) FIXME: Type 'unique symbol' is not assignable to type 'Re... Remove this comment to see the full error message
    t.not(actual, inner, "the outer should be different from the input's inner");
    // @ts-expect-error ts-migrate(2345) FIXME: Type 'Some<unique symbol>' is not assignable to ty... Remove this comment to see the full error message
    t.not(actualInner, input, 'the inner should be different from the input');
    t.not(actualInner, inner, "the inner should be different from the input' inner");
});

test('input is Ok<None>, the result should be None', (t) => {
    const inner = createNone();
    const input = createOk(inner);
    const actual = transposeForResult(input);

    t.true(isNone(actual), 'the outer should None');
    t.not(actual, inner, 'the outer  should be different from the input');
});

test('input is Err<E>, the result should be Some(Err(e))', (t) => {
    const inner = Symbol('err');
    const input = createErr(inner);
    const actual = transposeForResult(input);

    const actualInner = actual.val;

    t.true(isSome(actual), 'the outer should Some<Err<E>>');
    // @ts-expect-error ts-migrate(2345) FIXME: Type 'undefined' is not assignable to type 'Result... Remove this comment to see the full error message
    t.true(isErr(actualInner), 'the inner should Err<E>');
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    t.is(actualInner.err, inner, "the inner's inner should E");
    t.not(actualInner, input, 'the inner should be different from the input');
});
