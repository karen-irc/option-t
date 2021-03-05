/* eslint-env node */

const numeric = [-1, 0, 1];
const boolean = [true, false];
const str = ['', 'bar'];

export const objectVal = [{ bar: 1 }, [1, 2, 3]];

export const nonSerializableObjectVal = [
    new Set(),
    new Map(),
    new WeakSet(),
    new WeakMap(),
    new Promise((resolve) => resolve()),
];

export const funcVal = [function () {}];
export const symbolVal = [Symbol('')];

export const primitiveVal = [...numeric, ...boolean, ...str, null];

export const undefinedVal = [undefined];

export const nonNullableValue = [
    ...numeric,
    ...boolean,
    ...str,
    ...objectVal,
    ...nonSerializableObjectVal,
    ...funcVal,
    ...symbolVal,
];
