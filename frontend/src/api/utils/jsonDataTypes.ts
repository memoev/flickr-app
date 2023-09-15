import { z } from "zod";

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
type Literal = z.infer<typeof literalSchema>;

export type JsonData = Literal | { [key: symbol]: JsonData } | JsonData[];
export type JsonSchema = z.ZodType<JsonData>;
