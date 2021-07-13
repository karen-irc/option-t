declare module 'option-t/esm/Maybe/Maybe' {
  declare export type Maybe<T> = ?T;
}

/*
declare module 'option-t/esm/Maybe/and' {
import type { Maybe } from 'option-t/esm/Maybe/Maybe';
declare export function andForMaybe<T, U>(a: Maybe<T>, b: Maybe<U>): Maybe<U>;
}
*/

declare module 'option-t/esm/Maybe/andThen' {
  import type { Maybe } from 'option-t/esm/Maybe/Maybe';
  declare export function andThenForMaybe<T, U>(src: Maybe<T>, fn: (this: void, v: T) => Maybe<U>): Maybe<U>;
}

declare module 'option-t/esm/Maybe/tap' {
  import type { Maybe } from 'option-t/esm/Maybe/Maybe';
  import type { TapFn } from 'option-t/esm/utils/Function';
  declare export function tapMaybe<T>(v: Maybe<T>, fn: TapFn<T>): void;
}

declare module 'option-t/esm/Maybe/expect' {
  import type { Maybe } from 'option-t/esm/Maybe/Maybe';
  declare export function expectNotNullAndUndefined<T>(v: Maybe<T>, msg: string): T;
}

declare module 'option-t/esm/Maybe/map' {
  import type { Maybe } from 'option-t/esm/Maybe/Maybe';
  import type { MapFn } from 'option-t/esm/utils/Function';
  declare export function mapForMaybe<T, U>(src: Maybe<T>, selector: MapFn<T, U>): Maybe<U>;
}

declare module 'option-t/esm/Maybe/mapOr' {
  import type { Maybe } from 'option-t/esm/Maybe/Maybe';
  import type { MapFn } from 'option-t/esm/utils/Function';
  declare export function mapOrForMaybe<T, U>(src: Maybe<T>, def: U, selector: MapFn<T, U>): U;
}

declare module 'option-t/esm/Maybe/mapOrElse' {
  import type { Maybe } from 'option-t/esm/Maybe/Maybe';
  import type { RecoveryFn, MapFn } from 'option-t/esm/utils/Function';
  declare export function mapOrElseForMaybe<T, U>(src: Maybe<T>, def: RecoveryFn<U>, selector: MapFn<T, U>): U;
}

/*
declare module 'option-t/esm/Maybe/or' {
import type { Maybe } from 'option-t/esm/Maybe/Maybe';
declare export function orForMaybe<T>(a: Maybe<T>, b: Maybe<T>): Maybe<T>;
}
*/

declare module 'option-t/esm/Maybe/orElse' {
  import type { Maybe } from 'option-t/esm/Maybe/Maybe';
  declare export function orElseForMaybe<T>(a: Maybe<T>, b: (this: void) => Maybe<T>): Maybe<T>;
}

declare module 'option-t/esm/Maybe/unwrap' {
  import type { Maybe } from 'option-t/esm/Maybe/Maybe';
  declare export function unwrapMaybe<T>(v: Maybe<T>): T;
}

declare module 'option-t/esm/Maybe/unwrapOr' {
  import type { Maybe } from 'option-t/esm/Maybe/Maybe';
  declare export function unwrapOrFromMaybe<T>(v: Maybe<T>, def: T): T;
}

declare module 'option-t/esm/Maybe/unwrapOrElse' {
  import type { Maybe } from 'option-t/esm/Maybe/Maybe';
  import type { RecoveryFn } from 'option-t/esm/utils/Function';
  declare export function unwrapOrElseFromMaybe<T>(v: Maybe<T>, def: RecoveryFn<T>): T;
}

declare module 'option-t/esm/Nullable/Nullable' {
  declare export type Nullable<T> = T | null;
  // declare export function isNotNull<T>(v: Nullable<T>): boolean;
  // declare export function isNull<T>(v: Nullable<T>): boolean;
}

/*
declare module 'option-t/esm/Nullable/and' {
import type { Nullable } from 'option-t/esm/Nullable/Nullable';
declare export function andForNullable<T, U>(a: Nullable<T>, b: Nullable<U>): Nullable<U>;
}
*/

