// blogUtils.test.js
import { getMarkdownFiles } from '../../blogUtils';
import fs from 'fs';

jest.mock('fs'); // Mock the fs module

describe('getMarkdownFiles', () => {
  it('should return only markdown files', () => {
    // Mock the readdirSync method to return a mix of file types
    fs.readdirSync.mockReturnValue(['file1.md', 'file2.txt', 'file3.md']);
    
    // Call the function with a mock directory path
    const markdownFiles = getMarkdownFiles('someDir');
    
    // Assert that the function returns only markdown files
    expect(markdownFiles).toEqual(['file1.md', 'file3.md']);
  });
});
