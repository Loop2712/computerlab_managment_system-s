import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function GET(){
    try{
        const rooms = await prisma.room.findMany();

        //ตรวจสอบว่ามีข้อมูลหรือไม่
        if (!rooms || rooms.length === 0) {
            return NextResponse.json({ message: 'No roomrentals found' }, { status: 404 });
    }
    return NextResponse.json(rooms);
}catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch roomrentals' }, { status: 500 });
  }
}

export async function POST(req:Request) {
    const data = await req.json();

    try{
        const rooms = await prisma.room.create({data});
        return NextResponse.json(rooms);
    }catch(error){
        return NextResponse.json({eror:'Failed to Create rooms'},{ status: 500 });
    }
    
}