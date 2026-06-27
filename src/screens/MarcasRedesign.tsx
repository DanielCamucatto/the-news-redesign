import { useState } from 'react';
import { SiteHeader, SiteFooter, SHELL_STYLES, useTheme, font, gradText } from '../components/SiteShell';

// ─── Brand data ───────────────────────────────────────────────────────────────
type Category = 'todos' | 'notícias' | 'negócios' | 'esportes' | 'lifestyle' | 'saúde';

interface Brand {
  key:      string;
  name:     string;
  logo:     string;
  desc:     string;
  href:     string;
  color:    string;      // accent color for the card band
  shadow:   string;      // hover glow
  tag:      string;      // short frequency label
  cats:     Category[];
}

const brands: Brand[] = [
  {
    key:    'morning',
    name:   'the news morning',
    logo:   'https://assets.thenewscc.com.br/MORNING.png',
    desc:   'as últimas notícias do mundo, direto na sua caixa de entrada. todo dia, às 06:06.',
    href:   'https://thenewscc.beehiiv.com/archive',
    color:  '#FF8A47',
    shadow: 'rgba(255,138,71,0.35)',
    tag:    'diária · manhã',
    cats:   ['notícias'],
  },
  {
    key:    'night',
    name:   'the news night',
    logo:   'https://assets.thenewscc.com.br/NIGHT.png',
    desc:   'o resumo do que aconteceu no dia, antes de você dormir. simples assim.',
    href:   'https://thenewscc.beehiiv.com/archive?tags=AT+NIGHT',
    color:  '#4F46E5',
    shadow: 'rgba(79,70,229,0.35)',
    tag:    'diária · noite',
    cats:   ['notícias'],
  },
  {
    key:    'business',
    name:   'the news business',
    logo:   'https://assets.thenewscc.com.br/BUSINESS.png',
    desc:   'seu MBA em forma de e-mail. toda terça e quinta, às 13:13, na sua caixa de entrada.',
    href:   'https://business.thenews.com.br/',
    color:  '#7C3AED',
    shadow: 'rgba(124,58,237,0.35)',
    tag:    'ter · qui · 13:13',
    cats:   ['negócios'],
  },
  {
    key:    'sports',
    name:   'the news sports',
    logo:   'https://assets.thenewscc.com.br/SPORTS.png',
    desc:   'uma newsletter esportiva, sagaz e divertida. te informa sobre nossa maior paixão.',
    href:   'https://sports.thenews.com.br/',
    color:  '#DC2626',
    shadow: 'rgba(220,38,38,0.35)',
    tag:    'diária · esportes',
    cats:   ['esportes'],
  },
  {
    key:    'money',
    name:   'the news money',
    logo:   'https://assets.thenewscc.com.br/MONEY.png',
    desc:   'a curadoria do que é mais relevante pra quem é do mercado. todo dia, antes de abrir.',
    href:   'https://money.thenews.com.br/',
    color:  '#059669',
    shadow: 'rgba(5,150,105,0.35)',
    tag:    'diária · finanças',
    cats:   ['negócios'],
  },
  {
    key:    'health',
    name:   'the news health',
    logo:   'https://assets.thenewscc.com.br/HEALTH.png',
    desc:   'atualizações médicas, insights práticos, entrevistas e cases do mercado de saúde.',
    href:   'https://health.thenews.com.br/',
    color:  '#0891B2',
    shadow: 'rgba(8,145,178,0.35)',
    tag:    'semanal · saúde',
    cats:   ['saúde'],
  },
  {
    key:    'cult',
    name:   'the news cult',
    logo:   'https://assets.thenewscc.com.br/CULT.png',
    desc:   'histórias de amor contadas em forma de texto. não tão longas quanto um romance, mas suficientes pra te fazer sentir.',
    href:   'https://thenewscult.beehiiv.com/',
    color:  '#BE185D',
    shadow: 'rgba(190,24,93,0.35)',
    tag:    'semanal · cultura',
    cats:   ['lifestyle'],
  },
  {
    key:    'travel',
    name:   'the news travel',
    logo:   'https://assets.thenewscc.com.br/TRAVEL.png',
    desc:   'seu guia favorito para viagens. dicas, histórias e experiências de outros viajantes.',
    href:   'https://travel.thenews.com.br/',
    color:  '#1D4ED8',
    shadow: 'rgba(29,78,216,0.35)',
    tag:    'semanal · viagens',
    cats:   ['lifestyle'],
  },
  {
    key:    'trends',
    name:   'the news trends',
    logo:   'https://assets.thenewscc.com.br/TRENDS.png',
    desc:   'sua fonte de inspiração para conteúdos e estratégia — com uma pitada de insights pra sua marca.',
    href:   'https://trends.thenews.com.br/',
    color:  '#D97706',
    shadow: 'rgba(217,119,6,0.35)',
    tag:    'semanal · marketing',
    cats:   ['negócios'],
  },
  {
    key:    'around',
    name:   'the news around',
    logo:   'https://assets.thenewscc.com.br/AROUND.png',
    desc:   'para pessoas interessadas em se tornar mais interessantes. maybe basic, but never ordinary.',
    href:   'https://around.thenews.com.br/',
    color:  '#0F766E',
    shadow: 'rgba(15,118,110,0.35)',
    tag:    'semanal · lifestyle',
    cats:   ['lifestyle'],
  },
];

