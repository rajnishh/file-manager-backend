import mongoose from 'mongoose';

const { Schema } = mongoose;

const FileSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },
  tags: { type: [String], default: [] },
  viewCount: { type: Number, default: 0 },
  sharedLink: { type: String, required: false},
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.model('File', FileSchema);

