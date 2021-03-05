import test from 'ava';

import { createOk, createErr } from '../../../__dist/cjs/PlainResult/Result';
import { expectIsErr } from '../../../__dist/cjs/PlainResult/expect';

test('input=Ok(T), expect=Err(E)', (t) => {
    const NOT_EXPECTED = Symbol('not expected');

    const input = createOk(NOT_EXPECTED);

    const MSG = 'throw if the input is not expected';
    t.throws(
        () => {
            expectIsErr(input, MSG);
        },
        {
            instanceOf: TypeError,
            message: MSG,
        }
    );
});

test('input=Err(E), expect=Err(E)', (t) => {
    const EXPECTED = Symbol('expected');

    const input = createErr(EXPECTED);

    let actual;
    t.notThrows(() => {
        actual = expectIsErr(input, 'do not throw any errors');
    });

    t.is(actual, EXPECTED);
});
