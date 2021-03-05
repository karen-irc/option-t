import test from 'ava';

import { orForNullable } from '../../__dist/cjs/Nullable/or';
import { nonNullableValue } from '../utils';

const LEFT = Symbol('a');
const RIGHT = Symbol('b');

const nonNullableValueList = [];
for (const value of nonNullableValue) {
    const LEFT = Symbol('a');
    const RIGHT = Symbol('b');
    nonNullableValueList.push([value, RIGHT, value]);
    nonNullableValueList.push([LEFT, value, LEFT]);
    nonNullableValueList.push([value, value, value]);
    nonNullableValueList.push([null, value, value]);
    nonNullableValueList.push([value, null, value]);
    nonNullableValueList.push([undefined, value, undefined]);
    nonNullableValueList.push([value, undefined, value]);
}

const list = [
    ...nonNullableValueList,
    [null, RIGHT, RIGHT],
    [undefined, RIGHT, undefined],
    [LEFT, RIGHT, LEFT],
    [LEFT, null, LEFT],
    [LEFT, undefined, LEFT],
    [null, null, null],
    [null, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, null, undefined],
];

for (const [a, b, expected] of list) {
    test(`a=${String(a)}, b=${String(b)}`, (t) => {
        t.is(orForNullable(a, b), expected);
    });
}
