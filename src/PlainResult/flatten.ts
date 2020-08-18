import { Result } from './Result';
import { andThenForResult } from './andThen';

function flatten<T, TError>(input: Result<T, TError>): Result<T, TError> {
    return input;
}

/**
 * Converts from `Result<Result<T, E>, E>` to `Result<T, E>`
 */
export function flattenForResult<T, TError>(input: Result<Result<T, TError>, TError>): Result<T, TError> {
    const r: Result<T, TError> = andThenForResult(input, flatten);
    return r;
}
