import test from 'ava';

import * as PlainResult from '../../../__dist/cjs/PlainResult';

const testcase = [
    [
        {
            ok: true,
            value: 1,
        },
        false,
    ],
    [
        {
            ok: false,
            err: '',
        },
        true,
    ],
];

for (const [input, expected] of testcase) {
    test(`\`${String(JSON.stringify(input))}\` should be \`${String(expected)}\``, (t) => {
        // @ts-expect-error ts-migrate(2345) FIXME: Type 'false' is not assignable to type 'Result<unk... Remove this comment to see the full error message
        t.is(PlainResult.isErr(input), expected);
    });
}
