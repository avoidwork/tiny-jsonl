import {STRING_EMPTY, STRING_LEFT_BRACE, STRING_NEW_LINE, STRING_REPLACEMENT, STRING_RIGHT_BRACE} from "./constants.js";

export function jsonl (arg) {
	let result;

	if (Array.isArray(arg)) {
		result = arg.map(i => jsonl(i)).join(STRING_NEW_LINE);
	} else {
		result = JSON.stringify(arg, null, 0)
			.replace(/^"|\n|\\|"$/g, STRING_EMPTY)
			.replace(/^{\s/, STRING_LEFT_BRACE)
			.replace(/\s}$/, STRING_RIGHT_BRACE)
			.replace(/(:|,)/g, STRING_REPLACEMENT);
	}

	return result;
}