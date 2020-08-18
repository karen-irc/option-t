export type MapFn<T, TResult> = (v: T) => TResult;
export type RecoveryFn<T> = () => T;
export type RecoveryWithErrorFn<TError, T> = (e: TError) => T;
export type TapFn<T> = (v: T) => void;
export type FilterFn<T> = (v: T) => boolean;
