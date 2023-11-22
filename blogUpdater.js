// blogUpdater.js

import fs from 'fs';
import path from 'path'; 
import { getMarkdownFiles, checkIfArticleExists } from './blogUtils.js';
import frontMatter from 'front-matter';
import fetch from 'node-fetch';

const DEV_TO_API_KEY = process.env.DEVTO_API_KEY;
const BLOGS_DIR = './blogs';

async function updateExistingArticle(articleId, title, content) {
    console.log(`Attempting to update article: ${title} with ID: ${articleId}`);
    const url = `https://dev.to/api/articles/${articleId}`;

    try {
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

        const data = await response.json();
        console.log('API Response:', data);

        if (!response.ok) {
            throw new Error(`API Request Failed: ${response.status} ${response.statusText}`);
        }

        console.log(`Article updated successfully: ${data.url}`);
    } catch (error) {
        console.error('Failed to update article:', error);
    }
}

async function processUpdatedMarkdownFiles() {
    const markdownFiles = getMarkdownFiles(BLOGS_DIR);

    for (const file of markdownFiles) {
        const filePath = path.join(BLOGS_DIR, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const { attributes, body } = frontMatter(content);

        const title = attributes.title;
        if (!title) {
            console.error(`Missing title in ${file}`);
            continue;
        }

        const existingArticleId = await checkIfArticleExists(title, DEV_TO_API_KEY);
        if (existingArticleId) {
            await updateExistingArticle(existingArticleId, title, body);
        }
    }
}

processUpdatedMarkdownFiles().then(() => {
    console.log('Updated articles processed');
});
