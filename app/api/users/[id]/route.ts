import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { serializeBigInt } from '@/utils/BigIntuser';

// Read One User
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const userId = BigInt(params.id); // แปลง ID เป็น BigInt
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // แปลง BigInt เป็น String ก่อนส่ง Response
    return NextResponse.json(serializeBigInt(user), { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching user', details: (error as Error).message }, { status: 500 });
  }
}

// Edit User
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const userId = BigInt(params.id); // แปลง ID เป็น BigInt
    const body = await request.json();

    const { firstName, lastName, email, password, role } = body;

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!firstName && !lastName && !email && !password && !role) {
      return NextResponse.json({ error: 'At least one field is required to update' }, { status: 400 });
    }

    // หากส่ง password มาใหม่ ให้ hash ก่อน
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
      },
    });

    return NextResponse.json(serializeBigInt(updatedUser), { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error updating user', details: (error as Error).message }, { status: 500 });
  }
}


// Delete User
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const userId = BigInt(params.id); // แปลง ID เป็น BigInt

    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });

    // แปลง BigInt เป็น String ใน Response
    return NextResponse.json("DELETE Successes", { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting user', details: (error as Error).message }, { status: 500 });
  }
}
