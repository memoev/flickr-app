import { ZodError, z } from "zod";

const projectErrorResponseSchema = z.object({
  errorCode: z.string(),
  errorInput: z.string().optional(),
  validInputs: z.array(z.string()).optional(),
});

export type ProjectErrorResponse = z.infer<typeof projectErrorResponseSchema>;

const errorResponseSchema = z.object({
  success: z.literal(false),
  errorMessage: z.string(),
  errors: z.array(projectErrorResponseSchema),
});

type ErrorResponse = z.infer<typeof errorResponseSchema>;

export class ProjectError extends Error {
  errors: ProjectErrorResponse[];

  statusCode: number;

  constructor({
    message,
    statusCode,
    errors,
  }: {
    message: string;
    statusCode: number;
    errors: ProjectErrorResponse[];
  }) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

function isErrorResponse(response: any): response is ErrorResponse {
  try {
    // Validate the response against the schema
    errorResponseSchema.parse(response);
    return true;
  } catch (error) {
    if (error instanceof ZodError) {
      return false;
    }
    throw error;
  }
}

export default isErrorResponse;
