import { z } from 'zod';
import { Json } from '../types';
import { jsonSchema } from '../types/schema/jsonSchema';

export function setItem<T extends Json>(key: string, value: T): void {
  const jsonString = JSON.stringify(value);
  sessionStorage.setItem(key, jsonString);
}

export function getItem<T extends Json>(
  key: string,
  schema: z.ZodType<T>
): T | null {
  try {
    const jsonString = sessionStorage.getItem(key) ?? JSON.stringify(null);
    const jsonObject = jsonSchema.parse(JSON.parse(jsonString));
    return schema.parse(jsonObject);
  } catch {
    return null;
  }
}

export function removeItem(key: string) {
  sessionStorage.removeItem(key);
}
