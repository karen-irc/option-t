import test from 'ava';

import * as Nullable from '../../__dist/cjs/Nullable';

{
    const testcase = [
        [-1, true],
        [0, true],
        [1, true],
        [true, true],
        [false, true],
        ['', true],
        [{}, true],
        [[], true],
        [function () {}, true],
        [Symbol(''), true],
        [undefined, true],
        [null, false],
    ];

    testcase.forEach(([input, expected]) => {
        test(`isNotNull(): \`${String(input)} (typeof ${typeof input})\` should be \`${String(
            expected
        )}\``, (t) => {
            t.is(Nullable.isNotNull(input), expected);
        });
    });
}

{
    const testcase = [
        [-1, false],
        [0, false],
        [1, false],
        [true, false],
        [false, false],
        ['', false],
        [{}, false],
        [[], false],
        [function () {}, false],
        [Symbol(''), false],
        [undefined, false],
        [null, true],
    ];

    testcase.forEach(([input, expected]) => {
        test(`isNull(): \`${String(input)} (typeof ${typeof input})\` should be \`${String(
            expected
        )}\``, (t) => {
            t.is(Nullable.isNull(input), expected);
        });
    });
}
