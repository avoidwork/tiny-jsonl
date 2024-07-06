import {STRING_OBJECT, STRING_STRING} from "./constants.js";

export function crawl (arg = {}, strings = []) {
	const keys = Object.keys(arg);
	strings.push(...keys);
	for (const key of strings) {
		if (typeof arg[key] === STRING_STRING) {
			strings.push(arg[key].replace(/"/g, "\\\""));
		} else if (Array.isArray(arg[key])) {
			for (const value of arg[key]) {
				crawl(value, strings);
			}
		} else if (typeof arg[key] === STRING_OBJECT) {
			crawl(arg[key], strings);
		}
	}
}