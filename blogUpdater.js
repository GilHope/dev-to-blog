// blogUpdater.js
// This script is responsible for updating existing blog articles on Dev.to.
// It reads Markdown files from a specified directory, checks if corresponding
// articles already exist on Dev.to, and updates them with the latest content.

import fs from 'fs';
import path from 'path'; 
import { getMarkdownFiles, checkIfArticleExists } from './blogUtils.js';
import frontMatter from 'front-matter';
import fetch from 'node-fetch';

const DEV_TO_API_KEY = process.env.DEVTO_API_KEY;
const BLOGS_DIR = './blogs'; 

// Publishes a new article to Dev.to.
async function updateExistingArticle(articleId, title, content) {
    console.log(`Attempting to update article: ${title} with ID: ${articleId}`);
    const url = `https://dev.to/api/articles/${articleId}`;

    try {
        // Sending a PUT request to Dev.to API to update the article
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'api-key': DEV_TO_API_KEY
            },
            body: JSON.stringify({ 
                article: { 
                    title, 
                    body_markdown: content,
                    published: true
                } 
            })
        });

        // Parsing the JSON response from Dev.to API
        const data = await response.json();
        console.log('API Response:', data);

        // Checking if the request was successful
        if (!response.ok) {
            throw new Error(`API Request Failed: ${response.status} ${response.statusText}`);
        }

        console.log(`Article updated successfully: ${data.url}`);
    } catch (error) {
        console.error('Failed to update article:', error);
    }
}

// Processes markdown files for updates and applies them to existing articles on Dev.to.
async function processUpdatedMarkdownFiles() {
    // Retrieving all Markdown files from the specified directory
    const markdownFiles = getMarkdownFiles(BLOGS_DIR);

    // Iterating over each Markdown file
    for (const file of markdownFiles) {
        const filePath = path.join(BLOGS_DIR, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const { attributes, body } = frontMatter(content);

        console.log(`Read content from ${file}:`, body);

        // Extracting the title from the front matter of the Markdown file
        const title = attributes.title;
        if (!title) {
            console.error(`Missing title in ${file}`);
            continue; // Skipping file if title is not present
        }

        // Checking if an article with the same title already exists on Dev.to
        const existingArticleId = await checkIfArticleExists(title, DEV_TO_API_KEY);
        // If an existing article is found, update it with the new content
        if (existingArticleId) {
            await updateExistingArticle(existingArticleId, title, body);
        }
    }
}

// Initiating the process
processUpdatedMarkdownFiles().then(() => {
    console.log('Updated articles processed');
});
