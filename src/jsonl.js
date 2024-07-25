import {
	MSG_INDEX,
	MSG_INVALID_INPUT,
	STRING_MARK,
	STRING_NEW_LINE,
	STRING_OBJECT,
	STRING_REPLACEMENT,
	STRING_STRING
} from "./constants.js";
import {rewrite} from "./rewrite.js";
import {strings} from "tiny-strings";

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
	if (typeof arg !== STRING_OBJECT) {
		throw new TypeError(MSG_INVALID_INPUT);
	}

	let result;

	if (Array.isArray(arg)) {
		result = arg.map(i => stringify(i)).join(STRING_NEW_LINE);
	} else {
		let tmp = JSON.stringify(arg, null, 0);
		const extracted = strings(arg, true).map(rewrite);

		for (const [idx, val] of extracted.entries()) {
			tmp = tmp.replace(val, MSG_INDEX.replace(STRING_MARK, idx));
		}

		result = tmp.replace(/(:|,)/g, STRING_REPLACEMENT);

		for (const [idx, val] of extracted.entries()) {
			result = result.replace(MSG_INDEX.replace(STRING_MARK, idx.toString()), val);
		}
	}

	return result;
}
