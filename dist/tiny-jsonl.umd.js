/**
 * tiny-jsonl
 *
 * @copyright 2024 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @version 1.0.5
 */
(function(g,f){typeof exports==='object'&&typeof module!=='undefined'?f(exports,require('tiny-strings')):typeof define==='function'&&define.amd?define(['exports','tiny-strings'],f):(g=typeof globalThis!=='undefined'?globalThis:g||self,f(g.jsonl={},g.tinyStrings));})(this,(function(exports,tinyStrings){'use strict';const STRING_NEW_LINE = "\n";
const STRING_REPLACEMENT = "$1 ";
const STRING_OBJECT = "object";
const MSG_INVALID_INPUT = "Argument must be an Array or Object";function rewrite (arg = "") {
	return `"${arg.replace(/"/g, "\\\"")}"`;
}function jsonl (arg) {
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
			tmp = tmp.replace(val, `INDEX_${idx}`);
		}

		result = tmp.replace(/(:|,)/g, STRING_REPLACEMENT);

		for (const [idx, val] of extracted.entries()) {
			result = result.replace(`INDEX_${idx}`, val);
		}
	}

	return result;
}exports.jsonl=jsonl;}));