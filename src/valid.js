import {STRING_OBJECT} from "./constants.js";

export function valid (arg) {
	return typeof arg === STRING_OBJECT && arg !== null;
}