const FILTERS: { key: Category; label: string }[] = [
  { key: 'todos',    label: 'todos' },
  { key: 'notícias', label: 'notícias' },
  { key: 'negócios', label: 'negócios' },
  { key: 'esportes', label: 'esportes' },
  { key: 'saúde',    label: 'saúde' },
  { key: 'lifestyle', label: 'lifestyle' },
];

// ─── Page-level CSS ───────────────────────────────────────────────────────────
const PAGE_STYLES = `
  /* ── Animations ── */
  @keyframes tn-slide-up {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes tn-fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .tn-anim  { opacity: 0; animation: tn-slide-up 0.6s cubic-bezier(0.22,1,0.36,1) forwards; }
  .tn-fade  { opacity: 0; animation: tn-fade-in 0.5s ease forwards; }
  @media (prefers-reduced-motion: reduce) {
    .tn-anim, .tn-fade { animation: none !important; opacity: 1 !important; }
  }

  /* ── Brand card ── */
  .tn-brand-card {
    border: 1px solid var(--c-line);
    border-radius: 20px;
    overflow: hidden;
    background: var(--c-paper);
    display: flex;
    flex-direction: column;
    transition: transform 0.22s cubic-bezier(0.22,1,0.36,1), box-shadow 0.22s ease, border-color 0.22s ease;
  }
  .tn-brand-card:hover {
    transform: translateY(-6px);
  }

  /* ── Brand "conhecer" link button ── */
  .tn-brand-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    font-weight: 700;
    text-decoration: none;
    border-radius: 999px;
    padding: 9px 20px;
    border: 2px solid currentColor;
    transition: background 0.18s, color 0.18s;
  }
  .tn-brand-link:hover {
    filter: brightness(0.92);
  }

  /* ── Filter tabs ── */
  .tn-filter-btn {
    border: 1px solid var(--c-line);
    background: var(--c-paper);
    color: var(--c-ink-soft);
    border-radius: 999px;
    padding: 8px 20px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
    font-family: inherit;
  }
  .tn-filter-btn:hover { border-color: var(--c-line-hard); color: var(--c-ink); }
  .tn-filter-btn.active {
    background: var(--c-grad);
    color: #111;
    border-color: transparent;
  }
  [data-hc="1"] .tn-filter-btn.active {
    background: #000 !important; color: #ff0 !important;
  }
  [data-theme="dark"][data-hc="1"] .tn-filter-btn.active {
    background: #fff !important; color: #000 !important;
  }

  /* ── Grid ── */
  .tn-brands-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  @media (max-width: 900px)  { .tn-brands-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px)  { .tn-brands-grid { grid-template-columns: 1fr; } }
  @media (max-width: 600px)  {
    .tn-wrap { padding: 0 16px !important; }
    .tn-marcas-hero { padding: 100px 0 48px !important; }
  }
`;

