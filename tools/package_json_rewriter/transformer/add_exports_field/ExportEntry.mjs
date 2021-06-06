import * as assert from 'assert';

import {
    QuirksLegacyExposedPath
} from '../../../public_api/mod.mjs';

class AbstractExportEntry {
    key() {
        throw new EvalError(`please override on ${this.constructor.name}`);
    }
    toJSON() {
        throw new EvalError(`please override on ${this.constructor.name}`);
    }
}

export class ExportEntry extends AbstractExportEntry {
    constructor(key, path) {
        super();

        assert.strictEqual(key.startsWith('/'), false, `key (${key}) should not start with /`);
        assert.strictEqual(key.endsWith('/'), false, `key (${key}) should not end with /`);

        this._key = key;
        this._path = path;
    }

    key() {
        const key = this._key;
        // For `main` field
        if (key === '.') {
            return key;
        }

        const k = `./${this._key}`;
        return k;
    }

    toJSON() {
        const p = this._path !== null ? this._path : this._key;

        const esm = `./esm/${p}.mjs`;
        const cjs = `./cjs/${p}.js`;
        const entry = constructDualPackagePathValue({
            esm,
            cjs,
        });
        return entry;
    }
}

export class CompatExportEntry extends AbstractExportEntry {
    constructor(entry) {
        super();
        assert.ok(entry instanceof QuirksLegacyExposedPath);

        this._original = entry;
    }

    key() {
        const key = this._original.name();
        const k = `./${key}`;
        return k;
    }

    filepath() {
        const original = this._original;
        const key = this.key();
        if (original.isESM()) {
            const p = `${key}.mjs`;
            return p;
        }

        if (original.isCJS()) {
            const p = `${key}.js`;
            return p;
        }

        throw new RangeError('not here');
    }
}

function constructDualPackagePathValue({ cjs, esm, }) {
    // [By the document of Node.js v14.2](https://nodejs.org/api/esm.html#esm_resolution_algorithm),
    //  * Condition matching is applied in object order from first to last within the "exports" object.
    //  * `["node", "import"]` is used as _defaultEnv_ for its ES Module resolver.
    //
    // see also https://nodejs.org/api/esm.html#esm_conditional_exports
    return {
        'import': esm,
        'require': cjs,
    };
}
