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
    const url = 'https://dev.to/api/articles/me';
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'api-key': apiKey
            }
        });
        const articles = await response.json();

        // Find an article with the matching title
        const foundArticle = articles.find(article => article.title === title);
        console.log(`Found article for title '${title}':`, foundArticle);

        // Return the article ID if found, otherwise return null
        return foundArticle ? foundArticle.id : null;
    } catch (error) {
        console.error('Error checking if article exists:', error);
        return null;
    }
}