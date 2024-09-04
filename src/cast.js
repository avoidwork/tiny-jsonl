/**
 * Casts an array to a string
 * @param arg
 * @returns {string}
 */
export function cast (arg) {
	const result = `[${arg.map(i => typeof i === "string" ? `"${i}"` : i === null ? "null" : i).join(", ")}]`;

	return result.replace(", ]", "]");
}
