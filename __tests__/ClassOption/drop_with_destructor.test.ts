import test from 'ava';

import { createSome, createNone } from '../../__dist/cjs/Option';

test('Some<T>', function (t) {
    t.plan(3);

    const EXPECTED = 1;
    function destructor(v: any) {
        t.pass('should be called with the destructor');
        t.is(v, EXPECTED, 'should be called with the argument');
    }

    const option = createSome(EXPECTED);
    option.drop(destructor);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'toJSON' does not exist on type 'Some<num... Remove this comment to see the full error message
    t.is(option.toJSON().value, null, 'the inner should be freed');
});

test('None', function (t) {
    function destructor() {
        t.fail('should not be called with the destructor');
    }

    const option = createNone();
    option.drop(destructor);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'toJSON' does not exist on type 'None<unk... Remove this comment to see the full error message
    t.is(option.toJSON().value, null, 'the inner should be freed');
});
