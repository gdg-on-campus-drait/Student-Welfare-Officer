import { MapPin, Clock, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { Section, SectionHeading } from '../ui/Section';
import { CONTACTS, INSTITUTE } from '../../data/site';

export default function Contact() {
  return (
    <Section id="contact">
      <div className="container-site">
        <SectionHeading eyebrow="Contact" title="Visit or reach the campus." />
        <div className="grid gap-6 lg:grid-cols-12">
          <div data-reveal className="flex flex-col gap-4 lg:col-span-5">
            <div className="card p-6">
              <p className="flex items-center gap-2 text-sm font-semibold text-navy-900">
                <MapPin className="h-4 w-4 text-gold-600" aria-hidden /> Address
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {INSTITUTE.name}
                <br />
                {INSTITUTE.address.lines.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
              </p>
              <a href={INSTITUTE.address.mapUrl} target="_blank" rel="noopener noreferrer" className="link-arrow mt-3">
                Get directions <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
              <p className="mt-5 flex items-center gap-2 border-t border-line pt-5 text-sm text-ink-muted">
                <Clock className="h-4 w-4 text-gold-600" aria-hidden /> {INSTITUTE.hours}
              </p>
            </div>
            {CONTACTS.map((c) => (
              <div key={c.label} className="card p-5">
                <p className="text-sm font-semibold text-navy-900">{c.label}</p>
                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
                  {c.phone?.map((p) => (
                    <a key={p} href={`tel:${p}`} className="inline-flex items-center gap-1.5 text-ink-muted hover:text-navy-900">
                      <Phone className="h-3.5 w-3.5 text-ink-faint" aria-hidden /> {p}
                    </a>
                  ))}
                  {c.email?.map((e) => (
                    <a key={e} href={`mailto:${e}`} className="inline-flex items-center gap-1.5 text-ink-muted hover:text-navy-900">
                      <Mail className="h-3.5 w-3.5 text-ink-faint" aria-hidden /> {e}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div data-reveal className="min-h-[380px] overflow-hidden rounded-3xl border border-line bg-canvas lg:col-span-7">
            <iframe
              title="Map showing Dr. Ambedkar Institute of Technology, Bengaluru"
              src="https://www.google.com/maps?q=Dr.+Ambedkar+Institute+of+Technology,+Mallathahalli,+Bengaluru&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[380px] w-full grayscale-[30%]"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
