const axios = require('axios');
const fs = require('fs');
const path = require('path');

const blogsDirectory = 'blogs';
const devToApiEndpoint = 'application/vnd.forem.api-v1+json';
const devToApiKey = process.env.DEVTO_API_KEY;

// Get a list of all files in 'blogs'
const blogPostFiles = fs.readdirSync(blogsDirectory);

// Process each blog file
blogPostFiles.forEach((filename) => {
    // Construct full path to blog markdown files
    const filePath = path.join(blogsDirectory, filename);

    // Read content of markdown file
    const blogPostContent = fs.readFileSync(filePath, 'utf8');

    // Define the title of the blog post based on the filename or other criteria
    const blogPostTitle = generateTitle(filename);

    // Check if the post already exists on Dev.to (by title or other criteria)
    // Publish or update the post on Dev.to based on the result of the check
    checkAndPublishToDevTo(blogPostTitle, blogPostContent);
});


// Function to check if post already exists on Dev.to and publish/update it
async function checkAndPublishToDevTo(title, content) {
    try {
        // Use the Dev.to API to check if a post with the given title exists
        
        if (postExists) {
            await updateDevToArticle(existingDevToArticleId, title, content);
        } else {
            //implement logic to create new post
            await createDevToArticle(title, content);
        }
    } catch (error) {
        console.error('Error publishing to Dev.to:', error.message);
        throw error;
    }
}


// Function to create a new Dev.to blog
async function createDevToArticle(title, content) {
    try {
        const response = await axios.post(
            devToApitEndpoint,
            {
                article: {
                    title,
                    body_markdown: content,
                    published: true,
                    tags: ['test-dev.to', 'test-blog', 'test-tags'],
                },
            },
            {
                headers: {
                    'api-key': devToApiKey,
                },
            }
        );

        const devToArticleUrl = response.data.url;
        console.log('Published to Dev.to: ${devToArticleUrl}');
    } catch (error) {
        console.error('Error publishing to Dev.to:', error.message);
        throw error;
    }
}


// Function to update an existing Dev.to blog
async function updateDevToArticle(articleId, title, content) {
    try {
        // Update blog based on its ID
    } catch (error) {
        console.error('Error updating Dev.to article:', error.message):
        throw error;
    }
}


// // Function to generate a title for a blog
// function generateTitle(filename) {
// }