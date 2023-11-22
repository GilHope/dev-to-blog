// blogPublisher.js

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path'; 
import { getMarkdownFiles, checkIfArticleExists } from './blogUtils.js';
import frontMatter from 'front-matter';

const DEV_TO_API_KEY = process.env.DEVTO_API_KEY;
const BLOGS_DIR = './blogs';

async function publishNewArticle(articleContent, title) {
    console.log(`Attempting to publish article: ${title}`);
    const url = 'https://dev.to/api/articles';
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': DEV_TO_API_KEY
            },
            body: JSON.stringify({ 
                article: { 
                    title, 
                    body_markdown: articleContent,
                    published: true
                 } 
            })
        });

        const data = await response.json();
        console.log('API Response:', data);

        if (!response.ok) {
            throw new Error(`API Request Failed: ${response.status} ${response.statusText}`);
        }

        console.log(`Article published successfully: ${data.url}`);
    } catch (error) {
        console.error('Failed to publish article:', error);
    }
}


async function processNewMarkdownFiles() {
    const markdownFiles = getMarkdownFiles(BLOGS_DIR);
    console.log(`Found ${markdownFiles.length} markdown files to process.`);

    for (const file of markdownFiles) {
        console.log(`Processing file: ${file}`);
        const filePath = path.join(BLOGS_DIR, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const { attributes, body } = frontMatter(content);

        const title = attributes.title;
        if (!title) {
            console.error(`Missing title in ${file}`);
            continue;
        }

        console.log(`Checking if article already exists for title: ${title}`);
        const existingArticleId = await checkIfArticleExists(title, DEV_TO_API_KEY);

        if (!existingArticleId) {
            console.log(`No existing article found for title: ${title}. Publishing new article.`);
            await publishNewArticle(body, title);
        } else {
            console.log(`Article already exists for title: ${title}. Skipping.`);
        }
    }
}

processNewMarkdownFiles().then(() => {
    console.log('New articles processed');
});
