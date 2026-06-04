import { useState, useRef } from 'react';
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
  { value: 'print-60', label: '60×60 cm Fine Art Print — $450' },
  { value: 'canvas-100', label: '100×100 cm Canvas Print — $850' },
  { value: 'custom', label: 'Custom Commission — Price on request' },
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

export default function CommissionsSection() {
  const headerRef = useScrollReveal();
  const imgRef = useScrollReveal(0.05);
  const card1Ref = useScrollReveal(0.1);
  const card2Ref = useScrollReveal(0.1);
  const card3Ref = useScrollReveal(0.1);
  const formRef = useScrollReveal(0.1);

  const formElRef = useRef<HTMLDivElement>(null);

  const [selectedTier, setSelectedTier] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');

  function selectTier(tier: string) {
    setSelectedTier(tier);
    setTimeout(() => {
      formElRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !selectedTier || !message) return;

    setFormState('loading');

    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, tier: selectedTier, message }),
      });

      if (res.ok) {
        setFormState('success');
        setName('');
        setEmail('');
        setMessage('');
        setSelectedTier('');
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  }

  const inputClass =
    'w-full bg-[#0d0d0d] border border-white/15 text-[#f5f0eb] placeholder-[#4a4a4a] px-5 py-4 text-[14px] font-light focus:outline-none focus:border-[#c9b99a] transition-colors duration-200';

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

        {/* Pricing cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center mb-24">

          {/* Card 1 */}
          <div
            ref={card1Ref as any}
            className="bg-[#141414] border border-white/10 p-8 flex flex-col transition-all duration-700 opacity-0 translate-y-[50px] [&.revealed]:opacity-100 [&.revealed]:translate-y-0 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] group cursor-pointer"
          >
            <h3 className="font-bold text-[clamp(20px,2.5vw,28px)] text-[#f5f0eb] mb-4">60×60 cm Fine Art Print</h3>
            <div className="font-black text-[clamp(36px,5vw,56px)] text-[#f5f0eb] mb-2">$450</div>
            <FeatureList items={features1} />
            <button
              data-testid="button-commission-basic"
              onClick={() => selectTier('print-60')}
              className="mt-8 border border-white/20 text-[#f5f0eb] font-semibold text-[13px] tracking-widest uppercase py-4 px-6 hover:bg-[#f5f0eb] hover:text-[#0d0d0d] transition-all duration-300 flex items-center justify-center gap-3 group/btn"
            >
              <span className="transform -translate-x-2 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100 transition-all duration-300">→</span>
              Commission Now
            </button>
          </div>

          {/* Card 2 (Featured) */}
          <div
            ref={card2Ref as any}
            className="bg-[#141414] border-2 border-[#c9b99a] p-8 flex flex-col transition-all duration-700 delay-150 opacity-0 translate-y-[50px] scale-95 [&.revealed]:opacity-100 [&.revealed]:translate-y-0 [&.revealed]:scale-[1.02] hover:-translate-y-2 hover:shadow-[0_24px_80px_rgba(201,185,154,0.15)] group cursor-pointer relative z-10"
          >
            <div className="absolute -top-3 left-8 bg-[#c9b99a] text-[#0d0d0d] font-bold text-[10px] tracking-widest px-3 py-1 uppercase">
              ★ Most Popular
            </div>
            <h3 className="font-bold text-[clamp(20px,2.5vw,28px)] text-[#f5f0eb] mb-4 mt-2">100×100 cm Canvas Print</h3>
            <div className="font-black text-[clamp(36px,5vw,56px)] text-[#c9b99a] mb-2">$850</div>
            <FeatureList items={features2} highlight />
            <button
              data-testid="button-commission-featured"
              onClick={() => selectTier('canvas-100')}
              className="mt-8 bg-[#c9b99a] text-[#0d0d0d] font-semibold text-[13px] tracking-widest uppercase py-4 px-6 hover:bg-[#f5f0eb] transition-all duration-300 flex items-center justify-center gap-3 group/btn"
            >
              <span className="transform -translate-x-2 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100 transition-all duration-300">→</span>
              Commission Now
            </button>
          </div>

          {/* Card 3 */}
          <div
            ref={card3Ref as any}
            className="bg-[#141414] border border-white/10 p-8 flex flex-col transition-all duration-700 delay-300 opacity-0 translate-y-[50px] [&.revealed]:opacity-100 [&.revealed]:translate-y-0 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] group cursor-pointer"
          >
            <h3 className="font-bold text-[clamp(20px,2.5vw,28px)] text-[#f5f0eb] mb-4">Custom Commission</h3>
            <div className="font-black text-[clamp(24px,3.5vw,40px)] text-[#f5f0eb] mb-2 leading-tight">Price on request</div>
            <FeatureList items={features3} />
            <button
              data-testid="button-commission-custom"
              onClick={() => selectTier('custom')}
              className="mt-8 border border-white/20 text-[#f5f0eb] font-semibold text-[13px] tracking-widest uppercase py-4 px-6 hover:bg-[#f5f0eb] hover:text-[#0d0d0d] transition-all duration-300 flex items-center justify-center gap-3 group/btn"
            >
              <span className="transform -translate-x-2 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100 transition-all duration-300">→</span>
              Get In Touch
            </button>
          </div>

        </div>

        {/* Inquiry Form */}
        <div ref={formElRef}>
          <div
            ref={formRef as any}
            className="max-w-2xl mx-auto opacity-0 translate-y-[40px] [&.revealed]:opacity-100 [&.revealed]:translate-y-0 transition-all duration-700"
          >
            {/* Form header */}
            <div className="text-center mb-10">
              <span className="text-[#8a8580] text-[11px] tracking-[0.3em] uppercase block mb-4">Inquire</span>
              <h3 className="font-bold text-[clamp(24px,3vw,36px)] text-[#f5f0eb]">Send an Inquiry</h3>
              <p className="text-[#8a8580] font-light text-[14px] mt-3 leading-relaxed">
                Describe your idea. Thea responds within 48 hours.
              </p>
            </div>

            {formState === 'success' ? (
              /* Success state */
              <div className="border border-[#c9b99a]/30 bg-[#c9b99a]/5 p-12 text-center">
                <div className="text-[#c9b99a] text-[40px] mb-4">✓</div>
                <h4 className="text-[#f5f0eb] font-bold text-[20px] mb-3">Inquiry Sent</h4>
                <p className="text-[#8a8580] font-light text-[14px] leading-relaxed">
                  Thank you. Thea will be in touch within 48 hours.
                </p>
                <button
                  onClick={() => setFormState('idle')}
                  className="mt-8 text-[#c9b99a] text-[12px] tracking-[0.2em] uppercase underline underline-offset-4 hover:text-[#f5f0eb] transition-colors"
                >
                  Send another
                </button>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                {/* Tier selector */}
                <div>
                  <label className="text-[#8a8580] text-[11px] tracking-[0.2em] uppercase block mb-2">
                    Commission Type
                  </label>
                  <select
                    value={selectedTier}
                    onChange={(e) => setSelectedTier(e.target.value)}
                    required
                    data-testid="select-tier"
                    className={`${inputClass} appearance-none`}
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238a8580' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 20px center' }}
                  >
                    <option value="" disabled>Select a commission type…</option>
                    {TIERS.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>

                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#8a8580] text-[11px] tracking-[0.2em] uppercase block mb-2">Name</label>
                    <input
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
                    <label className="text-[#8a8580] text-[11px] tracking-[0.2em] uppercase block mb-2">Email</label>
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
                  <label className="text-[#8a8580] text-[11px] tracking-[0.2em] uppercase block mb-2">
                    Your Idea
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe what you have in mind — size, theme, where it will live, any references…"
                    required
                    rows={5}
                    data-testid="textarea-message"
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Error message */}
                {formState === 'error' && (
                  <p className="text-red-400 text-[13px] text-center">
                    Something went wrong. Please try again or email directly.
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  data-testid="button-submit-inquiry"
                  className="mt-2 bg-[#c9b99a] text-[#0d0d0d] font-semibold text-[13px] tracking-[0.2em] uppercase py-5 px-8 hover:bg-[#f5f0eb] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {formState === 'loading' ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      <span>Sending…</span>
                    </>
                  ) : (
                    <span>Send Inquiry →</span>
                  )}
                </button>

                <p className="text-center text-[#4a4a4a] text-[11px] leading-relaxed mt-1">
                  No commitment required. Thea replies within 48 hours.
                </p>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
