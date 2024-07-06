/**
 * tiny-jsonl
 *
 * @copyright 2024 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @version 1.0.0
 */
function jsonl (arg) {
	let result;

	if (Array.isArray(arg)) {
		result = arg.map(i => jsonl(i)).join("\n");
	} else {
		result = JSON.stringify(arg, null, 0).replace(/^"|\n|\\|"$/g, "").replace(/^{\s/, "{").replace(/\s}$/, "}").replace(/(:|,)/g, "$1 ");
	}

	return result;
}export{jsonl};