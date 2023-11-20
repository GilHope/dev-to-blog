# Dev.to Blog Automation

## In progress

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
- `axios` for making API requests.
- `fs` and `path` for file system operations.
