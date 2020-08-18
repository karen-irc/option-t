import { Result } from './Result';

/**
 *  Return _b_ if _a_ is `Ok(T)`.
 *  Otherwise, return _a_.
 */
export function andForResult<T, U, TError>(a: Result<T, TError>, b: Result<U, TError>): Result<U, TError> {
    return a.ok ? b : a;
}
