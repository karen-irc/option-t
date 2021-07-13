import type { Nullable } from '../../Nullable/Nullable';
import { unwrapOrFromNullable } from '../../Nullable/unwrapOr';
import type { Undefinable } from '../../Undefinable';

export function fromNullableToUndefinable<T>(input: Nullable<T>): Undefinable<T> {
    const result = unwrapOrFromNullable<Undefinable<T>>(input, undefined);
    return result;
}
