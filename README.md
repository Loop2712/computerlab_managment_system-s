
## Getting Started

First, run the development server:

```bash
npm i
npm run dev

```

```bash
src/
|-- app/
|   |-- layout.tsx                  // Layout หลัก
|   |-- page.tsx                    // หน้า Home
|   |-- login/                      // หน้าเข้าสู่ระบบ
|       |-- page.tsx
|   |-- about/                      // หน้าข้อมูลระบบ
|       |-- page.tsx
|   |-- room-status/                // หน้าแสดงสถานะห้องเรียน
|       |-- page.tsx
|   |-- admin/                      // โซนสำหรับแอดมิน
|       |-- dashboard/              // หน้าแดชบอร์ด
|           |-- page.tsx
|       |-- manage-rooms/           // หน้าจัดการห้อง
|           |-- page.tsx
|       |-- manage-users/           // หน้าจัดการผู้ใช้
|           |-- page.tsx
|       |-- manage-schedules/       // หน้าจัดการตารางเรียน
|           |-- page.tsx
|       |-- manage-bookings/        // หน้าตรวจสอบการจอง
|           |-- page.tsx
|       |-- reports/                // หน้ารายงาน
|           |-- page.tsx
|   |-- teacher/                    // โซนสำหรับอาจารย์
|       |-- dashboard/              // หน้าแดชบอร์ดส่วนตัว
|           |-- page.tsx
|       |-- book-room/              // หน้าจองห้อง
|           |-- page.tsx
|       |-- view-bookings/          // หน้าตรวจสอบการจอง
|           |-- page.tsx
|       |-- approve-bookings/       // หน้าอนุมัติการจอง
|           |-- page.tsx
|   |-- student/                    // โซนสำหรับนักศึกษา
|       |-- dashboard/              // หน้าแดชบอร์ดส่วนตัว
|           |-- page.tsx
|       |-- view-schedule/          // หน้าตรวจสอบตารางเรียน
|           |-- page.tsx
|       |-- booking-history/        // หน้าประวัติการจอง
|           |-- page.tsx
|       |-- book-room/              // หน้าจองห้อง
|           |-- page.tsx
|-- components/                     // UI Components ที่ใช้ร่วมกัน
|   |-- Navbar.tsx
|   |-- Sidebar.tsx
|   |-- RoomTable.tsx
|   |-- BookingForm.tsx
|   |-- UserTable.tsx
|-- utils/                          // Utilities ต่าง ๆ
|   |-- api.ts                      // ฟังก์ชันสำหรับเรียก API
|   |-- auth.ts                     // ฟังก์ชันจัดการ Authentication
|   |-- formatDate.ts               // Utility สำหรับจัดการวันที่
|-- styles/                         // ไฟล์ CSS หรือ Tailwind configuration
|-- prisma/                         // Prisma Schema และ Client
|   |-- schema.prisma
|   |-- client.ts

```