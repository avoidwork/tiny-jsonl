import {strictEqual, throws} from "node:assert";
import {parse, stringify} from "../dist/tiny-jsonl.cjs";

describe("Testing functionality", function () {
	it("It should parse an Object", function () {
		const jsonObject = parse("{\"id\": \"test-123\", \"email\": \"test@example.com\", \"field1:field2\": \"d,e\", \"description\": \"this field has \\\"embed quotes\\\"\", \"object\": {\"abc\": true, \"def\": false}, \"array\": [\"ghi\", 1234, \"other string\", {\"nested\": true, \"multi-line\": \"string\\ttabbed\\n\\rwith\\n\\rnew\\n\\rlines\"}]}");
		const expectedResult = {"id": "test-123", "email": "test@example.com", "field1:field2": "d,e", "description": "this field has \"embed quotes\"", "object": {"abc": true, "def": false}, "array": ["ghi", 1234, "other string", {"nested": true, "multi-line": "string\ttabbed\n\rwith\n\rnew\n\rlines"}]};
		strictEqual(JSON.stringify(jsonObject), JSON.stringify(expectedResult), "Should match the object");
	});

	it("It should parse an Array of Objects", function () {
		const jsonObject = parse("{\"id\": \"test-123\", \"email\": \"test@example.com\"}\n{\"id\": \"test-456\", \"email\": \"test2@example.com\"}");
		const expectedResult = [{"id": "test-123", "email": "test@example.com"}, {"id": "test-456", "email": "test2@example.com"}];
		strictEqual(JSON.stringify(jsonObject), JSON.stringify(expectedResult), "Should match the array of objects");
	});

	it("It should throw a TypeError if trying to parse a non-String", function () {
		throws(() => parse(true), TypeError);
	});

	it("It should stringify an Object", function () {
		const jsonlObject = stringify({"id": "test-123", "email": "test@example.com", "field1:field2": "d,e", "description": "this field has \"embed quotes\"", "object": {"abc": true, "def": false}, "array": ["ghi", 1234, "other string", {"nested": true, "multi-line": "string\ttabbed\n\rwith\n\rnew\n\rlines"}]});
		const expectedResult = "{\"id\": \"test-123\", \"email\": \"test@example.com\", \"field1:field2\": \"d,e\", \"description\": \"this field has \\\"embed quotes\\\"\", \"object\": {\"abc\": true, \"def\": false}, \"array\": [\"ghi\", 1234, \"other string\", {\"nested\": true, \"multi-line\": \"string\\ttabbed\\n\\rwith\\n\\rnew\\n\\rlines\"}]}";
		strictEqual(jsonlObject, expectedResult, "Should match the jsonl string");
	});

	it("It should stringify an Array of Objects", function () {
		const jsonlObject = stringify([{"id": "test-123", "email": "test@example.com", "internal": {"bits": [1, 0, 0, 1, 0, 1, 0, "surprise", false]}}, {"id": "test-456", "email": "test2@example.com"}]);
		const expectedResult = "{\"id\": \"test-123\", \"email\": \"test@example.com\", \"internal\": {\"bits\": [1, 0, 0, 1, 0, 1, 0, \"surprise\", false]}}\n{\"id\": \"test-456\", \"email\": \"test2@example.com\"}";
		strictEqual(jsonlObject, expectedResult, "Should match the jsonl string");
	});

	it("It should stringify an Array of Primitives", function () {
		const jsonlObject = stringify(["a", "b", "c", true, false, 123, 456.789, null]);
		const expectedResult = "[\"a\", \"b\", \"c\", true, false, 123, 456.789]";
		strictEqual(jsonlObject, expectedResult, "Should match the jsonl string");
	});

	it("It should stringify an Array of nested Arrays", function () {
		const jsonlObject1 = stringify([["a", "b", "c"], [true, false], [123, 456.789, null]]);
		const expectedResult1 = "[\"a\", \"b\", \"c\"]\n[true, false]\n[123, 456.789]";
		strictEqual(jsonlObject1, expectedResult1, "Should match the jsonl string");
		const jsonlObject2 = stringify([["a", "b", "c", [true, false]], [123, 456.789, [null, null]]]);
		const expectedResult2 = "[\"a\", \"b\", \"c\", \"[true, false]\"]\n[123, 456.789, \"[null, null]\"]";
		strictEqual(jsonlObject2, expectedResult2, "Should match the jsonl string");
	});

	it("It should throw a TypeError if trying to stringify a String", function () {
		throws(() => stringify("invalid"), TypeError);
	});
});
