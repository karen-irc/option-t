import test from 'ava';

const {
    createSome,
    createNone,
    isSome,
    isNone,
} = require('../../__dist/cjs/PlainOption/Option');
const {
    createOk,
    createErr,
    isOk,
    isErr,
} = require('../../__dist/cjs/PlainResult/Result');


const FUNC_TABLE = [
    [createSome, isOk],
    [createNone, isErr],
    [createOk, isSome],
    [createErr, isNone],
];

for (const [factory, typeguardFn] of FUNC_TABLE) {
    test(`The object generated by ${factory.name}() should be compatible with ${typeguardFn.name}()`, (t) => {
        const v = Symbol('');
        const input = factory(v);
        const actual = typeguardFn(input);
        t.is(actual, true);
    });
}
