import test from 'ava';

import { createOk, createErr } from '../../__dist/cjs/PlainResult/Result';
import { flattenForResult } from '../../__dist/cjs/PlainResult/flatten';

test('input is Ok(Ok(T))', (t) => {
    const VALUE_T = Symbol('value');
    const inner = createOk(VALUE_T);

    const input = createOk(inner);
    const actual = flattenForResult(input);

    t.true(actual.ok, 'should be Ok');
    t.is(actual.val, VALUE_T, 'should be the wrapped value');
});

test('input is Ok(Err(E))', (t) => {
    const VALUE_E = Symbol('error');
    const inner = createErr(VALUE_E);

    const input = createOk(inner);
    const actual = flattenForResult(input);

    t.false(actual.ok, 'should be Err');
    t.is(actual.err, VALUE_E, 'should be the wrapped error');
});

test('input is Err(E)', (t) => {
    const VALUE_E = Symbol('error');
    const input = createErr(VALUE_E);
    const actual = flattenForResult(input);

    t.false(actual.ok, 'should be Err');
    t.is(actual.err, VALUE_E, 'should be the wrapped error');
});

test('this should remove only one nest level', (t) => {
    const VALUE_T = Symbol('value');
    const input0 = createOk(VALUE_T);
    const input1 = createOk(input0);
    const input2 = createOk(input1);

    const actual = flattenForResult(input2);
    t.is(actual, input1, `don't unwrap the input recursively`);
});
