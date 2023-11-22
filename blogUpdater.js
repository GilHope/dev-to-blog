// blogUpdater.js

import fs from 'fs';
import path from 'path'; 
import { getMarkdownFiles, checkIfArticleExists } from './blogUtils.js';
import frontMatter from 'front-matter';

const DEV_TO_API_KEY = process.env.DEVTO_API_KEY;
const BLOGS_DIR = './blogs';

async function updateExistingArticle(articleId, title, content) {
    // ... implementation of updating an existing article on Dev.to ...
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
