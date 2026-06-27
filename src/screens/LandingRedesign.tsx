import { useState, useRef, useEffect } from 'react';
import type { CSSProperties } from 'react';
import { useTheme } from '../components/SiteShell';

// ─── Data ────────────────────────────────────────────────────────────────────
const navLinks = [
  { label: 'app',     href: 'https://thenews.com.br/app', external: true },
  { label: 'podcast', href: 'https://open.spotify.com/show/5cYtKjFwlRCSZKyV6ZC8Wq', external: true },
  { label: 'marcas',  href: '/marcas' },
  { label: 'dúvidas', href: '#faq' },
];

const emailItems = [
  { tag: 'brasil',     title: 'congresso aprova nova regra fiscal depois de madrugada de negociação',   body: 'o texto cria um gatilho automático pra conter gastos quando o orçamento sair do controle. oposição já avisou que vai questionar no STF.' },
  { tag: 'mercado',    title: 'real sobe depois que o fed sinalizou corte de juros nos EUA',             body: 'a moeda americana caiu pro menor nível em quatro meses. bom pra quem importa, ruim pra quem exporta.' },
  { tag: 'tecnologia', title: 'startups brasileiras captam recorde de investimento estrangeiro',          body: 'o trimestre fechou com mais dinheiro de fora do que em qualquer outro período da última década.' },
];

const stats = [
  { num: '3M+',   label: 'leitores' },
  { num: '5min',  label: 'por edição' },
  { num: '06:06', label: 'todo dia' },
];

