import {strictEqual, throws} from "node:assert";
import {jsonl} from "../dist/tiny-jsonl.cjs";

describe("Testing functionality", function () {
	it("It should handle an Object", function () {
		const jsonlObject = jsonl({"id": "test-123", "email": "test@example.com", "field1:field2": "d,e", "description": "this field has \"embed quotes\"", "object": {"abc": true, "def": false}, "array": ["ghi", 1234, "other string", {"nested": true}]});
		const expectedResult = "{\"id\": \"test-123\", \"email\": \"test@example.com\", \"field1:field2\": \"d,e\", \"description\": \"this field has \\\"embed quotes\\\"\", \"object\": {\"abc\": true, \"def\": false}, \"array\": [\"ghi\", 1234, \"other string\", {\"nested\": true}]}";
		strictEqual(jsonlObject, expectedResult, "Should match the jsonl string");
	});

	it("It should handle an Array of Objects", function () {
		const jsonlObject = jsonl([{"id": "test-123", "email": "test@example.com"}, {"id": "test-456", "email": "test2@example.com"}]);
		const expectedResult = "{\"id\": \"test-123\", \"email\": \"test@example.com\"}\n{\"id\": \"test-456\", \"email\": \"test2@example.com\"}";
		strictEqual(jsonlObject, expectedResult, "Should match the jsonl string");
	});

	it("It should throw a TypeError if receiving a String", function () {
		throws(() => jsonl("invalid"), TypeError);
	})
});
