import { MapFn } from '../shared/Function';
import { Result } from './Result';

export type FlatmapOkFn<T, U, TError> = MapFn<T, Result<U, TError>>;

/**
 *  Returns `Err(TError)` if the _src_ is `Err(TError)`,
 *  otherwise calls _fn_ with the value and returns the result.
 *
 *  XXX:
 *  Some languages call this operation flatmap.
 *  But we don't provide `flatMap()` as alias of this function
 *  to sort with other APIs.
 */
export function andThenForResult<T, U, TError>(src: Result<T, TError>, fn: FlatmapOkFn<T, U, TError>): Result<U, TError> {
    if (src.ok) {
        const r = fn(src.val);
        return r;
    }
    else {
        return src;
    }
}
