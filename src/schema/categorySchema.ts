import { z } from "zod";

export const addCategorySchema = z.object({
  name: z
    .string({ invalid_type_error: "name must be of type string", required_error: "name field is missing" })
    .min(1, "name required")
});
export type addCategorySchemaType = z.infer<typeof addCategorySchema>;

