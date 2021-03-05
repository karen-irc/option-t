import test from 'ava';

import { createOk, createErr } from '../../../__dist/cjs/PlainResult/Result';
import { expectIsOk } from '../../../__dist/cjs/PlainResult/expect';

test('input=Ok(T), expect=Ok(T)', (t) => {
    const EXPECTED = Symbol('expected');

    const input = createOk(EXPECTED);

    let actual;
    t.notThrows(() => {
        actual = expectIsOk(input, 'do not throw any errors');
    });

    t.is(actual, EXPECTED);
});

test('input=Err(E), expect=Ok(T)', (t) => {
    const NOT_EXPECTED = Symbol('not expected');

    const input = createErr(NOT_EXPECTED);

    const MSG = 'throw if the input is not expected';
    t.throws(
        () => {
            expectIsOk(input, MSG);
        },
        {
            instanceOf: TypeError,
            message: MSG,
        }
    );
});
