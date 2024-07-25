/**
 * tiny-jsonl
 *
 * @copyright 2024 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @version 2.0.0
 */
'use strict';

var tinyStrings = require('tiny-strings');

const STRING_MARK = "$";
const STRING_NEW_LINE = "\n";
const STRING_OBJECT = "object";
const STRING_REPLACEMENT = "$1 ";
const STRING_STRING = "string";
const MSG_INVALID_INPUT = "Argument must be an Array or Object";
const MSG_INDEX = `<IDX_${STRING_MARK}>`;

/**
 * Rewrite a string to be used in swaps
 * @param arg
 * @returns {string}
 */
function rewrite (arg) {
	return `"${arg.replace(/"/g, "\\\"").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t")}"`;
}

/**
 * Converts a JSONL string to an Array of Objects
 * @param arg
 * @returns {any}
 */
function parse (arg) {
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
function stringify (arg) {
	if (typeof arg !== STRING_OBJECT) {
		throw new TypeError(MSG_INVALID_INPUT);
	}

	let result;

	if (Array.isArray(arg)) {
		result = arg.map(i => stringify(i)).join(STRING_NEW_LINE);
	} else {
		let tmp = JSON.stringify(arg, null, 0);
		const extracted = tinyStrings.strings(arg, true).map(rewrite);

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

exports.parse = parse;
exports.stringify = stringify;
