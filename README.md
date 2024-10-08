# Tiny JSONL

Stringify Objects and Arrays into JSONL Strings, and parse JSONL Strings into Objects and Arrays.

## API

### parse()

Converts a JSONL string to an Object or Array of Objects

    param  {String} to parse into an Object, or Array of Objects
	return {String} JSONL string

**Example**

```javascript
import {parse} from "tiny-jsonl";

const arrayObjects = parse('{...}\n{...}\n{...}');
```

### stringify()

Converts an Object or Array of Objects to JSONL string

    param  {Array} or {Object} to transform
	return {String} JSONL string

**Example**

```javascript
import {stringify} from "tiny-jsonl";

const jsonlString = stringify([
    {
        ...
    },
    {
        ...
    }
]);
```

## Testing

Tiny JSONL has 100% code coverage with its tests.

```console
----------------|---------|----------|---------|---------|-------------------
File            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------------|---------|----------|---------|---------|-------------------
All files       |     100 |      100 |     100 |     100 |                  
 tiny-jsonl.cjs |     100 |      100 |     100 |     100 |                  
----------------|---------|----------|---------|---------|-------------------
```

## Example

### Input

```javascript
import {stringify} from "tiny-jsonl";
stringify([
	{
		"_id": "66897c0b5bb3f3bda598a7be",
		"index": 0,
		"guid": "57cc37b7-ea7b-4cf5-b07e-238a15cc1cdd",
		"isActive": true,
		"balance": "$1,290.80",
		"picture": "http://placehold.it/32x32",
		"age": 21,
		"eyeColor": "blue",
		"name": "Valeria Jenkins",
		"gender": "female",
		"company": "GEOLOGIX",
		"email": "valeriajenkins@geologix.com",
		"phone": "+1 (976) 597-3338",
		"address": "681 Jackson Place, Collins, Nevada, 8477",
		"about": "Officia sunt fugiat aute eiusmod cillum excepteur enim consectetur in pariatur consequat cupidatat. Id minim anim sint cupidatat nostrud labore esse proident eiusmod eu. Dolor sit aute adipisicing est proident eiusmod voluptate reprehenderit sunt aliquip non quis. Lorem voluptate laboris aliquip cupidatat.\r\n",
		"registered": "2016-04-05T01:14:10 +04:00",
		"latitude": 8.514373,
		"longitude": -22.578972,
		"tags": [
			"voluptate",
			"esse",
			"amet",
			"mollit",
			"in",
			"consectetur",
			"sunt"
		],
		"friends": [
			{
				"id": 0,
				"name": "Moore Howell"
			},
			{
				"id": 1,
				"name": "Summer Cline"
			},
			{
				"id": 2,
				"name": "Francis Simon"
			}
		],
		"greeting": "Hello, Valeria Jenkins! You have 1 unread messages.",
		"favoriteFruit": "banana"
	},
	{
		"_id": "66897c0b0eea9250887803d6",
		"index": 1,
		"guid": "6eac3134-b442-4289-a498-ef9b5624f196",
		"isActive": false,
		"balance": "$1,302.96",
		"picture": "http://placehold.it/32x32",
		"age": 28,
		"eyeColor": "brown",
		"name": "Amanda Rodgers",
		"gender": "female",
		"company": "GRAINSPOT",
		"email": "amandarodgers@grainspot.com",
		"phone": "+1 (987) 457-3247",
		"address": "650 Osborn Street, Edenburg, New Jersey, 1377",
		"about": "Eu minim enim aliquip nulla aliquip elit sit nostrud dolore reprehenderit aliquip sit qui Lorem. Enim et excepteur dolor velit minim nulla ullamco nisi. Qui adipisicing id occaecat nisi duis quis sint minim laborum minim id. Do id aliqua deserunt incididunt nulla officia nostrud reprehenderit laborum aliquip qui. Veniam pariatur eu quis reprehenderit velit nostrud deserunt deserunt. Commodo duis esse deserunt laborum tempor dolore anim laborum deserunt ipsum sit tempor consectetur.\r\n",
		"registered": "2023-05-27T09:39:08 +04:00",
		"latitude": 45.890773,
		"longitude": -29.059383,
		"tags": [
			"Lorem",
			"sunt",
			"cillum",
			"ea",
			"in",
			"aute",
			"culpa"
		],
		"friends": [
			{
				"id": 0,
				"name": "Jo Nunez"
			},
			{
				"id": 1,
				"name": "Mcdonald Burns"
			},
			{
				"id": 2,
				"name": "Pacheco Vang"
			}
		],
		"greeting": "Hello, Amanda Rodgers! You have 7 unread messages.",
		"favoriteFruit": "strawberry"
	}
]);
```

### Output

```json lines
{"_id":"66897c0b5bb3f3bda598a7be","index":0,"guid":"57cc37b7-ea7b-4cf5-b07e-238a15cc1cdd","isActive":true,"balance":"$1,290.80","picture":"http://placehold.it/32x32","age":21,"eyeColor":"blue","name":"Valeria Jenkins","gender":"female","company":"GEOLOGIX","email":"valeriajenkins@geologix.com","phone":"+1 (976) 597-3338","address":"681 Jackson Place, Collins, Nevada, 8477","about":"Officia sunt fugiat aute eiusmod cillum excepteur enim consectetur in pariatur consequat cupidatat. Id minim anim sint cupidatat nostrud labore esse proident eiusmod eu. Dolor sit aute adipisicing est proident eiusmod voluptate reprehenderit sunt aliquip non quis. Lorem voluptate laboris aliquip cupidatat.\\r\\n","registered":"2016-04-05T01:14:10 +04:00","latitude":8.514373,"longitude":-22.578972,"tags":["voluptate","esse","amet","mollit","in","consectetur","sunt"],"friends":[{"id":0,"name":"Moore Howell"},{"id":1,"name":"Summer Cline"},{"id":2,"name":"Francis Simon"}],"greeting":"Hello, Valeria Jenkins! You have 1 unread messages.","favoriteFruit":"banana"}
{"_id":"66897c0b0eea9250887803d6","index":1,"guid":"6eac3134-b442-4289-a498-ef9b5624f196","isActive":false,"balance":"$1,302.96","picture":"http://placehold.it/32x32","age":28,"eyeColor":"brown","name":"Amanda Rodgers","gender":"female","company":"GRAINSPOT","email":"amandarodgers@grainspot.com","phone":"+1 (987) 457-3247","address":"650 Osborn Street, Edenburg, New Jersey, 1377","about":"Eu minim enim aliquip nulla aliquip elit sit nostrud dolore reprehenderit aliquip sit qui Lorem. Enim et excepteur dolor velit minim nulla ullamco nisi. Qui adipisicing id occaecat nisi duis quis sint minim laborum minim id. Do id aliqua deserunt incididunt nulla officia nostrud reprehenderit laborum aliquip qui. Veniam pariatur eu quis reprehenderit velit nostrud deserunt deserunt. Commodo duis esse deserunt laborum tempor dolore anim laborum deserunt ipsum sit tempor consectetur.\\r\\n","registered":"2023-05-27T09:39:08 +04:00","latitude":45.890773,"longitude":-29.059383,"tags":["Lorem","sunt","cillum","ea","in","aute","culpa"],"friends":[{"id":0,"name":"Jo Nunez"},{"id":1,"name":"Mcdonald Burns"},{"id":2,"name":"Pacheco Vang"}],"greeting":"Hello, Amanda Rodgers! You have 7 unread messages.","favoriteFruit":"strawberry"}
```

## License
Copyright (c) 2024 Jason Mulligan
Licensed under the BSD-3 license.
