import { crawlPageSeriel, crawlPageConcurrent, normalizeURL } from './crawl.js';
import { printReport } from './report.js';
import fs from 'fs';

async function main() {
    if (process.argv.length < 3) {
        console.log('Error: No URL provided');
        process.exit(1);
    } else if (process.argv.length > 4) {
        console.log('Error: Too many arguments');
        process.exit(1);
    }
    let url = process.argv[2];
    console.log(`Crawling ${url}`);

    // seriel crawling
    let pages = await crawlPageSeriel(url);
    
    let normalizedURL = normalizeURL(url);
    let replacedURL = normalizedURL.replace(/\./g, '_');
    let path = `outputs/${replacedURL}.json`;
    writeOrCompareJson(path, pages);
    
    // concurrent crawling
    pages = await crawlPageConcurrent(url);     
    writeOrCompareJson(path, pages);
}

function writeOrCompareJson(path, testJSON) {
    let filesExists = false;
    try {
        fs.accessSync(path);
        filesExists = true;
    } catch (error) {
        filesExists = false;
    }
    if (filesExists) {
        let existingJSON = fs.readFileSync(path, 'utf-8');
        let existingJSONParsed = JSON.parse(existingJSON);
        if (areEqual(existingJSONParsed, testJSON)){
            console.log('JSON files match');
        }
        else {
            console.log('JSON files do not match');
        }
    }
    else {
        fs.writeFileSync(path, JSON.stringify(testJSON));
    }
}

function areEqual(obj1, obj2) {
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);
    if (keys1.length != keys2.length) {
        return false;
    }
    for (let key of keys1) {
        if (obj1[key] != obj2[key]) {
            console.log('Key:', key, 'obj1:', obj1[key], 'obj2:', obj2[key]);
            return false;
        }
    }
    return true;
}
main();

export { main };