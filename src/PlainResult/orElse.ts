import { MapFn } from '../shared/Function';
import { Result } from './Result';

export type FlatmapErrFn<T, TError, TAnotherError> = MapFn<TError, Result<T, TAnotherError>>;

/**
 *  Calls _errSelector_  and return its returned value
 *  if the result is `Err(TError)`, otherwise returns the `Ok(T)` value of self.
 *  This function can be used for control flow based on result values.
 */
export function orElseForResult<T, TError, TAnotherError>(a: Result<T, TError>, errSelector: FlatmapErrFn<T, TError, TAnotherError>): Result<T, TAnotherError> {
    if (a.ok) {
        return a;
    }
    else {
        const r = errSelector(a.err);
        return r;
    }
}
