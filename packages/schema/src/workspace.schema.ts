import z from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string("Name is required"),
  description: z.string().optional().nullable(),
});

export type CreateWorkspaceSchema = z.infer<typeof createWorkspaceSchema>;

export const updateWorkspaceSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
});

export type UpdateWorkspaceSchema = z.infer<typeof updateWorkspaceSchema>;
