import { z } from "zod";

export const addCategorySchema = z.object({
  name: z
    .string({ invalid_type_error: "name must be of type string", required_error: "name field is missing" })
    .min(1, "name required"),
  userId: z
    .string({ invalid_type_error: "userId must be of type string", required_error: "userId field is missing" })
    .min(1, "userId required"),
});
export type addCategorySchemaType = z.infer<typeof addCategorySchema>;


export const listCategorySchema = z.object({
  userId: z
    .string({ invalid_type_error: "userId must be of type string", required_error: "userId field is missing" })
    .min(1, "userId required"),
});

export type listCategorySchemaType = z.infer<typeof listCategorySchema>;

export const editCategorySchema = z.object({
  name: z
    .string({ invalid_type_error: "name must be of type string", required_error: "name field is missing" })
    .min(1, "name required"),
    categoryId: z
    .string({ invalid_type_error: "category id must be of type string", required_error: "category id field is missing" })
    .min(1, "category id required"),
  userId: z
    .string({ invalid_type_error: "userId must be of type string", required_error: "userId field is missing" })
    .min(1, "userId required"),
});
export type editCategorySchemaType = z.infer<typeof editCategorySchema>;

export const deleteCategorySchema = z.object({
    categoryId: z
    .string({ invalid_type_error: "category id must be of type string", required_error: "category id field is missing" })
    .min(1, "category id required"),
  userId: z
    .string({ invalid_type_error: "userId must be of type string", required_error: "userId field is missing" })
    .min(1, "userId required"),
});
export type deleteCategorySchemaType = z.infer<typeof deleteCategorySchema>;