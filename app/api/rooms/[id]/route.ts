import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    const params = await context.params; // Await params

    const { id } = params;
    const roomId = Number(id);

    if (Number.isNaN(roomId)) {
      return NextResponse.json({ message: "Invalid room ID" }, { status: 400 });
    }

    const room = await prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      return NextResponse.json({ message: "Room not found" }, { status: 404 });
    }

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
    const params = await context.params; // Await params

    const { id } = params;
    const roomId = Number(id);

    if (Number.isNaN(roomId)) {
      return NextResponse.json({ message: "Invalid room ID" }, { status: 400 });
    }

    const data = await req.json();

    const room = await prisma.room.update({
      where: { id: roomId },
      data,
    });

    return NextResponse.json(room);
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
    const params = await context.params; // Await params

    const { id } = params;
    const roomId = Number(id);

    if (Number.isNaN(roomId)) {
      return NextResponse.json({ message: "Invalid room ID" }, { status: 400 });
    }

    await prisma.room.delete({
      where: { id: roomId },
    });

    return NextResponse.json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error("Error deleting room:", error);
    return NextResponse.json(
      { error: "Failed to delete room", details: (error as Error).message },
      { status: 500 }
    );
  }
}
