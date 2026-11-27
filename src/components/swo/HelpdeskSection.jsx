import { useState } from 'react';
import { MapPin, Clock, ShieldAlert, Phone, Mail, Send } from 'lucide-react';
import { Section, SectionHeading } from '../ui/Section';
import { INSTITUTE, SWO } from '../../data/site';

const CATEGORIES = [
  'General welfare inquiry',
  'Student clubs & activities',
  'Confidential guidance',
  'Scholarships',
  'Anti-ragging / campus safety',
];

const EMPTY = { name: '', usn: '', category: CATEGORIES[0], message: '' };

/**
 * Student helpdesk. The site has no backend, so submitting composes the note as an email
 * to the Student Welfare Office in the student's own mail app.
 */
export default function HelpdeskSection() {
  const [form, setForm] = useState(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const mailto = () => {
    const subject = `[SWO Helpdesk] ${form.category} — ${form.name}`;
    const body = `Name: ${form.name}\nUSN / Department: ${form.usn || '—'}\nNature of inquiry: ${form.category}\n\n${form.message}`;
    return `mailto:${SWO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.message) return;
    window.location.href = mailto();
    setSubmitted(true);
  };

  return (
    <Section id="helpdesk" aria-label="Student Welfare Office helpdesk and contact">
      <div className="container-site">
        <SectionHeading
          eyebrow="Student helpdesk"
          title="Connect with the Welfare Office."
          intro="Guidance, club coordination, scholarship facilitation or grievance support — reach out and the office will respond."
        />

        <div className="grid gap-8 lg:grid-cols-12">
          <div data-reveal className="flex flex-col gap-4 lg:col-span-5">
            <div className="card p-6">
              <p className="flex items-center gap-2 font-semibold text-navy-900">
                <Mail className="h-4 w-4 text-gold-600" aria-hidden /> Student Welfare Office
              </p>
              <div className="mt-3 space-y-1.5 text-sm">
                <a href={`mailto:${SWO.email}`} className="block text-navy-700 hover:text-gold-700">{SWO.email}</a>
                {SWO.officers.map((o) => (
                  <a key={o.name} href={`tel:${o.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-ink-muted hover:text-navy-900">
                    <Phone className="h-3.5 w-3.5 text-ink-faint" aria-hidden /> {o.phone} · {o.name}
                  </a>
                ))}
              </div>
            </div>
            <div className="card p-6">
              <p className="flex items-center gap-2 font-semibold text-navy-900">
                <MapPin className="h-4 w-4 text-gold-600" aria-hidden /> Campus
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {INSTITUTE.name}, {INSTITUTE.address.lines.join(', ')}
              </p>
              <p className="mt-4 flex items-center gap-2 border-t border-line pt-4 text-sm text-ink-muted">
                <Clock className="h-4 w-4 text-gold-600" aria-hidden /> Institute hours: {INSTITUTE.hours}
              </p>
            </div>
            <div className="rounded-2xl border-2 border-gold-300 bg-gold-50 p-6">
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gold-700">
                <ShieldAlert className="h-4 w-4" aria-hidden /> Anti-ragging helpline
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink">
                Zero tolerance for ragging. 24×7 toll-free national helpline:{' '}
                <a href="tel:18001805522" className="font-bold text-navy-900">1800-180-5522</a>
              </p>
            </div>
          </div>

          <div data-reveal className="rounded-3xl bg-gradient-to-br from-navy-900 to-navy-700 p-7 text-white sm:p-10 lg:col-span-7">
            <h3 className="font-display text-2xl sm:text-3xl">Send a note to the office</h3>
            <p className="mt-1 text-sm text-navy-100/80">Your note opens as an email to {SWO.email} in your mail app.</p>

            {submitted ? (
              <div className="py-12 text-center">
                <p className="font-display text-2xl">Almost done, {form.name.split(' ')[0]}.</p>
                <p className="mx-auto mt-3 max-w-sm text-sm text-navy-100/80">
                  Your mail app should have opened with your note about “{form.category}”. Press send there to deliver it. If nothing opened,{' '}
                  <a href={mailto()} className="text-gold-300 underline underline-offset-4">try again</a> or write to {SWO.email}.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setForm(EMPTY);
                  }}
                  className="mt-6 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold hover:bg-white hover:text-navy-900"
                >
                  Write another note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5 [&_label]:text-navy-100 [&_.field]:border-white/15 [&_.field]:bg-white [&_.field]:text-ink">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="student-name" className="mb-1.5 block text-xs font-semibold">Full name *</label>
                    <input id="student-name" required value={form.name} onChange={set('name')} placeholder="Your name" className="field" autoComplete="name" />
                  </div>
                  <div>
                    <label htmlFor="student-usn" className="mb-1.5 block text-xs font-semibold">USN / Department</label>
                    <input id="student-usn" value={form.usn} onChange={set('usn')} placeholder="e.g. 1DA24CS001" className="field" />
                  </div>
                </div>
                <div>
                  <label htmlFor="inquiry-category" className="mb-1.5 block text-xs font-semibold">Nature of inquiry</label>
                  <select id="inquiry-category" value={form.category} onChange={set('category')} className="field">
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="student-message" className="mb-1.5 block text-xs font-semibold">Details *</label>
                  <textarea id="student-message" required rows={5} value={form.message} onChange={set('message')} placeholder="Describe your inquiry…" className="field resize-none" />
                </div>
                <div className="flex items-center justify-end pt-1">
                  <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3 text-sm font-semibold text-navy-950 transition hover:bg-gold-300">
                    Compose email <Send className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
