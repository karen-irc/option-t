import * as assert from 'assert';

import { loadJSON } from '../../json.mjs';

function filterJSDir(histricalPathInfo) {
    assert.ok(Array.isArray(histricalPathInfo));

    const jsDir = histricalPathInfo.filter((filepath) => {
        if (!(/^(cjs|esm|lib)\//u).test(filepath)) {
            return false;
        }

        if (!(/^.+\.(js|mjs|cjs)$/u).test(filepath)) {
            return false;
        }

        return true;
    });
    return jsDir;
}

export async function loadHistoricalPathInfo(baseDir, filename) {
    const histricalPathInfo = await loadJSON(baseDir, filename);
    const histricalJSPathList = filterJSDir(histricalPathInfo);
    return histricalJSPathList;
}

export function addHistoricalPathToExportsFields(o, histricalJSPathList) {
    // https://nodejs.org/api/esm.html
    for (const file of histricalJSPathList) {
        const filepath = `./${file}`;
        // eslint-disable-next-line no-param-reassign
        o[filepath] = filepath;

        // Use cjs for lib/
        if (filepath.startsWith('./lib/') && filepath.endsWith('.mjs')) {
            continue;
        }

        const filepathWithoutExtension = filepath.replace(/\.(js|mjs|cjs)$/u, '');
        // eslint-disable-next-line no-param-reassign
        o[filepathWithoutExtension] = filepath;
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

    handleSpecialCaseOfNodeModuleResolution(DIR_SUBPATH.map((path) => `cjs/${path}`), 'cjs');
    handleSpecialCaseOfNodeModuleResolution(DIR_SUBPATH.map((path) => `esm/${path}`), 'mjs');
    // Our defult is still commonjs. For lib/, we should use `.cjs`.
    handleSpecialCaseOfNodeModuleResolution(DIR_SUBPATH.map((path) => `lib/${path}`), 'cjs');
}