declare module 'option-t/esm/Nullable/andThen' {
  import type { Nullable } from 'option-t/esm/Nullable/Nullable';
  declare export function andThenForNullable<T, U>(src: Nullable<T>, fn: (this: void, v: T) => Nullable<U>): Nullable<U>;
}

declare module 'option-t/esm/Nullable/tap' {
  import type { TapFn } from 'option-t/esm/utils/Function';
  import type { Nullable } from 'option-t/esm/Nullable/Nullable';
  declare export function tapNullable<T>(v: Nullable<T>, fn: TapFn<T>): void;
}

declare module 'option-t/esm/Nullable/expect' {
  import type { Nullable } from 'option-t/esm/Nullable/Nullable';
  declare export function expectNotNull<T>(v: Nullable<T>, msg: string): T;
}

declare module 'option-t/esm/Nullable/map' {
  import type { MapFn } from 'option-t/esm/utils/Function';
  import type { Nullable } from 'option-t/esm/Nullable/Nullable';
  declare export function mapForNullable<T, U>(src: Nullable<T>, selector: MapFn<T, U>): Nullable<U>;
}

declare module 'option-t/esm/Nullable/mapOr' {
  import type { MapFn } from 'option-t/esm/utils/Function';
  import type { Nullable } from 'option-t/esm/Nullable/Nullable';
  declare export function mapOrForNullable<T, U>(src: Nullable<T>, def: U, selector: MapFn<T, U>): U;
}

declare module 'option-t/esm/Nullable/mapOrElse' {
  import type { MapFn, RecoveryFn } from 'option-t/esm/utils/Function';
  import type { Nullable } from 'option-t/esm/Nullable/Nullable';
  declare export function mapOrElseForNullable<T, U>(src: Nullable<T>, def: RecoveryFn<U>, selector: MapFn<T, U>): U;
}

/*
declare module 'option-t/esm/Nullable/or' {
import type { Nullable } from 'option-t/esm/Nullable/Nullable';
declare export function orForNullable<T>(a: Nullable<T>, b: Nullable<T>): Nullable<T>;
}
*/

declare module 'option-t/esm/Nullable/orElse' {
  import type { Nullable } from 'option-t/esm/Nullable/Nullable';
  declare export function orElseForNullable<T>(a: Nullable<T>, b: (this: void) => Nullable<T>): Nullable<T>;
}

declare module 'option-t/esm/Nullable/unwrap' {
  import type { Nullable } from 'option-t/esm/Nullable/Nullable';
  declare export function unwrapNullable<T>(v: Nullable<T>): T;
}

declare module 'option-t/esm/Nullable/unwrapOr' {
  import type { Nullable } from 'option-t/esm/Nullable/Nullable';
  declare export function unwrapOrFromNullable<T>(v: Nullable<T>, def: T): T;
}

declare module 'option-t/esm/Nullable/unwrapOrElse' {
  import type { RecoveryFn } from 'option-t/esm/utils/Function';
  import type { Nullable } from 'option-t/esm/Nullable/Nullable';
  declare export function unwrapOrElseFromNullable<T>(v: Nullable<T>, def: RecoveryFn<T>): T;
}

declare module 'option-t/esm/Undefinable/Undefinable' {
  declare export type Undefinable<T> = T | void;
}

/*
declare module 'option-t/esm/Undefinable/and' {
import type { Undefinable } from 'option-t/esm/Undefinable/Undefinable';
declare export function andForUndefinable<T, U>(a: Undefinable<T>, b: Undefinable<U>): Undefinable<U>;
}
*/

declare module 'option-t/esm/Undefinable/andThen' {
  import type { Undefinable } from 'option-t/esm/Undefinable/Undefinable';
  declare export function andThenForUndefinable<T, U>(src: Undefinable<T>, fn: (this: void, v: T) => Undefinable<U>): Undefinable<U>;
}

declare module 'option-t/esm/Undefinable/tap' {
  import type { Undefinable } from 'option-t/esm/Undefinable/Undefinable';
  import type { TapFn } from 'option-t/esm/utils/Function';
  declare export function tapUndefinable<T>(v: Undefinable<T>, fn: TapFn<T>): void;
}

