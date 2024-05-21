
function normalizeURL(url) {
    let urlObj  = new(url)
    let domainAndPath = urlObj.hostname + urlObj.pathname
    if (domainAndPath.endsWith('/')) {
        domainAndPath = domainAndPath.slice(0, -1)
    }
    return domainAndPath
}

export { normalizeURL };