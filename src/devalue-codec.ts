import { type SerializableRecord, parser, stringifier } from "codec-builder";
import * as devalue from "devalue";

export type { Stringified } from "codec-builder";

export type SerializablePrimitive =
	| string
	| number
	| boolean
	| Date
	| bigint
	| Map<unknown, SerializablePrimitive>
	| Set<SerializablePrimitive>
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

export type Serializable = SerializableRecord<SerializablePrimitive>;

// biome-ignore lint/complexity/noBannedTypes: we need to forbid Function
export type Forbidden = symbol | URL | Function;

/**
 * Serializes a {@link SerializablePrimitive} object to a string.
 */
// @__NO_SIDE_EFFECTS__
export const stringify = stringifier<SerializablePrimitive, Forbidden>(
	devalue.stringify,
);

/**
 * Parses a stringified {@link SerializablePrimitive} object to its original object.
 */
// @__NO_SIDE_EFFECTS__
export const parse = parser<SerializablePrimitive>(devalue.parse);