declare module 'option-t/esm/Undefinable/expect' {
  import type { Undefinable } from 'option-t/esm/Undefinable/Undefinable';
  declare export function expectNotUndefined<T>(v: Undefinable<T>, msg: string): T;
}

declare module 'option-t/esm/Undefinable/map' {
  import type { Undefinable } from 'option-t/esm/Undefinable/Undefinable';
  import type { MapFn } from 'option-t/esm/utils/Function';
  declare export function mapForUndefinable<T, U>(src: Undefinable<T>, selector: MapFn<T, U>): Undefinable<U>;
}

declare module 'option-t/esm/Undefinable/mapOr' {
  import type { Undefinable } from 'option-t/esm/Undefinable/Undefinable';
  import type { MapFn } from 'option-t/esm/utils/Function';
  declare export function mapOrForUndefinable<T, U>(src: Undefinable<T>, def: U, selector: MapFn<T, U>): U;
}

declare module 'option-t/esm/Undefinable/mapOrElse' {
  import type { Undefinable } from 'option-t/esm/Undefinable/Undefinable';
  import type { MapFn, RecoveryFn } from 'option-t/esm/utils/Function';
  declare export function mapOrElseForUndefinable<T, U>(src: Undefinable<T>, def: RecoveryFn<U>, selector: MapFn<T, U>): U;
}

/*
declare module 'option-t/esm/Undefinable/or' {
import type { Undefinable } from 'option-t/esm/Undefinable/Undefinable';
declare export function orForMaybe<T>(a: Maybe<T>, b: Maybe<T>): Maybe<T>;
}
*/

declare module 'option-t/esm/Undefinable/orElse' {
  import type { Undefinable } from 'option-t/esm/Undefinable/Undefinable';
  declare export function orElseForUndefinable<T>(a: Undefinable<T>, b: (this: void) => Undefinable<T>): Undefinable<T>;
}

declare module 'option-t/esm/Undefinable/unwrap' {
  import type { Undefinable } from 'option-t/esm/Undefinable/Undefinable';
  declare export function unwrapUndefinable<T>(v: Undefinable<T>): T;
}

declare module 'option-t/esm/Undefinable/unwrapOr' {
  import type { Undefinable } from 'option-t/esm/Undefinable/Undefinable';
  declare export function unwrapOrFromUndefinable<T>(v: Undefinable<T>, def: T): T;
}

declare module 'option-t/esm/Undefinable/unwrapOrElse' {
  import type { Undefinable } from 'option-t/esm/Undefinable/Undefinable';
  import type { RecoveryFn } from 'option-t/esm/utils/Function';
  declare export function unwrapOrElseFromUndefinable<T>(v: Undefinable<T>, def: RecoveryFn<T>): T;
}

declare module 'option-t/esm/PlainOption/Option' {
  declare export type Option<T> = Some<T> | None;
  /**
   *  This allows to mutate the value to save needless allocation.
   */
  declare export type MutOption<T> = MutSome<T> | None;
  /**
   *  This allows to mutate the value to save needless allocation.
   */
  declare export type MutSome<T> = {|
      +ok: true;
      val: T;
  |};
  declare export type Some<T> = {|
      +ok: true;
      +val: T;
  |};
  declare export function isSome<T>(v: Option<T>): boolean;
  declare export function createSome<T>(val: T): Some<T>;
  declare export type None = {|
      +ok: false;
  |};
  declare export function isNone<T>(v: Option<T>): boolean;
  declare export function createNone(): None;
}

/*
declare module 'option-t/esm/PlainOption/and' {
// TODO:
}
*/

declare module 'option-t/esm/PlainOption/andThen' {
  import type { Option } from 'option-t/esm/PlainOption/Option';
  declare export function andThenForOption<T, U>(src: Option<T>, fn: (this: void, v: T) => Option<U>): Option<U>;
}

declare module 'option-t/esm/PlainOption/asMut' {
  import type { Option, MutOption } from 'option-t/esm/PlainOption/Option';
  declare export function asMutOption<T>(v: Option<T>): MutOption<T>;
}

