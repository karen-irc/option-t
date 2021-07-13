import type { Maybe } from '../../Maybe/Maybe';
import { Result, isOk } from '../../PlainResult/Result';
import { mapOrForResult } from '../../PlainResult/mapOr';
import { unwrapErrFromResult } from '../../PlainResult/unwrap';

export function fromPlainResultOkToMaybe<T, E>(input: Result<T, E>): Maybe<T> {
    const result: Maybe<T> = mapOrForResult<T, E, Maybe<T>>(input, null, (val) => val);
    return result;
}

export function fromPlainResultErrToMaybe<T, E>(input: Result<T, E>): Maybe<E> {
    if (isOk(input)) {
        return null;
    }

    const result: E = unwrapErrFromResult(input);
    return result;
}
