import * as devalue from "devalue";
import { expect, test } from "vitest";
import * as codec from "./devalue-codec.ts";

test("stringifies correctly using superjson", () => {
	expect(
		codec.stringify({
			key: "value",
		}),
	).toEqual(
		devalue.stringify({
			key: "value",
		}),
	);
});

test("parses correctly", () => {
	expect(
		codec.parse(
			codec.stringify({
				key: "value",
			}),
		),
	).toEqual({
		key: "value",
	});
});

test("works with dates", () => {
	expect(codec.parse(codec.stringify(new Date("2025-01-01T01:01:01")))).toEqual(
		new Date("2025-01-01T01:01:01"),
	);
});

test("works with bigints", () => {
	expect(codec.parse(codec.stringify(7777n))).toEqual(7777n);
});

test("works with maps", () => {
	expect(codec.parse(codec.stringify(new Map([["key", "value"]])))).toEqual(
		new Map([["key", "value"]]),
	);
});

test("works with sets", () => {
	expect(codec.parse(codec.stringify(new Set([1, 2, 3])))).toEqual(
		new Set([1, 2, 3]),
	);
});

for (const ArrayContrustor of [
	Int8Array,
	Int16Array,
	Int32Array,
	Uint8Array,
	Uint16Array,
	Uint32Array,
	Uint8ClampedArray,
]) {
	test(`works with ${ArrayContrustor.name}`, () => {
		expect(
			codec.parse(codec.stringify(new ArrayContrustor([1, 2, 3]))),
		).toEqual(new ArrayContrustor([1, 2, 3]));
	});
}

test("works with undefined", () => {
	expect(codec.parse(codec.stringify(undefined))).toBe(undefined);
});

test("works with null", () => {
	expect(codec.parse(codec.stringify(null))).toBe(null);
});

test("works with regexp", () => {
	expect(codec.parse(codec.stringify(/test/))).toEqual(/test/);
});
