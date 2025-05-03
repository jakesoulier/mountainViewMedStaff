import { z } from 'zod';

export const AnnouncementSchema = z.object({
    title: z.string(),
    message: z.string(),
    id: z.string(),
});

export const EventSchema = z.object({
    title: z.string(),
    description: z.string(),
    day: z.string(),
    month: z.string(),
    time: z.string(),
    type: z.string(),
    link: z.string(),
    email: z.string().email(),
    company: z.string(),
});

export interface RegisterFormData {
    name: string;
    email: string;
    textUpdates: string;
    date: string;
    phone: string;
    calendarInvite: string;
    license: string;
    attendance: string;
    updates: string;
    knowledge: string;
    title: string;
  }