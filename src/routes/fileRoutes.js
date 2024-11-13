import { Router } from 'express';
import multer from 'multer';
import { authenticate } from '../middleware/authMiddleware.js';
import {
  uploadFileController,
  getFileByIdController,
  shareFileController,
  trackFileViewController,
  getFileStatistics,
  getAllFilesController,
} from '../controllers/FileController.js';

const router = Router();

// Configure multer for file uploads
const allowedMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'video/mp4',
  'video/mpeg',
  'video/quicktime',
];

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true); // Accept the file
    } else {
      cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'file'), false); // Reject the file
    }
  },
});

const uploadErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(400).json({ error: 'File size exceeds 5 MB limit' });
      return;
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      res.status(400).json({ error: 'Only image and video files are allowed' });
      return;
    }
  }
  next(err);
};

// Route to upload a file (protected route)
router.post(
  '/upload',
  authenticate,
  upload.single('file'),
  uploadErrorHandler,
  uploadFileController
);

// Route to get a file by ID (protected route)
router.get('/:id', authenticate, getFileByIdController);

// Route to share a file and generate a shareable link (protected route)
router.post('/:id/share', authenticate, shareFileController);

// Public route to track file view by shared link
router.get('/view/:sharedLink', trackFileViewController);

// Route to get file statistics (protected route)
router.get('/:id/statistics', authenticate, getFileStatistics);

// Route to list all files sorted by latest (protected route)
router.get('/:username/all', authenticate, getAllFilesController);

//router.get('/:id/content', authenticate, getFileContentController);


export default router;
