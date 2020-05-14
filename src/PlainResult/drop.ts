import { Mutable } from '../shared/Mutable.ts';
import { TapFn } from '../shared/Function.ts';
import { Result, Ok, Err } from './Result.ts';
import { asMutResult } from './asMut.ts';

type MutOk<T> = Mutable<Ok<T>>;
type MutErr<E> = Mutable<Err<E>>;

/**
 *  mutators ared called for the inputted _v_.
 *
 *  This function allows you to cut the reference to contain values from the inputted _v_.
 *  However, it would be unsafe operation if you do some more operation after this.
 *  For example, you can write the following code.
 *
 *  ```javascript
 *      const ok = createOk(1);
 *      unsafeDropForResult(ok, (ok) => {
 *          ok.ok = false;
 *      }, (err) => {
 *          ok.ok = true;
 *      });
 *      isOk(ok); // -> false. This is dangerous.
 *  ```
 *
 *  Compared to Rust, JavaScript does not have ownership semantics in language
 *  and this API is designed to use as a destructor or similar fashions.
 *  So if you call this for same object more than once, your code might contain "double free" problem.
 */
export function unsafeDropBothForResult<T, E>(v: Result<T, E>, okMutator: TapFn<MutOk<T>>, errMutator: TapFn<MutErr<E>>): void {
    const mutable = asMutResult(v);
    if (mutable.ok) {
        okMutator(mutable);
    } else {
        errMutator(mutable);
    }
}

/**
 *  The _okMutator_ is called if _v_ is `Ok<T>`.
 *
 *  This function allows you to cut the reference to the contain value from the inputted _v_.
 *  However, it would be unsafe operation if you do some more operation after this.
 *  For example, you can write the following code.
 *
 *  ```javascript
 *      const ok = createOk(1);
 *      unsafeDropOkForResult(ok, (ok) => {
 *          ok.ok = false;
 *      });
 *      isOk(ok); // -> false. This is dangerous.
 *  ```
 *
 *  Compared to Rust, JavaScript does not have ownership semantics in language
 *  and this API is designed to use as a destructor or similar fashions.
 *  So if you call this for same object more than once, your code might contain "double free" problem.
 */
export function unsafeDropOkForResult<T, E>(v: Result<T, E>, okMutator: TapFn<MutOk<T>>): void {
    return unsafeDropBothForResult(v, okMutator, () => {});
}

/**
 *  The _errMutator_ is called if _v_ is `Err<E>`.
 *
 *  This function allows you to cut the reference to the contain value from the inputted _v_.
 *  However, it would be unsafe operation if you do some more operation after this.
 *  For example, you can write the following code.
 *
 *  ```javascript
 *      const err = createErr('bar');
 *      unsafeDropErrForResult(err, (err) => {
 *          err.ok = true;
 *      });
 *      isErr(err); // -> false. This is dangerous.
 *  ```
 *
 *  Compared to Rust, JavaScript does not have ownership semantics in language
 *  and this API is designed to use as a destructor or similar fashions.
 *  So if you call this for same object more than once, your code might contain "double free" problem.
 */
export function unsafeDropErrForResult<T, E>(v: Result<T, E>, errMutator: TapFn<MutErr<E>>): void {
    return unsafeDropBothForResult(v, () => {}, errMutator);
}
