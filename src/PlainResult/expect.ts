import { Result } from './Result';

/**
 *  Return _v_ as `T` if the passed _v_ is `Ok(T)`.
 *  Otherwise, throw `TypeError` with the passed `msg`.
 */
export function expectIsOk<T, TError>(v: Result<T, TError>, msg: string): T | never {
    if (!v.ok) {
        throw new TypeError(msg);
    }

    return v.val;
}

/**
 *  Return _v_ as `TError` if the passed _v_ is `Err(TError)`.
 *  Otherwise, throw `TypeError` with the passed `msg`.
 */
export function expectIsErr<T, TError>(v: Result<T, TError>, msg: string): TError | never {
    if (v.ok) {
        throw new TypeError(msg);
    }

    return v.err;
}
