import test from 'ava';

import { createSome, createNone } from '../../__dist/cjs/PlainOption/Option';
import { expectIsSome } from '../../__dist/cjs/PlainOption/expect';

test('input=Some', (t) => {
    const EXPECTED = Symbol('expected');

    const input = createSome(EXPECTED);

    let actual;
    t.notThrows(() => {
        actual = expectIsSome(input, 'do not throw any errors');
    });

    t.is(actual, EXPECTED);
});

test('input=None', (t) => {
    const input = createNone();

    const MSG = 'throw if the input is None';
    t.throws(
        () => {
            expectIsSome(input, MSG);
        },
        {
            instanceOf: TypeError,
            message: MSG,
        }
    );
});
