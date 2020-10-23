import { renamer } from './renamer.mjs';

const FROM_EXTENSION = 'js';
const TO_EXTENSION = 'cjs';

(async function main() {
    const cwd = process.cwd();
    const TARGET_DIR = process.env.TARGET_DIR;

    await renamer(cwd, TARGET_DIR, FROM_EXTENSION, TO_EXTENSION);
})().catch((e) => {
    console.error(e);
    process.exit(1);
});
