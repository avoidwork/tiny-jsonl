/**
 * tiny-jsonl
 *
 * @copyright 2024 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @version 3.0.4
 */
'use strict';

const STRING_NEW_LINE = "\n";
const STRING_STRING = "string";
const MSG_INVALID_INPUT = "Argument must be an Array or Object";
const STRING_NULL = "null";
const STRING_COMMA = ",";
const STRING_OBJECT = "object";

function valid (arg) {
	return typeof arg === STRING_OBJECT && arg !== null;
}

/**
 * Converts a JSONL string to an Object or Array of Objects
 * @param arg
 * @returns {any}
 */
function parse (arg) {
	if (typeof arg !== STRING_STRING) {
		throw new TypeError(MSG_INVALID_INPUT);
	}

	const result = JSON.parse(`[${arg.trim().split(/(?<=})\n/).join(STRING_COMMA)}]`);

	return result.length > 1 ? result : result[0];
}

/**
 * Converts an Object or Array of Objects to JSONL string
 * @param arg
 * @returns {string}
 */
function stringify (arg) {
	if (valid(arg) === false) {
		throw new TypeError(MSG_INVALID_INPUT);
	}

	const input = Array.isArray(arg) ? arg : [arg];
	const rows = input.some(valid);

	return rows ? input.map(i => i === null ? STRING_NULL : valid(i) ? JSON.stringify(i) : i).join(STRING_NEW_LINE) : JSON.stringify(input);
}

exports.parse = parse;
exports.stringify = stringify;
