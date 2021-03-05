import test from 'ava';

import { xorForNullable } from '../../__dist/cjs/Nullable/xor';

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
    testCase(SOME_VAL_A, SOME_VAL_B, null),
    testCase(SOME_VAL_A, null, SOME_VAL_A),
    testCase(null, SOME_VAL_B, SOME_VAL_B),
    testCase(null, null, null),

    testCase(undefined, undefined, null),
    testCase(undefined, null, undefined),
    testCase(null, undefined, undefined),
];

for (const { a, b, expected } of TABLE) {
    test(`a=${String(a)}, b=${String(b)}`, (t) => {
        const actual = xorForNullable(a, b);
        t.is(actual, expected, 'should be `' + String(expected) + '`');
    });
}
