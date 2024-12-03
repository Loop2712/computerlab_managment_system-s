import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Convert id to a number
    const roomId = Number(id);

    const room = await prisma.room.findUnique({
      where: { id: roomId }
    });

    if (!room) {
      return NextResponse.json({ message: 'Room not found' }, { status: 404 });
    }

    return NextResponse.json(room, { status: 200 });
  } catch (error) {
    console.error('Error fetching room:', error);
    return NextResponse.json({ error: 'Failed to fetch room', details: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const data = await req.json();

    try{
        const { id } = params;
        const roomId = Number(id);

        const rooms = await prisma.room.update({
            where: { id: roomId },
            data,
        });
        return NextResponse.json(rooms);
    }catch (eror){
        return NextResponse.json({eror:'Failed to update rooms', details: error.message },{status: 500})
    }

}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try{
        const { id } = params;
        const roomId = Number(id);
        await prisma.room.delete({where: { id: roomId },});
        return NextResponse.json({message: 'delete room seccess'});
    }catch (eror){
        return NextResponse.json({eror:'failed to deledt', details: error.message }, { status: 500 });
    }

}