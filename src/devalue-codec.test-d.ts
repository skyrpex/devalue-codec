import { assertType, test } from "vitest";
import * as codec from "./devalue-codec.ts";

test("stringify retains type", () => {
	const encoded = codec.stringify({
		key: "value",
	});

	assertType<codec.Stringified<{ key: string }>>(encoded);

	// @ts-expect-error Cannot assign a string to a number
	assertType<codec.Stringified<{ key: number }>>(encoded);
});

test("parse retains type", () => {
	const encoded = codec.stringify({
		key: "value",
	});

	const decoded = codec.parse(encoded);

	assertType<{ key: string }>(decoded);
});

test("allows stringifying interfaces", () => {
	interface MyOptions {
		string: string;
	}
	const options: MyOptions = {
		string: "string",
	};

	const encoded = codec.stringify(options);
});

test("allows stringifying types", () => {
	type MyOptions = {
		string: string;
	};
	const options: MyOptions = {
		string: "string",
	};

	const encoded = codec.stringify(options);
});

test("forbids unsupported types", () => {
	// @ts-expect-error Unsupported type
	codec.stringify(new URL(""));

	codec.stringify({
		// @ts-expect-error Unsupported type
		url: new URL(""),
	});

	codec.stringify({
		// @ts-expect-error Unsupported type
		map: new Map([["", new URL("")]]),
	});
});
