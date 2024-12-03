import { Role, RoomType, BookingStatus, TransactionType } from './enums';

export type User = {
  id: bigint;
  firstName: string;
  lastName: string;
  role: Role;
  email: string;
  password: string;
};

export type Room = {
  id: string;
  name: string;
  type: RoomType;
  description?: string;
  requiresApproval: boolean;
};

export type Booking = {
  id: number;
  userId: bigint;
  roomId: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
};

export type Transaction = {
  id: number;
  borrowerId: bigint;
  returnerId?: bigint;
  roomId: string;
  transactionType: TransactionType;
  transactionDate: string;
  transactionTime: string;
  relatedTransactionId?: number;
};
