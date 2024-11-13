import { saveFile, getFileById as getFileByIdRepo, updateViewCount, getAllFiles } from '../repositories/FileRepository.js';
import crypto from 'crypto';

// Upload a file and save it to the database
export const uploadFile = async (fileData) => {
  const { fileName, buffer, tags, ownerId } = fileData;

  // Create a unique file path (e.g., save it on disk or in a storage bucket)
  const filePath = `/uploads/${crypto.randomUUID()}-${fileName}`;

  // Simulating file save for the sake of example
  // Normally, you'd use a file storage service or save to a file system here

  const file = {
    fileName,
    filePath,
    tags,
    viewCount: 0,
    ownerId,
  };

  return saveFile(file);
};

// Generate a unique link for file sharing
export const generateUniqueLink = (fileId) => {
  const uniqueToken = crypto.randomBytes(16).toString('hex');
  return `${fileId}-${uniqueToken}`;
};

// Share a file by generating and storing a unique shareable link
export const shareFile = async (id) => {
  const file = await getFileByIdRepo(id);
  if (file) {
    if (!file.sharedLink) {
      file.sharedLink = generateUniqueLink(id); // Generate only if it doesn't exist
      await file.save();
    }
    return getFullSharedLinkURL(file.sharedLink);
  }
  throw new Error('File not found');
};

export const getFullSharedLinkURL = (sharedLinkId) => {
  return `${process.env.BASE_URL}/api/files/view/${sharedLinkId}`; // Return the full URL
}

export const getAllFilesList = async (ownerId) => {
  const files = await getAllFiles(ownerId);
  if(!files) {
    throw new Error('No file(s) found')
  }
  return files;
}

// Retrieve a file by ID
export const getFileById = async (id) => {
  const file = await getFileByIdRepo(id);
  if (!file) {
    throw new Error('File not found');
  }
  return file;
};

// Track a file view by updating the view count
export const trackFileView = async (sharedLink) => {
  // Query the `sharedLink` field instead of `_id`
  const file = await getFileByIdRepo({ sharedLink });
  if (!file) {
    throw new Error('File not found');
  }
  await updateViewCount(file._id);
  return file;
};
