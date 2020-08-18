import { TapFn } from '../shared/Function';
import { Result } from './Result';

function noop<T>(_v: T) {}

/**
 *  * Return _v_ directly.
 *      * This value is passed as the input. But it maybe mutated by calling _fn_.
 *  * Call _fn_ with the inner value of _v_ if _v_ is `Ok(T)`.
 *  * This main purpose is to inspect an inner value in a chained function calling.
 *    If you don't have to do it, you should not mutate the inner value.
 *    if-else statement might be sufficient to mutate the inner value instead of calling this function.
 */
export function tapOk<T, TError>(v: Result<T, TError>, fn: TapFn<T>): Result<T, TError> {
    return tapBoth(v, fn, noop);
}

/**
 *  * Return _v_ directly.
 *      * This value is passed as the input. But it maybe mutated by calling _fn_.
 *  * Call _fn_ with the inner value of _v_ if _v_ is `Err(E)`.
 *  * This main purpose is to inspect an inner value in a chained function calling.
 *    If you don't have to do it, you should not mutate the inner value.
 *    if-else statement might be sufficient to mutate the inner value instead of calling this function.
 */
export function tapErr<T, TError>(v: Result<T, TError>, fn: TapFn<TError>): Result<T, TError> {
    return tapBoth(v, noop, fn);
}

/**
 *  * Return _src_ directly.
 *      * This value is passed as the input. But it maybe mutated by calling _fn_.
 *  * Call _okFn_ with the inner value of _src_ if _src_ is `Ok(T)`.
 *    Otherwise, call _errFn_ with the inner value if _src_ is `Err(E)`
 *  * This main purpose is to inspect an inner value in a chained function calling.
 *    If you don't have to do it, you should not mutate the inner value.
 *    if-else statement might be sufficient to mutate the inner value instead of calling this function.
 */
export function tapBoth<T, TError>(src: Result<T, TError>, okFn: TapFn<T>, errFn: TapFn<TError>): Result<T, TError> {
    if (src.ok) {
        okFn(src.val);
    }
    else {
        errFn(src.err);
    }
    return src;
}
