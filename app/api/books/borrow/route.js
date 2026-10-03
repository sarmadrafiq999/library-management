import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectDB';
import Book from '@/models/Book';
import BorrowRecord from '@/models/BorrowRecord';
import User from '@/models/User';

// POST: Borrow or Return a book
export async function POST(request) {
  try {
    await connectDB();

    const { bookId, action, userId } = await request.json(); // action = 'borrow' or 'return'

    if (!bookId || !action) {
      return NextResponse.json(
        { success: false, message: 'Book ID and Action are required' },
        { status: 400 }
      );
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return NextResponse.json(
        { success: false, message: 'Book not found' },
        { status: 404 }
      );
    }

    // Default User Fallback
    let activeUserId = userId;
    if (!activeUserId) {
      let defaultUser = await User.findOne();
      activeUserId = defaultUser._id;
    }

    if (action === 'borrow') {
      if (book.status === 'Borrowed') {
        return NextResponse.json(
          { success: false, message: 'Book is already borrowed' },
          { status: 400 }
        );
      }

      // 1. Update book status
      book.status = 'Borrowed';
      await book.save();

      // 2. Create borrow record (Due in 14 days)
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 14);

      const record = await BorrowRecord.create({
        user: activeUserId,
        book: book._id,
        dueDate,
      });

      return NextResponse.json({
        success: true,
        message: 'Book borrowed successfully',
        book,
        record,
      });
    }

    if (action === 'return') {
      if (book.status === 'Available') {
        return NextResponse.json(
          { success: false, message: 'Book is already available' },
          { status: 400 }
        );
      }

      // 1. Update book status
      book.status = 'Available';
      await book.save();

      // 2. Update existing active borrow record
      await BorrowRecord.findOneAndUpdate(
        { book: book._id, returned: false },
        { returned: true }
      );

      return NextResponse.json({
        success: true,
        message: 'Book returned successfully',
        book,
      });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('API Error [POST /api/books/borrow]:', error);
    return NextResponse.json(
      { success: false, message: 'Action failed' },
      { status: 500 }
    );
  }
}