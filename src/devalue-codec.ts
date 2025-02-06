import * as devalue from "devalue";
import type { Opaque } from "opaque-type";

export type DevalueSerializablePrimitive =
	| string
	| number
	| boolean
	| Date
	| bigint
	| Map<unknown, unknown>
	| Set<unknown>
	| Int8Array
	| Int16Array
	| Int32Array
	| Uint8Array
	| Uint16Array
	| Uint32Array
	| Uint8ClampedArray
	| Error
	| RegExp
	| URL
	| undefined
	| null;

export interface DevalueSerializableRecord {
	[key: string]:
		| DevalueSerializablePrimitive
		| DevalueSerializablePrimitive[]
		| DevalueSerializableRecord
		| DevalueSerializableRecord[];
}

export type DevalueSerializable =
	| DevalueSerializablePrimitive
	| DevalueSerializablePrimitive[]
	| DevalueSerializableRecord
	| DevalueSerializableRecord[];

/**
 * Serializes a {@link DevalueSerializable} object to a string.
 */
// @__NO_SIDE_EFFECTS__
export function stringify<T extends DevalueSerializable>(value: T) {
	return devalue.stringify(value) as DevalueEncoded<T>;
}

/**
 * Parses a stringified {@link DevalueSerializable} object and returns the original object.
 */
export function parse<T extends DevalueSerializable>(
	value: DevalueEncoded<T>,
): T;
export function parse(value: string): DevalueSerializable;

// @__NO_SIDE_EFFECTS__
export function parse(value: string) {
	return devalue.parse(value);
}

declare const type: unique symbol;
export type DevalueEncoded<
	T extends DevalueSerializable = DevalueSerializable,
> = Opaque<string, { readonly [type]: T }>;
