# Dev.to Blog Automation

## Overview
This script automates the process of publishing and updating blog posts to Dev.to. It is designed to streamline the workflow of managing blog content by automatically detecting new or updated Markdown files in a specified directory and handling their publication on Dev.to.

## Objectives
- **Automate Blog Publishing**: Automatically publish new blog posts to Dev.to from Markdown files.
- **Update Existing Posts**: Detect updates to existing blog posts and apply these changes on Dev.to without creating duplicate posts.
- **Simplify Workflow**: Reduce manual effort in blog management by handling publication and updates through a simple script.

## Features
- **Markdown File Processing**: Reads Markdown files from a specified directory.
- **Title Generation**: Generates blog post titles from Markdown file names, with proper capitalization.
- **Existence Check**: Checks if a blog post with the same title already exists on Dev.to.
- **Create or Update Posts**: Decides to either create a new blog post or update an existing one based on the existence check.
- **Logging**: Provides detailed logging for troubleshooting and monitoring the script's execution.

## Dependencies
- `node-fetch` for making API requests.
- `fs` and `path` from Node.js for file system operations.
- `front-matter` for parsing front matter in Markdown files.

## Usage
The project consists of two main scripts:
1. **Blog Publisher (`blogPublisher.js`)**: Detects and publishes new Markdown files as blog posts on Dev.to.
2. **Blog Updater (`blogUpdater.js`)**: Checks for updates in existing Markdown files and applies these changes to corresponding posts on Dev.to.

### Setting Up
1. Install the required dependencies.
2. Set your Dev.to API key in the environment variable `DEVTO_API_KEY`.

### Running the Scripts
- Execute `node blogPublisher.js` to publish new blog posts.
- Execute `node blogUpdater.js` to update existing posts.

## Future Enhancements
- Implementing a more robust error handling system.
- Adding a feature to manage and update post tags.
- Improving the matching algorithm for existing posts to accommodate minor title variations.
- Send announcement links to LinkedIn.

# Currently working on implementing initial unit tests.