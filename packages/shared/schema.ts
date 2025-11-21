import { sql } from 'drizzle-orm';
import { pgTable, text, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const users = pgTable('users', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const textCompletionRequestSchema = z.object({
  text: z.string(),
  mode: z.enum(['word', 'sentence', 'paragraph']).default('sentence'),
  style: z
    .enum(['casual', 'formal', 'creative', 'technical'])
    .default('casual'),
  provider: z.enum(['auto', 'gemini', 'sambanova']).default('auto'),
  geminiApiKey: z.string().optional(),
  sambaNovaApiKey: z.string().optional(),
  geminiModel: z.string().default('gemini-3-pro-preview'),
});

export type TextCompletionRequest = z.infer<typeof textCompletionRequestSchema>;

export const textCompletionResponseSchema = z.object({
  suggestion: z.string(),
});

export type TextCompletionResponse = z.infer<
  typeof textCompletionResponseSchema
>;
