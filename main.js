import { crawlPage } from './crawl.js';
import { printReport } from './report.js';

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
    let pages = await crawlPage(url);
    printReport(pages);
}

main();