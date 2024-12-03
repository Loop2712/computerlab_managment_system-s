import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

// GET Users
export async function GET() {
  try {
    const usersRaw = await prisma.user.findMany();

    // Convert BigInt to String for all users
    const users = usersRaw.map(user => ({
      ...user,
      id: user.id.toString(),
    }));

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Error fetching users', details: (error as Error).message }, { status: 400 });
  }
}

// Create User
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, firstName, lastName, role, email, password } = body;

    // Validate input fields
    if (!firstName || !lastName || !role || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Optional: Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Convert id to BigInt (if provided, else let Prisma handle ID generation)
    const userId = id ? BigInt(id) : undefined;

    const user = await prisma.user.create({
      data: {
        id: userId,
        firstName,
        lastName,
        role,
        email,
        password: hashedPassword,
      },
    });

    // Convert BigInt to String in the response
    const sanitizedUser = {
      ...user,
      id: user.id.toString(),
    };

    return NextResponse.json(sanitizedUser, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Error creating user', details: (error as Error).message }, { status: 400 });
  }
}

