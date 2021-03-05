import test from 'ava';

import { andForUndefinable } from '../../__dist/cjs/Undefinable/and';
import { nonNullableValue } from '../utils';

test('Undefinable::and', (t) => {
    const LEFT = Symbol('a');
    const RIGHT = Symbol('b');

    const nonNullableValueList = [];
    for (const value of nonNullableValue) {
        const LEFT = Symbol('a');
        const RIGHT = Symbol('b');
        nonNullableValueList.push([value, RIGHT, RIGHT]);
        nonNullableValueList.push([LEFT, value, value]);
        nonNullableValueList.push([value, value, value]);
        nonNullableValueList.push([null, value, value]);
        nonNullableValueList.push([value, null, null]);
        nonNullableValueList.push([undefined, value, undefined]);
        nonNullableValueList.push([value, undefined, undefined]);
    }

    const list = [
        ...nonNullableValueList,
        [null, RIGHT, RIGHT],
        [undefined, RIGHT, undefined],
        [LEFT, RIGHT, RIGHT],
        [LEFT, null, null],
        [LEFT, undefined, undefined],
        [null, null, null],
        [null, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, null, undefined],
    ];

    for (const [a, b, expected] of list) {
        t.is(andForUndefinable(a, b), expected, `a=${String(a)}, b=${String(b)}`);
    }
});
