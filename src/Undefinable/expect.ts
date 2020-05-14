import { Undefinable } from './Undefinable.ts';

/**
 *  Return _v_ as `T` if the passed _v_ is not `undefined`.
 *  Otherwise, throw `TypeError` with the passed `msg`.
 */
export function expectNotUndefined<T>(v: Undefinable<T>, msg: string): T | never {
    if (v === undefined) {
        throw new TypeError(msg);
    }
    return v;
}
