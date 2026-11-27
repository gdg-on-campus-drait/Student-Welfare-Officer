import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ShieldAlert, Send, ArrowUpRight } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { Section } from '../components/ui/Section';
import SocialIcon from '../components/ui/SocialIcon';
import PersonCard from '../components/cards/PersonCard';
import { SWO, SWO_TEAM, CONTACT, SOCIAL, FESTS } from '../content';
import usePageTitle from '../lib/usePageTitle';

const CATEGORIES = ['General welfare inquiry', 'Joining a club', 'Proposing an event', 'Confidential guidance', 'Anti-ragging / campus safety'];
const EMPTY = { name: '', usn: '', category: CATEGORIES[0], message: '' };

export default function ContactPage() {
  usePageTitle('Contact — SWO, Dr. AIT');
  const sanskruthi = FESTS.find((f) => f.slug === 'sanskruthi');

  return (
    <>
      <PageHeader eyebrow="Contact" title="Contact the SWO" intro="Questions, ideas for events, joining a club or anything about student life — we’re here to help." image="campus/students-campus.webp" />

      <Section className="!pt-14">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-5">
            <a data-reveal href={`mailto:${SWO.email}`} className="group flex items-center gap-4 rounded-3xl bg-navy-900 p-6 text-white transition hover:bg-navy-800">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-accent-300"><Mail className="h-5 w-5" aria-hidden /></span>
              <span>
                <span className="block text-xs uppercase tracking-eyebrow text-navy-200">Email the SWO</span>
                <span className="block font-display text-xl">{SWO.email}</span>
              </span>
            </a>
            <div data-reveal className="space-y-3">
              {SWO_TEAM.map((p) => <PersonCard key={p.name} person={{ ...p, email: undefined }} />)}
            </div>
            <div data-reveal className="rounded-3xl border border-line bg-white p-6">
              <p className="flex items-center gap-2 font-semibold text-navy-900"><MapPin className="h-4 w-4 text-accent-500" aria-hidden /> Campus</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{CONTACT.address.join(', ')}</p>
              <a href={CONTACT.mapUrl} target="_blank" rel="noopener noreferrer" className="link-arrow mt-3">Get directions <ArrowUpRight className="h-4 w-4" aria-hidden /></a>
              <p className="mt-4 flex items-center gap-2 border-t border-line pt-4 text-sm text-ink-muted"><Clock className="h-4 w-4 text-accent-500" aria-hidden /> {CONTACT.hours}</p>
            </div>
            <div data-reveal className="rounded-3xl border-2 border-accent-200 bg-accent-50 p-6">
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-accent-700"><ShieldAlert className="h-4 w-4" aria-hidden /> Anti-ragging helpline</p>
              <p className="mt-2 text-sm leading-relaxed text-ink">
                Ragging in any form is strictly prohibited. 24×7 toll-free national helpline:{' '}
                <a href={`tel:${CONTACT.antiRaggingHelpline.replace(/-/g, '')}`} className="font-bold text-navy-900">{CONTACT.antiRaggingHelpline}</a>
              </p>
            </div>
          </div>

          <div className="space-y-8 lg:col-span-7">
            <HelpdeskForm />
            <div data-reveal>
              <h2 className="font-display text-2xl text-navy-900">Follow along</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {SOCIAL.map((s) => (
                  <li key={s.id}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-4 transition hover:border-navy-900">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-800 transition group-hover:bg-navy-900 group-hover:text-white"><SocialIcon id={s.id} className="h-5 w-5" /></span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-navy-900">{s.label}</span>
                        <span className="block truncate text-xs text-ink-subtle">Dr. AIT · {s.handle}</span>
                      </span>
                    </a>
                  </li>
                ))}
                {sanskruthi?.links?.instagram && (
                  <li>
                    <a href={sanskruthi.links.instagram} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-4 transition hover:border-navy-900">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-800 transition group-hover:bg-navy-900 group-hover:text-white"><SocialIcon id="instagram" className="h-5 w-5" /></span>
                      <span>
                        <span className="block text-sm font-semibold text-navy-900">Sanskruthi fest</span>
                        <span className="block text-xs text-ink-subtle">Instagram · @sanskruthi_drait</span>
                      </span>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <div className="h-[380px] w-full border-t border-line bg-canvas">
        <iframe title="Map showing Dr. Ambedkar Institute of Technology, Bengaluru" src={CONTACT.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full w-full" />
      </div>
    </>
  );
}

/** The site has no backend: the note is composed as an email in the student's mail app. */
function HelpdeskForm() {
  const [form, setForm] = useState(EMPTY);
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const mailto = () =>
    `mailto:${SWO.email}?subject=${encodeURIComponent(`[SWO Helpdesk] ${form.category} — ${form.name}`)}&body=${encodeURIComponent(
      `Name: ${form.name}\nUSN / Department: ${form.usn || '—'}\nNature of inquiry: ${form.category}\n\n${form.message}`
    )}`;

  return (
    <div id="helpdesk" data-reveal className="scroll-mt-28 rounded-3xl border border-line bg-white p-7 shadow-card sm:p-9">
      <h2 className="font-display text-2xl text-navy-900 sm:text-3xl">Student helpdesk</h2>
      <p className="mt-1 text-sm text-ink-muted">Your note opens as an email to {SWO.email} in your mail app.</p>
      {sent ? (
        <div className="py-10 text-center">
          <p className="font-display text-2xl text-navy-900">Almost done, {form.name.split(' ')[0]}.</p>
          <p className="mx-auto mt-3 max-w-sm text-sm text-ink-muted">
            Your mail app should have opened with your note. Press send there to deliver it. If nothing opened, <a href={mailto()} className="font-semibold text-navy-800 underline underline-offset-4">try again</a>.
          </p>
          <button type="button" onClick={() => { setSent(false); setForm(EMPTY); }} className="chip chip-off mt-6">Write another note</button>
        </div>
      ) : (
        <form
          className="mt-7 space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            if (!form.name || !form.message) return;
            window.location.href = mailto();
            setSent(true);
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="hd-name" className="mb-1.5 block text-xs font-semibold text-navy-900">Full name *</label>
              <input id="hd-name" required value={form.name} onChange={set('name')} className="field" autoComplete="name" />
            </div>
            <div>
              <label htmlFor="hd-usn" className="mb-1.5 block text-xs font-semibold text-navy-900">USN / Department</label>
              <input id="hd-usn" value={form.usn} onChange={set('usn')} className="field" />
            </div>
          </div>
          <div>
            <label htmlFor="hd-cat" className="mb-1.5 block text-xs font-semibold text-navy-900">Nature of inquiry</label>
            <select id="hd-cat" value={form.category} onChange={set('category')} className="field">{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
          </div>
          <div>
            <label htmlFor="hd-msg" className="mb-1.5 block text-xs font-semibold text-navy-900">Message *</label>
            <textarea id="hd-msg" required rows={5} value={form.message} onChange={set('message')} className="field resize-none" />
          </div>
          <div className="flex items-center justify-between gap-4">
            <a href={`tel:${SWO_TEAM[0].phone}`} className="inline-flex items-center gap-1.5 text-xs text-ink-subtle hover:text-navy-900"><Phone className="h-3.5 w-3.5" aria-hidden /> Prefer to call? {SWO_TEAM[0].phone}</a>
            <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-7 py-3 text-sm font-semibold text-white hover:bg-navy-700">
              Compose email <Send className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
