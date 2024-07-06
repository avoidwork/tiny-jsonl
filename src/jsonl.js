export function jsonl (arg) {
	let result;

	if (Array.isArray(arg)) {
		result = arg.map(i => jsonl(i)).join("\n");
	} else {
		result = JSON.stringify(arg, null, 0).replace(/^"|\n|\\|"$/g, "").replace(/^{\s/, "{").replace(/\s}$/, "}").replace(/(:|,)/g, "$1 ")
	}

	return result;
}