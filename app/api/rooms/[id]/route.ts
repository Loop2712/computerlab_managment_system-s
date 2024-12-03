import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params; // รอการ resolve ของ params
  try {
    const room = await prisma.room.findUnique({
      where: { id },
    });
    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }
    return NextResponse.json(room);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch room' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params; // รอการ resolve ของ params
  try {
    const body = await request.json();
    const updatedRoom = await prisma.room.update({
      where: { id },
      data: {
        name: body.name,
        type: body.type,
        description: body.description || null,
        requiresApproval: body.requiresApproval,
      },
    });
    return NextResponse.json(updatedRoom);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update room' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params; // รอการ resolve ของ params
  try {
    await prisma.room.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Room deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete room' }, { status: 500 });
  }
}
