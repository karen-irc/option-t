import test from 'ava';

import { createSome, createNone, isNone, isSome } from '../../__dist/cjs/PlainOption/Option';
import { andThenForOption } from '../../__dist/cjs/PlainOption/andThen';
import { unwrapOption } from '../../__dist/cjs/PlainOption/unwrap';

test('src is `None`', (t) => {
    t.plan(1);

    const src = createNone();

    // @ts-expect-error ts-migrate(2345) FIXME: Type 'void' is not assignable to type 'Option<unkn... Remove this comment to see the full error message
    const result = andThenForOption(src, (_) => {
        t.fail('the passed function should not be called');
    });

    t.is(isNone(result), true);
});

test('src is `Some<T>`, callback returns `None`', (t) => {
    t.plan(2);

    const EXPECTED = Symbol('expected');
    const src = createSome(EXPECTED);

    const result = andThenForOption(src, (s) => {
        t.is(s, EXPECTED);
        return createNone();
    });

    t.is(isNone(result), true);
});

test('src is `Some<T>`, callback returns `Some<T>`', (t) => {
    t.plan(3);

    const EXPECTED = Symbol('expected');
    const src = createSome(EXPECTED);

    const result = andThenForOption(src, (s) => {
        t.is(s, EXPECTED);
        return createSome(EXPECTED);
    });

    t.is(isSome(result), true);
    t.is(unwrapOption(result), EXPECTED);
});

test("src is `Some<T>`, callback don't returns `Option<T>`", (t) => {
    t.plan(2);

    const EXPECTED = Symbol('expected');
    const src = createSome(EXPECTED);

    // @ts-expect-error ts-migrate(2345) FIXME: Type 'number' is not assignable to type 'Option<un... Remove this comment to see the full error message
    const result = andThenForOption(src, (s) => {
        t.is(s, EXPECTED);

        return 1;
    });

    // This is design and we recommend to use TypeScript or other static type checking.
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '1' is not assignable to paramete... Remove this comment to see the full error message
    t.is(result, 1, `At this moment, we don't do run-time checking for the return value`);
});
