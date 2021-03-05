import test from 'ava';

import { orForUndefinable } from '../../__dist/cjs/Undefinable/or';
import { nonNullableValue } from '../utils';

test('Undefinable::or', (t) => {
    const LEFT = Symbol('a');
    const RIGHT = Symbol('b');

    const nonNullableValueList = [];
    for (const value of nonNullableValue) {
        const LEFT = Symbol('a');
        const RIGHT = Symbol('b');
        nonNullableValueList.push([value, RIGHT, value]);
        nonNullableValueList.push([LEFT, value, LEFT]);
        nonNullableValueList.push([value, value, value]);
        nonNullableValueList.push([null, value, null]);
        nonNullableValueList.push([value, null, value]);
        nonNullableValueList.push([undefined, value, value]);
        nonNullableValueList.push([value, undefined, value]);
    }

    const list = [
        ...nonNullableValueList,
        [null, RIGHT, null],
        [undefined, RIGHT, RIGHT],
        [LEFT, RIGHT, LEFT],
        [LEFT, null, LEFT],
        [LEFT, undefined, LEFT],
        [null, null, null],
        [null, undefined, null],
        [undefined, undefined, undefined],
        [undefined, null, null],
    ];

    for (const [a, b, expected] of list) {
        t.is(orForUndefinable(a, b), expected, `a=${String(a)}, b=${String(b)}`);
    }
});
