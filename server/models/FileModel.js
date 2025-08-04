import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema(
  {
    name: String,
    url: String,
    type: String,
    size: Number,
    category: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const File = mongoose.models.File || mongoose.model('File', fileSchema);

export default File;
