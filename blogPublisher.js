// blogPublisher.js

import fs from 'fs';
import path from 'path'; 
import { getMarkdownFiles, checkIfArticleExists } from './blogUtils.js';
import frontMatter from 'front-matter';

const DEV_TO_API_KEY = process.env.DEVTO_API_KEY;
const BLOGS_DIR = './blogs';

async function publishNewArticle(articleContent, title) {
    // ... implementation of creating a new article on Dev.to ...
}

async function processNewMarkdownFiles() {
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
        if (!existingArticleId) {
            await publishNewArticle(body, title);
        }
    }
}

processNewMarkdownFiles().then(() => {
    console.log('New articles processed');
});
