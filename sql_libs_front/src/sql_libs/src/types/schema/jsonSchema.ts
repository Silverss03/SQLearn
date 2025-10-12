import { z } from 'zod';
import { Json } from '../Json';
import { jsonLiteralSchema } from './jsonLitelalSchema';

export const jsonSchema: z.ZodType<Json> = z.lazy(() =>
  z.union([jsonLiteralSchema, z.array(jsonSchema), z.record(jsonSchema)])
);
