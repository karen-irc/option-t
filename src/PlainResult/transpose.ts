import { Option, createSome, createNone, isNone, Some } from '../PlainOption/Option';
import { Result, Ok, Err, isErr, createOk, createErr } from './Result';

/**
 *  Transposes a `Result` of an `Option` into an `Option` of a `Result`.
 *
 *  - `Ok(Some(v))` -> `Some(Ok(v))`
 *  - `Ok(None)` -> `None`
 *  - `Err(e)` -> `Some(Err(e))`
 */
export function transposeForResult<T, TError>(self: Result<Option<T>, TError>): Option<Result<T, TError>> {
    if (isErr(self)) {
        const e: TError = self.err;
        const newErr: Err<TError> = createErr(e);
        const r: Some<Err<TError>> = createSome<Err<TError>>(newErr);
        return r;
    }

    const inner: Option<T> = self.val;
    if (isNone(inner)) {
        const r = createNone();
        return r;
    }

    const v: T = inner.val;
    const innerV: Ok<T> = createOk(v);
    const r: Option<Ok<T>> = createSome(innerV);
    return r;
}
