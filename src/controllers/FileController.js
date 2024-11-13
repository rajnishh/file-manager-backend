import { uploadFile, getFileById, shareFile, trackFileView, getAllFilesList, getFullSharedLinkURL } from '../services/FileService.js';
import { getUserIdByUsername } from '../repositories/UserRepository.js';
import logger from '../config/logger.js';
// Helper function to check if the error is an instance of Error
const isError = (error) => {
  return error instanceof Error;
};

export const uploadFileController = async (req, res) => {
  try {
    if (!req.file || !req.user) {
      res.status(400).json({ error: 'File or user data missing' });
      return;
    }

    const { originalname: fileName, buffer } = req.file;
    const tags = req.body.tags ? req.body.tags.split(',') : [];
    const ownerId = req.user.id;

    const fileData = {
      fileName,
      buffer,
      tags,
      ownerId,
    };

    const file = await uploadFile(fileData);
    res.status(201).json(file);
  } catch (error) {
    res.status(400).json({ error: isError(error) ? error.message : 'Unknown error' });
  }
};

export const getAllFilesController = async (req, res) => {
  try {

    const username = req.params.username;
    const ownerId = await getUserIdByUsername(username);

    if (!ownerId) {
      return res.status(404).json({ error: 'User not found' });
    }

    const files = await getAllFilesList(ownerId);
    // Update each file's sharedLink with the full URL only if it exists
    const filesWithFullURLs = files.map(file => {
      const fileObject = file.toObject();
      if (fileObject.sharedLink) {
        fileObject.sharedLink = getFullSharedLinkURL(fileObject.sharedLink);
      }
      return fileObject;
    });
    res.status(200).json(filesWithFullURLs);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Failed to retrieve files' });
  }
};

export const getFileByIdController = async (req, res) => {
  try {
    const file = await getFileById(req.params.id);
    if (!file) {
      res.status(404).json({ message: 'File not found' });
      return;
    }
    res.status(200).json(file);
  } catch (error) {
    res.status(400).json({ error: isError(error) ? error.message : 'Unknown error' });
  }
};

export const shareFileController = async (req, res) => {
  try {
    const sharedLink = await shareFile(req.params.id);
    res.status(200).json({ sharedLink });
  } catch (error) {
    res.status(400).json({ error: isError(error) ? error.message : 'Unknown error' });
  }
};

export const trackFileViewController = async (req, res) => {
  try {
    const file = await trackFileView(req.params.sharedLink);
    res.status(200).json(file);
  } catch (error) {
    res.status(400).json({ error: isError(error) ? error.message : 'Unknown error' });
  }
};

export const getFileStatistics = async (req, res) => {
  try {
    const file = await getFileById(req.params.id);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    res.status(200).json({
      fileName: file.fileName,
      tags: file.tags,
      viewCount: file.viewCount, // Include view count in response
      sharedLink: file.sharedLink,
    });
  } catch (error) {
    res.status(400).json({ error: error.message || 'Unknown error' });
  }
};
