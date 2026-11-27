import { useEffect, useRef, useState } from 'react';
import { Sparkles, X, Send, ArrowUpRight, ArrowRight } from 'lucide-react';
import { ask, isAIConnected } from '../../lib/assistantEngine';
import { useGo } from '../../lib/useGo';
import crest from '../../assets/drait-crest.png';

const STARTERS = ['What programmes are offered?', 'Placement statistics', 'Hostel facilities', 'Upcoming events', 'How do I reach the campus?'];

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Hi! I’m the Dr. AIT campus assistant. Ask me about programmes, admissions, placements, hostels, events or contacts.',
    },
  ]);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const go = useGo();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, busy]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const send = async (text) => {
    const q = text.trim();
    if (!q || busy) return;
    const next = [...messages, { role: 'user', text: q }];
    setMessages(next);
    setInput('');
    setBusy(true);
    const answer = await ask(q, next);
    // brief, natural typing delay for the local engine
    await new Promise((r) => setTimeout(r, isAIConnected ? 0 : 350));
    setMessages((m) => [...m, { role: 'assistant', ...answer }]);
    setBusy(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="campus-assistant"
        aria-label="Ask Dr. AIT — campus assistant"
        className={`fixed bottom-4 right-4 z-[55] inline-flex items-center gap-2 rounded-full bg-navy-900 p-2 sm:py-3 sm:pl-3 sm:pr-5 text-sm font-semibold text-white shadow-lift transition-all duration-300 hover:bg-navy-700 sm:bottom-6 sm:right-6 ${
          open ? 'pointer-events-none translate-y-4 opacity-0' : ''
        }`}
      >
        <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold-500 text-navy-950">
          <Sparkles className="h-4 w-4" aria-hidden />
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-navy-900 bg-emerald-400" />
        </span>
        <span className="hidden sm:inline">Ask Dr. AIT</span>
      </button>

      <section
        id="campus-assistant"
        role="dialog"
        aria-label="Dr. AIT campus assistant"
        aria-hidden={!open}
        className={`fixed inset-x-3 bottom-3 z-[66] flex max-h-[min(640px,calc(100svh-24px))] flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-2xl transition-all duration-300 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[400px] ${
          open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
        }`}
      >
        <header className="flex items-center gap-3 bg-navy-900 px-5 py-4 text-white">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white p-1.5">
            <img src={crest} alt="" className="h-full w-full object-contain" />
          </span>
          <div className="flex-1">
            <p className="font-semibold">Dr. AIT Assistant</p>
            <p className="text-xs text-navy-200">{isAIConnected ? 'AI answers grounded in official information' : 'Answers from official Dr. AIT information'}</p>
          </div>
          <button type="button" onClick={() => setOpen(false)} className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/10" aria-label="Close assistant">
            <X className="h-5 w-5" aria-hidden />
          </button>
        </header>

        <div ref={scrollRef} data-lenis-prevent className="flex-1 space-y-4 overflow-y-auto bg-canvas px-4 py-5" aria-live="polite">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[88%] animate-fadeUp rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  m.role === 'user' ? 'rounded-br-md bg-navy-900 text-white' : 'rounded-bl-md border border-line bg-white text-ink'
                }`}
              >
                <p className="whitespace-pre-line">{m.text}</p>
                {m.links?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {m.links.map((l) => (
                      <button
                        key={l.label}
                        type="button"
                        onClick={() => {
                          go(l);
                          if (l.to) setOpen(false);
                        }}
                        className="inline-flex items-center gap-1 rounded-full border border-navy-100 bg-navy-50 px-2.5 py-1 text-xs font-medium text-navy-800 hover:border-navy-300"
                      >
                        {l.label}
                        {l.href ? <ArrowUpRight className="h-3 w-3" aria-hidden /> : <ArrowRight className="h-3 w-3" aria-hidden />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {busy && (
            <div className="flex gap-1 px-2" aria-label="Assistant is typing">
              {[0, 1, 2].map((d) => (
                <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-navy-300" style={{ animationDelay: `${d * 120}ms` }} />
              ))}
            </div>
          )}
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {STARTERS.map((s) => (
                <button key={s} type="button" onClick={() => send(s)} className="chip chip-off">{s}</button>
              ))}
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 border-t border-line bg-white p-3"
        >
          <label htmlFor="assistant-input" className="sr-only">Your question</label>
          <input
            id="assistant-input"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about admissions, hostels…"
            className="field flex-1 rounded-full"
            autoComplete="off"
          />
          <button type="submit" disabled={!input.trim() || busy} className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-950 transition hover:bg-gold-300 disabled:opacity-40" aria-label="Send">
            <Send className="h-4 w-4" aria-hidden />
          </button>
        </form>
      </section>
    </>
  );
}
