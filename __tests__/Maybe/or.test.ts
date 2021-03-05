import test from 'ava';

import { orForMaybe } from '../../__dist/cjs/Maybe/or';
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
    nonNullableValueList.push([undefined, value, value]);
    nonNullableValueList.push([value, undefined, value]);
}

const list = [
    ...nonNullableValueList,
    [null, RIGHT, RIGHT],
    [undefined, RIGHT, RIGHT],
    [LEFT, RIGHT, LEFT],
    [LEFT, null, LEFT],
    [LEFT, undefined, LEFT],
    [null, null, null],
    [null, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, null, null],
];

for (const [a, b, expected] of list) {
    test(`a=${String(a)}, b=${String(b)}`, (t) => {
        t.is(orForMaybe(a, b), expected);
    });
}
