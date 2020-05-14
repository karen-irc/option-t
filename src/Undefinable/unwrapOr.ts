import { Undefinable } from './Undefinable.ts';
import { expectNotUndefined } from './expect.ts';
import { ERR_MSG_DEF_MUST_NOT_BE_NO_VAL_FOR_UNDEFINABLE } from './ErrorMessage.ts';

/**
 *  Return _v_ as `T` if the passed _v_ is not `undefined`.
 *  Otherwise, return _def_.
 *
 *  * _def_ must not be `Undefinable<*>`.
 *  * If the result of _def_ is `undefined`, throw `TypeError`.
 */
export function unwrapOrFromUndefinable<T>(v: Undefinable<T>, def: T): T {
    if (v !== undefined) {
        return v;
    }
    else {
        return expectNotUndefined(def, ERR_MSG_DEF_MUST_NOT_BE_NO_VAL_FOR_UNDEFINABLE);
    }
}
