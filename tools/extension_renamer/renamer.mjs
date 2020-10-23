import * as assert from 'assert';
import { promises as fs } from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

function debug(input) {
    const filename = fileURLToPath(import.meta.url);
    console.log(`${filename}: ${input}`);
}

async function* getAllDescendantFiles(subrootDir) {
    const children = await fs.readdir(subrootDir, {
        encoding: 'utf8',
        withFileTypes: true,
    });

    for (const dirent of children) {
        const fullpath = path.resolve(subrootDir, dirent.name);
        if (dirent.isFile()) {
            yield fullpath;
            continue;
        }

        if (dirent.isDirectory()) {
            yield* getAllDescendantFiles(fullpath);
            continue;
        }

        continue;
    }
}

async function* filterFiles(fileList, patternRegExp) {
    for await (const file of fileList) {
        const ok = patternRegExp.test(file);
        if (!ok) {
            continue;
        }

        yield file;
    }
}

function bulkRename(filePathList, targetPattern, replaceValue) {
    const result = [];
    for (const oldFilePath of filePathList) {
        const newFilePath = oldFilePath.replace(targetPattern, replaceValue);
        const r = fs.rename(oldFilePath, newFilePath);
        result.push(r);
    }

    return Promise.all(result);
}

export async function renamer(cwd, targetDir, fromExtension, toExtension) {
    assert.ok(typeof targetDir === 'string', 'TARGET_DIR should be string');

    const subrootDir = path.resolve(cwd, targetDir);
    debug(`subrootDir is ${subrootDir}`);

    const allfiles = getAllDescendantFiles(subrootDir);

    const targetPattern = new RegExp(`\\.${fromExtension}$`, 'u');

    const targetFiles = [];
    for await (const file of filterFiles(allfiles, targetPattern)) {
        targetFiles.push(file);
    }
    debug(`got target files`);

    await bulkRename(targetFiles, targetPattern, `.${toExtension}`);
    debug(`complete to rename all`);
}
