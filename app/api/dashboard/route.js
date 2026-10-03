import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectDB';
import Book from '@/models/Book';
import BorrowRecord from '@/models/BorrowRecord';
import User from '@/models/User';

export async function GET() {
  try {
    await connectDB();

    // Default User Fallback
    let defaultUser = await User.findOne();
    if (!defaultUser) {
      return NextResponse.json({
        success: true,
        stats: { totalBorrowed: 0, totalUploaded: 0 },
        activeBorrows: [],
        myUploadedBooks: [],
      });
    }

    const userId = defaultUser._id;

    // 1. Fetch currently borrowed books by this user
    const activeBorrows = await BorrowRecord.find({
      user: userId,
      returned: false,
    })
      .populate('book')
      .sort({ createdAt: -1 });

    // 2. Fetch books uploaded by this user
    const myUploadedBooks = await Book.find({ uploadedBy: userId }).sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalBorrowed: activeBorrows.length,
        totalUploaded: myUploadedBooks.length,
      },
      activeBorrows,
      myUploadedBooks,
    });
  } catch (error) {
    console.error('API Error [GET /api/dashboard]:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}