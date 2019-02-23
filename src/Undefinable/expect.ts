import { Undefinable, NotUndefined } from './Undefinable';

/**
 *  Return _v_ as `T` if the passed _v_ is not `undefined`.
 *  Otherwise, throw `TypeError` with the passed `msg`.
 */
export function expectNotUndefined<T>(v: Undefinable<T>, msg: string): NotUndefined<T> {
    if (v === undefined) {
        throw new TypeError(msg);
    }
    return v;
}
