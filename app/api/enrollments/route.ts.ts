import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const enrollments = await prisma.enrollment.findMany({
      include: {
        userSemester: true, // ดึงข้อมูลที่สัมพันธ์มาด้วย
        roomSchedule: true,
      },
    });
    return NextResponse.json(enrollments);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch enrollments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newEnrollment = await prisma.enrollment.create({
      data: {
        userSemesterId: body.userSemesterId,
        roomScheduleId: body.roomScheduleId,
        enrollmentDate: new Date(body.enrollmentDate),
      },
    });
    return NextResponse.json(newEnrollment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create enrollment' }, { status: 500 });
  }
}