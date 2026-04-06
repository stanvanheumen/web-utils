/**
 * Options for {@link blobToFile}.
 */
export interface BlobToFileOptions {
    /**
     * The MIME type of the file.
     * Defaults to the blob's own type, or `''` if the blob has no type.
     */
    type?: string;
    /**
     * The last modified timestamp (ms since Unix epoch).
     * @default Date.now()
     */
    lastModified?: number;
}

/**
 * Converts a `Blob` to a `File` by attaching a file name and optional metadata.
 *
 * @param blob - The blob to convert
 * @param name - The file name (e.g. `'photo.jpg'`)
 * @param options - Optional overrides for `type` and `lastModified`
 * @returns A new `File` with the blob's data and the provided metadata
 *
 * @example
 * ```ts
 * const blob = new Blob(['hello'], { type: 'text/plain' });
 * const file = blobToFile(blob, 'hello.txt');
 *
 * file instanceof File; // true
 * file.name;            // 'hello.txt'
 * file.type;            // 'text/plain'
 * ```
 */
export function blobToFile(blob: Blob, name: string, options: BlobToFileOptions = {}): File {
    const {type = blob.type, lastModified = Date.now()} = options;
    return new File([blob], name, {type, lastModified});
}
