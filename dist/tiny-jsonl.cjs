/**
 * tiny-jsonl
 *
 * @copyright 2024 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @version 1.0.2
 */
'use strict';

const STRING_EMPTY = "";
const STRING_NEW_LINE = "\n";
const STRING_REPLACEMENT = "$1 ";
const STRING_STRING = "string";
const STRING_OBJECT = "object";

function crawl (arg = {}, strings = []) {
	const keys = Object.keys(arg);
	strings.push(...keys);
	for (const key of strings) {
		if (typeof arg[key] === STRING_STRING) {
			strings.push(arg[key].replace(/"/g, "\\\""));
		} else if (Array.isArray(arg[key])) {
			for (const value of arg[key]) {
				crawl(value, strings);
			}
		} else if (typeof arg[key] === STRING_OBJECT) {
			crawl(arg[key], strings);
		}
	}
}

function jsonl (arg) {
	let result;

	if (Array.isArray(arg)) {
		result = arg.map(i => jsonl(i)).join(STRING_NEW_LINE);
	} else {
		let tmp = JSON.stringify(arg, null, 0);
		const strings = [];

		crawl(arg, strings);

		for (const [idx, val] of strings.entries()) {
			tmp = tmp.replace(`"${val}"`, `INDEX_${idx}`);
		}

		result = tmp.replace(/\n/g, STRING_EMPTY).replace(/(:|,)/g, STRING_REPLACEMENT);

		for (const [idx, val] of strings.entries()) {
			result = result.replace(`INDEX_${idx}`, `"${val}"`);
		}
	}

	return result;
}

exports.jsonl = jsonl;
