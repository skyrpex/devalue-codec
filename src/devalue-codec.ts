import { parser, stringifier } from "codec-builder";
import * as devalue from "devalue";

export type { Stringified } from "codec-builder";

export type Serializable =
	| string
	| number
	| boolean
	| Date
	| bigint
	| Map<unknown, Serializable>
	| Set<Serializable>
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

// biome-ignore lint/complexity/noBannedTypes: we need to forbid Function
type Forbidden = symbol | URL | Function;

/**
 * Serializes a {@link Serializable} object to a string.
 */
// @__NO_SIDE_EFFECTS__
export const stringify = stringifier<Serializable, Forbidden>(
	devalue.stringify,
);

/**
 * Parses a stringified {@link Serializable} object and returns the original object.
 */
// @__NO_SIDE_EFFECTS__
export const parse = parser<Serializable>(devalue.parse);
