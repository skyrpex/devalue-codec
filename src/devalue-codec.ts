import * as codecBuilder from "codec-builder";
import * as devalue from "devalue";

export type { Stringified } from "codec-builder";

export type Allowed =
	| string
	| number
	| boolean
	| Date
	| bigint
	| Map<unknown, Allowed>
	| Set<Allowed>
	| Int8Array
	| Int16Array
	| Int32Array
	| Uint8Array
	| Uint16Array
	| Uint32Array
	| Uint8ClampedArray
	| RegExp
	| undefined
	| null;

/**
 * @deprecated Use {@link Check} instead.
 */
export type Serializable = codecBuilder.SerializableRecord<Allowed>;

// biome-ignore lint/complexity/noBannedTypes: we need to forbid Function
export type Forbidden = symbol | URL | Function;

/**
 * Checks if a value is serializable.
 *
 * @returns `T` if the value is serializable, `never` otherwise.
 */
export type Check<T> = codecBuilder.Serializable<T, Allowed, Forbidden>;

/**
 * Serializes a {@link Allowed} object to a string.
 */
// @__NO_SIDE_EFFECTS__
export const stringify = codecBuilder.stringifier<Allowed, Forbidden>(
	devalue.stringify,
);

/**
 * Parses a stringified {@link Allowed} object to its original object.
 */
// @__NO_SIDE_EFFECTS__
export const parse = codecBuilder.parser<Allowed>(devalue.parse);
