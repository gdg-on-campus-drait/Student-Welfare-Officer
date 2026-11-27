import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import SmartLink from '../ui/SmartLink';
import { ACCREDITATIONS, CONTACTS, INSTITUTE, NAV, QUICK_LINKS, officialPage } from '../../data/site';
import { scrollToId } from '../../lib/scroll';
import draitLogoWhite from '../../assets/drait-logo-white.png';

const YEAR = new Date().getFullYear();

const COLUMNS = [
  { title: 'Institute', items: NAV[0].items },
  { title: 'Academics', items: [...NAV[1].items.slice(0, 4), ...NAV[2].items.slice(1, 3)] },
  { title: 'Campus & Careers', items: [...NAV[5].items.slice(0, 4), NAV[4].items[0], NAV[3].items[0]] },
];

export default function Footer() {
  const general = CONTACTS[0];
  const admissions = CONTACTS[1];

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-navy-100">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-navy-700/30 blur-3xl" aria-hidden />
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/70 to-transparent" />

      <div className="container-site relative grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <img src={draitLogoWhite} alt={INSTITUTE.name} className="h-9 w-auto" loading="lazy" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-navy-200/80">
            An autonomous institution affiliated to VTU, Belagavi. Governed by the {INSTITUTE.trust}.
          </p>
          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden />
              <a href={INSTITUTE.address.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {INSTITUTE.address.lines.join(', ')}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden />
              <span>
                General: <a className="hover:text-white" href={`tel:${general.phone[0]}`}>{general.phone[0]}</a>
                <br />
                Admissions:{' '}
                {admissions.phone.map((p, i) => (
                  <span key={p}>
                    {i > 0 && ' / '}
                    <a className="hover:text-white" href={`tel:${p}`}>{p}</a>
                  </span>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden />
              <span className="flex flex-col">
                {[...general.email, ...admissions.email].map((e) => (
                  <a key={e} href={`mailto:${e}`} className="hover:text-white">{e}</a>
                ))}
              </span>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-[11px] font-semibold uppercase tracking-eyebrow text-gold-300">{col.title}</h3>
              <ul className="mt-5 space-y-3 text-sm">
                {col.items.map((i) => (
                  <li key={i.label}>
                    <SmartLink to={i.to} href={i.href} className="group inline-flex items-center gap-1 text-navy-200/80 transition-colors hover:text-white">
                      {i.label}
                      {i.href && <ArrowUpRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" aria-hidden />}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-[11px] font-semibold uppercase tracking-eyebrow text-gold-300">Quick links</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {QUICK_LINKS.map((q) => (
              <li key={q.label}>
                <SmartLink to={q.to} href={q.href} className="text-navy-200/80 hover:text-white">{q.label}</SmartLink>
              </li>
            ))}
            <li>
              <SmartLink href={officialPage('Right-to-Information-RTI')} className="text-navy-200/80 hover:text-white">RTI</SmartLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-site relative">
        <ul className="flex flex-wrap gap-2 border-t border-white/10 py-8" aria-label="Accreditations and approvals">
          {ACCREDITATIONS.map((a) => (
            <li key={a.label} className="rounded-full border border-white/15 px-3.5 py-1.5 text-xs text-navy-200">
              <span className="font-semibold text-white">{a.label}</span> · {a.detail}
            </li>
          ))}
        </ul>
        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 py-6 text-xs text-navy-300 sm:flex-row sm:items-center">
          <p>© {YEAR} {INSTITUTE.name}. All rights reserved.</p>
          <button
            type="button"
            onClick={() => (scrollToId('top') ? null : window.scrollTo({ top: 0, behavior: 'smooth' }))}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-navy-100 transition-colors hover:border-gold-400 hover:text-white"
          >
            Back to top <ArrowUp className="h-3.5 w-3.5" aria-hidden />
          </button>
        </div>
      </div>
    </footer>
  );
}
