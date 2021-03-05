import test from 'ava';

import { createSome, createNone } from '../../__dist/cjs/Option';

import {
    primitiveVal,
    objectVal,
    nonSerializableObjectVal,
    funcVal,
    symbolVal,
    undefinedVal,
} from '../utils';

const param = primitiveVal
    // @ts-expect-error ts-migrate(2769) FIXME: Type '(number[] | { bar: number; })[]' is not assi... Remove this comment to see the full error message
    .concat(objectVal)
    // @ts-expect-error ts-migrate(2769) FIXME: Type '(WeakSet<object> | WeakMap<object, any> | Pr... Remove this comment to see the full error message
    .concat(nonSerializableObjectVal)
    // @ts-expect-error ts-migrate(2769) FIXME: Type '(() => void)[]' is not assignable to type 's... Remove this comment to see the full error message
    .concat(funcVal)
    // @ts-expect-error ts-migrate(2769) FIXME: Type 'symbol[]' is not assignable to type 'string'... Remove this comment to see the full error message
    .concat(symbolVal)
    // @ts-expect-error ts-migrate(2769) FIXME: Type 'undefined[]' is not assignable to type 'stri... Remove this comment to see the full error message
    .concat(undefinedVal);
param.forEach(function (value) {
    const type = typeof value;
    const label = 'Some(T): type: ' + type + ', value: `' + String(value) + '`';

    test(label, function (t) {
        const option = createSome(value);

        t.is(option.isSome, true, 'should be `Some<T>`');
        t.is(option.isNone, false, 'should not be `None`');
        t.is(option.isSome, true, '`isSome` should be expected');
        t.is(option.isNone, false, '`isNone` should be expected');
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'toJSON' does not exist on type 'Some<str... Remove this comment to see the full error message
        t.is(option.toJSON().value, value, 'the wrapped value should be expected');
    });
});

test('`None`', function (t) {
    const option = createNone();

    t.is(option.isNone, true, 'should be `None`');
    t.is(option.isSome, false, 'should not be `Some<T>`');
    t.is(option.isSome, false, '`isSome` should be expected');
    t.is(option.isNone, true, '`isNone` should be expected');
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'toJSON' does not exist on type 'None<unk... Remove this comment to see the full error message
    t.is(option.toJSON().value, undefined, '`value` should be expected');
});
