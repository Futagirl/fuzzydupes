import { readFile, writeFile } from 'fs/promises';

import Fuse from 'fuse.js';

// var myArgs = process.argv.slice(2);

async function findInList(list: string[]) {
	let results: { name: string, matches: Fuse.FuseResult<string>[] }[] = []
	results = results.concat(list.map(item => {
		let fuse = new Fuse(list, { includeScore: true, ignoreLocation: true, threshold: 0.5 });
		return { name: item, matches: fuse.search(item).splice(1) };
	})).filter(item => {
		if (item.matches.length >= 1) {
			return item;
		}
	});
	await writeFile("./res.json", JSON.stringify(results))
}

readFile("./files.txt").then(file => { findInList(file.toString().split("\n")) });

// findInList(list);

// findInList(myArgs);