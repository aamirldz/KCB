export interface ReservationDetails {
    id?: string;
    fullName: string;
    phone: string;
    email: string;
    date: string;
    time: string;
    guests: number;
    specialRequests: string;
    status?: 'pending' | 'confirmed' | 'cancelled';
    createdAt?: Date;
}

export interface TimeSlot {
    time: string;
    available: boolean;
}

export const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const TIME_SLOTS: TimeSlot[] = [
    { time: '12:00 PM', available: true },
    { time: '12:30 PM', available: true },
    { time: '1:00 PM', available: true },
    { time: '1:30 PM', available: true },
    { time: '2:00 PM', available: true },
    { time: '2:30 PM', available: true },
    { time: '6:00 PM', available: true },
    { time: '6:30 PM', available: true },
    { time: '7:00 PM', available: true },
    { time: '7:30 PM', available: true },
    { time: '8:00 PM', available: true },
    { time: '8:30 PM', available: true },
    { time: '9:00 PM', available: true },
    { time: '9:30 PM', available: true },
    { time: '10:00 PM', available: true },
];
