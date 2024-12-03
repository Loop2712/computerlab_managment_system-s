import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function GET(){
    try{
        const schedules = await prisma.roomSchedule.findMany();

        //ตรวจสอบว่ามีข้อมูลหรือไม่
        if (!schedules || schedules.length === 0) {
            return NextResponse.json({ message: 'No schedule found' }, { status: 404 });
    }
    return NextResponse.json(schedules);
}catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch schedule' }, { status: 500 });
  }
}

export async function POST(req:Request) {
    const data = await req.json();

    try{
        const schedules = await prisma.roomSchedule.create({data});
        return NextResponse.json(schedules);
    }catch(error){
        return NextResponse.json({eror:'Failed to Create schedules'},{ status: 500 });
    }
    
}