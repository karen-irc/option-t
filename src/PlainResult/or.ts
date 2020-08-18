import { Result } from './Result';

/**
 *  Return _a_ if _a_ is `Ok(T)`.
 *  Otherwise, return _b_.
 */
export function orForResult<T, TError, TAnotherError>(a: Result<T, TError>, b: Result<T, TAnotherError>): Result<T, TAnotherError> {
    return a.ok ? a : b;
}
