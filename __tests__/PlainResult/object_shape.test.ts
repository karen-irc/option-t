import test from 'ava';

import { createOk, createErr } from '../../__dist/cjs/PlainResult';

test('The shape of PlainResult::Ok', (t) => {
    const INNER_VAL = 10;

    const actual = createOk(INNER_VAL);

    t.true(actual.ok, 'Ok.ok');
    t.is(actual.val, INNER_VAL, 'Ok.val');
    t.is(actual.err, undefined, 'Ok.err');

    t.true(
        // eslint-disable-next-line no-prototype-builtins
        actual.hasOwnProperty('err'),
        "`err` should be added on creating this object to stabilize object's Shape/Structure/Hidden Class"
    );
});

test('The shape of PlainResult::Err', (t) => {
    const INNER_VAL = 10;

    const actual = createErr(INNER_VAL);

    t.false(actual.ok, 'Err.ok');
    t.is(actual.val, undefined, 'Err.val');

    t.true(
        // eslint-disable-next-line no-prototype-builtins
        actual.hasOwnProperty('val'),
        "`val` should be added on creating this object to stabilize object's Shape/Structure/Hidden Class"
    );
    t.is(actual.err, INNER_VAL, 'Err.err');
});
