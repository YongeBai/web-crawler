import { test, expect} from "@jest/globals";
import { normalizeURL, getUrlsFromHtml } from "./crawl.js";
import { sortReport } from "./report.js"

// normalizeURL tests
test('test removing protocol', () => {
    expect(normalizeURL('http://www.example.com')).toBe('www.example.com');        
    expect(normalizeURL('https://www.example.com')).toBe('www.example.com');
})

test('test removing trailing slash', () => {
    expect(normalizeURL('http://www.example.com/')).toBe('www.example.com');
    expect(normalizeURL('http://www.example.com/path/')).toBe('www.example.com/path');
})

// test getUrlsFromHtml()
test('get one absolute url', () => {
    expect(getUrlsFromHtml('<a href="http://www.google.com">link</a>', 'http://www.example.com')).toEqual(['http://www.google.com']);
})
test('get relative url', () => {
    expect(getUrlsFromHtml(`
    <html>
    <body>
        <a href='/path'>Go to Boot.dev</a>
    </body>
</html>`, 'https://blog.boot.dev')).toEqual(['https://blog.boot.dev/path']);
})
test('get relative and absolute urls', () => {
    expect(getUrlsFromHtml(`
    <html>
    <body>
        <a href='/path'>Go to Boot.dev</a>
        <a href='http://www.google.com'>Google</a>
    </body>`, 'http://www.example.com'
    )).toEqual(['http://www.example.com/path', 'http://www.google.com']);
})

// test sorting pages
test('sort pages', () => {
    expect(sortReport({
        'http://www.example.com/path': 2,
        'http://www.example.com/path2': 3,
        'http://www.example.com': 1,
    })).toEqual([
        ['http://www.example.com/path2', 3],
        ['http://www.example.com/path', 2],
        ['http://www.example.com', 1],
    ]);
})
