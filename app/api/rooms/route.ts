import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // ต้องแน่ใจว่า Prisma Client ถูกเซ็ตใน lib/prisma.ts
import { Room } from '@/types';

export async function GET() {
  try {
    const rooms = await prisma.room.findMany();
    return NextResponse.json(rooms);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body: Room = await request.json();
    const newRoom = await prisma.room.create({
      data: {
        id: body.id,
        name: body.name,
        type: body.type,
        description: body.description || null,
        requiresApproval: body.requiresApproval,
      },
    });
    return NextResponse.json(newRoom, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create room' }, { status: 500 });
  }
}