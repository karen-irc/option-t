import test from 'ava';

import { createSome, createNone } from '../../__dist/esm/PlainOption/Option.mjs';
import { unwrapOrElseAsyncFromOption } from '../../__dist/esm/PlainOption/unwrapOrElseAsync.mjs';

const VALUE_T = Math.random();
const DEFAULT_VAL = Math.random();

test('input is Some(T)', async (t) => {
    t.plan(2);

    const input = createSome(VALUE_T);
    const result = unwrapOrElseAsyncFromOption(input, async () => {
        t.pass(false);
        return DEFAULT_VAL;
    });

    t.true(result instanceof Promise, 'result should be Promise');

    const actual = await result;
    t.is(actual, VALUE_T);
});

test('input is None', async (t) => {
    t.plan(3);

    const input = createNone();
    const result = unwrapOrElseAsyncFromOption(input, async () => {
        t.pass(true);
        return DEFAULT_VAL;
    });

    t.true(result instanceof Promise, 'result should be Promise');

    const actual = await result;
    t.is(actual, DEFAULT_VAL);
});

test('callback should return Promise', async (t) => {
    t.plan(2);

    await t.throwsAsync(
        async () => {
            const input = createNone();
            await unwrapOrElseAsyncFromOption(input, () => {
                t.pass();
                return createNone();
            });
        },
        {
            instanceOf: TypeError,
            message: '`recoverer` must return Promise',
        }
    );
});
