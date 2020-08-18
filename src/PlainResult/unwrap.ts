import { expectIsOk, expectIsErr } from './expect';
import { Result } from './Result';

/**
 *  Return the inner `T` of a `Ok(T)`.
 *
 *  @throws {TypeError}
 *      Throws if the self is a `Err`.
 */
export function unwrapFromResult<T, TError>(v: Result<T, TError>): T | never {
    return expectIsOk(v, 'called with `Err`');
}

/**
 *  Return the inner `TError` of a `Err(TError)`.
 *
 *  @throws {TypeError}
 *      Throws if the self is a `Ok`.
 */
export function unwrapErrFromResult<T, TError>(v: Result<T, TError>): TError | never {
    return expectIsErr(v, 'called with `Ok`');
}
