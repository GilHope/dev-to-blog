// blogUtils.js

import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

// Function to get all markdown files from the directory
export function getMarkdownFiles(dir) {
    const files = fs.readdirSync(dir);
    return files.filter(file => file.endsWith('.md'));
}

// Function to check if an article already exists on Dev.to
export async function checkIfArticleExists(title, apiKey) {
    // ... implementation to check if article exists ...
    // Use fetch with apiKey to call Dev.to API and compare titles
}