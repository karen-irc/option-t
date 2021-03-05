import test from 'ava';

import { createSome, createNone, isSome, isNone } from '../../__dist/cjs/PlainOption/Option';
import { transposeForOption } from '../../__dist/cjs/PlainOption/transpose';
import { createOk, createErr, isOk, isErr } from '../../__dist/cjs/PlainResult/Result';

test('input is Some<Ok<T>>, the result should be Ok(Some(x))', (t) => {
    const val = Symbol('val');
    const inner = createOk(val);
    const input = createSome(inner);
    const actual = transposeForOption(input);

    const actualInner = actual.val;

    t.true(isOk(actual), 'the outer should be Ok<Some<T>>');
    // @ts-expect-error ts-migrate(2345) FIXME: Type 'undefined' is not assignable to type 'Option... Remove this comment to see the full error message
    t.true(isSome(actualInner), 'the inner should be Some<T>');
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    t.is(actualInner.val, val, "the inner's inner should T");
    t.not(actual, input, 'the outer should be different from the input');
    // @ts-expect-error ts-migrate(2345) FIXME: Type 'unique symbol' is not assignable to type 'Op... Remove this comment to see the full error message
    t.not(actual, inner, "the outer should be different from the input's inner");
    // @ts-expect-error ts-migrate(2345) FIXME: Type 'Ok<unique symbol>' is not assignable to type... Remove this comment to see the full error message
    t.not(actualInner, input, 'the inner should be different from the input');
    t.not(actualInner, inner, "the inner should be different from the input' inner");
});

test('input is Some<Err<E>>, the result should be Err(e)', (t) => {
    const err = Symbol('err');
    const inner = createErr(err);
    const input = createSome(inner);
    const actual = transposeForOption(input);

    t.true(isErr(actual), 'the outer should Err<E>');
    t.is(actual.err, err, 'the inner should be E');
    t.not(actual, inner, "the outer should be different from the input's inner");
});

test('input is None, the result should be Ok(None)', (t) => {
    const input = createNone();
    const actual = transposeForOption(input);

    const actualInner = actual.val;

    t.true(isOk(actual), 'the outer should Ok(None)');
    // @ts-expect-error ts-migrate(2345) FIXME: Type 'undefined' is not assignable to type 'Option... Remove this comment to see the full error message
    t.true(isNone(actualInner), 'the inner should be None');
    t.not(actualInner, input, 'the inner should be different from the input');
});