// ─── Brand card ───────────────────────────────────────────────────────────────
function BrandCard({ brand }: { brand: Brand }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="tn-brand-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        boxShadow: hovered
          ? `0 20px 48px ${brand.shadow}, 0 4px 12px rgba(0,0,0,0.06)`
          : '0 1px 4px rgba(0,0,0,0.04)',
        borderColor: hovered ? brand.color + '55' : 'var(--c-line)',
      }}
    >
      {/* Color band */}
      <div style={{
        height: 110,
        background: `linear-gradient(135deg, ${brand.color}22 0%, ${brand.color}44 100%)`,
        borderBottom: `2px solid ${brand.color}33`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 24px',
        position: 'relative',
        transition: 'background 0.22s',
      }}>
        {/* Accent dot top-right */}
        <div style={{
          position: 'absolute', top: 14, right: 16,
          width: 8, height: 8, borderRadius: '50%',
          background: brand.color, opacity: 0.7,
        }} aria-hidden="true" />
        <img
          src={brand.logo}
          alt={brand.name}
          style={{ maxHeight: 54, maxWidth: '80%', objectFit: 'contain' }}
          loading="lazy"
        />
      </div>

      {/* Body */}
      <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', flex: 1, gap: 10 }}>
        {/* Frequency tag */}
        <span style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
          color: brand.color, display: 'block',
        }}>
          {brand.tag}
        </span>

        <h2 style={{ fontSize: 17, fontWeight: 800, color: 'var(--c-ink)', lineHeight: 1.25, margin: 0 }}>
          {brand.name}
        </h2>

        <p style={{ fontSize: 14, color: 'var(--c-ink-soft)', lineHeight: 1.6, margin: 0, flex: 1 }}>
          {brand.desc}
        </p>

        <a
          href={brand.href}
          target="_blank"
          rel="noopener noreferrer"
          className="tn-brand-link"
          style={{ color: brand.color, marginTop: 6, alignSelf: 'flex-start' }}
        >
          conhecer
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      </div>
    </article>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export function MarcasRedesign() {
  const { dark, setDark, hc, setHc } = useTheme();
  const [filter, setFilter] = useState<Category>('todos');

  const visible = filter === 'todos'
    ? brands
    : brands.filter(b => b.cats.includes(filter));

  const wrap = { maxWidth: 1080, margin: '0 auto', padding: '0 24px' };

  return (
    <div
      data-theme={dark ? 'dark' : 'light'}
      data-hc={hc ? '1' : '0'}
      style={{ fontFamily: font, color: 'var(--c-ink)', background: 'var(--c-paper)', minHeight: '100vh', overflowX: 'hidden', transition: 'background 0.3s, color 0.3s' }}
    >
      <style>{SHELL_STYLES + PAGE_STYLES}</style>

      <SiteHeader dark={dark} setDark={setDark} hc={hc} setHc={setHc} activePath="/marcas" />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="tn-marcas-hero" style={{ paddingTop: 120, paddingBottom: 64, background: 'var(--c-stats-bg)', transition: 'background 0.3s' }}>
        <div className="tn-wrap" style={wrap}>
          {/* Breadcrumb */}
          <div className="tn-fade" style={{ animationDelay: '0.05s', marginBottom: 24 }}>
            <a href="/" style={{ fontSize: 13, color: '#9A9896', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              the news
            </a>
            <span style={{ color: '#555', margin: '0 8px' }}>/</span>
            <span style={{ fontSize: 13, color: '#F0EFED', fontWeight: 600 }}>marcas</span>
          </div>

          <h1 className="tn-anim" style={{ animationDelay: '0.1s', fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.08, color: '#F0EFED', margin: '0 0 16px', maxWidth: 680 }}>
            nossas{' '}
            <span style={gradText}>marcas</span>
          </h1>

          <p className="tn-fade" style={{ animationDelay: '0.25s', fontSize: 18, color: '#9A9896', maxWidth: 520, lineHeight: 1.55, margin: '0 0 40px' }}>
            10 newsletters. um grupo com propósito. conheça cada vertical e assine a que faz mais sentido pra você.
          </p>

          {/* Stats strip */}
          <div className="tn-fade" style={{ animationDelay: '0.35s', display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            {[
              { n: '10',   l: 'newsletters' },
              { n: '3M+',  l: 'leitores' },
              { n: '2019', l: 'desde' },
            ].map(s => (
              <div key={s.l}>
                <div style={{ fontSize: 28, fontWeight: 800, lineHeight: 1, ...gradText }}>{s.n}</div>
                <div style={{ fontSize: 13, color: '#6B6869', marginTop: 4, fontWeight: 500 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILTER TABS ──────────────────────────────────────────────────── */}
      <div style={{ borderBottom: '1px solid var(--c-line)', background: 'var(--c-paper)', position: 'sticky', top: 64, zIndex: 40, transition: 'background 0.3s' }}>
        <div className="tn-wrap" style={{ ...wrap, overflowX: 'auto', display: 'flex', gap: 8, padding: '14px 24px', scrollbarWidth: 'none' }}>
          {FILTERS.map(f => (
            <button
              key={f.key}
              className={`tn-filter-btn${filter === f.key ? ' active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
              {filter === f.key && f.key !== 'todos' && (
                <span style={{ marginLeft: 4, fontSize: 12, opacity: 0.75 }}>
                  ({brands.filter(b => b.cats.includes(f.key)).length})
                </span>
              )}
              {f.key === 'todos' && filter === 'todos' && (
                <span style={{ marginLeft: 4, fontSize: 12, opacity: 0.75 }}>({brands.length})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── BRAND GRID ───────────────────────────────────────────────────── */}
      <section style={{ padding: '56px 0 80px' }}>
        <div className="tn-wrap" style={wrap}>
          {visible.length === 0 ? (
            <p style={{ color: 'var(--c-ink-soft)', textAlign: 'center', padding: '48px 0' }}>nenhuma newsletter nessa categoria.</p>
          ) : (
            <div className="tn-brands-grid">
              {visible.map((brand, i) => (
                <div key={brand.key} className="tn-fade" style={{ animationDelay: `${0.05 * i}s` }}>
                  <BrandCard brand={brand} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--c-warm)', borderTop: '1px solid var(--c-line)', padding: '72px 0', textAlign: 'center', transition: 'background 0.3s' }}>
        <div className="tn-wrap" style={wrap}>
          <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-ink-soft)', marginBottom: 16 }}>
            não sabe por onde começar?
          </p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.15, margin: '0 auto 16px', maxWidth: 580 }}>
            comece pelo{' '}
            <span style={gradText}>the news morning</span>
          </h2>
          <p style={{ fontSize: 16, color: 'var(--c-ink-soft)', margin: '0 auto 32px', maxWidth: 420, lineHeight: 1.55 }}>
            a newsletter original. 3 milhões de pessoas já leem todo dia às 06:06.
          </p>
          <a
            href="https://thenewscc.beehiiv.com/subscribe"
            target="_blank"
            rel="noopener noreferrer"
            className="tn-btn"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', fontSize: 16, textDecoration: 'none' }}
          >
            assinar grátis
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
          <p style={{ marginTop: 14, fontSize: 12.5, color: 'var(--c-ink-soft)' }}>grátis · sem spam · cancela quando quiser</p>
        </div>
      </section>

      <SiteFooter dark={dark} />
    </div>
  );
}
