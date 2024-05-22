import { JSDOM } from 'jsdom';

function normalizeURL(url) {
    let urlObj  = new URL(url);
    let domainAndPath = urlObj.hostname + urlObj.pathname;
    if (domainAndPath.endsWith('/')) {
        domainAndPath = domainAndPath.slice(0, -1);
    }
    return domainAndPath;
}

function getUrlsFromHtml(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody, {
        url: baseURL
    })
    let urls = [];
    for (let a of dom.window.document.querySelectorAll('a')) {
        let href = a.getAttribute('href');
        if (href) {
            if (href.includes('://')) {
                urls.push(href);
            } else {
                urls.push(baseURL + href);
            }
        }
    }
    return urls;
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
    let normalizeCurrentURL = normalizeURL(currentURL);
    let normalizedBaseURL = normalizeURL(baseURL);

    let currentDomain = normalizeCurrentURL.split('/')[0];
    let baseDomain = normalizedBaseURL.split('/')[0];
    
    if (currentDomain !== baseDomain) {
        return pages;
    }
    if (currentURL in pages) {
        pages[currentURL] += 1;
        return pages;
    }
    pages[currentURL] = 1;

    try {
        let response = await fetch(currentURL);
        if (!response.ok) {
            throw new Error(`Failed to load page ${currentURL}`);
        }
        if (response.headers.get('content-type').split(';')[0] !== 'text/html') {
            throw new Error(`Page ${currentURL} is not an HTML page`);

        }
        let html = await response.text();
        let urls = getUrlsFromHtml(html, baseURL);
        for (let url of urls) {
            await crawlPage(baseURL, url, pages);
        }   
        return pages;     
    }
    catch (error) {
        console.error(error.message);
    }
    
    
}

export { normalizeURL, getUrlsFromHtml, crawlPage};
