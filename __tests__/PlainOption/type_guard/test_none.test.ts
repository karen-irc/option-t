import test from 'ava';

import * as PlainOption from '../../../__dist/cjs/PlainOption';

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
        },
        true,
    ],
];

for (const [input, expected] of testcase) {
    test(`\`${String(JSON.stringify(input))}\` should be \`${String(expected)}\``, (t) => {
        // @ts-expect-error ts-migrate(2345) FIXME: Type 'false' is not assignable to type 'Option<unk... Remove this comment to see the full error message
        t.is(PlainOption.isNone(input), expected);
    });
}
