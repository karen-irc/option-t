export type Result<T, TError> = Ok<T> | Err<TError>;

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
    //
    // By these reasons, we don't recommend to create this object without this factory function.
    // You can create this object by hand. But it's fragile for the future change. We don't recommend it.
    readonly err?: undefined;
};

export function isOk<T, TError>(v: Result<T, TError>): v is Ok<T> {
    return v.ok;
}

export function createOk<T>(val: T): Ok<T> {
    const r: Ok<T> = {
        ok: true,
        val,
        err: undefined,
    };
    return r;
}

export type Err<TError> = {
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
    //
    // By these reasons, we don't recommend to create this typed object without this factory function.
    // You can create this object by hand. But it's fragile for the future change. We don't recommend it.
    readonly val?: undefined;

    readonly err: TError;
};

export function isErr<T, TError>(v: Result<T, TError>): v is Err<TError> {
    return !v.ok;
}

export function createErr<TError>(err: TError): Err<TError> {
    const r: Err<TError> = {
        ok: false,
        val: undefined,
        err: err,
    };
    return r;
}

