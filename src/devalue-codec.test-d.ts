import { assertType, test } from "vitest";
import * as codec from "./devalue-codec.ts";

test("stringify retains type", () => {
	const encoded = codec.stringify({
		key: "value",
	});

	assertType<codec.DevalueEncoded<{ key: string }>>(encoded);

	// @ts-expect-error Cannot assign a string to a number
	assertType<codec.DevalueEncoded<{ key: number }>>(encoded);
});

test("parse retains type", () => {
	const encoded = codec.stringify({
		key: "value",
	});

	const decoded = codec.parse(encoded);

	assertType<{ key: string }>(decoded);
});

test("allows parsing untyped strings", () => {
	const decoded = codec.parse("");

	assertType<codec.DevalueSerializable>(decoded);
});
