import { test, expect} from "@jest/globals";
import { normalizeURL } from "./crawl.js";

test('test http', () => {
    expect(normalizeURL('http://www.example.com')).toBe('www.example.com');    
})

test('test https', () => {
    expect(normalizeURL('https://www.example.com')).toBe('www.example.com');
})

test('test path has no trailing slash', () => {
    expect(normalizeURL('http://www.example.com/path/')).toBe('www.example.com/path');
})