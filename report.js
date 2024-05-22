function printReport(pages) {
    for (let [url, count] of sortReport(pages)) {
        console.log(`Found ${count} link(s) to ${url}`);
    }
}

function sortReport(pages) {
    pages = Object.entries(pages);
    pages.sort((a, b) => {
        return b[1] - a[1];
    })
    return pages;
}

export { printReport, sortReport };