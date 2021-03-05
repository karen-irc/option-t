import test from 'ava';

import * as Maybe from '../../__dist/cjs/Maybe';

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
        [undefined, false],
        [null, false],
    ];

    testcase.forEach(([input, expected]) => {
        test(`isSomeActual() \`${String(input)} (typeof ${typeof input})\` should be \`${String(
            expected
        )}\``, (t) => {
            t.is(Maybe.isNotNullAndUndefined(input), expected);
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
        [undefined, true],
        [null, true],
    ];

    testcase.forEach(([input, expected]) => {
        test(`isUndefinedOrNull() \`${String(
            input
        )} (typeof ${typeof input})\` should be \`${String(expected)}\``, (t) => {
            t.is(Maybe.isNullOrUndefined(input), expected);
        });
    });
}
