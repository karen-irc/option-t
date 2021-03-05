import test from 'ava';

import { xorForUndefinable } from '../../__dist/cjs/Undefinable/xor';

const SOME_VAL_A = Symbol('some_val_a');
const SOME_VAL_B = Symbol('some_val_b');

function testCase(a: any, b: any, expected: any) {
    return {
        a,
        b,
        expected,
    };
}

const TABLE = [
    testCase(SOME_VAL_A, SOME_VAL_B, undefined),
    testCase(SOME_VAL_A, undefined, SOME_VAL_A),
    testCase(undefined, SOME_VAL_B, SOME_VAL_B),
    testCase(undefined, undefined, undefined),

    testCase(null, null, undefined),
    testCase(null, undefined, null),
    testCase(undefined, null, null),
];

for (const { a, b, expected } of TABLE) {
    test(`a=${String(a)}, b=${String(b)}`, (t) => {
        const actual = xorForUndefinable(a, b);
        t.is(actual, expected, 'should be `' + String(expected) + '`');
    });
}
