import * as assert from 'assert';
import { promises as fs } from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const THIS_FILENAME = fileURLToPath(import.meta.url);
const THIS_DIRNAME = path.dirname(THIS_FILENAME);

function parseJSON(text) {
    try {
        const o = JSON.parse(text);
        return o;
    }
    catch (_e) {
        return null;
    }
}

async function testAllowToLoadFileAsESM(expectedSet) {
    const hasError = [];
    const susccess = [];
    for await (const filename of expectedSet) {
        try {
            await import(filename);
            expectedSet.delete(filename);
        }
        catch (e) {
            hasError.push(filename);
            console.error(e);
        }
    }

    assert.deepStrictEqual([], susccess, 'Should be success to load all ES Modules');
    assert.deepStrictEqual([], hasError, 'Unexpected files which could not load as ES Module');
}

(async function main() {
    console.log(`====== This script tests whether the mjs' import path is correctly ======`);

    const OUTDIR = process.env.OUTDIR;
    assert.strictEqual(typeof OUTDIR, 'string', '$OUTDIR envvar should be string');

    const json = await fs.readFile(path.resolve(THIS_DIRNAME, './pkg_files.json'), {
        encoding: 'utf8',
        flag: 'r',
    });
    const files = parseJSON(json);
    assert.notStrictEqual(files, null, 'Fail to parse the file list snapshot');

    const mjsInEsmDir = Object.keys(files).filter((filename) => {
        return filename.endsWith('.mjs') && filename.startsWith('esm/');
    });

    const EXPECTED_FILE_SET = new Set(mjsInEsmDir.map((filename) => {
        const fullpath = path.resolve(OUTDIR, filename);
        return fullpath;
    }));
    assert.notStrictEqual(EXPECTED_FILE_SET.size, 0, 'The expected file list must not be empty');

    await testAllowToLoadFileAsESM(EXPECTED_FILE_SET);
})().catch((e) => {
    console.error(e);
    process.exit(1);
});
