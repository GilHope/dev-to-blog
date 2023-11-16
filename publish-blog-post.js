const axios = require('axios');
const fs = require('fs');
const path = require('path');

const blogsDirectory = 'blogs';
const devToApiEndpoint = 'https://dev.to/api/articles';
const devToApiKey = process.env.DEVTO_API_KEY;

// Get a list of all files in 'blogs'
const blogPostFiles = fs.readdirSync(blogsDirectory);
console.log("Found blog files:", blogPostFiles); // Log the files found

// Process each blog file
blogPostFiles.forEach((filename) => {
    // Construct full path to blog markdown files
    const filePath = path.join(blogsDirectory, filename);

    // Read content of markdown file
    const blogPostContent = fs.readFileSync(filePath, 'utf8');
    console.log(`Content of ${filename}:`, blogPostContent); // Temporarily log content


    // Define the title of the blog post based on the filename or other criteria
    const blogPostTitle = generateTitle(filename);

    // Check if the post already exists on Dev.to (by title or other criteria)
    // Publish or update the post on Dev.to based on the result of the check
    checkAndPublishToDevTo(blogPostTitle, blogPostContent);
});


// Function to create a new Dev.to blog
async function createDevToArticle(title, content) {
    const articleData = {
        article: {
            title,
            body_markdown: content,
            published: true,
            tags: ['test', 'testblog', 'testtags'],
        },
    };

    console.log("Sending the following data to Dev.to:", JSON.stringify(articleData, null, 2));

    try {
        const response = await axios.post(
            devToApiEndpoint,
            articleData, // use the variable directly here
            {
                headers: {
                    'api-key': devToApiKey,
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.forem.api-v1+json'
                },
            }
        );

        const devToArticleUrl = response.data.url;
        console.log(`Published to Dev.to: ${devToArticleUrl}`);
    } catch (error) {
        console.error('Error publishing to Dev.to:', error.response ? error.response.data : error.message);
        console.error('Full error object:', error);
        throw error;
    }
}


// Function to check if a post with a given title already exists on Dev.to
async function postExists(title) {
    // ... (implementation of postExists function as shown earlier)
}


// Function to update an existing Dev.to blog
async function updateDevToArticle(articleId, title, content) {
    try {
        // Update blog based on its ID
    } catch (error) {
        console.error('Error updating Dev.to blog:', error.message);
        throw error;
    }
}


// Function to check if post already exists on Dev.to and publish/update it
async function checkAndPublishToDevTo(title, content) {
    try {
        const existingArticleId = await postExists(title);

        if (existingArticleId) {
            await updateDevToArticle(existingArticleId, title, content);
        } else {
            await createDevToArticle(title, content);
        }
    } catch (error) {
        console.error('Error publishing to Dev.to:', error.message);
        throw error;
    }
}


// Function to generate a title for a blog
function generateTitle(filename) {
    // Remove the '.md' extension and replace dashes with spaces
    let title = filename.replace('.md', '').replace(/-/g, ' ');

    // Split the title into words, capitalize each word, and join them back together
    return title.split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
}


  