declare module 'option-t/esm/PlainOption/tap' {
  import type { Option } from 'option-t/esm/PlainOption/Option';
  import type { TapFn } from 'option-t/esm/utils/Function';
  declare export function tapOption<T>(v: Option<T>, fn: TapFn<T>): void;
}

declare module 'option-t/esm/PlainOption/expect' {
  import type { Option } from 'option-t/esm/PlainOption/Option';
  declare export function expectIsSome<T>(v: Option<T>, msg: string): T;
}

declare module 'option-t/esm/PlainOption/map' {
  import type { Option } from 'option-t/esm/PlainOption/Option';
  import type { MapFn } from 'option-t/esm/utils/Function';
  declare export function mapForOption<T, U>(src: Option<T>, selector: MapFn<T, U>): Option<U>;
}

declare module 'option-t/esm/PlainOption/mapOr' {
  import type { Option } from 'option-t/esm/PlainOption/Option';
  import type { MapFn } from 'option-t/esm/utils/Function';
  declare export function mapOrForOption<T, U>(src: Option<T>, def: U, selector: MapFn<T, U>): U;
}

declare module 'option-t/esm/PlainOption/mapOrElse' {
  import type { Option } from 'option-t/esm/PlainOption/Option';
  import type { MapFn, RecoveryFn } from 'option-t/esm/utils/Function';
  declare export function mapOrElseForOption<T, U>(src: Option<T>, def: RecoveryFn<U>, selector: MapFn<T, U>): U;
}

/*
declare module 'option-t/esm/PlainOption/or' {
// TODO:
}
*/

declare module 'option-t/esm/PlainOption/orElse' {
  import type { Option } from 'option-t/esm/PlainOption/Option';
  declare export function orElseForOption<T>(a: Option<T>, b: (this: void) => Option<T>): Option<T>;
}

declare module 'option-t/esm/PlainOption/unwrap' {
  import type { Option } from 'option-t/esm/PlainOption/Option';
  declare export function unwrapOption<T>(v: Option<T>): T;
}

declare module 'option-t/esm/PlainOption/unwrapOr' {
  import type { Option } from 'option-t/esm/PlainOption/Option';
  declare export function unwrapOrFromOption<T>(v: Option<T>, def: T): T;
}

declare module 'option-t/esm/PlainOption/unwrapOrElse' {
  import type { Option } from 'option-t/esm/PlainOption/Option';
  import type { RecoveryFn } from 'option-t/esm/utils/Function';
  declare export function unwrapOrElseFromOption<T>(v: Option<T>, def: RecoveryFn<T>): T;
}

declare module 'option-t/esm/PlainResult/Result' {
  import type { Some, MutSome } from 'option-t/esm/PlainOption/Option';
  declare export type Result<T, E> = Ok<T> | Err<E>;
  /**
   *  This allows to mutate the value to save needless allocation.
   */
  declare export type MutResult<T, E> = MutOk<T> | MutErr<E>;
  /**
   *  This allows to mutate the value to save needless allocation.
   */
  declare export type MutOk<T> = MutSome<T>;
  declare export type Ok<T> = Some<T>;
  declare export function isOk<T, E>(v: Result<T, E>): boolean;
  declare export function createOk<T>(val: T): Ok<T>;
  /**
   *  This allows to mutate the value to save needless allocation.
   */
  declare export type MutErr<E> = {|
      +ok: false;
      err: E;
  |};
  declare export type Err<E> = {|
    +ok: false;
  +err: E;
  |};
  declare export function isErr<T, E>(v: Result<T, E>): boolean;
  declare export function createErr<E>(err: E): Err<E>;
}

declare module 'option-t/esm/PlainResult/Function' {
  import type { Result } from 'option-t/esm/PlainResult/Result';
  declare export type FlatmapOkFn<T, U, E> = (this: void, v: T) => Result<U, E>;
  declare export type FlatmapErrFn<T, E, F> = (this: void, e: E) => Result<T, F>;
}

/*
declare module 'option-t/esm/PlainResult/and' {
// TODO:
}
*/

