export function rewrite (arg = "") {
	return `"${arg.replace(/"/g, "\\\"")}"`;
}