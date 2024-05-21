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

export { normalizeURL, getUrlsFromHtml };