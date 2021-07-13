import { mapOrElseForNullable } from '../../Nullable/mapOrElse';
import type { Nullable } from '../../Nullable/Nullable';
import { Result, createOk, createErr } from '../../PlainResult/Result';

export function fromNullableToPlainResultOk<T>(input: Nullable<T>): Result<T, void> {
    const result = mapOrElseForNullable<T, Result<T, void>>(
        input,
        () => {
            return createErr<void>(undefined);
        },
        (val: T) => {
            return createOk<T>(val);
        }
    );
    return result;
}

export function fromNullableToPlainResultErr<E>(input: Nullable<E>): Result<void, E> {
    const result = mapOrElseForNullable<E, Result<void, E>>(
        input,
        () => {
            return createOk<void>(undefined);
        },
        (err: E) => {
            return createErr<E>(err);
        }
    );
    return result;
}
