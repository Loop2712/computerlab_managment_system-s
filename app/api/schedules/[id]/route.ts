import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    const params = await context.params; // Await params

    const { id } = params;
    const scheduleId = Number(id);

    if (Number.isNaN(scheduleId)) {
      return NextResponse.json({ message: "Invalid schedule ID" }, { status: 400 });
    }

    const schedule = await prisma.roomSchedule.findUnique({
      where: { id: scheduleId },
    });

    if (!schedule) {
      return NextResponse.json({ message: "schedule not found" }, { status: 404 });
    }

    return NextResponse.json(schedule, { status: 200 });
  } catch (error) {
    console.error("Error fetching schedule:", error);
    return NextResponse.json(
      { error: "Failed to fetch schedule", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, context: { params: { id: string } }) {
  try {
    const params = await context.params; // Await params

    const { id } = params;
    const scheduleId = Number(id);

    if (Number.isNaN(scheduleId)) {
      return NextResponse.json({ message: "Invalid schedule ID" }, { status: 400 });
    }

    const data = await req.json();

    const schedule = await prisma.roomSchedule.update({
      where: { id: scheduleId },
      data,
    });

    return NextResponse.json(schedule);
  } catch (error) {
    console.error("Error updating schedule:", error);
    return NextResponse.json(
      { error: "Failed to update schedule", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
  try {
    const params = await context.params; // Await params

    const { id } = params;
    const scheduleId = Number(id);

    if (Number.isNaN(scheduleId)) {
      return NextResponse.json({ message: "Invalid schedule ID" }, { status: 400 });
    }

    await prisma.roomSchedule.delete({
      where: { id: scheduleId },
    });

    return NextResponse.json({ message: "schedule deleted successfully" });
  } catch (error) {
    console.error("Error deleting schedule:", error);
    return NextResponse.json(
      { error: "Failed to delete schedule", details: (error as Error).message },
      { status: 500 }
    );
  }
}
