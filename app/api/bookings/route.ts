import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function GET(){
    try{
        const bookings = await prisma.booking.findMany();

        //ตรวจสอบว่ามีข้อมูลหรือไม่
        if (!bookings || bookings.length === 0) {
            return NextResponse.json({ message: 'No roomrentals found' }, { status: 404 });
    }
    return NextResponse.json(bookings);
}catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch roomrentals' }, { status: 500 });
  }
}

export async function POST(req:Request) {
    const data = await req.json();

    try{
        const bookings = await prisma.booking.create({data});
        return NextResponse.json(bookings);
    }catch(error){
        return NextResponse.json({eror:'Failed to Create bookings'},{ status: 500 });
    }
    
}