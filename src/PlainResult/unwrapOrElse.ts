import { RecoveryWithErrorFn } from '../shared/Function';
import { Result } from './Result';

/**
 *  Unwraps a result _v_, returns the content of an `Ok(T)`.
 *  If the value is an `Err(TError)` then it calls `def` with its value.
 */
export function unwrapOrElseFromResult<T, TError>(v: Result<T, TError>, def: RecoveryWithErrorFn<TError, T>): T {
    return v.ok ? v.val : def(v.err);
}
