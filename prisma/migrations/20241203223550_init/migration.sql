-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Student', 'Teacher', 'Admin');

-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('Lecture', 'Lab');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('Pending', 'Approved', 'Denied');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('Borrow', 'Return');

-- CreateTable
CREATE TABLE "User" (
    "id" BIGINT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'Student',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "RoomType" NOT NULL,
    "description" TEXT,
    "requiresApproval" BOOLEAN NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enrollment" (
    "id" SERIAL NOT NULL,
    "userSemesterId" INTEGER NOT NULL,
    "roomScheduleId" TEXT NOT NULL,
    "enrollmentDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "roomId" TEXT NOT NULL,
    "bookingDate" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "status" "BookingStatus" NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSemester" (
    "id" SERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "semester" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserSemester_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomSchedule" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "teacherName" TEXT NOT NULL,
    "scheduleDate" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "semester" TEXT NOT NULL,

    CONSTRAINT "RoomSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "borrowerId" BIGINT NOT NULL,
    "returnerId" BIGINT,
    "roomId" TEXT NOT NULL,
    "transactionType" "TransactionType" NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL,
    "transactionTime" TIMESTAMP(3) NOT NULL,
    "relatedTransactionId" INTEGER,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_userSemesterId_fkey" FOREIGN KEY ("userSemesterId") REFERENCES "UserSemester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_roomScheduleId_fkey" FOREIGN KEY ("roomScheduleId") REFERENCES "RoomSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSemester" ADD CONSTRAINT "UserSemester_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomSchedule" ADD CONSTRAINT "RoomSchedule_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_returnerId_fkey" FOREIGN KEY ("returnerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_relatedTransactionId_fkey" FOREIGN KEY ("relatedTransactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
