import assert from "node:assert";
import {jsonl} from "../dist/tiny-jsonl.cjs";

describe("Testing functionality", function () {
	it("It should jsonl an Object", function () {
		const jsonldObject = jsonl({"id": "test-123", "email": "test@example.com"});
		const expectedResult = "{\"id\": \"test-123\", \"email\": \"test@example.com\"}";
		assert.strictEqual(jsonldObject, expectedResult, "Should match the jsonld string");
	});

	it("It should jsonl an Array", function () {
		const jsonldObject = jsonl([{"id": "test-123", "email": "test@example.com"}, {"id": "test-456", "email": "test2@example.com"}]);
		const expectedResult = "{\"id\": \"test-123\", \"email\": \"test@example.com\"}\n{\"id\": \"test-456\", \"email\": \"test2@example.com\"}";
		assert.strictEqual(jsonldObject, expectedResult, "Should match the jsonld string");
	});
});
