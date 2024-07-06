import {STRING_OBJECT, STRING_STRING} from "./constants.js";
import {rewrite} from "./rewrite.js";

export function crawl (arg = {}, strings = []) {
	const keys = Object.keys(arg);
	strings.push(...keys);
	for (const key of strings) {
		if (typeof arg[key] === STRING_STRING) {
			strings.push(rewrite(arg[key]));
		} else if (Array.isArray(arg[key])) {
			for (const value of arg[key]) {
				if (typeof value === STRING_OBJECT) {
					crawl(value, strings);
				} else if (typeof value === STRING_STRING) {
					strings.push(rewrite(value));
				}
			}
		} else if (typeof arg[key] === STRING_OBJECT) {
			crawl(arg[key], strings);
		}
	}
}