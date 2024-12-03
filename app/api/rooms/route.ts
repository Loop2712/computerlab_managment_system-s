import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Room  } from '@/types/room'

export async function GET() {
    try {
      const rooms: Room[] = await prisma.room.findMany({
        select: {
          id: true,
          name: true,
          type: true,
          requiresApproval: true,
        },
      });
  
      if (!rooms || rooms.length === 0) {
        return NextResponse.json({ message: 'No rooms found' }, { status: 404 });
      }
  
      return NextResponse.json(rooms, { status: 200 });
    } catch (error) {
      console.error('Error fetching rooms:', error);
      return NextResponse.json(
        { error: 'Failed to fetch rooms', details: (error as Error).message },
        { status: 500 }
      );
    }
  }


  export async function POST(req: Request) {
    try {
      const data: Partial<Room> = await req.json();
  
      // Validate input
      const { name, type, requiresApproval } = data;
      if (!name || !type || typeof requiresApproval !== 'boolean') {
        return NextResponse.json(
          { error: "Invalid input. 'name', 'type', and 'requiresApproval' are required." },
          { status: 400 }
        );
      }
  
      const newRoom: Room = await prisma.room.create({
        data: {
          name,
          type,
          requiresApproval,
        },
      });
  
      return NextResponse.json(newRoom, { status: 201 });
    } catch (error) {
      console.error('Error creating room:', error);
      return NextResponse.json(
        { error: 'Failed to create room', details: (error as Error).message },
        { status: 500 }
      );
    }
  }
  