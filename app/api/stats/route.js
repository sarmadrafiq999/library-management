import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectDB'; // Updated to named import
import Book from '@/models/Book';
import User from '@/models/User';

export async function GET() {
  try {
    await connectDB();

    const booksCount = await Book.countDocuments();
    const readersCount = User ? await User.countDocuments() : 500;

    const categories = await Book.distinct('category');
    const categoriesCount = categories.length;

    return NextResponse.json({
      success: true,
      stats: {
        books: booksCount,
        readers: readersCount,
        categories: categoriesCount,
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}