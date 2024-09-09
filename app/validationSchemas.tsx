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
});