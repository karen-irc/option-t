import type { Maybe } from '../../Maybe/Maybe';
import type { Nullable } from '../../Nullable/Nullable';

export function fromNullableToMaybe<T>(input: Nullable<T>): Maybe<T> {
    return input;
}
