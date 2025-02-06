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

// @__NO_SIDE_EFFECTS__
export const stringify = <T extends DevalueSerializable>(value: T) =>
	devalue.stringify(value) as DevalueEncoded<T>;

// @__NO_SIDE_EFFECTS__
export const parse = <T extends DevalueSerializable>(json: DevalueEncoded<T>) =>
	devalue.parse(json) as T;

declare const type: unique symbol;
export type DevalueEncoded<
	T extends DevalueSerializable = DevalueSerializable,
> = Opaque<string, { readonly [type]: T }>;
