import { MapFn } from '../shared/Function';
import { Result, Err, createOk } from './Result';

/**
 *  Maps a `Result<T, TError>` to `Result<U, TError>` by applying a _fn_ function
 *  to an contained `Ok(T)` value, leaving an `Err(TError)` value untouched.
 *
 *  This function can be used to compose the results of two functions.
 */
export function mapForResult<T, U, TError>(src: Result<T, TError>, fn: MapFn<T, U>): Result<U, TError> {
    if (src.ok) {
        const r: U = fn(src.val);
        return createOk(r);
    }
    else {
        const s: Err<TError> = src;
        return s;
    }
}
