/**
 * Converts a JSONL string to an Array of Objects
 * @param arg
 * @returns {any}
 */
export function parse(arg: string): any;
/**
 * Converts an Object or Array of Objects to JSONL string
 * @param arg
 * @returns {string}
 */
export function stringify(arg: Record<string, any> | Record<string, any>[]): string;
