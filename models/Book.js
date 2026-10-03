import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    cover: { type: String, default: '' },
    description: { type: String, default: '' },
    status: {
      type: String,
      enum: ['Available', 'Borrowed'],
      default: 'Available',
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Book || mongoose.model('Book', BookSchema);