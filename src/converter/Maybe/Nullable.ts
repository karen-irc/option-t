import type { Maybe } from '../../Maybe/Maybe';
import type { Nullable } from '../../Nullable/Nullable';
import { unwrapOrFromUndefinable } from '../../Undefinable/unwrapOr';

export function fromMaybeToNullable<T>(input: Maybe<T>): Nullable<T> {
    const result: Nullable<T> = unwrapOrFromUndefinable<Nullable<T>>(input, null);
    return result;
}
