function printReport(pages) {
    let sortedPages = sortReport(pages);
    // for (let [url, count] of sortedPages) {
    //     console.log(`Found ${count} link(s) to ${url}`);
    // }
    return sortedPages;
}

function sortReport(pages) {
    pages = Object.entries(pages);
    pages.sort((a, b) => {
        return b[1] - a[1];
    })
    return pages;
}

export { printReport, sortReport };