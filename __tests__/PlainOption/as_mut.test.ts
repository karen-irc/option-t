import test from 'ava';

import { createSome, createNone } from '../../__dist/cjs/PlainOption/Option';
import { asMutOption } from '../../__dist/cjs/PlainOption/asMut';

const FUNC_LIST = [createSome, createNone];

for (const factory of FUNC_LIST) {
    const funcname = factory.name;

    test(`asMutResult does not change the shape & object created by ${funcname}`, (t) => {
        const INT = Symbol('');
        const original = factory(INT);
        const actual = asMutOption(original);
        t.is(actual, original, 'should be same object');
        t.deepEqual(actual, original, 'should be the same shape');
    });
}
