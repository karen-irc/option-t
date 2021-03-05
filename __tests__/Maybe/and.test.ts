import test from 'ava';

import { andForMaybe } from '../../__dist/cjs/Maybe/and';
import { nonNullableValue } from '../utils';

const LEFT = Symbol('a');
const RIGHT = Symbol('b');

const nonNullableValueList = [];
for (const value of nonNullableValue) {
    const LEFT = Symbol('a');
    const RIGHT = Symbol('b');
    nonNullableValueList.push([value, RIGHT, RIGHT]);
    nonNullableValueList.push([LEFT, value, value]);
    nonNullableValueList.push([value, value, value]);
    nonNullableValueList.push([null, value, null]);
    nonNullableValueList.push([value, null, null]);
    nonNullableValueList.push([undefined, value, undefined]);
    nonNullableValueList.push([value, undefined, undefined]);
}

const list = [
    ...nonNullableValueList,
    [null, RIGHT, null],
    [undefined, RIGHT, undefined],
    [LEFT, RIGHT, RIGHT],
    [LEFT, null, null],
    [LEFT, undefined, undefined],
    [null, null, null],
    [null, undefined, null],
    [undefined, undefined, undefined],
    [undefined, null, undefined],
];

for (const [a, b, expected] of list) {
    test(`a=${String(a)}, b=${String(b)}`, (t) => {
        t.is(andForMaybe(a, b), expected);
    });
}
