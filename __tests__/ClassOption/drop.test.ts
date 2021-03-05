import test from 'ava';

import { createSome, createNone } from '../../__dist/cjs/Option';

test('drop `Some<T>`', function (t) {
    const option = createSome(1);
    option.drop();

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'toJSON' does not exist on type 'Some<num... Remove this comment to see the full error message
    t.is(option.toJSON().value, null, 'the inner should be freed');
});

test('drop `None`', function (t) {
    const option = createNone();
    option.drop();

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'toJSON' does not exist on type 'None<unk... Remove this comment to see the full error message
    t.is(option.toJSON().value, null, 'the inner should be freed');
});
