/* eslint-disable @typescript-eslint/no-unused-vars */

// XXX:
// The type definitions for '--moduleResolution node' is a ES6 format,
// So it would test it by importing it simply.
import { Option } from '../../__dist/esm/Option';
import { Result, ResultBase, createOk, createErr } from '../../__dist/esm/Result';

//  Ok<T>
(function () {
    let result: Result<number, void> = createOk<number, void>(1);
    result = createOk<number, void>(1);

    // @ts-expect-error ts-migrate(6133) FIXME: 'isOk' is declared but its value is never read.
    const isOk: boolean = result.isOk();
    // @ts-expect-error ts-migrate(6133) FIXME: 'isErr' is declared but its value is never read.
    const isErr: boolean = result.isErr();

    // @ts-expect-error ts-migrate(6133) FIXME: 'ok' is declared but its value is never read.
    const ok: Option<number> = result.ok();
    // @ts-expect-error ts-migrate(6133) FIXME: 'err' is declared but its value is never read.
    const err: Option<void> = result.err();

    // @ts-expect-error ts-migrate(6133) FIXME: 'map' is declared but its value is never read.
    const map: Result<string, void> = result.map<string>((v: number) => String(v));
    // @ts-expect-error ts-migrate(6133) FIXME: 'mapErr' is declared but its value is never read.
    const mapErr: Result<number, string> = result.mapErr<string>((_: void) => String(''));

    // @ts-expect-error ts-migrate(6133) FIXME: 'and1' is declared but its value is never read.
    const and1: Result<string, void> = result.and(createOk<string, void>(''));
    // @ts-expect-error ts-migrate(6133) FIXME: 'and2' is declared but its value is never read.
    const and2: Result<string, void> = result.and(createErr<string, void>(undefined));
    // @ts-expect-error ts-migrate(6133) FIXME: 'andThen1' is declared but its value is never read... Remove this comment to see the full error message
    const andThen1: Result<string, void> = result.andThen<string>((_: number) =>
        createOk<string, void>('')
    );
    // @ts-expect-error ts-migrate(6133) FIXME: 'andThen2' is declared but its value is never read... Remove this comment to see the full error message
    const andThen2: Result<string, void> = result.andThen<string>((_: number) =>
        createErr<string, void>(undefined)
    );

    // @ts-expect-error ts-migrate(6133) FIXME: 'or1' is declared but its value is never read.
    const or1: Result<number, string> = result.or<string>(createOk<number, string>(1));
    // @ts-expect-error ts-migrate(6133) FIXME: 'or2' is declared but its value is never read.
    const or2: Result<number, string> = result.or<string>(createErr<number, string>(''));
    // @ts-expect-error ts-migrate(6133) FIXME: 'orElse1' is declared but its value is never read.
    const orElse1: Result<number, string> = result.orElse<string>((_: void) =>
        createOk<number, string>(1)
    );
    // @ts-expect-error ts-migrate(6133) FIXME: 'orElse2' is declared but its value is never read.
    const orElse2: Result<number, string> = result.orElse<string>((_: void) =>
        createErr<number, string>('')
    );

    // @ts-expect-error ts-migrate(6133) FIXME: 'unwrap' is declared but its value is never read.
    const unwrap: number = result.unwrap();
    // @ts-expect-error ts-migrate(6133) FIXME: 'unwrapErr' is declared but its value is never rea... Remove this comment to see the full error message
    const unwrapErr: void = result.unwrapErr();
    // @ts-expect-error ts-migrate(6133) FIXME: 'unwrapOr' is declared but its value is never read... Remove this comment to see the full error message
    const unwrapOr: number = result.unwrapOr(1);
    // @ts-expect-error ts-migrate(6133) FIXME: 'unwrapOrElse' is declared but its value is never ... Remove this comment to see the full error message
    const unwrapOrElse: number = result.unwrapOrElse((_: void) => 1);
    // @ts-expect-error ts-migrate(6133) FIXME: 'expect' is declared but its value is never read.
    const expect: number = result.expect('');

    result.drop();
    result.drop((_: number) => {});
    result.drop(
        (_: number) => {},
        (_: void) => {}
    );

    if (result instanceof ResultBase) {
        // @ts-expect-error ts-migrate(6133) FIXME: 'bar' is declared but its value is never read.
        const bar: any = null;
    }
})();

