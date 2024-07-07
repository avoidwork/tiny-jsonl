/**
 * Rewrite a string to be used in swaps
 * @param arg
 * @returns {string}
 */
export function rewrite (arg) {
	return `"${arg.replace(/"/g, "\\\"").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t")}"`;
}