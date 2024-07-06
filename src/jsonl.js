import {STRING_EMPTY, STRING_NEW_LINE, STRING_REPLACEMENT} from "./constants.js";

export function jsonl (arg) {
	let result;

	if (Array.isArray(arg)) {
		result = arg.map(i => jsonl(i)).join(STRING_NEW_LINE);
	} else {
		let tmp = JSON.stringify(arg, null, 0);
		const strings = tmp.match(/"[^"]+"/g);

		for (const [idx, val] of strings.entries()) {
			tmp = tmp.replace(val, `INDEX_${idx}`);
		}

		result = tmp.replace(/\n/g, STRING_EMPTY).replace(/(:|,)/g, STRING_REPLACEMENT);

		for (const [idx, val] of strings.entries()) {
			result = result.replace(`INDEX_${idx}`, val);
		}
	}

	return result;
}