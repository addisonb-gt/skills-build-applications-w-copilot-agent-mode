import test from 'node:test';
import assert from 'node:assert/strict';
import { getApiBaseUrl } from './apiUrl.ts';
test('returns a localhost URL when no Codespaces environment is present', () => {
    const original = process.env.CODESPACE_NAME;
    delete process.env.CODESPACE_NAME;
    try {
        assert.equal(getApiBaseUrl(), 'http://localhost:8000');
    }
    finally {
        if (original === undefined) {
            delete process.env.CODESPACE_NAME;
        }
        else {
            process.env.CODESPACE_NAME = original;
        }
    }
});
test('returns a Codespaces URL when CODESPACE_NAME is present', () => {
    const original = process.env.CODESPACE_NAME;
    process.env.CODESPACE_NAME = 'octofit-demo';
    try {
        assert.equal(getApiBaseUrl(), 'https://octofit-demo-8000.app.github.dev');
    }
    finally {
        if (original === undefined) {
            delete process.env.CODESPACE_NAME;
        }
        else {
            process.env.CODESPACE_NAME = original;
        }
    }
});
