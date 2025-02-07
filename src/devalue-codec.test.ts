import * as devalue from "devalue";
import { expect, test } from "vitest";
import { parse, stringify } from "./devalue-codec.ts";

test("stringifies correctly using superjson", () => {
	expect(
		stringify({
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
		parse(
			stringify({
				key: "value",
			}),
		),
	).toEqual({
		key: "value",
	});
});

test("works with dates", () => {
	expect(parse(stringify(new Date("2025-01-01T01:01:01")))).toEqual(
		new Date("2025-01-01T01:01:01"),
	);
});

test("works with bigints", () => {
	expect(parse(stringify(7777n))).toEqual(7777n);
});

test("works with maps", () => {
	expect(parse(stringify(new Map([["key", "value"]])))).toEqual(
		new Map([["key", "value"]]),
	);
});

test("works with sets", () => {
	expect(parse(stringify(new Set([1, 2, 3])))).toEqual(new Set([1, 2, 3]));
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
		expect(parse(stringify(new ArrayContrustor([1, 2, 3])))).toEqual(
			new ArrayContrustor([1, 2, 3]),
		);
	});
}

test("works with undefined", () => {
	expect(parse(stringify(undefined))).toBe(undefined);
});

test("works with null", () => {
	expect(parse(stringify(null))).toBe(null);
});

test("works with regexp", () => {
	expect(parse(stringify(/test/))).toEqual(/test/);
});
