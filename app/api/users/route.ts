import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { serializeBigInt } from '@/utils/BigIntuser';

// Schema Validation
const userSchema = z.object({
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(['Admin', 'Teacher', 'Student'], "Invalid role"),
});

// GET Users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    // แปลง BigInt เป็น String
    return NextResponse.json(serializeBigInt(users), { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching users', details: (error as Error).message }, { status: 500 });
  }
}

// POST User
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, firstName, lastName, email, password, role } = body;

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!id || !firstName || !lastName || !email || !password || !role) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // ตรวจสอบ email ซ้ำ
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // เพิ่มข้อมูลผู้ใช้
    const user = await prisma.user.create({
      data: {
        id: BigInt(id), // แปลง id เป็น BigInt
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role, // Role ที่ผ่านการตรวจสอบแล้ว
      },
    });

    // แปลง BigInt เป็น String ใน Response
    return NextResponse.json(serializeBigInt(user), { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating user', details: (error as Error).message }, { status: 500 });
  }
}


