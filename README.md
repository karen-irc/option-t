# option-t

[![npm](https://img.shields.io/npm/v/option-t.svg?style=flat)](https://www.npmjs.com/package/option-t)
[![CI Status (GitHub Actions)](https://github.com/karen-irc/option-t/workflows/CI/badge.svg)](https://github.com/karen-irc/option-t/actions?query=workflow%3ACI)

* This library represents [Option type](https://en.wikipedia.org/wiki/Option_type) in ECMAScript.
    * You can sort the "nullable" convention in your project.
* APIs are inspired by Rust Language's [`Option<T>`](https://doc.rust-lang.org/std/option/) and [`Result<T, E>`](https://doc.rust-lang.org/std/result/).
* TypeScript friendly APIs.
    * We recommend to use this with some static type systems like TypeScript.






## Motivation

This library provides these conventions for your project:

1. Uniform an expression of "none" value in JavaScript
2. Uniform a way to carry error information instead of throwing an error.
3. Provide a utility function to handle _1_ and _2_ easily.

And Rust's [`std::option`](https://doc.rust-lang.org/std/option/) and [`std::result`](https://doc.rust-lang.org/std/result/) are
suggestive to achieve these conventions in practice. Thus this package is inspired by their design.


### Uniform the expression of "none" value.

In JavaScript world, there are many ways to express "there is no value".
At least in ECMA262, There are some ways to represent them:

* `undefined` (e.g. `Map.prototype.get()`)
* `null` (e.g. `RegExp.prototype.exec()`)
* `-1` (e.g. `String.prototype.indexOf()`)

In addition, ECMA262 interacts with [DOM binding](https://heycam.github.io/webidl/),
Node.js standard modules, and others. There are additional various ways to represent "none" value.

In practice, we write some _glue code_ to tame their various ways in our project to uniform their expression style.
This library contributes to uniform the convention to write it. 


### Uniform the way to carry error information instead of throwing an error.

_Exception_ is useful but it has some terrible aspects.
It's easy that _try-catch_ statement be a jump instruction by large scoped _try-catch_ statement.
It's hard to find where to throw an error, it's also hard to handle a penetrated exception from a lower layer.
Especially, _exception_ mechanism mis-matches with an async programming model.
ECMA262 7th' _async-await_ relaxes the problem about an exception with async programming,
but there is still the problem about exceptions in traditional synchronous programming.
Furthermore, if you interact with `setTimeout()` and other async APIs built with callback style on event loop,
this problem faces you.

And some async-push based paradigm like `Rx.Observable<T>` does not allow throw any exceptions
in their _Observable_ stream. If you throw an error in it, only _catch()_ operator can catch the error.
But a programmer would sometimes forget to use its operator. This means that throwing an Error in Rx's _Observable_
is pretty mis-matched action. _Promise<T>_ also has a similar problem.

And exception in ECMA262 is not friendly with static typing model
because ECMA262's _throw_ can throw not only `Error` but also other object types.

In Rust which is a programming language designed for parallel and seftiness, it treats errors in two category:

> Rust groups errors into two major categories: _recoverable_ and _unrecoverable_ errors.
> For a recoverable error, such as a file not found error,
> it’s reasonable to report the problem to the user and retry the operation.
> Unrecoverable errors are always symptoms of bugs, like trying to access a location beyond the end of an array.

This categorization is pretty useful to relax the problem about exception in ECMA262 which this section described.

Thus this library provides a way to express _recoverable_ error and also recommends
to use throwing an error only if you intend to throw an _unrecoverable_ error.
This categorization introduces a convenient convention for you:
	
* If the code uses _throw_, you should be careful about _unrecoverable_ error.
* If the code returns `Result<T, E>` provided this library, then you should handle it correctly.

This convention is clear as error handling style and it's static typing friendly by _generics_.


### Provide a utility function to handle these uniformed expression easily.

Some static type checking tools also provide a way to check nullability and provide these conventions.
 
- Flowtype's semantics has [a built-in "Maybe" types](https://flow.org/en/docs/types/maybe/),
- TypeScript has [a non-nullable type check](https://github.com/Microsoft/TypeScript/issues/185),
- Google Closure Compiler also can check a non-nullable type via JSDoc style annotations in some compilation mode.
 
Flowtype and TypeScript checks with their control flow analysis
(Sorry, I'm not sure about the details of Google Closure Compiler's behavior).
 
However, these compilers do not provide a way to handle their value easily like `map` or `flatMap` operations.
 
Rust's `std::option` and `std::result` have some utilities operation method to handle them easily.
This library also provides a convenient way to handle them and its way is inspired by Rust's ones.




## Installation

```sh
npm install --save option-t
// or
yarn add option-t --save
```






## Usage & APIs

* Utility functions for these types (TypeScript ready).
    * [`Nullable<T>` (`T | null`)](./src/Nullable/)
    * [`Undefinable<T>` (`T | undefined`)](./src/Undefinable/)
    * [`Maybe<T>` (`T | null | undefined`)](./src/Maybe/)
    * plain objects
        * [`Option<T>` (`{ ok: true; val: T } | { ok: false; }`)](./src/PlainOption/)
        * [`Result<T, E>` (`{ ok: true; val: T } | { ok: false; err: E; }`)](./src/PlainResult/)
* [Wrapper objects](./docs/wrapper_objects.md) ([__*deprecated*__](https://github.com/karen-irc/option-t/issues/459)).
    * [`ClassicOption<T>`](./src/ClassOption/ClassicOption.d.ts)
    * [`ClassicResult<T, E>`](./src/ClassResult/ClassicResult.d.ts)


### Utility functions for some types.

These are designed for more tree shaking friendly and more usable for JavaScript common world.

_We recommend to use these in almost case._

#### [`Nullable<T>` (`T | null`)](./src/Nullable/)

This can express a value of `T` type or `null`.

#### [`Undefinable<T>` (`T | undefined`)](./src/Undefinable/)

This can express a value of `T` type or `undefined`.

#### [`Maybe<T>` (`T | null | undefined`)](./src/Maybe/)

This can express a value of `T` type, `null`, or `undefined`.

####  [`Option<T>` (`{ ok: true; val: T } | { ok: false; }`)](./src/PlainOption/)

This can express that there is some values or none _as a plain object_.
This does not have any property method on its prototype. But this allows no including unused methods of them.

#### [`Result<T, E>` (`{ ok: true; val: T } | { ok: false; err: E; }`)](./src/PlainResult/)

This can express that there is some values or some error information _as a plain object_.
This does not have any property method on its prototype. But this allows no including unused methods of them.


### Wrapper objects (deprecated)

[See this guide](./docs/wrapper_objects.md).


### How to import

This package provides some sub directories to import various functions.
Each of them includes the same directory hierarchy with [under `src`/](./src/).

#### If your toolchain supports `exports` field in package.json...

You can use [these paths](./docs/public_api_list.md).

#### Otherwise...

- `option-t/cjs`
   - This directory provides commonjs style modules with `.js` extension.
- `option-t/esm`
   - This directory privides ES modules with `.mjs` extension.

##### Deprecation: Don't add `.js`, `.cjs`, `.mjs` extension for import path of this package

We're keeping their import path for backward compatibility.
But we're plan to remove them for future releases to switch this package's `type=module`. 

### Idioms

- You can see [some idioms](./docs/idiom/) of this library for the interoperability to JavaScript world.


### See also

These documents would provide more information about `Option<T>` and `Result<T, E>`.
These are written for Rust, but the essence is just same.

- [Error Handling - Rust by Example](https://doc.rust-lang.org/rust-by-example/error.html)
- [Error Handling - The Rust Programming Language](https://doc.rust-lang.org/book/second-edition/ch09-00-error-handling.html)
- [`std::option` - Rust](https://doc.rust-lang.org/std/option/)
- [`std::result` - Rust](https://doc.rust-lang.org/std/result/)




## License

[MIT License](./LICENSE.MIT)






## Contribution

- Use [`yarn`](https://yarnpkg.com/) to install dev-dependency toolchains.
