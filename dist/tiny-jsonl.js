/**
 * tiny-jsonl
 *
 * @copyright 2024 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @version 1.0.1
 */
const STRING_EMPTY = "";
const STRING_NEW_LINE = "\n";
const STRING_REPLACEMENT = "$1 ";function jsonl (arg) {
	let result;

	if (Array.isArray(arg)) {
		result = arg.map(i => jsonl(i)).join(STRING_NEW_LINE);
	} else {
		result = JSON.stringify(arg, null, 0)
			.replace(/\n/g, STRING_EMPTY)
			.replace(/(:|,)/g, STRING_REPLACEMENT);
	}

	return result;
}export{jsonl};