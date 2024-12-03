import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// Read One User
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Convert id to BigInt
    const userId = BigInt(id);

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    // แปลง BigInt ใน user เป็น String
    const sanitizedUser = {
        ...user,
        id: user.id.toString(),
      };

    return NextResponse.json(sanitizedUser, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error); // Log error message to console
    return NextResponse.json({ error: 'Error fetching user', details: error.message }, { status: 400 });
  }
}

// Edit User
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { firstName, lastName, role, email, password } = body;

    // Convert id to BigInt
    const userId = BigInt(id);

    const user = await prisma.user.update({
      where: { id: userId },
      data: { firstName, lastName, role, email, password },
    });
    
    // แปลง BigInt ใน user เป็น String
    const sanitizedUser = {
        ...user,
        id: user.id.toString(),
      };

    return NextResponse.json(sanitizedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error); // Log error message to console
    return NextResponse.json({ error: 'Error updating user', details: error.message }, { status: 400 });
  }
}

// Delete User
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Convert id to BigInt
    const userId = BigInt(id);

    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error); // Log error message to console
    return NextResponse.json({ error: 'Error deleting user', details: error.message }, { status: 400 });
  }
}
