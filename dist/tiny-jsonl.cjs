/**
 * tiny-jsonl
 *
 * @copyright 2024 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @version 1.0.8
 */
'use strict';

var tinyStrings = require('tiny-strings');

const STRING_NEW_LINE = "\n";
const STRING_REPLACEMENT = "$1 ";
const STRING_OBJECT = "object";
const STRING_MARK = "$";
const MSG_INVALID_INPUT = "Argument must be an Array or Object";
const MSG_INDEX = `<IDX_${STRING_MARK}>`;

/**
 * Rewrite a string to be used in swaps
 * @param arg
 * @returns {string}
 */
function rewrite (arg) {
	return `"${arg.replace(/"/g, "\\\"")}"`;
}

/**
 * Converts an Object or Array of Objects to JSONL string
 * @param arg
 * @returns {string}
 */
function jsonl (arg) {
	if (typeof arg !== STRING_OBJECT) {
		throw new TypeError(MSG_INVALID_INPUT);
	}

	let result;

	if (Array.isArray(arg)) {
		result = arg.map(i => jsonl(i)).join(STRING_NEW_LINE);
	} else {
		let tmp = JSON.stringify(arg, null, 0);
		const extracted = tinyStrings.strings(arg, true).map(rewrite);

		for (const [idx, val] of extracted.entries()) {
			tmp = tmp.replace(val, MSG_INDEX.replace(STRING_MARK, idx));
		}

		result = tmp.replace(/(:|,)/g, STRING_REPLACEMENT);

		for (const [idx, val] of extracted.entries()) {
			result = result.replace(MSG_INDEX.replace(STRING_MARK, idx), val);
		}
	}

	return result;
}

exports.jsonl = jsonl;
