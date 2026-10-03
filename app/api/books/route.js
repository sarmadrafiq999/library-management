import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectDB';
import Book from '@/models/Book';
import User from '@/models/User';

// GET: Fetch all books (with optional search & category filter)
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || 'All';
    const status = searchParams.get('status') || 'All';

    // Build Mongoose Query Filter
    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
      ];
    }

    if (category !== 'All') {
      query.category = category;
    }

    if (status !== 'All') {
      query.status = status;
    }

    const books = await Book.find(query)
      .populate('uploadedBy', 'name email')
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, books }, { status: 200 });
  } catch (error) {
    console.error('API Error [GET /api/books]:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch books' },
      { status: 500 }
    );
  }
}

// POST: Create / Upload a new book
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { title, author, category, cover, description, userId } = body;

    if (!title || !author || !category) {
      return NextResponse.json(
        { success: false, message: 'Title, Author, and Category are required' },
        { status: 400 }
      );
    }

    // Temporary Fallback User ID (Jab tak Auth Integration complete na ho)
    let uploaderId = userId;
    if (!uploaderId) {
      let defaultUser = await User.findOne();
      if (!defaultUser) {
        defaultUser = await User.create({
          name: 'Demo Admin',
          email: 'admin@bookverse.com',
          password: 'hashedpassword123',
        });
      }
      uploaderId = defaultUser._id;
    }

    const newBook = await Book.create({
      title,
      author,
      category,
      cover: cover || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400&auto=format&fit=crop',
      description,
      uploadedBy: uploaderId,
    });

    return NextResponse.json(
      { success: true, message: 'Book created successfully', book: newBook },
      { status: 201 }
    );
  } catch (error) {
    console.error('API Error [POST /api/books]:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to upload book' },
      { status: 500 }
    );
  }
}