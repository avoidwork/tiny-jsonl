import {
	MSG_INVALID_INPUT,
	STRING_NEW_LINE,
	STRING_NULL,
	STRING_STRING
} from "./constants.js";
import {valid} from "./valid.js";

/**
 * Converts a JSONL string to an Array of Objects
 * @param arg
 * @returns {any}
 */
export function parse (arg) {
	if (typeof arg !== STRING_STRING) {
		throw new TypeError(MSG_INVALID_INPUT);
	}

	const result = JSON.parse(`[${arg.trim().split(/(?<=})\n/).join(",")}]`);

	return result.length > 1 ? result : result[0];
}

/**
 * Converts an Object or Array of Objects to JSONL string
 * @param arg
 * @returns {string}
 */
export function stringify (arg) {
	if (valid(arg) === false) {
		throw new TypeError(MSG_INVALID_INPUT);
	}

	const input = Array.isArray(arg) ? arg : [arg];
	const rows = input.some(valid);

	return rows ? input.map(i => i === null ? STRING_NULL : valid(i) ? JSON.stringify(i) : i).join(STRING_NEW_LINE) : JSON.stringify(input);
}
