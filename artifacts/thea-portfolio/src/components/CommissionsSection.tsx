import { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import heroImg from '@/assets/images/artwork-3.png';

const features1 = [
  'High-quality giclée print',
  'Signed and numbered',
  'Certificate of authenticity',
  'Worldwide shipping',
  '30-day guarantee',
];

const features2 = [
  'Priority production',
  'Artist consultation included',
  'High-quality giclée print',
  'Signed and numbered',
  'Certificate of authenticity',
];

const features3 = [
  'Any size and medium',
  'Full creative collaboration',
  'Dedicated studio sessions',
  'Installation support',
  'Lifetime documentation',
];

const TIERS = [
  { value: 'print-60',   label: '60×60 cm Fine Art Print — $450' },
  { value: 'canvas-100', label: '100×100 cm Canvas Print — $850' },
  { value: 'custom',     label: 'Custom Commission — Price on request' },
];

function FeatureList({ items, highlight = false }: { items: string[]; highlight?: boolean }) {
  return (
    <div className="flex flex-col mt-4">
      {items.map((item, i) => (
        <div key={i}>
          <hr className="border-white/10" />
          <span className={`block py-3 font-light text-[14px] leading-[1.5] ${highlight && i < 2 ? 'text-[#f5f0eb]' : 'text-[#8a8580]'}`}>
            {item}
          </span>
        </div>
      ))}
      <hr className="border-white/10" />
    </div>
  );
}

type FormState = 'idle' | 'loading' | 'success' | 'error';

function InquiryModal({
  tier,
  onClose,
}: {
  tier: string;
  onClose: () => void;
}) {
  const [name, setName]           = useState('');
  const [email, setEmail]         = useState('');
  const [selectedTier, setTier]   = useState(tier);
  const [message, setMessage]     = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [visible, setVisible]     = useState(false);
  const firstInputRef             = useRef<HTMLInputElement>(null);

  /* Animate in */
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    firstInputRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  /* Keyboard close */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  function handleClose() {
    setVisible(false);
    setTimeout(onClose, 350);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState('loading');
    try {
      const res = await fetch('https://formspree.io/f/xvznowkk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, tier: selectedTier, message }),
      });
      setFormState(res.ok ? 'success' : 'error');
    } catch {
      setFormState('error');
    }
  }

  const inputClass =
    'w-full bg-[#0a0a0a] border border-white/12 text-[#f5f0eb] placeholder-[#3a3a3a] px-5 py-4 text-[14px] font-light focus:outline-none focus:border-[#c9b99a] transition-colors duration-200';

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8"
      style={{
        background: `rgba(8,8,8,${visible ? 0.88 : 0})`,
        backdropFilter: `blur(${visible ? 8 : 0}px)`,
        transition: 'background 350ms ease, backdrop-filter 350ms ease',
      }}
      onClick={handleClose}
    >
      {/* Panel */}
      <div
        className="relative w-full max-w-lg bg-[#111111] border border-white/10 shadow-2xl overflow-y-auto max-h-[90vh]"
        style={{
          opacity:    visible ? 1 : 0,
          transform:  visible ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.97)',
          transition: 'opacity 350ms cubic-bezier(0.22,1,0.36,1), transform 350ms cubic-bezier(0.22,1,0.36,1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-white/8">
          <div>
            <span className="text-[#8a8580] text-[10px] tracking-[0.3em] uppercase block mb-1">Commission Inquiry</span>
            <h3 className="text-[#f5f0eb] font-bold text-[20px]">Send Your Idea</h3>
          </div>
          <button
            onClick={handleClose}
            data-testid="button-modal-close"
            className="w-9 h-9 flex items-center justify-center text-[#8a8580] hover:text-[#f5f0eb] transition-colors border border-white/10 hover:border-white/30 text-[16px]"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-8">
          {formState === 'success' ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 border border-[#c9b99a]/40 rounded-full flex items-center justify-center mx-auto mb-6 text-[#c9b99a] text-[22px]">✓</div>
              <h4 className="text-[#f5f0eb] font-bold text-[20px] mb-3">Inquiry Sent</h4>
              <p className="text-[#8a8580] font-light text-[14px] leading-relaxed mb-8">
                Thank you. Thea will be in touch within 48 hours.
              </p>
              <button
                onClick={handleClose}
                className="border border-[#c9b99a]/30 text-[#c9b99a] px-8 py-3 text-[12px] tracking-[0.2em] uppercase font-medium hover:bg-[#c9b99a] hover:text-[#0d0d0d] transition-all duration-300"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Tier */}
              <div>
                <label className="text-[#8a8580] text-[10px] tracking-[0.25em] uppercase block mb-2">Commission Type</label>
                <select
                  value={selectedTier}
                  onChange={(e) => setTier(e.target.value)}
                  required
                  data-testid="select-tier"
                  className={`${inputClass} appearance-none`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238a8580' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 20px center',
                  }}
                >
                  <option value="" disabled>Select a type…</option>
                  {TIERS.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#8a8580] text-[10px] tracking-[0.25em] uppercase block mb-2">Name</label>
                  <input
                    ref={firstInputRef}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    data-testid="input-name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-[#8a8580] text-[10px] tracking-[0.25em] uppercase block mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    data-testid="input-email"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-[#8a8580] text-[10px] tracking-[0.25em] uppercase block mb-2">Your Idea</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe what you have in mind — size, theme, where it will hang, any references…"
                  required
                  rows={4}
                  data-testid="textarea-message"
                  className={`${inputClass} resize-none`}
                />
              </div>

              {formState === 'error' && (
                <p className="text-red-400 text-[13px] text-center -mt-1">
                  Something went wrong. Please try again.
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={formState === 'loading'}
                data-testid="button-submit-inquiry"
                className="mt-1 bg-[#c9b99a] text-[#0d0d0d] font-semibold text-[13px] tracking-[0.2em] uppercase py-4 hover:bg-[#f5f0eb] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {formState === 'loading' ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending…
                  </>
                ) : 'Send Inquiry →'}
              </button>

              <p className="text-center text-[#3a3a3a] text-[11px]">
                No commitment. Thea replies within 48 hours.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CommissionsSection() {
  const headerRef = useScrollReveal();
  const imgRef    = useScrollReveal(0.05);
  const card1Ref  = useScrollReveal(0.1);
  const card2Ref  = useScrollReveal(0.1);
  const card3Ref  = useScrollReveal(0.1);

  const [openTier, setOpenTier] = useState<string | null>(null);

  return (
    <section id="commissions" className="w-full bg-[#0d0d0d] pb-[140px]">

      {/* Hero Image */}
      <div
        ref={imgRef as any}
        className="w-full h-[400px] overflow-hidden mb-20 relative opacity-0 [&.revealed]:opacity-100 transition-opacity duration-1000"
      >
        <img
          src={heroImg}
          alt="Studio"
          className="w-full h-full object-cover scale-[1.1] [.revealed_&]:scale-100 transition-transform duration-[2000ms] ease-out"
        />
      </div>

      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <h2
          ref={headerRef as any}
          className="font-bold text-[clamp(28px,4vw,48px)] text-[#f5f0eb] text-center mb-16 clip-reveal mx-auto max-w-2xl"
        >
          Commissioned Artwork, Authored With Intention
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">

          {/* Card 1 */}
          <div
            ref={card1Ref as any}
            className="bg-[#141414] border border-white/10 p-8 flex flex-col transition-all duration-700 opacity-0 translate-y-[50px] [&.revealed]:opacity-100 [&.revealed]:translate-y-0 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] cursor-pointer"
          >
            <h3 className="font-bold text-[clamp(20px,2.5vw,28px)] text-[#f5f0eb] mb-4">60×60 cm Fine Art Print</h3>
            <div className="font-black text-[clamp(36px,5vw,56px)] text-[#f5f0eb] mb-2">$450</div>
            <FeatureList items={features1} />
            <button
              data-testid="button-commission-basic"
              onClick={() => setOpenTier('print-60')}
              className="mt-8 border border-white/20 text-[#f5f0eb] font-semibold text-[13px] tracking-widest uppercase py-4 px-6 hover:bg-[#f5f0eb] hover:text-[#0d0d0d] transition-all duration-300 flex items-center justify-center gap-3 group/btn"
            >
              <span className="transform -translate-x-2 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100 transition-all duration-300">→</span>
              Commission Now
            </button>
          </div>

          {/* Card 2 (Featured) */}
          <div
            ref={card2Ref as any}
            className="bg-[#141414] border-2 border-[#c9b99a] p-8 flex flex-col transition-all duration-700 delay-150 opacity-0 translate-y-[50px] scale-95 [&.revealed]:opacity-100 [&.revealed]:translate-y-0 [&.revealed]:scale-[1.02] hover:-translate-y-2 hover:shadow-[0_24px_80px_rgba(201,185,154,0.15)] cursor-pointer relative z-10"
          >
            <div className="absolute -top-3 left-8 bg-[#c9b99a] text-[#0d0d0d] font-bold text-[10px] tracking-widest px-3 py-1 uppercase">
              ★ Most Popular
            </div>
            <h3 className="font-bold text-[clamp(20px,2.5vw,28px)] text-[#f5f0eb] mb-4 mt-2">100×100 cm Canvas Print</h3>
            <div className="font-black text-[clamp(36px,5vw,56px)] text-[#c9b99a] mb-2">$850</div>
            <FeatureList items={features2} highlight />
            <button
              data-testid="button-commission-featured"
              onClick={() => setOpenTier('canvas-100')}
              className="mt-8 bg-[#c9b99a] text-[#0d0d0d] font-semibold text-[13px] tracking-widest uppercase py-4 px-6 hover:bg-[#f5f0eb] transition-all duration-300 flex items-center justify-center gap-3 group/btn"
            >
              <span className="transform -translate-x-2 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100 transition-all duration-300">→</span>
              Commission Now
            </button>
          </div>

          {/* Card 3 */}
          <div
            ref={card3Ref as any}
            className="bg-[#141414] border border-white/10 p-8 flex flex-col transition-all duration-700 delay-300 opacity-0 translate-y-[50px] [&.revealed]:opacity-100 [&.revealed]:translate-y-0 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] cursor-pointer"
          >
            <h3 className="font-bold text-[clamp(20px,2.5vw,28px)] text-[#f5f0eb] mb-4">Custom Commission</h3>
            <div className="font-black text-[clamp(24px,3.5vw,40px)] text-[#f5f0eb] mb-2 leading-tight">Price on request</div>
            <FeatureList items={features3} />
            <button
              data-testid="button-commission-custom"
              onClick={() => setOpenTier('custom')}
              className="mt-8 border border-white/20 text-[#f5f0eb] font-semibold text-[13px] tracking-widest uppercase py-4 px-6 hover:bg-[#f5f0eb] hover:text-[#0d0d0d] transition-all duration-300 flex items-center justify-center gap-3 group/btn"
            >
              <span className="transform -translate-x-2 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100 transition-all duration-300">→</span>
              Get In Touch
            </button>
          </div>

        </div>
      </div>

      {/* Modal */}
      {openTier !== null && (
        <InquiryModal tier={openTier} onClose={() => setOpenTier(null)} />
      )}
    </section>
  );
}
