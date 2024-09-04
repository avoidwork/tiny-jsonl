/**
 * Casts an array to a string
 * @param arg
 * @returns {string}
 */
export function cast (arg) {
	return `[${arg.map(i => typeof i === "string" ? `"${i}"` : i).join(", ")}]`.replace(", ]", "]");
}
