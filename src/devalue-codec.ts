import * as devalue from "devalue";
import type { Opaque } from "opaque-type";

export type SuperjsonSerializablePrimitive =
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

export interface SuperjsonSerializableRecord {
	[key: string]:
		| SuperjsonSerializablePrimitive
		| SuperjsonSerializablePrimitive[]
		| SuperjsonSerializableRecord
		| SuperjsonSerializableRecord[];
}

export type SuperjsonSerializable =
	| SuperjsonSerializablePrimitive
	| SuperjsonSerializablePrimitive[]
	| SuperjsonSerializableRecord
	| SuperjsonSerializableRecord[];

// @__NO_SIDE_EFFECTS__
export const stringify = <T extends SuperjsonSerializable>(value: T) =>
	devalue.stringify(value) as SuperjsonEncoded<T>;

// @__NO_SIDE_EFFECTS__
export const parse = <T extends SuperjsonSerializable>(
	json: SuperjsonEncoded<T>,
) => devalue.parse(json) as T;

declare const type: unique symbol;
export type SuperjsonEncoded<
	T extends SuperjsonSerializable = SuperjsonSerializable,
> = Opaque<string, { readonly [type]: T }>;
