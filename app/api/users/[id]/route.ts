import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt'; // For hashing passwords

// Read One User
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;

    if (!id || !/^\d+$/.test(id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    const userId = BigInt(id);
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const sanitizedUser = {
      ...user,
      id: user.id.toString(),
    };

    return NextResponse.json(sanitizedUser, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", { error, id });
    return NextResponse.json({ error: 'Error fetching user', details: (error as Error).message }, { status: 400 });
  }
}

// Edit User
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;

    if (!id || !/^\d+$/.test(id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    const userId = BigInt(id);
    const body = await request.json();
    const { firstName, lastName, role, email, password } = body;

    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const user = await prisma.user.update({
      where: { id: userId },
      data: { firstName, lastName, role, email, ...(hashedPassword && { password: hashedPassword }) },
    });

    const sanitizedUser = {
      ...user,
      id: user.id.toString(),
    };

    return NextResponse.json(sanitizedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", { error, id });
    return NextResponse.json({ error: 'Error updating user', details: (error as Error).message }, { status: 400 });
  }
}

// Delete User
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;

    if (!id || !/^\d+$/.test(id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    const userId = BigInt(id);
    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", { error, id });
    return NextResponse.json({ error: 'Error deleting user', details: (error as Error).message }, { status: 400 });
  }
}
