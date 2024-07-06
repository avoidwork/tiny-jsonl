import assert from "node:assert";
import {jsonl} from "../dist/tiny-jsonl.cjs";

describe("Testing functionality", function () {
	it("It should handle an Object", function () {
		const jsonldObject = jsonl({"id": "test-123", "email": "test@example.com", "field1:field2": "d,e"});
		const expectedResult = "{\"id\": \"test-123\", \"email\": \"test@example.com\", \"field1:field2\": \"d,e\"}";
		assert.strictEqual(jsonldObject, expectedResult, "Should match the jsonld string");
	});

	it("It should handle an Array of Objects", function () {
		const jsonldObject = jsonl([{"id": "test-123", "email": "test@example.com"}, {"id": "test-456", "email": "test2@example.com"}]);
		const expectedResult = "{\"id\": \"test-123\", \"email\": \"test@example.com\"}\n{\"id\": \"test-456\", \"email\": \"test2@example.com\"}";
		assert.strictEqual(jsonldObject, expectedResult, "Should match the jsonld string");
	});
});
