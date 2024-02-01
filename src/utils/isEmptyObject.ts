export function isEmptyObject(obj: Record<string, any>) {
  return Object.keys(obj).length === 0;
}
