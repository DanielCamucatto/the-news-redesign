import { useState, useRef, useEffect } from 'react';
import type { CSSProperties } from 'react';

// ─── Design tokens ───────────────────────────────────────────────────────────
const C = {
  yellow:   '#FFCD08',
  orange:   '#FF8A47',
  ink:      '#111111',
  inkSoft:  '#6B6869',
  paper:    '#FFFFFF',
  warm:     '#F7F6F3',
  line:     '#E9E9E7',
  lineHard: '#D8D7D4',
  grad:     'linear-gradient(135deg, #FFCD08 0%, #FF8A47 100%)',
  gradText: { background: 'linear-gradient(135deg, #FFCD08 0%, #FF8A47 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' } as CSSProperties,
};

const font = "'Helvetica Now Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

// ─── Data ────────────────────────────────────────────────────────────────────
const navLinks = [
  { label: 'app',      href: 'https://thenews.com.br/app', external: true },
  { label: 'podcast',  href: 'https://open.spotify.com/show/5cYtKjFwlRCSZKyV6ZC8Wq', external: true },
  { label: 'marcas',   href: '/marcas' },
  { label: 'dúvidas',  href: '#faq' },
];

const emailItems = [
  { tag: 'brasil',     title: 'congresso aprova nova regra fiscal depois de madrugada de negociação',    body: 'o texto cria um gatilho automático pra conter gastos quando o orçamento sair do controle. oposição já avisou que vai questionar no STF.' },
  { tag: 'mercado',    title: 'real sobe depois que o fed sinalizou corte de juros nos EUA',              body: 'a moeda americana caiu pro menor nível em quatro meses. bom pra quem importa, ruim pra quem exporta.' },
  { tag: 'tecnologia', title: 'startups brasileiras captam recorde de investimento estrangeiro',           body: 'o trimestre fechou com mais dinheiro de fora do que em qualquer outro período da última década.' },
];

const stats = [
  { num: '3M+', label: 'leitores' },
  { num: '5min', label: 'por edição' },
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
    desc: 'seu streak cresce a cada edição lida. você indica amigos e ganha brindes exclusivos do the news.',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  },
];

const faqItems = [
  { q: 'o que eu vou receber ao me inscrever?',              a: 'de segunda a domingo, um resumo direto e imparcial das principais notícias do Brasil e do mundo. em 5 minutos, comece o dia bem informado.' },
  { q: 'a newsletter é realmente gratuita?',                 a: 'sim. 100% grátis, sem cartão de crédito, sem pegadinha. monetizamos com parcerias com marcas — e mesmo essas costumam agradar o leitor.' },
  { q: 'o the news tem viés político?',                      a: 'absolutamente não. somos imparciais. nosso inimigo não é um lado ou outro — é a ignorância.' },
  { q: 'vou receber spam ou propagandas indesejadas?',       a: 'não. só a edição diária. o botão de cancelar fica sempre visível no final de cada email, sem letra miúda.' },
  { q: 'como garantir que o email não vai pra spam?',        a: "arraste a mensagem pra aba 'Principal' no seu provedor de email. isso ensina o algoritmo a sempre entregar na caixa certa." },
  { q: 'posso indicar pra amigos?',                          a: 'aliás, deve. cada indicação te dá pontos pro programa de recompensas — você pode ganhar brindes exclusivos do the news.' },
  { q: 'por que o the news é diferente das outras?',        a: 'se chegou até aqui, já temos sua atenção. assine e veja você mesmo.' },
];

// ─── Form ─────────────────────────────────────────────────────────────────────
type FormState = 'idle' | 'loading' | 'success' | 'error';

