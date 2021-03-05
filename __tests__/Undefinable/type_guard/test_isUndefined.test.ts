import test from 'ava';
import * as Undefinable from '../../../__dist/cjs/Undefinable';

test('Undefinable::isUndefined', (t) => {
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
        [null, false],
    ];

    testcase.forEach((test) => {
        const input = test[0];
        const expected = test[1];

        t.is(
            Undefinable.isUndefined(input),
            expected,
            `\`${String(input)}\` should be \`${String(expected)}\``
        );
    });
});
