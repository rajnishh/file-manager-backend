import File from '../models/File.js';

// Save a file to the database
export const saveFile = async (fileData) => {
  const file = new File(fileData);
  return file.save();
};

// Retrieve all files sorted by the latest first
export const getAllFiles = async (ownerId) => {
  return File.find({ ownerId }).sort({ createdAt: 1 });
};


// Retrieve a file by ID or shared link
export const getFileById = async (query) => {
  // Check if query is an object (for sharedLink) or string (for _id)
  if (typeof query === 'string') {
    return File.findById(query);
  }
  return File.findOne(query); // Handles `{ sharedLink: sharedLinkValue }` query
};

// Increment the view count of a file by its ID
export const updateViewCount = async (id) => {
  const file = await File.findById(id);
  if (file) {
    file.viewCount += 1;
    await file.save();
  }
};
