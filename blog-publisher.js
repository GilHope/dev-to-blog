import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import frontMatter from 'front-matter';


const DEV_TO_API_KEY = process.env.DEVTO_API_KEY; // Set this in your GitHub Actions secrets
const BLOGS_DIR = './blogs'; // Path to your blogs directory

// Function to get all markdown files from the directory
function getMarkdownFiles(dir) {
    let files = fs.readdirSync(dir);
    return files.filter(file => file.endsWith('.md'));
}

// Function to publish or update an article on dev.to
async function publishOrUpdateArticle(articleContent, articleId = null) {
    const url = `https://dev.to/api/articles${articleId ? `/${articleId}` : ''}`;
    const method = articleId ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'api-key': DEV_TO_API_KEY
            },
            body: JSON.stringify({ article: { body_markdown: articleContent } })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(`Error: ${data.error}`);
        }

        return data;
    } catch (error) {
        console.error('Failed to publish/update article:', error);
    }
}

// Main function to process markdown files
async function processMarkdownFiles() {
    const markdownFiles = getMarkdownFiles(BLOGS_DIR);

    for (const file of markdownFiles) {
        const filePath = path.join(BLOGS_DIR, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const { attributes, body } = frontMatter(content);

        // Check if the article is new or needs an update
        // This assumes you have a way to track published articles
        const isUpdatedArticle = false; // You need to implement this check
        const articleId = null; // You need to retrieve this if it's an updated article

        // Publish or update the article on dev.to
        const result = await publishOrUpdateArticle(body, isUpdatedArticle ? articleId : null);
        console.log('Article processed:', result);
    }
}

processMarkdownFiles().then(() => {
    console.log('All articles processed');
});