function SignupForm({ center = true }: { center?: boolean }) {
  const [email, setEmail]   = useState('');
  const [state, setState]   = useState<FormState>('idle');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setState('error'); return; }
    setState('loading');
    setTimeout(() => { setState('success'); setEmail(''); }, 900);
  }

  const formStyle: CSSProperties = {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
    justifyContent: center ? 'center' : 'flex-start',
    maxWidth: 480,
    margin: center ? '0 auto' : undefined,
  };

  return (
    <div>
      <form onSubmit={submit} style={formStyle}>
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
            border: `2px solid ${C.ink}`,
            borderRadius: 999,
            padding: '0 18px',
            fontSize: 15,
            fontFamily: font,
            outline: 'none',
            background: C.paper,
            color: C.ink,
          }}
        />
        <button
          type="submit"
          disabled={state === 'loading' || state === 'success'}
          style={{
            height: 52,
            padding: '0 26px',
            background: state === 'success' ? '#16a34a' : C.grad,
            color: state === 'success' ? '#fff' : C.ink,
            border: 'none',
            borderRadius: 999,
            fontWeight: 700,
            fontSize: 15,
            cursor: state === 'loading' || state === 'success' ? 'default' : 'pointer',
            opacity: state === 'loading' ? 0.7 : 1,
            whiteSpace: 'nowrap' as const,
            transition: 'all 0.2s',
            fontFamily: font,
          }}
        >
          {state === 'loading' ? 'enviando…' : state === 'success' ? '✓ enviado!' : 'inscreva-se'}
        </button>
      </form>
      {state === 'error' && (
        <p style={{ marginTop: 10, fontSize: 13, color: '#dc2626', textAlign: center ? 'center' : 'left' }}>
          esse email não parece válido — confere e tenta de novo.
        </p>
      )}
      {state === 'success' && (
        <p style={{ marginTop: 10, fontSize: 13, color: '#15803d', textAlign: center ? 'center' : 'left' }}>
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
    <div style={{ borderBottom: `1px solid ${C.line}` }}>
      <button
        onClick={onToggle}
        aria-expanded={open}
        style={{
          width: '100%', background: 'none', border: 'none', textAlign: 'left',
          padding: '20px 0', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 16, cursor: 'pointer',
          fontFamily: font, fontSize: 16, fontWeight: 600, color: C.ink,
        }}
      >
        {item.q}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"
          style={{ width: 20, height: 20, flexShrink: 0, transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 0.22s ease' }}>
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <div ref={ref} style={{ maxHeight: 0, overflow: 'hidden', transition: 'max-height 0.25s ease' }}>
        <p style={{ paddingBottom: 20, fontSize: 15, color: C.inkSoft, lineHeight: 1.65, maxWidth: 580 }}>{item.a}</p>
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export function LandingRedesign() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen,  setFaqOpen]  = useState<number | null>(null);

  const wrap: CSSProperties = { maxWidth: 1080, margin: '0 auto', padding: '0 24px' };
  const section = (extra?: CSSProperties): CSSProperties => ({ padding: '72px 0', ...extra });

  return (
    <div style={{ fontFamily: font, color: C.ink, background: C.paper, minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: `1px solid ${C.line}` }}>
        <div style={{ ...wrap, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img src="https://assets.thenewscc.com.br/newLogo.png" alt="the news" style={{ height: 34 }} />
          </a>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="hidden lg:flex">
            {navLinks.map(l => (
              <a key={l.label} href={l.href} target={l.external ? '_blank' : undefined} rel={l.external ? 'noopener noreferrer' : undefined}
                style={{ fontSize: 15, color: C.inkSoft, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}>
                {l.label}
                {l.external && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>}
              </a>
            ))}
          </nav>

          <a href="#hero" className="hidden lg:inline-block"
            style={{ background: C.grad, color: C.ink, padding: '9px 22px', borderRadius: 999, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
            inscreva-se
          </a>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(v => !v)} className="lg:hidden"
            style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 4, color: C.ink }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/></>}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div style={{ background: C.paper, borderTop: `1px solid ${C.line}`, padding: '16px 24px 20px' }}>
            {navLinks.map(l => (
              <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
                style={{ display: 'block', padding: '12px 0', fontSize: 16, color: C.ink, borderBottom: `1px solid ${C.line}`, textDecoration: 'none' }}>
                {l.label}
              </a>
            ))}
            <a href="#hero" onClick={() => setMenuOpen(false)}
              style={{ display: 'inline-block', marginTop: 16, background: C.grad, color: C.ink, padding: '12px 24px', borderRadius: 999, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
              inscreva-se
            </a>
          </div>
        )}
      </header>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section id="hero" style={{ ...section({ paddingTop: 120, paddingBottom: 80, textAlign: 'center' }) }}>
        <div style={wrap}>

          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#FFF8E1', border: '1px solid #FFE57A', padding: '7px 16px', borderRadius: 999, marginBottom: 28, fontSize: 13, fontWeight: 600, color: '#7A5500' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: C.orange, display: 'inline-block', animation: 'tn-pulse 2s ease-in-out infinite' }} aria-hidden="true" />
            06:06 · de segunda a domingo · grátis
          </div>

          {/* Headline */}
          <h1 style={{ fontSize: 'clamp(40px, 7.5vw, 78px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.025em', margin: '0 auto 20px', maxWidth: 820 }}>
            o jornal que te deixa{' '}
            <span style={C.gradText}>mais inteligente</span>{' '}
            em 5 minutos
          </h1>

          {/* Sub */}
          <p style={{ fontSize: 19, color: C.inkSoft, maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.55 }}>
            as principais notícias do Brasil e do mundo, explicadas de forma direta e sem enrolação — todo dia, no seu email.
          </p>

          <SignupForm />

          {/* Social proof */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 24 }}>
            <div style={{ display: 'flex' }} aria-hidden="true">
              {[C.yellow, C.orange, '#333', '#777'].map((bg, i) => (
                <span key={i} style={{ width: 26, height: 26, borderRadius: '50%', background: bg, border: '2px solid white', marginLeft: i > 0 ? -7 : 0, display: 'block' }} />
              ))}
            </div>
            <p style={{ fontSize: 13.5, color: C.inkSoft }}>
              <strong style={{ color: C.ink }}>3 milhões</strong> de pessoas já leem todo dia
            </p>
          </div>

          <div style={{ marginTop: 16 }}>
            <a href="https://thenewscc.beehiiv.com/" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 14, color: C.inkSoft, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              ou leia nossas edições primeiro
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── EMAIL PREVIEW ──────────────────────────────────────────────────── */}
      <section style={{ padding: '0 0 80px' }}>
        <div style={wrap}>
          <p style={{ textAlign: 'center', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.inkSoft, marginBottom: 24 }}>
            é isso que chega na sua caixa de entrada
          </p>

          <div style={{ maxWidth: 620, margin: '0 auto', border: `1px solid ${C.lineHard}`, borderRadius: 24, overflow: 'hidden', boxShadow: '0 12px 48px rgba(0,0,0,0.09)' }}>
            {/* Chrome bar */}
            <div style={{ background: C.ink, padding: '13px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 6 }} aria-hidden="true">
                {['#FF5F57','#FFBD2E','#28C840'].map(c => <span key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, display: 'block' }} />)}
              </div>
              <span style={{ fontSize: 12, color: '#999', fontWeight: 500, fontFamily: 'ui-monospace, monospace' }}>the news ☕ · 26 jun 2026</span>
              <span style={{ width: 52 }} />
            </div>

            {/* Email body */}
            <div style={{ padding: '28px 32px', background: '#FAFAF8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 20 }}>☕</span>
                <span style={{ fontSize: 18, fontWeight: 800 }}>the news</span>
              </div>
              <p style={{ fontSize: 14, color: C.inkSoft, marginBottom: 22, borderBottom: `1px solid ${C.line}`, paddingBottom: 14 }}>
                bom dia. aqui vai o que importa hoje:
              </p>

              {emailItems.map((item, i) => (
                <div key={i} style={{ padding: '15px 0', borderBottom: i < emailItems.length - 1 ? `1px solid ${C.line}` : 'none' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: C.orange, display: 'block', marginBottom: 5 }}>{item.tag}</span>
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 5, lineHeight: 1.35, color: C.ink }}>{item.title}</h3>
                  <p style={{ fontSize: 13, color: C.inkSoft, lineHeight: 1.55 }}>{item.body}</p>
                </div>
              ))}

              <p style={{ marginTop: 18, fontSize: 12, color: C.inkSoft, textAlign: 'center', fontFamily: 'ui-monospace, monospace' }}>
                mais inteligente em 5 minutos · the news
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────────────────── */}
      <section style={{ background: C.ink, padding: '56px 0' }}>
        <div style={{ ...wrap, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', textAlign: 'center', gap: 24 }}>
          {stats.map(s => (
            <div key={s.num}>
              <div style={{ fontSize: 'clamp(34px, 4.5vw, 50px)', fontWeight: 800, lineHeight: 1.1, ...C.gradText }}>{s.num}</div>
              <div style={{ fontSize: 14, color: '#AAA9A7', marginTop: 8, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────────────────── */}
      <section style={section({ borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` })}>
        <div style={wrap}>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 34px)', fontWeight: 800, textAlign: 'center', letterSpacing: '-0.01em', margin: '0 auto 48px', lineHeight: 1.2, maxWidth: 520 }}>
            três coisas que a gente leva a sério
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {features.map(f => (
              <div key={f.title} style={{ border: `1px solid ${C.line}`, borderRadius: 20, padding: '28px 28px 32px' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#FFF8E1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, color: C.orange }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 14.5, color: C.inkSoft, lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section id="faq" style={section()}>
        <div style={wrap}>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 34px)', fontWeight: 800, textAlign: 'center', letterSpacing: '-0.01em', margin: '0 auto 48px', maxWidth: 520, lineHeight: 1.2 }}>
            dúvidas
          </h2>
          <div style={{ maxWidth: 680, margin: '0 auto', borderTop: `1px solid ${C.line}` }}>
            {faqItems.map((item, i) => (
              <FaqItem key={i} item={item} open={faqOpen === i} onToggle={() => setFaqOpen(faqOpen === i ? null : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ─────────────────────────────────────────────────────── */}
      <section style={{ background: C.warm, padding: '88px 0', textAlign: 'center', borderTop: `1px solid ${C.line}` }}>
        <div style={wrap}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, letterSpacing: '-0.025em', margin: '0 auto 18px', lineHeight: 1.08, maxWidth: 700 }}>
            <span style={C.gradText}>+ inteligente</span>
            <br />em 5 minutos
          </h2>
          <p style={{ fontSize: 17, color: C.inkSoft, margin: '0 auto 36px', maxWidth: 440, lineHeight: 1.55 }}>
            notícias relevantes e imparciais, todo dia às 06:06, direto no seu email — grátis.
          </p>
          <SignupForm />
          <p style={{ marginTop: 14, fontSize: 12.5, color: C.inkSoft }}>grátis · sem spam · cancela quando quiser</p>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: `1px solid ${C.line}`, padding: '32px 0' }}>
        <div style={{ ...wrap, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <a href="/">
            <img src="https://assets.thenewscc.com.br/newLogoWhite1.png" alt="the news" style={{ height: 28, filter: 'invert(1)' }} />
          </a>
          <div style={{ display: 'flex', gap: 24, fontSize: 13, color: C.inkSoft }}>
            {[['privacidade','/policies'],['termos','/terms'],['fale conosco','/contact']].map(([label, href]) => (
              <a key={label} href={href} style={{ color: C.inkSoft, textDecoration: 'none' }}>{label}</a>
            ))}
          </div>
          <p style={{ fontSize: 13, color: C.inkSoft }}>© 2026 Grupo TNS</p>
        </div>
      </footer>

      {/* Keyframes */}
      <style>{`
        @keyframes tn-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
      `}</style>
    </div>
  );
}
