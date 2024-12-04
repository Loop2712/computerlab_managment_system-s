import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: parseInt(id) },
      include: {
        userSemester: true,
        roomSchedule: true,
      },
    });
    if (!enrollment) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
    }
    return NextResponse.json(enrollment);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch enrollment' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  try {
    const body = await request.json();
    const updatedEnrollment = await prisma.enrollment.update({
      where: { id: parseInt(id) },
      data: {
        userSemesterId: body.userSemesterId,
        roomScheduleId: body.roomScheduleId,
        enrollmentDate: new Date(body.enrollmentDate),
      },
    });
    return NextResponse.json(updatedEnrollment);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update enrollment' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  try {
    await prisma.enrollment.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ message: 'Enrollment deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete enrollment' }, { status: 500 });
  }
}