/*
 * @license MIT License
 *
 * Copyright (c) 2015 Tetsuharu OHZEKI <saneyuki.snyk@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

// XXX:
// The type definitions for '--moduleResolution node' is a ES6 format,
// So it would test it by importing it simply.
import {Option, Some, None} from '../../lib/Option';
import {Result, Ok, Err, ResultBase} from '../../lib/Result';

//  Ok<T>
(function(){
    const result: Result<number, void> = new Ok<number, void>(1);

    const isOk: boolean = result.isOk();
    const isErr: boolean = result.isErr();

    const ok: Option<number> = result.ok();
    const err: Option<void> = result.err();

    const map: Result<string, void> = result.map<string>((v: number) => String(v));
    const mapErr: Result<number, string> = result.mapErr<string>((_: void) => String(''));

    const and1: Result<string, void> = result.and(new Ok<string, void>(''));
    const and2: Result<string, void> = result.and(new Err<string, void>(undefined));
    const andThen1: Result<string, void> = result.andThen<string>((_: number) => new Ok<string, void>(''));
    const andThen2: Result<string, void> = result.andThen<string>((_: number) => new Err<string, void>(undefined));

    const or1: Result<number, string> = result.or<string>(new Ok<number, string>(1));
    const or2: Result<number, string> = result.or<string>(new Err<number, string>(''));
    const orElse1: Result<number, string> = result.orElse<string>((_: void) => new Ok<number, string>(1));
    const orElse2: Result<number, string> = result.orElse<string>((_: void) => new Err<number, string>(''));

    const unwrap: number = result.unwrap();
    const unwrapErr: void = result.unwrapErr();
    const unwrapOr: number = result.unwrapOr(1);
    const unwrapOrElse: number = result.unwrapOrElse((_: void) => 1);
    const expect: number = result.expect('');

    result.drop();
    result.drop((_: number) => {});
    result.drop((_: number) => {}, (_: void) => {});

    if (result instanceof ResultBase) {
        const bar: any = null;
    }
})();

//  Err<E>
(function(){
    const result: Result<number, void> = new Err<number, void>(undefined);

    const isOk: boolean = result.isOk();
    const isErr: boolean = result.isErr();

    const ok: Option<number> = result.ok();
    const err: Option<void> = result.err();

    const map: Result<string, void> = result.map<string>((v: number) => String(v));
    const mapErr: Result<number, string> = result.mapErr<string>((_: void) => String(''));

    const and1: Result<string, void> = result.and(new Ok<string, void>(''));
    const and2: Result<string, void> = result.and(new Err<string, void>(undefined));
    const andThen1: Result<string, void> = result.andThen<string>((_: number) => new Ok<string, void>(''));
    const andThen2: Result<string, void> = result.andThen<string>((_: number) => new Err<string, void>(undefined));

    const or1: Result<number, string> = result.or<string>(new Ok<number, string>(1));
    const or2: Result<number, string> = result.or<string>(new Err<number, string>(''));
    const orElse1: Result<number, string> = result.orElse<string>((_: void) => new Ok<number, string>(1));
    const orElse2: Result<number, string> = result.orElse<string>((_: void) => new Err<number, string>(''));

    const unwrap: number = result.unwrap();
    const unwrapErr: void = result.unwrapErr();
    const unwrapOr: number = result.unwrapOr(1);
    const unwrapOrElse: number = result.unwrapOrElse((_: void) => 1);
    const expect: number = result.expect('');

    result.drop();
    result.drop((_: number) => {});
    result.drop((_: number) => {}, (_: void) => {});

    if (result instanceof ResultBase) {
        const bar: any = null;
    }
})();

//  Result<T, E>
(function(){
    let option: Result<void, void> = new Err<void, void>(undefined);
    option = new Ok<void, void>(undefined);

    let option2: Result<void, void> = new Ok<void, void>(undefined);
    option2 = new Err<void, void>(undefined);
})();