declare module 'option-t/esm/PlainResult/andThen' {
  import type { Result } from 'option-t/esm/PlainResult/Result';
  import type { FlatmapOkFn } from 'option-t/esm/PlainResult/Function';
  declare export function andThenForResult<T, U, E>(src: Result<T, E>, fn: FlatmapOkFn<T, U, E>): Result<U, E>;
}

declare module 'option-t/esm/PlainResult/asMut' {
  import type { Result, MutResult } from 'option-t/esm/PlainResult/Result';
  declare export function asMutResult<T, E>(v: Result<T, E>): MutResult<T, E>;
}

declare module 'option-t/esm/PlainResult/tap' {
  import type { Result } from 'option-t/esm/PlainResult/Result';
  import type { TapFn } from 'option-t/esm/utils/Function';
  declare export function tapOk<T, E>(v: Result<T, E>, fn: TapFn<T>): void;
  declare export function tapErr<T, E>(v: Result<T, E>, fn: TapFn<E>): void;
  declare export function tapBoth<T, E>(src: Result<T, E>, okFn: TapFn<T>, errFn: TapFn<E>): void;
}

declare module 'option-t/esm/PlainResult/expect' {
  import type { Result } from 'option-t/esm/PlainResult/Result';
  declare export function expectIsOk<T, E>(v: Result<T, E>, msg: string): T;
  declare export function expectIsErr<T, E>(v: Result<T, E>, msg: string): E;
}

declare module 'option-t/esm/PlainResult/map' {
  import type { Result } from 'option-t/esm/PlainResult/Result';
  import type { MapFn } from 'option-t/esm/utils/Function';
  declare export function mapForResult<T, U, E>(src: Result<T, E>, selector: MapFn<T, U>): Result<U, E>;
}

declare module 'option-t/esm/PlainResult/mapErr' {
  import type { Result } from 'option-t/esm/PlainResult/Result';
  import type { MapFn } from 'option-t/esm/utils/Function';
  declare export function mapErrForResult<T, E, F>(src: Result<T, E>, selector: MapFn<E, F>): Result<T, F>;
}

/*
declare module 'option-t/esm/PlainResult/or' {
// TODO:
}
*/

declare module 'option-t/esm/PlainResult/orElse' {
  import type { Result } from 'option-t/esm/PlainResult/Result';
  import type { FlatmapErrFn } from 'option-t/esm/PlainResult/Function';
  declare export function orElseForResult<T, E, F>(a: Result<T, E>, errSelector: FlatmapErrFn<T, E, F>): Result<T, F>;
}

declare module 'option-t/esm/PlainResult/toOption' {
  import type { Option } from 'option-t/esm/PlainOption/Option';
  import type { Result } from 'option-t/esm/PlainResult/Result';
  declare export function toOptionFromOk<T, E>(v: Result<T, E>): Option<T>;
  declare export function toOptionFromErr<T, E>(v: Result<T, E>): Option<E>;
}

declare module 'option-t/esm/PlainResult/unwrap' {
  import type { Result } from 'option-t/esm/PlainResult/Result';
  declare export function unwrapFromResult<T, E>(v: Result<T, E>): T;
  declare export function unwrapErrFromResult<T, E>(v: Result<T, E>): E;
}

declare module 'option-t/esm/PlainResult/unwrapOr' {
  import type { Result } from 'option-t/esm/PlainResult/Result';
  declare export function unwrapOrFromResult<T, E>(v: Result<T, E>, def: T): T;
}

declare module 'option-t/esm/PlainResult/unwrapOrElse' {
  import type { Result } from 'option-t/esm/PlainResult/Result';
  import type { RecoveryWithErrorFn } from 'option-t/esm/utils/Function';
  declare export function unwrapOrElseFromResult<T, E>(v: Result<T, E>, def: RecoveryWithErrorFn<E, T>): T;
}

declare module 'option-t/esm/utils/Function' {
  declare export type MapFn<T, U> = (v: T) => U;
  declare export type RecoveryFn<T> = () => T;
  declare export type RecoveryWithErrorFn<E, T> = (e: E) => T;
  declare export type TapFn<T> = (v: T) => void;
}

declare module 'option-t/esm/Option' {
  // TODO:
}

declare module 'option-t/esm/Result' {
  // TODO:
}
