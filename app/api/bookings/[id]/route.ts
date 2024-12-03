import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    const params = await context.params; // Await params

    const { id } = params;
    const bookingsId = Number(id);

    if (Number.isNaN(bookingsId)) {
      return NextResponse.json({ message: "Invalid bookings ID" }, { status: 400 });
    }

    const bookings = await prisma.booking.findUnique({
      where: { id: bookingsId },
    });

    if (!bookings) {
      return NextResponse.json({ message: "bookings not found" }, { status: 404 });
    }

    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, context: { params: { id: string } }) {
  try {
    const params = await context.params; // Await params

    const { id } = params;
    const bookingsId = Number(id);

    if (Number.isNaN(bookingsId)) {
      return NextResponse.json({ message: "Invalid bookings ID" }, { status: 400 });
    }

    const data = await req.json();

    const bookings = await prisma.booking.update({
      where: { id: bookingsId },
      data,
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error updating bookings:", error);
    return NextResponse.json(
      { error: "Failed to update bookings", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
  try {
    const params = await context.params; // Await params

    const { id } = params;
    const bookingsId = Number(id);

    if (Number.isNaN(bookingsId)) {
      return NextResponse.json({ message: "Invalid bookings ID" }, { status: 400 });
    }

    await prisma.booking.delete({
      where: { id: bookingsId },
    });

    return NextResponse.json({ message: "bookings deleted successfully" });
  } catch (error) {
    console.error("Error deleting bookings:", error);
    return NextResponse.json(
      { error: "Failed to delete bookings", details: (error as Error).message },
      { status: 500 }
    );
  }
}
