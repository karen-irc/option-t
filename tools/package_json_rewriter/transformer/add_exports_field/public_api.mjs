import * as assert from 'assert';
import * as path from 'path';

class ExportEntity {
    constructor(key, path = undefined) {
        assert.strictEqual(key.startsWith('/'), false, `key (${key}) should not start with /`);
        assert.strictEqual(key.endsWith('/'), false, `key (${key}) should not end with /`);

        this._key = key;
        this._path = path;
    }

    key() {
        const k = `./${this._key}`;
        return k;
    }

    toJSON() {
        const p = this._path !== undefined ? this._path : this._key;

        const esm = `./esm/${p}.mjs`;
        const cjs = `./cjs/${p}.cjs`;

        // [By the document of Node.js v14.2](https://nodejs.org/api/esm.html#esm_resolution_algorithm),
        //  * Condition matching is applied in object order from first to last within the "exports" object.
        //  * `["node", "import"]` is used as _defaultEnv_ for its ES Module resolver.
        //
        // see also https://nodejs.org/api/esm.html#esm_conditional_exports
        return {
            'import': esm,
            'require': cjs,
            // 'default'
        };
    }
}

export async function loadPublicAPIDefinitions(baseDir, filepath) {
    const p = path.resolve(baseDir, filepath);
    const publicApiTestCases = await import(p).then((obj) => obj.default);
    const EXPORT_ENTRIES = [];
    for (const [key, value] of Object.entries(publicApiTestCases)) {
        const path = value.path;
        const entry = new ExportEntity(key, path);
        EXPORT_ENTRIES.push(entry);
    }

    return EXPORT_ENTRIES;
}

export async function addPublicAPIToExportsFields(o, publicApiList) {
    // https://nodejs.org/api/esm.html
    for (const entry of publicApiList) {
        const key = entry.key();

        // eslint-disable-next-line no-param-reassign
        o[key] = entry;
    }
}
