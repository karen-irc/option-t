import { Result, isOk } from '../../PlainResult/Result';
import { mapOrForResult } from '../../PlainResult/mapOr';
import { unwrapErrFromResult } from '../../PlainResult/unwrap';
import type { Undefinable } from '../../Undefinable/Undefinable';

export function fromPlainResultOkToUndefinable<T, E>(input: Result<T, E>): Undefinable<T> {
    const result: Undefinable<T> = mapOrForResult<T, E, Undefinable<T>>(
        input,
        undefined,
        (val) => val
    );
    return result;
}

export function fromPlainResultErrToUndefinable<T, E>(input: Result<T, E>): Undefinable<E> {
    if (isOk(input)) {
        return undefined;
    }

    const result: E = unwrapErrFromResult(input);
    return result;
}
