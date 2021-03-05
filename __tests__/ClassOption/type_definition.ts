/* eslint-disable @typescript-eslint/no-unused-vars */

// XXX:
// The type definitions for '--moduleResolution node' is a ES6 format,
// So it would test it by importing it simply.
import { Option, OptionBase, createSome, createNone } from '../../__dist/esm/Option.mjs';

// `Some<T>`
(function () {
    let option: Option<number> = createSome(1);
    option = createSome<number>(1);
    // @ts-expect-error ts-migrate(6133) FIXME: 'isSome' is declared but its value is never read.
    const isSome: boolean = option.isSome;
    // @ts-expect-error ts-migrate(6133) FIXME: 'isNone' is declared but its value is never read.
    const isNone: boolean = option.isNone;
    // @ts-expect-error ts-migrate(6133) FIXME: 'unwrap' is declared but its value is never read.
    const unwrap: number = option.unwrap();
    // @ts-expect-error ts-migrate(6133) FIXME: 'unwrapOr' is declared but its value is never read... Remove this comment to see the full error message
    const unwrapOr: number = option.unwrapOr(10);
    // @ts-expect-error ts-migrate(6133) FIXME: 'unwrapOrElse' is declared but its value is never ... Remove this comment to see the full error message
    const unwrapOrElse: number = option.unwrapOrElse((): number => 10);
    // @ts-expect-error ts-migrate(6133) FIXME: 'expect' is declared but its value is never read.
    const expect: number = option.expect('barfoo');
    // @ts-expect-error ts-migrate(6133) FIXME: 'map' is declared but its value is never read.
    const map: Option<string> = option.map((val: number): string => String(val));
    // @ts-expect-error ts-migrate(6133) FIXME: 'flatMap' is declared but its value is never read.
    const flatMap: Option<string> = option.flatMap(
        (val: number): Option<string> => {
            return createSome(String(val));
        }
    );
    // @ts-expect-error ts-migrate(6133) FIXME: 'mapOr' is declared but its value is never read.
    const mapOr: string = option.mapOr('bar', (val: number): string => String(val));
    // @ts-expect-error ts-migrate(6133) FIXME: 'mapOrElse' is declared but its value is never rea... Remove this comment to see the full error message
    const mapOrElse: string = option.mapOrElse(
        (): string => {
            return String(10);
        },
        (v: number) => {
            return String(v);
        }
    );
    // @ts-expect-error ts-migrate(6133) FIXME: 'and' is declared but its value is never read.
    const and: Option<string> = option.and(createSome<string>('bar'));
    // @ts-expect-error ts-migrate(6133) FIXME: 'andThen' is declared but its value is never read.
    const andThen: Option<string> = option.andThen(
        (_: number): Option<string> => {
            return createNone<string>();
        }
    );
    // @ts-expect-error ts-migrate(6133) FIXME: 'or' is declared but its value is never read.
    const or: Option<number> = option.or(createSome<number>(10));
    // @ts-expect-error ts-migrate(6133) FIXME: 'orElse' is declared but its value is never read.
    const orElse: Option<number> = option.orElse(
        (): Option<number> => {
            return createSome<number>(2);
        }
    );
    option.drop();
    option.drop((_: number) => {});

    if (option instanceof OptionBase) {
        // @ts-expect-error ts-migrate(6133) FIXME: 'bar' is declared but its value is never read.
        const bar: unknown = null;
    }
})();

// `None<T>`
(function () {
    let option: Option<number> = createNone<number>();
    option = createNone<number>();
    // @ts-expect-error ts-migrate(6133) FIXME: 'isSome' is declared but its value is never read.
    const isSome: boolean = option.isSome;
    // @ts-expect-error ts-migrate(6133) FIXME: 'isNone' is declared but its value is never read.
    const isNone: boolean = option.isNone;
    // @ts-expect-error ts-migrate(6133) FIXME: 'unwrap' is declared but its value is never read.
    const unwrap: number = option.unwrap();
    // @ts-expect-error ts-migrate(6133) FIXME: 'unwrapOr' is declared but its value is never read... Remove this comment to see the full error message
    const unwrapOr: number = option.unwrapOr(10);
    // @ts-expect-error ts-migrate(6133) FIXME: 'unwrapOrElse' is declared but its value is never ... Remove this comment to see the full error message
    const unwrapOrElse: number = option.unwrapOrElse((): number => 10);
    // @ts-expect-error ts-migrate(6133) FIXME: 'expect' is declared but its value is never read.
    const expect: number = option.expect('barfoo');
    // @ts-expect-error ts-migrate(6133) FIXME: 'map' is declared but its value is never read.
    const map: Option<string> = option.map((val: number): string => String(val));
    // @ts-expect-error ts-migrate(6133) FIXME: 'flatMap' is declared but its value is never read.
    const flatMap: Option<string> = option.flatMap(
        (_: number): Option<string> => {
            return createNone<string>();
        }
    );
    // @ts-expect-error ts-migrate(6133) FIXME: 'mapOr' is declared but its value is never read.
    const mapOr: string = option.mapOr('bar', (val: number): string => String(val));
    // @ts-expect-error ts-migrate(6133) FIXME: 'mapOrElse' is declared but its value is never rea... Remove this comment to see the full error message
    const mapOrElse: string = option.mapOrElse(
        (): string => {
            return String(10);
        },
        (v: number) => {
            return String(v);
        }
    );
    // @ts-expect-error ts-migrate(6133) FIXME: 'and' is declared but its value is never read.
    const and: Option<string> = option.and(createSome<string>('bar'));
    // @ts-expect-error ts-migrate(6133) FIXME: 'andThen' is declared but its value is never read.
    const andThen: Option<string> = option.andThen(
        (_: number): Option<string> => {
            return createNone<string>();
        }
    );
    // @ts-expect-error ts-migrate(6133) FIXME: 'or' is declared but its value is never read.
    const or: Option<number> = option.or(createSome<number>(10));
    // @ts-expect-error ts-migrate(6133) FIXME: 'orElse' is declared but its value is never read.
    const orElse: Option<number> = option.orElse(
        (): Option<number> => {
            return createSome<number>(2);
        }
    );
    option.drop();
    option.drop((_: number) => {});

    if (option instanceof OptionBase) {
        // @ts-expect-error ts-migrate(6133) FIXME: 'bar' is declared but its value is never read.
        const bar: unknown = null;
    }
})();

// `Option<T>`
(function () {
    // @ts-expect-error ts-migrate(6133) FIXME: 'option' is declared but its value is never read.
    let option: Option<number> = createNone<number>();
    option = createSome(1);

    // @ts-expect-error ts-migrate(6133) FIXME: 'option2' is declared but its value is never read.
    let option2: Option<string> = createSome('bar');
    option2 = createNone<string>();
})();
