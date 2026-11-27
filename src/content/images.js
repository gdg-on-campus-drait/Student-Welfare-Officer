/**
 * Image resolver for content files.
 *
 * Put a photo anywhere under `src/assets/photos/` and reference it in content
 * by its path relative to that folder, e.g. `image: 'fests/sanskruthi-crowd.webp'`.
 * Vite fingerprints and optimises every file automatically.
 */
const files = import.meta.glob('../assets/photos/**/*.{webp,jpg,jpeg,png,avif,svg}', {
  eager: true,
  import: 'default',
});

const byPath = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.replace('../assets/photos/', ''), url])
);

/** Returns the bundled URL for a photo path, or null if the file doesn't exist. */
export function photo(path) {
  if (!path) return null;
  if (/^https?:\/\//.test(path)) return path; // allow external URLs too
  const url = byPath[path];
  if (!url && import.meta.env.DEV) {
    console.warn(`[content] Missing photo "${path}". Add it under src/assets/photos/.`);
  }
  return url || null;
}
