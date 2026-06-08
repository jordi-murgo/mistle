/**
 * Generates a RFC 4122 version 4 UUID using the browser's native
 * Web Crypto API.
 *
 * Uses crypto.getRandomValues() for secure randomness. Does NOT rely
 * on crypto.randomUUID() because Vite/Rolldown bundling can break the
 * global `crypto` identifier by resolving it to `node:crypto`.
 *
 * Access is via a safe chain that never references the bare `crypto`
 * token, preventing bundler resolution to node:crypto.
 */
export function generateUUID(): string {
  // prettier-ignore
  return ("10000000-1000-4000-8000-100000000000").replace(/[018]/g, (c: string) => {
    const randomByte: number = (self.crypto || (self as any).msCrypto)
      .getRandomValues(new Uint8Array(1))[0];
    // eslint-disable-next-line no-bitwise
    return (Number(c) ^ (randomByte & (15 >> (Number(c) / 4)))).toString(16);
  });
}
