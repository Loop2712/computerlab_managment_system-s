// api/bookings/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { error } from 'console';
import { transformBigInt } from '@/utils/BigInt';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: true,
        room: true,
      },
    });
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }
    const transfromBooking = transformBigInt(booking)
    return NextResponse.json(transfromBooking);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch booking' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  console.log('Received ID:', id); // Debug ID
  try {
    const body = await request.json();
    console.log('Received Body:', body); // Debug Body
    
    const updatedBooking = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: {
        userId: BigInt(body.userId),
        roomId: body.roomId,
        bookingDate: new Date(body.bookingDate),
        startTime: new Date(body.startTime),
        endTime: new Date(body.endTime),
        status: body.status,
      },
    });

    console.log('Updated Booking:', updatedBooking); // Debug Updated Data

    const transformedBooking = transformBigInt(updatedBooking);
    return NextResponse.json(transformedBooking);
  } catch (error) {
    console.error('Error updating booking:', error); // Debug Error
    return NextResponse.json({ error: 'Failed to update booking', details: error.message }, { status: 500 });
  }
}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  try {
    await prisma.booking.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 });
  }
}
