import { z } from "zod";

const GetMetarSchema = z.object({
    query: z.object({
        station: z.string().optional(),
    })
});

type GetMetarType = z.infer<typeof GetMetarSchema>;

export { GetMetarSchema, GetMetarType };