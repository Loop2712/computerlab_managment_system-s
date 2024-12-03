import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';


// Create User
export async function POST(request: Request) {
    try {
      const body = await request.json();
      const { id, firstName, lastName, role, email, password } = body;
  
      // แปลง id เป็น BigInt
      const userId = BigInt(id);

      const user = await prisma.user.create({
        data: {
          id:BigInt(id), // ต้องกำหนด ID เอง
          firstName,
          lastName,
          role,
          email,
          password,
        },
      });
      // Convert BigInt to String in the response
    const sanitizedUser = {
        ...user,
        id: user.id.toString(),
      };
  
      return NextResponse.json({ sanitizedUser }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: 'Error creating user', details: error.message }, { status: 400 });
    }
  }
  
  // Read All Users
  export async function GET() {
    try {
      const usersbigin = await prisma.user.findMany(); // ตรวจสอบโครงสร้าง Prisma Query
      
      // แปลง BigInt เป็น String
      const users = usersbigin.map(user => ({
        ...user,
        id: user.id.toString(), // แปลงเฉพาะ id ที่เป็น BigInt
      }));
      
      return NextResponse.json(users, { status: 200 });
    } catch (error) {
      console.error("Error fetching users:", error); // เพิ่มการแสดงข้อผิดพลาด
      return NextResponse.json({ error: 'Error fetching users', details: error }, { status: 400 });
    }
  }
  