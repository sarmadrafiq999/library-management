import mongoose from 'mongoose';

const BorrowRecordSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    borrowedDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    returned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.BorrowRecord || mongoose.model('BorrowRecord', BorrowRecordSchema);