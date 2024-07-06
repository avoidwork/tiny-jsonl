import {STRING_EMPTY, STRING_NEW_LINE, STRING_REPLACEMENT} from "./constants.js";

export function jsonl (arg) {
	let result;

	if (Array.isArray(arg)) {
		result = arg.map(i => jsonl(i)).join(STRING_NEW_LINE);
	} else {
		result = JSON.stringify(arg, null, 0)
			.replace(/\n/g, STRING_EMPTY)
			.replace(/(:|,)/g, STRING_REPLACEMENT);
	}

	return result;
}