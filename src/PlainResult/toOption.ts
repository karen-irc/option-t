import { Option, createNone, createSome } from '../PlainOption/Option';
import { Result } from './Result';

/**
 *  Convert to `Some(T)` if _v_ is `Ok(T)`.
 *  Otherwise, return `None`.
 */
export function toOptionFromOk<T, TError>(v: Result<T, TError>): Option<T> {
    if (v.ok) {
        return createSome<T>(v.val);
    }
    else {
        return createNone();
    }
}

/**
 *  Convert to `Some(TError)` if _v_ is `Err(TError)`.
 *  Otherwise, return `None`.
 */
export function toOptionFromErr<T, TError>(v: Result<T, TError>): Option<TError> {
    if (!v.ok) {
        return createSome<TError>(v.err);
    }
    else {
        return createNone();
    }
}
