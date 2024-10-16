import { z } from "zod";

export const createWorkSpacesSchema = z.object({
  name: z.string().trim().min(1, "Name Workspace is Required."),
  image: z
    .union([
      z.instanceof(File, { message: "The uploaded image is not valid." }),
      z.string().transform((value) => (value === "" ? undefined : value)), 
    ])
    .optional(),
});
