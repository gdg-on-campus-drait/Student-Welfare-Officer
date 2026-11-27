import { Inbox } from 'lucide-react';

export default function EmptyState({ icon: Icon = Inbox, title, children, className = '' }) {
  return (
    <div className={`flex flex-col items-center rounded-3xl border border-dashed border-navy-200 bg-canvas px-6 py-14 text-center ${className}`}>
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-navy-500 shadow-card">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <p className="mt-4 font-display text-xl text-navy-900">{title}</p>
      {children && <div className="mt-2 max-w-md text-sm leading-relaxed text-ink-muted">{children}</div>}
    </div>
  );
}
