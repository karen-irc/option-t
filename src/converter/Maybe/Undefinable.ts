import type { Maybe } from '../../Maybe/Maybe';
import type { Undefinable } from '../../Undefinable/Undefinable';
import { unwrapOrFromNullable } from '../../Nullable/unwrapOr';

export function fromMaybeToUndefinable<T>(input: Maybe<T>): Undefinable<T> {
    const result: Undefinable<T> = unwrapOrFromNullable<Undefinable<T>>(input, undefined);
    return result;
}