const features = [
  {
    title: 'direto ao ponto',
    desc: 'sem introdução longa, sem clickbait. você lê no café da manhã e já sai sabendo o que aconteceu.',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  },
  {
    title: 'sem viés',
    desc: 'cobrimos todos os lados e separamos fato de opinião com clareza. você decide o que pensar.',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
  {
    title: 'cria um hábito',
    desc: 'seu streak cresce a cada edição lida. indique amigos e ganhe brindes exclusivos do the news.',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  },
];

// Testimonial images from the original CDN (indices 2-9)
const testimonialNums = [2, 3, 4, 5, 6, 7, 8, 9];

const faqItems = [
  { q: 'o que eu vou receber ao me inscrever?',              a: 'de segunda a domingo, um resumo direto e imparcial das principais notícias do Brasil e do mundo. em 5 minutos, comece o dia bem informado.' },
  { q: 'a newsletter é realmente gratuita?',                 a: 'sim. 100% grátis, sem cartão de crédito, sem pegadinha. monetizamos com parcerias com marcas — e mesmo essas costumam agradar o leitor.' },
  { q: 'o the news tem viés político?',                      a: 'absolutamente não. somos imparciais. nosso inimigo não é um lado ou outro — é a ignorância.' },
  { q: 'vou receber spam ou propagandas indesejadas?',       a: 'não. só a edição diária. o botão de cancelar fica sempre visível no final de cada email, sem letra miúda.' },
  { q: 'como garantir que o email não vai pra spam?',        a: "arraste a mensagem pra aba 'Principal' no seu provedor de email. isso ensina o algoritmo a sempre entregar na caixa certa." },
  { q: 'posso indicar pra amigos?',                          a: 'aliás, deve. cada indicação te dá pontos pro programa de recompensas — você pode ganhar brindes exclusivos do the news.' },
  { q: 'por que o the news é diferente das outras?',         a: 'se chegou até aqui, já temos sua atenção. assine e veja você mesmo.' },
];

// ─── Global styles ────────────────────────────────────────────────────────────
const STYLES = `
  :root {
    --c-yellow:       #FFCD08;
    --c-orange:       #FF8A47;
    --c-grad:         linear-gradient(135deg, #FFCD08 0%, #FF8A47 100%);
    --c-ink:          #111111;
    --c-ink-soft:     #6B6869;
    --c-paper:        #FFFFFF;
    --c-warm:         #F7F6F3;
    --c-line:         #E9E9E7;
    --c-line-hard:    #D8D7D4;
    --c-header-bg:    rgba(255,255,255,0.88);
    --c-badge-bg:     #FFF8E1;
    --c-badge-border: #FFE57A;
    --c-badge-text:   #7A5500;
    --c-stats-bg:     #111111;
    --c-stats-label:  #AAA9A7;
    --c-icon-bg:      #FFF8E1;
    --c-email-chrome: #111111;
    --c-email-body:   #FAFAF8;
    --c-tag-color:    #FF8A47;
  }

  [data-theme="dark"] {
    --c-ink:          #F0EFED;
    --c-ink-soft:     #9A9896;
    --c-paper:        #141312;
    --c-warm:         #1C1B19;
    --c-line:         #2C2B29;
    --c-line-hard:    #3C3B39;
    --c-header-bg:    rgba(20,19,18,0.88);
    --c-badge-bg:     #2A2100;
    --c-badge-border: #4A3A00;
    --c-badge-text:   #FFCD08;
    --c-stats-bg:     #0A0908;
    --c-stats-label:  #6B6869;
    --c-icon-bg:      #2A2100;
    --c-email-chrome: #0A0908;
    --c-email-body:   #1C1B19;
    --c-tag-color:    #FFCD08;
  }

  /* ── High contrast (light base) ── */
  [data-hc="1"] {
    --c-ink:          #000000;
    --c-ink-soft:     #000000;
    --c-paper:        #FFFFFF;
    --c-warm:         #FFFFFF;
    --c-line:         #000000;
    --c-line-hard:    #000000;
    --c-header-bg:    #FFFFFF;
    --c-badge-bg:     #FFFF00;
    --c-badge-border: #000000;
    --c-badge-text:   #000000;
    --c-stats-bg:     #000000;
    --c-stats-label:  #FFFFFF;
    --c-icon-bg:      #FFFF00;
    --c-email-chrome: #000000;
    --c-email-body:   #FFFFFF;
    --c-tag-color:    #000000;
    --c-grad:         #000000;
  }
  /* High contrast + dark */
  [data-theme="dark"][data-hc="1"] {
    --c-ink:          #FFFFFF;
    --c-ink-soft:     #FFFFFF;
    --c-paper:        #000000;
    --c-warm:         #000000;
    --c-line:         #FFFFFF;
    --c-line-hard:    #FFFFFF;
    --c-header-bg:    #000000;
    --c-badge-bg:     #000000;
    --c-badge-border: #FFFFFF;
    --c-badge-text:   #FFFF00;
    --c-stats-bg:     #000000;
    --c-stats-label:  #FFFFFF;
    --c-icon-bg:      #000000;
    --c-email-chrome: #000000;
    --c-email-body:   #000000;
    --c-tag-color:    #FFFF00;
    --c-grad:         #FFFFFF;
  }

  /* Strip gradients in HC mode (gradient text falls back to solid) */
  [data-hc="1"] .tn-btn,
  [data-hc="1"] .tn-btn:hover {
    background: #000000 !important;
    color: #FFFF00 !important;
    box-shadow: none !important;
    filter: none !important;
    border: 2px solid #000000 !important;
  }
  [data-theme="dark"][data-hc="1"] .tn-btn,
  [data-theme="dark"][data-hc="1"] .tn-btn:hover {
    background: #FFFFFF !important;
    color: #000000 !important;
    border: 2px solid #FFFFFF !important;
  }
  /* Force gradient text spans to be solid in HC */
  [data-hc="1"] [style*="WebkitTextFillColor"],
  [data-hc="1"] [style*="-webkit-text-fill-color"] {
    -webkit-text-fill-color: currentColor !important;
    background: none !important;
  }

  /* Focus ring in HC */
  [data-hc="1"] *:focus-visible {
    outline: 3px solid #000000 !important;
    outline-offset: 2px !important;
  }
  [data-theme="dark"][data-hc="1"] *:focus-visible {
    outline: 3px solid #FFFF00 !important;
  }

  /* HC toggle button active state */
  .tn-hc-btn-active {
    background: #000000 !important;
    color: #FFFF00 !important;
    border-color: #000000 !important;
  }
  [data-theme="dark"] .tn-hc-btn-active {
    background: #FFFFFF !important;
    color: #000000 !important;
    border-color: #FFFFFF !important;
  }

  /* ── Keyframes ── */
  @keyframes tn-slide-up {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes tn-fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes tn-pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.3; }
  }

  /* ── Animation utilities ── */
  .tn-anim {
    opacity: 0;
    display: block;
    animation: tn-slide-up 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  .tn-fade {
    opacity: 0;
    animation: tn-fade-in 0.5s ease forwards;
  }
  @media (prefers-reduced-motion: reduce) {
    .tn-anim, .tn-fade { animation: none !important; opacity: 1 !important; }
  }

  /* ── Primary button ── */
  .tn-btn {
    background: var(--c-grad);
    color: #111;
    border: none;
    border-radius: 999px;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.18s cubic-bezier(0.22,1,0.36,1),
                box-shadow 0.18s ease,
                filter 0.15s ease;
    font-family: inherit;
  }
  .tn-btn:hover {
    transform: scale(1.04) translateY(-2px);
    box-shadow: 0 10px 28px rgba(255, 138, 71, 0.45);
    filter: brightness(1.06);
  }
  .tn-btn:active {
    transform: scale(0.97) translateY(0);
    box-shadow: none;
  }
  .tn-btn:disabled {
    cursor: default;
    opacity: 0.65;
    transform: none;
    box-shadow: none;
  }
  .tn-btn-success {
    background: #16a34a !important;
    color: #fff !important;
    box-shadow: none !important;
    transform: none !important;
    filter: none !important;
  }

  /* ── Dark-mode toggle ── */
  .tn-dark-btn {
    border: 1px solid var(--c-line);
    background: var(--c-warm);
    color: var(--c-ink);
    border-radius: 999px;
    padding: 7px 14px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: background 0.2s, border-color 0.2s;
    font-family: inherit;
  }
  .tn-dark-btn:hover { border-color: var(--c-line-hard); }

  /* ── Nav links ── */
  .tn-nav-link {
    font-size: 15px;
    color: var(--c-ink-soft);
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 4px;
    text-decoration: none;
    transition: color 0.15s ease;
  }
  .tn-nav-link:hover { color: var(--c-orange); }

  /* ── FAQ ── */
  .tn-faq-btn {
    width: 100%;
    background: none;
    border: none;
    text-align: left;
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    color: var(--c-ink);
    transition: color 0.15s;
    font-family: inherit;
  }
  .tn-faq-btn:hover { color: var(--c-orange); }

  /* ── Testimonials marquee ── */
  @keyframes tn-marquee-l {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes tn-marquee-r {
    0%   { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }
  .tn-marquee-track-l {
    display: flex;
    width: max-content;
    animation: tn-marquee-l 48s linear infinite;
  }
  .tn-marquee-track-r {
    display: flex;
    width: max-content;
    animation: tn-marquee-r 52s linear infinite;
  }
  .tn-marquee-track-l:hover,
  .tn-marquee-track-r:hover {
    animation-play-state: paused;
  }
  .tn-marquee-wrap {
    overflow: hidden;
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
    mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
  }
  @media (prefers-reduced-motion: reduce) {
    .tn-marquee-track-l, .tn-marquee-track-r { animation: none !important; }
  }

  /* ── Typewriter cursor ── */
  @keyframes tn-blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
  .tn-cursor {
    display: inline-block;
    width: 3px;
    margin-left: 4px;
    vertical-align: baseline;
    border-radius: 2px;
    background: #FF8A47;
    animation: tn-blink 1s step-end infinite;
  }
  [data-hc="1"] .tn-cursor { background: #000; }
  [data-theme="dark"][data-hc="1"] .tn-cursor { background: #fff; }
  @media (prefers-reduced-motion: reduce) {
    .tn-cursor { animation: none !important; opacity: 1 !important; }
  }

  /* ── Footer links ── */
  .tn-footer-link {
    color: var(--c-ink-soft);
    text-decoration: none;
    transition: color 0.15s;
  }
  .tn-footer-link:hover { color: var(--c-ink); }

  /* ── Mobile ─────────────────────────────────────── */
  @media (max-width: 1024px) {
    .tn-desktop-nav { display: none !important; }
    .tn-desktop-cta { display: none !important; }
    .tn-hamburger   { display: flex !important; }
  }
  @media (min-width: 1025px) {
    .tn-hamburger { display: none !important; }
  }

  /* Tablet (≤768px) */
  @media (max-width: 768px) {
    .tn-stats-grid    { grid-template-columns: repeat(3,1fr) !important; }
    .tn-features-grid { grid-template-columns: 1fr 1fr !important; }
    .tn-footer-row    { flex-wrap: wrap; gap: 12px !important; }
  }

  /* Mobile (≤600px) */
  @media (max-width: 600px) {
    .tn-wrap           { padding: 0 16px !important; }
    .tn-hero-section   { padding-top: 100px !important; padding-bottom: 56px !important; }
    .tn-hero-h1        { font-size: clamp(34px,10vw,52px) !important; }
    .tn-hero-sub       { font-size: 16px !important; }
    .tn-signup-form    { flex-direction: column !important; }
    .tn-signup-form input  { width: 100% !important; flex: none !important; }
    .tn-signup-form button { width: 100% !important; flex: none !important; }
    .tn-stats-grid     { grid-template-columns: 1fr !important; gap: 32px !important; }
    .tn-features-grid  { grid-template-columns: 1fr !important; }
    .tn-email-body     { padding: 20px 18px !important; }
    .tn-preview-card   { border-radius: 16px !important; margin: 0 8px !important; }
    .tn-section        { padding: 48px 0 !important; }
    .tn-section-title  { font-size: clamp(22px,6vw,28px) !important; }
    .tn-footer-row     { flex-direction: column !important; align-items: center !important; text-align: center !important; gap: 14px !important; }
    .tn-cta-section    { padding: 64px 0 !important; }
  }
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const font = "'Helvetica Now Display', -apple-system, BlinkMacSystemFont, sans-serif";

const gradText: CSSProperties = {
  background: 'linear-gradient(135deg, #FFCD08 0%, #FF8A47 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

// ─── Typewriter ───────────────────────────────────────────────────────────────
const TW_WORDS = [
  'mais inteligente',
  'melhor informado',
  'mais conectado',
  'mais atualizado',
  'mais preparado',
];

type TwPhase = 'init' | 'typing' | 'holding' | 'deleting';

function TypewriterWord() {
  const [wordIdx,   setWordIdx]   = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [phase,     setPhase]     = useState<TwPhase>('init');

  useEffect(() => {
    const word = TW_WORDS[wordIdx];

    if (phase === 'init') {
      // Wait for the hero slide-up animation to finish before typing
      const t = setTimeout(() => setPhase('typing'), 1100);
      return () => clearTimeout(t);
    }

    if (phase === 'typing') {
      if (displayed.length < word.length) {
        // Vary speed slightly for a natural feel
        const delay = displayed.length === 0 ? 120 : 55 + Math.random() * 30;
        const t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), delay);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase('holding'), 2200);
      return () => clearTimeout(t);
    }

    if (phase === 'holding') {
      const t = setTimeout(() => setPhase('deleting'), 400);
      return () => clearTimeout(t);
    }

    if (phase === 'deleting') {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(d => d.slice(0, -1)), 30);
        return () => clearTimeout(t);
      }
      setWordIdx(i => (i + 1) % TW_WORDS.length);
      setPhase('typing');
    }
  }, [displayed, phase, wordIdx]);

  return (
    <span style={{
      background: 'linear-gradient(135deg, #FFCD08 0%, #FF8A47 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      display: 'inline-block',
    }}>
      {displayed || ' ' /* nbsp keeps line height when empty */}
      <span className="tn-cursor" aria-hidden="true" style={{ height: '0.85em' }} />
    </span>
  );
}

// ─── Form ─────────────────────────────────────────────────────────────────────
type FormState = 'idle' | 'loading' | 'success' | 'error';

function SignupForm({ align = 'center' }: { align?: 'center' | 'left' }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<FormState>('idle');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setState('error'); return; }
    setState('loading');
    setTimeout(() => { setState('success'); setEmail(''); }, 900);
  }

  const isCenter = align === 'center';

  return (
    <div>
      <form
        onSubmit={submit}
        className="tn-signup-form"
        style={{ display: 'flex', gap: 8, flexWrap: 'wrap', maxWidth: 480, margin: isCenter ? '0 auto' : undefined }}
      >
        <input
          type="email"
          placeholder="coloque seu email"
          value={email}
          onChange={e => { setEmail(e.target.value); if (state === 'error') setState('idle'); }}
          disabled={state === 'loading' || state === 'success'}
          aria-label="endereço de email"
          required
          style={{
            flex: '1 1 200px',
            height: 52,
            border: '2px solid var(--c-ink)',
            borderRadius: 999,
            padding: '0 18px',
            fontSize: 15,
            fontFamily: font,
            outline: 'none',
            background: 'var(--c-paper)',
            color: 'var(--c-ink)',
            transition: 'border-color 0.15s, box-shadow 0.15s',
          }}
          onFocus={e => { e.target.style.boxShadow = '0 0 0 3px rgba(255,138,71,0.25)'; }}
          onBlur={e => { e.target.style.boxShadow = 'none'; }}
        />
        <button
          type="submit"
          disabled={state === 'loading' || state === 'success'}
          className={`tn-btn${state === 'success' ? ' tn-btn-success' : ''}`}
          style={{ height: 52, padding: '0 26px', fontSize: 15, whiteSpace: 'nowrap' }}
        >
          {state === 'loading' ? 'enviando…' : state === 'success' ? '✓ enviado!' : 'inscreva-se'}
        </button>
      </form>
      {state === 'error' && (
        <p style={{ marginTop: 10, fontSize: 13, color: '#dc2626', textAlign: isCenter ? 'center' : 'left' }}>
          esse email não parece válido — confere e tenta de novo.
        </p>
      )}
      {state === 'success' && (
        <p style={{ marginTop: 10, fontSize: 13, color: '#15803d', textAlign: isCenter ? 'center' : 'left' }}>
          pronto! chegará amanhã às 06:06 ☕
        </p>
      )}
    </div>
  );
}

// ─── FAQ item ─────────────────────────────────────────────────────────────────
function FaqItem({ item, open, onToggle }: { item: { q: string; a: string }; open: boolean; onToggle: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.maxHeight = open ? `${ref.current.scrollHeight}px` : '0';
  }, [open]);

  return (
    <div style={{ borderBottom: '1px solid var(--c-line)' }}>
      <button className="tn-faq-btn" onClick={onToggle} aria-expanded={open}>
        {item.q}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"
          style={{ width: 20, height: 20, flexShrink: 0, transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 0.22s ease' }}>
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <div ref={ref} style={{ maxHeight: 0, overflow: 'hidden', transition: 'max-height 0.28s ease' }}>
        <p style={{ paddingBottom: 20, fontSize: 15, color: 'var(--c-ink-soft)', lineHeight: 1.65, maxWidth: 580 }}>{item.a}</p>
      </div>
    </div>
  );
}

// ─── Testimonials marquee ─────────────────────────────────────────────────────
function Marquee() {
  // Row A: left-to-right order; Row B: reversed for visual variety
  const rowA = testimonialNums;
  const rowB = [...testimonialNums].reverse();

  const imgStyle: CSSProperties = {
    height: 320,
    width: 'auto',
    borderRadius: 16,
    objectFit: 'cover',
    flexShrink: 0,
    display: 'block',
  };

  return (
    <section style={{ padding: '72px 0', background: 'var(--c-warm)', borderTop: '1px solid var(--c-line)', borderBottom: '1px solid var(--c-line)', overflow: 'hidden', transition: 'background 0.3s' }}>
      {/* Header */}
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px', marginBottom: 40, textAlign: 'center' }}>
        <h2 className="tn-section-title" style={{ fontSize: 'clamp(26px, 3.5vw, 34px)', fontWeight: 800, letterSpacing: '-0.01em', lineHeight: 1.2, maxWidth: 580, margin: '0 auto 12px' }}>
          criando bons hábitos e te deixando{' '}
          <span style={{ background: 'linear-gradient(135deg, #FFCD08 0%, #FF8A47 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            mais inteligente
          </span>
        </h2>
        <p style={{ fontSize: 16, color: 'var(--c-ink-soft)' }}>
          nos comprometemos a entregar notícias da forma mais inteligente.
        </p>
      </div>

      {/* Row 1 — left */}
      <div className="tn-marquee-wrap" style={{ marginBottom: 12 }}>
        <div className="tn-marquee-track-l">
          {[...rowA, ...rowA].map((n, i) => (
            <div key={i} style={{ marginRight: 12, flexShrink: 0 }}>
              <img
                src={`https://assets.thenewscc.com.br/landingPage/testimonials/testimonials-${n}.png`}
                alt={`depoimento ${n}`}
                style={imgStyle}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — right (reverse direction) */}
      <div className="tn-marquee-wrap">
        <div className="tn-marquee-track-r">
          {[...rowB, ...rowB].map((n, i) => (
            <div key={i} style={{ marginRight: 12, flexShrink: 0 }}>
              <img
                src={`https://assets.thenewscc.com.br/landingPage/testimonials/testimonials-${n}.png`}
                alt={`depoimento ${n}`}
                style={{ ...imgStyle, height: 280 }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Dark mode toggle ─────────────────────────────────────────────────────────
function DarkToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <button className="tn-dark-btn" onClick={onToggle} aria-label={dark ? 'Ativar modo claro' : 'Ativar modo escuro'}>
      {dark
        ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
        : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      }
      {dark ? 'claro' : 'escuro'}
    </button>
  );
}

// ─── High contrast toggle ────────────────────────────────────────────────────
function HCToggle({ active, onToggle }: { active: boolean; onToggle: () => void }) {
  return (
    <button
      className={`tn-dark-btn${active ? ' tn-hc-btn-active' : ''}`}
      onClick={onToggle}
      aria-pressed={active}
      aria-label={active ? 'Desativar alto contraste' : 'Ativar alto contraste'}
      title="Alto contraste"
    >
      {/* Half-circle contrast icon */}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2a10 10 0 0 1 0 20V2z" fill="currentColor" stroke="none"/>
      </svg>
      contraste
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function LandingRedesign() {
  const { dark, setDark, hc, setHc } = useTheme();
  const [menu,    setMenu]    = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const wrap: CSSProperties = { maxWidth: 1080, margin: '0 auto', padding: '0 24px' };

  return (
    <div data-theme={dark ? 'dark' : 'light'} data-hc={hc ? '1' : '0'} style={{ fontFamily: font, color: 'var(--c-ink)', background: 'var(--c-paper)', minHeight: '100vh', overflowX: 'hidden', transition: 'background 0.3s, color 0.3s' }}>
      <style>{STYLES}</style>

      {/* ── HEADER ───────────────────────────────────────────────────────── */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'var(--c-header-bg)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid var(--c-line)', transition: 'background 0.3s' }}>
        <div style={{ ...wrap, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={dark ? 'https://assets.thenewscc.com.br/newLogoWhite1.png' : 'https://assets.thenewscc.com.br/newLogo.png'}
              alt="the news" style={{ height: 34 }}
            />
          </a>

          {/* Desktop nav */}
          <nav className="tn-desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {navLinks.map(l => (
              <a key={l.label} href={l.href} target={l.external ? '_blank' : undefined}
                rel={l.external ? 'noopener noreferrer' : undefined} className="tn-nav-link">
                {l.label}
                {l.external && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>}
              </a>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <HCToggle active={hc} onToggle={() => setHc(v => !v)} />
            <DarkToggle dark={dark} onToggle={() => setDark(v => !v)} />
            <a href="#hero" className="tn-btn tn-desktop-cta" style={{ padding: '9px 22px', fontSize: 14, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
              inscreva-se
            </a>
            <button className="tn-hamburger" onClick={() => setMenu(v => !v)}
              style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 4, color: 'var(--c-ink)', display: 'none' }}
              aria-label="Menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {menu
                  ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                  : <><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/></>}
              </svg>
            </button>
          </div>
        </div>

        {menu && (
          <div style={{ background: 'var(--c-paper)', borderTop: '1px solid var(--c-line)', padding: '16px 24px 20px' }}>
            {navLinks.map(l => (
              <a key={l.label} href={l.href} onClick={() => setMenu(false)}
                style={{ display: 'block', padding: '12px 0', fontSize: 16, color: 'var(--c-ink)', borderBottom: '1px solid var(--c-line)', textDecoration: 'none' }}>
                {l.label}
              </a>
            ))}
            <a href="#hero" onClick={() => setMenu(false)} className="tn-btn"
              style={{ display: 'inline-flex', marginTop: 16, padding: '12px 24px', fontSize: 15, textDecoration: 'none' }}>
              inscreva-se
            </a>
          </div>
        )}
      </header>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section id="hero" className="tn-hero-section" style={{ paddingTop: 120, paddingBottom: 80, textAlign: 'center' }}>
        <div className="tn-wrap" style={wrap}>

          {/* Badge */}
          <div className="tn-fade" style={{ animationDelay: '0.05s', display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--c-badge-bg)', border: '1px solid var(--c-badge-border)', padding: '7px 16px', borderRadius: 999, marginBottom: 28, fontSize: 13, fontWeight: 600, color: 'var(--c-badge-text)' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--c-orange)', display: 'inline-block', animation: 'tn-pulse 2s ease-in-out infinite' }} aria-hidden="true" />
            06:06 · de segunda a domingo · grátis
          </div>

          {/* Headline — animação linha por linha */}
          <h1 className="tn-hero-h1" style={{ fontSize: 'clamp(40px, 7.5vw, 78px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.025em', margin: '0 auto 20px', maxWidth: 820 }}>
            <span className="tn-anim" style={{ animationDelay: '0.15s' }}>
              o jornal que te deixa
            </span>
            <span className="tn-anim" style={{ animationDelay: '0.3s', minHeight: '1.15em' }}>
              <TypewriterWord />
            </span>
            <span className="tn-anim" style={{ animationDelay: '0.45s' }}>
              em 5 minutos
            </span>
          </h1>

          {/* Sub */}
          <p className="tn-hero-sub tn-fade" style={{ animationDelay: '0.6s', fontSize: 19, color: 'var(--c-ink-soft)', maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.55 }}>
            as principais notícias do Brasil e do mundo, explicadas de forma direta e sem enrolação — todo dia, no seu email.
          </p>

          <div className="tn-fade" style={{ animationDelay: '0.7s' }}>
            <SignupForm />
          </div>

          {/* Social proof */}
          <div className="tn-fade" style={{ animationDelay: '0.85s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 24 }}>
            <div style={{ display: 'flex' }} aria-hidden="true">
              {['#FFCD08','#FF8A47','#333','#777'].map((bg, i) => (
                <span key={i} style={{ width: 26, height: 26, borderRadius: '50%', background: bg, border: '2px solid var(--c-paper)', marginLeft: i > 0 ? -7 : 0, display: 'block' }} />
              ))}
            </div>
            <p style={{ fontSize: 13.5, color: 'var(--c-ink-soft)' }}>
              <strong style={{ color: 'var(--c-ink)' }}>3 milhões</strong> de pessoas já leem todo dia
            </p>
          </div>

          <div className="tn-fade" style={{ animationDelay: '0.9s', marginTop: 16 }}>
            <a href="https://thenewscc.beehiiv.com/" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 14, color: 'var(--c-ink-soft)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              ou leia nossas edições primeiro
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── EMAIL PREVIEW ─────────────────────────────────────────────────── */}
      <section className="tn-section" style={{ padding: '0 0 80px' }}>
        <div className="tn-wrap" style={wrap}>
          <p style={{ textAlign: 'center', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-ink-soft)', marginBottom: 24 }}>
            é isso que chega na sua caixa de entrada
          </p>
          <div className="tn-preview-card" style={{ maxWidth: 620, margin: '0 auto', border: '1px solid var(--c-line-hard)', borderRadius: 24, overflow: 'hidden', boxShadow: '0 12px 48px rgba(0,0,0,0.09)' }}>
            <div style={{ background: 'var(--c-email-chrome)', padding: '13px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 6 }} aria-hidden="true">
                {['#FF5F57','#FFBD2E','#28C840'].map(c => <span key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, display: 'block' }} />)}
              </div>
              <span style={{ fontSize: 12, color: '#999', fontWeight: 500, fontFamily: 'ui-monospace, monospace' }}>the news ☕ · 26 jun 2026</span>
              <span style={{ width: 52 }} />
            </div>
            <div className="tn-email-body" style={{ padding: '28px 32px', background: 'var(--c-email-body)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 20 }}>☕</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--c-ink)' }}>the news</span>
              </div>
              <p style={{ fontSize: 14, color: 'var(--c-ink-soft)', marginBottom: 20, borderBottom: '1px solid var(--c-line)', paddingBottom: 14 }}>
                bom dia. aqui vai o que importa hoje:
              </p>
              {emailItems.map((item, i) => (
                <div key={i} style={{ padding: '14px 0', borderBottom: i < emailItems.length - 1 ? '1px solid var(--c-line)' : 'none' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--c-tag-color)', display: 'block', marginBottom: 5 }}>{item.tag}</span>
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 5, lineHeight: 1.35, color: 'var(--c-ink)' }}>{item.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--c-ink-soft)', lineHeight: 1.55 }}>{item.body}</p>
                </div>
              ))}
              <p style={{ marginTop: 18, fontSize: 12, color: 'var(--c-ink-soft)', textAlign: 'center', fontFamily: 'ui-monospace, monospace' }}>
                mais inteligente em 5 minutos · the news
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--c-stats-bg)', padding: '56px 0', transition: 'background 0.3s' }}>
        <div className="tn-stats-grid tn-wrap" style={{ ...wrap, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', textAlign: 'center', gap: 24 }}>
          {stats.map(s => (
            <div key={s.num}>
              <div style={{ fontSize: 'clamp(34px, 4.5vw, 50px)', fontWeight: 800, lineHeight: 1.1, ...gradText }}>{s.num}</div>
              <div style={{ fontSize: 14, color: 'var(--c-stats-label)', marginTop: 8, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="tn-section" style={{ padding: '72px 0', borderTop: '1px solid var(--c-line)', borderBottom: '1px solid var(--c-line)' }}>
        <div className="tn-wrap" style={wrap}>
          <h2 className="tn-section-title" style={{ fontSize: 'clamp(26px, 3.5vw, 34px)', fontWeight: 800, textAlign: 'center', letterSpacing: '-0.01em', margin: '0 auto 48px', lineHeight: 1.2, maxWidth: 520 }}>
            três coisas que a gente leva a sério
          </h2>
          <div className="tn-features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {features.map(f => (
              <div key={f.title} style={{ border: '1px solid var(--c-line)', borderRadius: 20, padding: '28px 28px 32px', background: 'var(--c-paper)', transition: 'background 0.3s' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--c-icon-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, color: 'var(--c-orange)' }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: 'var(--c-ink)' }}>{f.title}</h3>
                <p style={{ fontSize: 14.5, color: 'var(--c-ink-soft)', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS MARQUEE ─────────────────────────────────────────── */}
      <Marquee />

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faq" className="tn-section" style={{ padding: '72px 0' }}>
        <div className="tn-wrap" style={wrap}>
          <h2 className="tn-section-title" style={{ fontSize: 'clamp(26px, 3.5vw, 34px)', fontWeight: 800, textAlign: 'center', letterSpacing: '-0.01em', margin: '0 auto 48px', maxWidth: 520, lineHeight: 1.2 }}>
            dúvidas
          </h2>
          <div style={{ maxWidth: 680, margin: '0 auto', borderTop: '1px solid var(--c-line)' }}>
            {faqItems.map((item, i) => (
              <FaqItem key={i} item={item} open={faqOpen === i} onToggle={() => setFaqOpen(faqOpen === i ? null : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <section className="tn-cta-section" style={{ background: 'var(--c-warm)', padding: '88px 0', textAlign: 'center', borderTop: '1px solid var(--c-line)', transition: 'background 0.3s' }}>
        <div className="tn-wrap" style={wrap}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, letterSpacing: '-0.025em', margin: '0 auto 18px', lineHeight: 1.08, maxWidth: 700 }}>
            <span style={gradText}>+ inteligente</span>
            <br />em 5 minutos
          </h2>
          <p style={{ fontSize: 17, color: 'var(--c-ink-soft)', margin: '0 auto 36px', maxWidth: 440, lineHeight: 1.55 }}>
            notícias relevantes e imparciais, todo dia às 06:06, direto no seu email — grátis.
          </p>
          <SignupForm />
          <p style={{ marginTop: 14, fontSize: 12.5, color: 'var(--c-ink-soft)' }}>grátis · sem spam · cancela quando quiser</p>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: '1px solid var(--c-line)', padding: '32px 0' }}>
        <div className="tn-wrap tn-footer-row" style={{ ...wrap, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <a href="/">
            <img
              src={dark ? 'https://assets.thenewscc.com.br/newLogoWhite1.png' : 'https://assets.thenewscc.com.br/newLogo.png'}
              alt="the news" style={{ height: 28 }}
            />
          </a>
          <div style={{ display: 'flex', gap: 24, fontSize: 13 }}>
            {[['privacidade','/policies'],['termos','/terms'],['fale conosco','/contact']].map(([label, href]) => (
              <a key={label} href={href} className="tn-footer-link">{label}</a>
            ))}
          </div>
          <p style={{ fontSize: 13, color: 'var(--c-ink-soft)' }}>© 2026 Grupo TNS</p>
        </div>
      </footer>
    </div>
  );
}
