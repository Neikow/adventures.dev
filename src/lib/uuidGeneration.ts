import { nanoid } from "nanoid";

export const UUID_LENGTH = 21;

export function generateUUID(): string {
  return nanoid(UUID_LENGTH);
}
