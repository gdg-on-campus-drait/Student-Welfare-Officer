import { ChevronRight } from 'lucide-react';
import SmartLink from './SmartLink';
import { photo } from '../../content/images';

/** Hero band for inner pages: photo background, breadcrumb, title and intro. */
export default function PageHeader({ eyebrow, title, intro, image, crumbs = [], children }) {
  const url = photo(image);
  return (
    <section id="top" className="relative isolate overflow-hidden bg-navy-950 pb-16 pt-32 text-white sm:pb-20 sm:pt-40">
      {url && <img src={url} alt="" fetchPriority="high" className="absolute inset-0 -z-10 h-full w-full animate-kenburns object-cover opacity-45" />}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/40" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-navy-950/70 to-transparent" />
      <div className="container-site">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-white/60">
          <SmartLink to="/" className="hover:text-white">Home</SmartLink>
          {crumbs.map((c) => (
            <span key={c.label} className="inline-flex items-center gap-1.5">
              <ChevronRight className="h-3 w-3" aria-hidden />
              {c.to ? <SmartLink to={c.to} className="hover:text-white">{c.label}</SmartLink> : <span>{c.label}</span>}
            </span>
          ))}
          <ChevronRight className="h-3 w-3" aria-hidden />
          <span className="text-white" aria-current="page">{title}</span>
        </nav>
        {eyebrow && <p className="eyebrow eyebrow-light mt-8">{eyebrow}</p>}
        <h1 className="mt-4 max-w-3xl animate-fadeUp font-display text-4xl font-medium leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl animate-fadeUp text-base leading-relaxed text-white/80 sm:text-lg">{intro}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
