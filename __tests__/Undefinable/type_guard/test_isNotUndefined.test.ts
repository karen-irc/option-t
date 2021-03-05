import test from 'ava';
import * as Undefinable from '../../../__dist/cjs/Undefinable';

test('Undefinable::isNotUndefined', (t) => {
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
        [null, true],
    ];

    testcase.forEach((test) => {
        const input = test[0];
        const expected = test[1];

        t.is(
            Undefinable.isNotUndefined(input),
            expected,
            `\`${String(input)}\` should be \`${String(expected)}\``
        );
    });
});