//  Err<E>
(function () {
    let result: Result<number, void> = createErr<number, void>(undefined);
    result = createErr<number, void>(undefined);

    // @ts-expect-error ts-migrate(6133) FIXME: 'isOk' is declared but its value is never read.
    const isOk: boolean = result.isOk();
    // @ts-expect-error ts-migrate(6133) FIXME: 'isErr' is declared but its value is never read.
    const isErr: boolean = result.isErr();

    // @ts-expect-error ts-migrate(6133) FIXME: 'ok' is declared but its value is never read.
    const ok: Option<number> = result.ok();
    // @ts-expect-error ts-migrate(6133) FIXME: 'err' is declared but its value is never read.
    const err: Option<void> = result.err();

    // @ts-expect-error ts-migrate(6133) FIXME: 'map' is declared but its value is never read.
    const map: Result<string, void> = result.map<string>((v: number) => String(v));
    // @ts-expect-error ts-migrate(6133) FIXME: 'mapErr' is declared but its value is never read.
    const mapErr: Result<number, string> = result.mapErr<string>((_: void) => String(''));

    // @ts-expect-error ts-migrate(6133) FIXME: 'and1' is declared but its value is never read.
    const and1: Result<string, void> = result.and(createOk<string, void>(''));
    // @ts-expect-error ts-migrate(6133) FIXME: 'and2' is declared but its value is never read.
    const and2: Result<string, void> = result.and(createErr<string, void>(undefined));
    // @ts-expect-error ts-migrate(6133) FIXME: 'andThen1' is declared but its value is never read... Remove this comment to see the full error message
    const andThen1: Result<string, void> = result.andThen<string>((_: number) =>
        createOk<string, void>('')
    );
    // @ts-expect-error ts-migrate(6133) FIXME: 'andThen2' is declared but its value is never read... Remove this comment to see the full error message
    const andThen2: Result<string, void> = result.andThen<string>((_: number) =>
        createErr<string, void>(undefined)
    );

    // @ts-expect-error ts-migrate(6133) FIXME: 'or1' is declared but its value is never read.
    const or1: Result<number, string> = result.or<string>(createOk<number, string>(1));
    // @ts-expect-error ts-migrate(6133) FIXME: 'or2' is declared but its value is never read.
    const or2: Result<number, string> = result.or<string>(createErr<number, string>(''));
    // @ts-expect-error ts-migrate(6133) FIXME: 'orElse1' is declared but its value is never read.
    const orElse1: Result<number, string> = result.orElse<string>((_: void) =>
        createOk<number, string>(1)
    );
    // @ts-expect-error ts-migrate(6133) FIXME: 'orElse2' is declared but its value is never read.
    const orElse2: Result<number, string> = result.orElse<string>((_: void) =>
        createErr<number, string>('')
    );

    // @ts-expect-error ts-migrate(6133) FIXME: 'unwrap' is declared but its value is never read.
    const unwrap: number = result.unwrap();
    // @ts-expect-error ts-migrate(6133) FIXME: 'unwrapErr' is declared but its value is never rea... Remove this comment to see the full error message
    const unwrapErr: void = result.unwrapErr();
    // @ts-expect-error ts-migrate(6133) FIXME: 'unwrapOr' is declared but its value is never read... Remove this comment to see the full error message
    const unwrapOr: number = result.unwrapOr(1);
    // @ts-expect-error ts-migrate(6133) FIXME: 'unwrapOrElse' is declared but its value is never ... Remove this comment to see the full error message
    const unwrapOrElse: number = result.unwrapOrElse((_: void) => 1);
    // @ts-expect-error ts-migrate(6133) FIXME: 'expect' is declared but its value is never read.
    const expect: number = result.expect('');

    result.drop();
    result.drop((_: number) => {});
    result.drop(
        (_: number) => {},
        (_: void) => {}
    );

    if (result instanceof ResultBase) {
        // @ts-expect-error ts-migrate(6133) FIXME: 'bar' is declared but its value is never read.
        const bar: any = null;
    }
})();

//  Result<T, E>
(function () {
    // @ts-expect-error ts-migrate(6133) FIXME: 'option' is declared but its value is never read.
    let option: Result<void, void> = createErr<void, void>(undefined);
    option = createOk<void, void>(undefined);

    // @ts-expect-error ts-migrate(6133) FIXME: 'option2' is declared but its value is never read.
    let option2: Result<void, void> = createOk<void, void>(undefined);
    option2 = createErr<void, void>(undefined);
})();
