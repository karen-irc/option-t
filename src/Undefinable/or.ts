import { Undefinable } from './Undefinable.ts';

/**
 *  Return _a_ if _a_ is not `undefined`.
 *  Otherwise, return _b_.
 */
export function orForUndefinable<T>(a: Undefinable<T>, b: Undefinable<T>): Undefinable<T> {
    return (a !== undefined) ? a : b;
}
