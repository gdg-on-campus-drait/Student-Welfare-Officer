import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react';
import SmartLink from '../ui/SmartLink';
import SocialIcon from '../ui/SocialIcon';
import { NAV } from '../../content/navigation';
import { CONTACT, SOCIAL, SWO, SWO_TEAM, FESTS } from '../../content';
import { scrollToId } from '../../lib/scroll';
import crest from '../../assets/drait-crest.png';

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-navy-100">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-navy-700/30 blur-3xl" aria-hidden />
      <div className="container-site relative grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white p-1.5">
              <img src={crest} alt="" className="h-full w-full object-contain" />
            </span>
            <span>
              <span className="block font-display text-xl text-white">Student Welfare Office</span>
              <span className="block text-xs text-navy-200/80">Dr. Ambedkar Institute of Technology, Bengaluru</span>
            </span>
          </div>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-navy-200/80">{SWO.mission}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Official social channels">
            {SOCIAL.map((s) => (
              <li key={s.id}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`Dr. AIT on ${s.label}`} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-navy-100 transition-colors hover:border-white hover:bg-white hover:text-navy-950">
                  <SocialIcon id={s.id} className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-eyebrow text-accent-300">Explore</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV.slice(1).map((n) => (
                <li key={n.to}><SmartLink to={n.to} className="text-navy-200/80 hover:text-white">{n.label}</SmartLink></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-eyebrow text-accent-300">Fests</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {FESTS.filter((f) => f.type !== 'Celebration').map((f) => (
                <li key={f.slug}><SmartLink to={`/fests/${f.slug}`} className="text-navy-200/80 hover:text-white">{f.name}</SmartLink></li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-[11px] font-semibold uppercase tracking-eyebrow text-accent-300">Reach the SWO</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent-300" aria-hidden />
                <a href={`mailto:${SWO.email}`} className="hover:text-white">{SWO.email}</a>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent-300" aria-hidden />
                <span className="flex flex-col">
                  {SWO_TEAM.map((p) => (
                    <a key={p.name} href={`tel:${p.phone.replace(/\s/g, '')}`} className="hover:text-white">{p.phone}</a>
                  ))}
                </span>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-300" aria-hidden />
                <a href={CONTACT.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">{CONTACT.address.slice(1).join(', ')}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container-site relative flex flex-col items-start justify-between gap-4 border-t border-white/10 py-6 text-xs text-navy-300 sm:flex-row sm:items-center">
        <p>
          © {YEAR} Student Welfare Office, Dr. Ambedkar Institute of Technology ·{' '}
          <a href={CONTACT.instituteWebsite} target="_blank" rel="noopener noreferrer" className="hover:text-white">drait.edu.in</a>
        </p>
        <button
          type="button"
          onClick={() => (scrollToId('top') ? null : window.scrollTo({ top: 0, behavior: 'smooth' }))}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-navy-100 transition-colors hover:border-white hover:text-white"
        >
          Back to top <ArrowUp className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>
    </footer>
  );
}
