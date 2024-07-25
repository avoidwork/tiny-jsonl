import {MSG_INVALID_INPUT, STRING_STRING} from "./constants";

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
