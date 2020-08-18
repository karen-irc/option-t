import { MapFn, RecoveryWithErrorFn } from '../shared/Function';
import { Result } from './Result';

/**
 *  Maps a `Result<T, TError>` to `U` by applying _fn_ to a contained `Ok(T)` value in _src_,
 *  or a _fallback_ function to a contained `Err(TError)` value in _src_.
 *  This function can be used to unpack a successful result while handling an error.
 */
export function mapOrElseForResult<T, TError, U>(src: Result<T, TError>, fallback: RecoveryWithErrorFn<TError, U>, fn: MapFn<T, U>): U {
    if (src.ok) {
        const r: U = fn(src.val);
        return r;
    }
    else {
        const r: U = fallback(src.err);
        return r;
    }
}
