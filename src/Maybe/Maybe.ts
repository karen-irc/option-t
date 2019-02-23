export type NotNullAndUndefined<T> = T extends (null | undefined) ? never : T;

export type Maybe<T> = T | null | undefined;

export function isNotNullAndUndefined<T>(v: Maybe<T>): v is NotNullAndUndefined<T> {
    return v !== undefined && v !== null;
}

export function isNullOrUndefined<T>(v: Maybe<T>): v is null | undefined {
    return v === undefined || v === null;
}
