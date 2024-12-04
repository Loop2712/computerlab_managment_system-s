import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { transformBigInt } from '@/utils/BigInt';

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        user: true, // ดึงข้อมูลผู้ใช้ที่จองมา
        room: true, // ดึงข้อมูลห้องที่ถูกจองมา
      },
    });
    const transfromBooking = transformBigInt(bookings)
    return NextResponse.json(transfromBooking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newBooking = await prisma.booking.create({
      data: {
        userId: BigInt(body.userId),
        roomId: body.roomId,
        bookingDate: new Date(body.bookingDate),
        startTime: new Date(body.startTime),
        endTime: new Date(body.endTime),
        status: body.status,
      },
    });
    const transfromBooking = transformBigInt(newBooking)
    return NextResponse.json(transfromBooking, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
