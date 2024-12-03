import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Room } from "@/types/room";

export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = await context.params;
    const roomId = Number(id);

    if (Number.isNaN(roomId)) {
      return NextResponse.json({ error: "Invalid room ID" }, { status: 400 });
    }

    const room = await prisma.room.findUnique({
      where: { id: roomId },
      select: {
        id: true,
        name: true,
        type: true,
        requiresApproval: true,
      },
    });

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    // const sanitizedRoom: Room = {
    //   ...room,
    //   id: Number(room.id), // แปลง BigInt เป็น number (หากจำเป็น)
    // };

    return NextResponse.json(room, { status: 200 });
  } catch (error) {
    console.error("Error fetching room:", error);
    return NextResponse.json(
      { error: "Failed to fetch room", details: (error as Error).message },
      { status: 500 }
    );
  }
}


export async function PUT(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = await context.params;
    const roomId = Number(id);

    if (Number.isNaN(roomId)) {
      return NextResponse.json({ error: "Invalid room ID" }, { status: 400 });
    }

    const data: Partial<Room> = await req.json();
    const { name, type, requiresApproval } = data;

    // Validate input
    if (!name && !type && typeof requiresApproval !== "boolean") {
      return NextResponse.json(
        { error: "Invalid input. At least one field is required." },
        { status: 400 }
      );
    }

    const updatedRoom = await prisma.room.update({
      where: { id: roomId },
      data: {
        ...(name && { name }),
        ...(type && { type }),
        ...(typeof requiresApproval === "boolean" && { requiresApproval }),
      },
      select: {
        id: true,
        name: true,
        type: true,
        requiresApproval: true,
      },
    });

    return NextResponse.json(updatedRoom, { status: 200 });
  } catch (error) {
    console.error("Error updating room:", error);
    return NextResponse.json(
      { error: "Failed to update room", details: (error as Error).message },
      { status: 500 }
    );
  }
}


export async function DELETE(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = await context.params;
    const roomId = Number(id);

    if (Number.isNaN(roomId)) {
      return NextResponse.json({ error: "Invalid room ID" }, { status: 400 });
    }

    await prisma.room.delete({
      where: { id: roomId },
    });

    return NextResponse.json({ message: "Room deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting room:", error);
    return NextResponse.json(
      { error: "Failed to delete room", details: (error as Error).message },
      { status: 500 }
    );
  }
}
