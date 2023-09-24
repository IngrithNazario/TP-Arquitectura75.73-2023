import { z } from "zod";

const GetMetarSchema = z.object({
    query: z.object({
        station: z.string(),
    })
});

type GetMetarType = z.infer<typeof GetMetarSchema>;

export { GetMetarSchema, GetMetarType };