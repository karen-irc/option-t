import * as assert from 'assert';
import { createRequire } from 'module';

import {
    generateAllExposedPathSequence,
    ExposedPath,
    QuirksLegacyExposedPath,
} from './public_api/mod.mjs';

const require = createRequire(import.meta.url);

async function tryImportPathAsESM(pathItem) {
    assert.ok(pathItem instanceof ExposedPath);

    const targetPath = pathItem.resolvedName();
    let actualExportedObj;
    await assert.doesNotReject(async () => {
        actualExportedObj = await import(targetPath);
    }, `Fail to import ${targetPath} as ES Module`);

    checkExportedItems(actualExportedObj, pathItem);
}

function tryImportPathAsCJS(pathItem) {
    assert.ok(pathItem instanceof ExposedPath);

    const targetPath = pathItem.resolvedName();

    let actualExportedObj;
    assert.doesNotThrow(() => {
        actualExportedObj = require(targetPath);
    }, `Fail to import ${targetPath} as ES Module`);

    checkExportedItems(actualExportedObj, pathItem);
}

function checkExportedItems(actualExportedObj, pathItem) {
    assert.ok(pathItem instanceof ExposedPath);

    const targetPath = pathItem.resolvedName();
    const rawExpected = pathItem.exports();
    if (!!rawExpected) {
        const expected = rawExpected.sort();
        const actual = Object.keys(actualExportedObj).sort();
        assert.deepStrictEqual(actual, expected, `Mismatch the exported items for ${targetPath}`);
    }
}

async function tryImportPathForCompat(pathItem) {
    assert.ok(pathItem instanceof QuirksLegacyExposedPath);
    assert.ok(pathItem.isForCompat());

    if (pathItem.isESM()) {
        await tryImportPathAsESM(pathItem);
    }
    else if (pathItem.isCJS()) {
        tryImportPathAsCJS(pathItem);
    }
    else {
        throw new RangeError(`unreachable, but ${pathItem.resolvedName()} reach to here`);
    }
}

async function tryImportPath(pathItem) {
    assert.ok(pathItem instanceof ExposedPath);

    await tryImportPathAsESM(pathItem);
    tryImportPathAsCJS(pathItem);
}

(async function main() {
    console.log('====== This script tests whether the path is exported or not by the list ======');

    const list = generateAllExposedPathSequence();

    const testingItems = [];
    for (const item of list) {
        let testing = null;
        if (item.isForCompat()) {
            testing = tryImportPathForCompat(item);
        }
        else {
            testing = tryImportPath(item);
        }

        testingItems.push(testing);
    }

    await Promise.all(testingItems);
})();
