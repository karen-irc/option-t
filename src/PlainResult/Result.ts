export type Result<T, E> = Ok<T> | Err<E>;

declare const marker: unique symbol;

export type Ok<T> = {
    readonly ok: true;
    readonly val: T;

    // To keep the same shape (hidden class or structure) with Err<E>,
    // we should initialize this property.
    // If user use `Object.hasOwnProperty` or `for-in` statement fot this object,
    // this property will be leaked accidentally.
    // However, we don't think it is not comment operation for user
    // Because we provide `is~~()` function
    // and user will not do their operations for a "container" object like this.
    // Even if user will use `const { ok, err }` = Ok;`, then val will be undefined.
    // It's will not be a problem.
    readonly err?: undefined;

    // This field makes incompatible the type with `PlainOption::Option`.
    // We'd like to tread this as like phantom type.
    // So we don't supply this field actually for the runtime
    // and this will be used only for static type checking.
    readonly [marker]: unique symbol;
};

export function isOk<T, E>(v: Result<T, E>): v is Ok<T> {
    return v.ok;
}

export function createOk<T>(val: T): Ok<T> {
    const r: Ok<T> = {
        ok: true,
        val,
        err: undefined,

        // For keeping the object structure minimally,
        // treat `[marker]` field as like "Phantom Type",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
    return r;
}

export type Err<E> = {
    readonly ok: false;

    // To keep the same shape (hidden class or structure) with Ok<T>,
    // we should initialize this property.
    // If user use `Object.hasOwnProperty` or `for-in` statement fot this object,
    // this property will be leaked accidentally.
    // However, we don't think it is not comment operation for user
    // Because we provide `is~~()` function
    // and user will not do their operations for a "container" object like this.
    // Even if user will use `const { ok, val }` = Err;`, then val will be undefined.
    // It's will not be a problem.
    readonly val?: undefined;

    readonly err: E;

    // This field makes incompatible the type with `PlainOption::Option`.
    // We'd like to tread this as like phantom type.
    // So we don't supply this field actually for the runtime
    // and this will be used only for static type checking.
    readonly [marker]: unique symbol;
};

export function isErr<T, E>(v: Result<T, E>): v is Err<E> {
    return !v.ok;
}

export function createErr<E>(err: E): Err<E> {
    const r: Err<E> = {
        ok: false,
        val: undefined,
        err: err,

        // For keeping the object structure minimally,
        // treat `[marker]` field as like "Phantom Type",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
    return r;
}

