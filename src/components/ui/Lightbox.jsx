import { useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { photo } from '../../content/images';
import { lockScroll } from '../../lib/scroll';

/** Full-screen photo viewer. items: [{ src, caption }]. Keyboard: ← → Esc. */
export default function Lightbox({ items, index, onChange, onClose }) {
  const go = useCallback((d) => onChange((index + d + items.length) % items.length), [index, items.length, onChange]);

  useEffect(() => {
    lockScroll(true);
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      lockScroll(false);
    };
  }, [go, onClose]);

  const item = items[index];
  return (
    <div role="dialog" aria-modal="true" aria-label={item.caption || 'Photo'} className="fixed inset-0 z-[70] flex flex-col bg-navy-950/95 backdrop-blur-sm" onClick={onClose}>
      <div className="flex items-center justify-between gap-4 p-4 text-white sm:p-6" onClick={(e) => e.stopPropagation()}>
        <p className="min-w-0 truncate text-sm">
          <span className="font-display text-lg">{item.caption}</span>
          <span className="ml-3 text-white/60">{index + 1} / {items.length}</span>
        </p>
        <button type="button" onClick={onClose} autoFocus className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 hover:bg-white/10" aria-label="Close">
          <X className="h-5 w-5" aria-hidden />
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-8 sm:px-20">
        <img key={item.src} src={photo(item.src)} alt={item.caption || ''} className="max-h-full max-w-full animate-fadeUp rounded-xl object-contain shadow-2xl" onClick={(e) => e.stopPropagation()} />
        {items.length > 1 &&
          [[-1, ChevronLeft, 'left-2 sm:left-6', 'Previous'], [1, ChevronRight, 'right-2 sm:right-6', 'Next']].map(([d, Icon, pos, label]) => (
            <button
              key={label}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(d);
              }}
              className={`absolute top-1/2 ${pos} inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white hover:text-navy-950`}
              aria-label={`${label} photo`}
            >
              <Icon className="h-5 w-5" aria-hidden />
            </button>
          ))}
      </div>
    </div>
  );
}
