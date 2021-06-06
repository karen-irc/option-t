import * as assert from 'assert';

import { CompatExportEntry } from './ExportEntry.mjs';

export function addHistoricalPathToExportsFields(o, histricalJSPathSeq) {
    // https://nodejs.org/api/esm.html
    for (const original of histricalJSPathSeq) {
        assert.ok(original.isForCompat());

        const entry = new CompatExportEntry(original);
        const key = entry.key();
        const filepath = entry.filepath();
        // eslint-disable-next-line no-param-reassign
        o[key] = filepath;
    }

    const DIR_SUBPATH = [
        'Maybe',
        'Nullable',
        'PlainOption',
        'PlainResult',
        'Undefinable',
    ];

    const handleSpecialCaseOfNodeModuleResolution = (list, extension) => {
        for (const dirpath of list) {
            const key = `./${dirpath}`;

            // eslint-disable-next-line no-param-reassign
            o[key] = `${key}/index.${extension}`;
        }
    };

    handleSpecialCaseOfNodeModuleResolution(DIR_SUBPATH.map((path) => `cjs/${path}`), 'js');
    handleSpecialCaseOfNodeModuleResolution(DIR_SUBPATH.map((path) => `esm/${path}`), 'mjs');
}
