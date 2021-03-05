import test from 'ava';

import { createSome, createNone } from '../../__dist/cjs/Option';

test('unwrap `Some<T>`', function (t) {
    const EXPECTED = 1;
    const option = createSome(EXPECTED);
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    t.is(option.expect(), EXPECTED, 'should get the inner');
});

test('unwrap `None`', function (t) {
    const EXPECTED = 'barfoo';

    const none = createNone();
    t.throws(
        () => {
            none.expect(EXPECTED);
        },
        {
            instanceOf: TypeError,
            message: EXPECTED,
        }
    );
});
