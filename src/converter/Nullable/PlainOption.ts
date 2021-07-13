import { mapOrElseForNullable } from '../../Nullable/mapOrElse';
import type { Nullable } from '../../Nullable/Nullable';
import { Option, createNone, createSome } from '../../PlainOption/Option';

export function fromNullableToPlainOption<T>(input: Nullable<T>): Option<T> {
    const result = mapOrElseForNullable<T, Option<T>>(input, createNone, (val: T) => {
        return createSome<T>(val);
    });
    return result;
}
