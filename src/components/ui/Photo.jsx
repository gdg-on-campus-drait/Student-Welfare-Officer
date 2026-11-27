import { ImageOff } from 'lucide-react';
import { photo } from '../../content/images';

/**
 * Image from the content photo library (src/assets/photos/…).
 * Falls back to a tasteful navy placeholder when no photo is set.
 */
export default function Photo({ src, alt = '', className = '', imgClassName = '', priority = false, fallbackLabel, ...rest }) {
  const url = photo(src);
  if (!url) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 ${className}`}
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
        {...rest}
      >
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:22px_22px]" aria-hidden />
        {fallbackLabel ? (
          <span className="relative px-6 text-center font-display text-2xl text-white/80">{fallbackLabel}</span>
        ) : (
          <ImageOff className="relative h-6 w-6 text-white/30" aria-hidden />
        )}
      </div>
    );
  }
  return (
    <div className={`overflow-hidden bg-navy-50 ${className}`} {...rest}>
      <img
        src={url}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        {...(priority ? { fetchPriority: 'high' } : {})}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}
