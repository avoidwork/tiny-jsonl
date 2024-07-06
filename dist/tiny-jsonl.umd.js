/**
 * tiny-jsonl
 *
 * @copyright 2024 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @version 1.0.3
 */
(function(g,f){typeof exports==='object'&&typeof module!=='undefined'?f(exports):typeof define==='function'&&define.amd?define(['exports'],f):(g=typeof globalThis!=='undefined'?globalThis:g||self,f(g.lru={}));})(this,(function(exports){'use strict';const STRING_NEW_LINE = "\n";
const STRING_REPLACEMENT = "$1 ";
const STRING_STRING = "string";
const STRING_OBJECT = "object";
const MSG_INVALID_INPUT = "Argument must be an Array or Object";function rewrite (arg = "") {
	return arg.replace(/"/g, "\\\"");
}function crawl (arg = {}, strings = []) {
	const keys = Object.keys(arg);
	strings.push(...keys);
	for (const key of strings) {
		if (typeof arg[key] === STRING_STRING) {
			strings.push(rewrite(arg[key]));
		} else if (Array.isArray(arg[key])) {
			for (const value of arg[key]) {
				if (typeof value === STRING_OBJECT) {
					crawl(value, strings);
				} else if (typeof value === STRING_STRING) {
					strings.push(rewrite(value));
				}
			}
		} else if (typeof arg[key] === STRING_OBJECT) {
			crawl(arg[key], strings);
		}
	}
}function jsonl (arg) {
	if (typeof arg !== STRING_OBJECT) {
		throw new TypeError(MSG_INVALID_INPUT);
	}

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

		result = tmp.replace(/(:|,)/g, STRING_REPLACEMENT);

		for (const [idx, val] of strings.entries()) {
			result = result.replace(`INDEX_${idx}`, `"${val}"`);
		}
	}

	return result;
}exports.jsonl=jsonl;}));