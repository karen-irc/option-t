import test from 'ava';

import * as PlainResult from '../../__dist/cjs/PlainResult';

test('PlainResult::createOk', (t) => {
    const EXPECTED = Symbol('ok');
    const actual = PlainResult.createOk(EXPECTED);

    t.true(PlainResult.isOk(actual), 'actual should be Ok');
    t.is(actual.val, EXPECTED, 'actual should be expected');
});

test('PlainResult::createErr', (t) => {
    const EXPECTED = Symbol('error');
    const actual = PlainResult.createErr(EXPECTED);

    t.true(PlainResult.isErr(actual), 'actual should be Err');
    t.is(actual.err, EXPECTED, 'actual should be expected');
});
