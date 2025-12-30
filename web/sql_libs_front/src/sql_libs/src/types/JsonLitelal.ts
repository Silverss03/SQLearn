import { z } from 'zod';
import { jsonLiteralSchema } from './schema/jsonLitelalSchema';

export type JsonLiteral = z.infer<typeof jsonLiteralSchema>;
