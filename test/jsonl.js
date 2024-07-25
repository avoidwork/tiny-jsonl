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
		const jsonlObject = stringify([{"id": "test-123", "email": "test@example.com"}, {"id": "test-456", "email": "test2@example.com"}]);
		const expectedResult = "{\"id\": \"test-123\", \"email\": \"test@example.com\"}\n{\"id\": \"test-456\", \"email\": \"test2@example.com\"}";
		strictEqual(jsonlObject, expectedResult, "Should match the jsonl string");
	});

	it("It should throw a TypeError if trying to stringify a String", function () {
		throws(() => stringify("invalid"), TypeError);
	});
});
