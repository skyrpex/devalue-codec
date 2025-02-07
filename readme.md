# devalue-codec

Uses [devalue](https://github.com/Rich-Harris/devalue) to serialize expressions while retaining the original object type.

Accepts the following types, including arrays and objects:

- `string`
- `number`
- `boolean`
- `Date`
- `bigint`
- `Map`
- `Set`
- `ArrayBuffer`
- `Int8Array`
- `Int16Array`
- `Int32Array`
- `Uint8Array`
- `Uint16Array`
- `Uint32Array`
- `Uint8ClampedArray`
- `RegExp`
- `undefined`
- `null`

## Installation

```sh
npm install devalue-codec
```

## Usage

```ts
import { stringify, parse } from "devalue-codec";

const encoded = stringify({
	key: "value",
});

const decoded = parse(encoded);
```

## Other codecs

- [@skyrpex/string-codec](https://github.com/skyrpex/string-codec)
- [superjson-codec](https://github.com/skyrpex/superjson-codec)
- [json-codec](https://github.com/skyrpex/json-codec)
