/** Horizontal, scrollable set of single-select filter chips. */
export default function FilterChips({ options, value, onChange, counts, label = 'Filter' }) {
  return (
    <div role="group" aria-label={label} className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
      {options.map((o) => {
        const on = value === o;
        return (
          <button key={o} type="button" aria-pressed={on} onClick={() => onChange(o)} className={`chip shrink-0 ${on ? 'chip-on' : 'chip-off'}`}>
            {o}
            {counts && <span className="ml-1.5 opacity-60">{counts[o] ?? 0}</span>}
          </button>
        );
      })}
    </div>
  );
}
