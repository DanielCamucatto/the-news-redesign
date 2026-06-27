import { useState } from 'react';
import type { CSSProperties } from 'react';

export const font = "'Helvetica Now Display', -apple-system, BlinkMacSystemFont, sans-serif";

// ─── Theme state (persisted in localStorage) ──────────────────────────────────
export function useTheme() {
  const [dark, setDarkRaw] = useState(() => localStorage.getItem('tn-dark') === '1');
  const [hc,   setHcRaw]   = useState(() => localStorage.getItem('tn-hc')   === '1');

  const setDark = (v: boolean | ((p: boolean) => boolean)) => {
    setDarkRaw(prev => {
      const next = typeof v === 'function' ? v(prev) : v;
      localStorage.setItem('tn-dark', next ? '1' : '0');
      return next;
    });
  };
  const setHc = (v: boolean | ((p: boolean) => boolean)) => {
    setHcRaw(prev => {
      const next = typeof v === 'function' ? v(prev) : v;
      localStorage.setItem('tn-hc', next ? '1' : '0');
      return next;
    });
  };

  return { dark, setDark, hc, setHc };
}

// ─── CSS variables + global styles shared across all pages ────────────────────
export const SHELL_STYLES = `
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
    --c-stats-bg:     #111111;
    --c-stats-label:  #AAA9A7;
  }
  [data-theme="dark"] {
    --c-ink:          #F0EFED;
    --c-ink-soft:     #9A9896;
    --c-paper:        #141312;
    --c-warm:         #1C1B19;
    --c-line:         #2C2B29;
    --c-line-hard:    #3C3B39;
    --c-header-bg:    rgba(20,19,18,0.88);
    --c-stats-bg:     #0A0908;
    --c-stats-label:  #6B6869;
  }
  [data-hc="1"] {
    --c-ink:          #000000;
    --c-ink-soft:     #000000;
    --c-paper:        #FFFFFF;
    --c-warm:         #FFFFFF;
    --c-line:         #000000;
    --c-line-hard:    #000000;
    --c-header-bg:    #FFFFFF;
    --c-stats-bg:     #000000;
    --c-stats-label:  #FFFFFF;
  }
  [data-theme="dark"][data-hc="1"] {
    --c-ink:          #FFFFFF;
    --c-ink-soft:     #FFFFFF;
    --c-paper:        #000000;
    --c-warm:         #000000;
    --c-line:         #FFFFFF;
    --c-line-hard:    #FFFFFF;
    --c-header-bg:    #000000;
    --c-stats-bg:     #000000;
    --c-stats-label:  #FFFFFF;
  }
  /* stats-bg must always be dark — enforce in light hc too */
  [data-hc="1"] { --c-stats-bg: #000000; }

  /* Shared button */
  .tn-btn {
    background: var(--c-grad);
    color: #111;
    border: none;
    border-radius: 999px;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.18s cubic-bezier(0.22,1,0.36,1), box-shadow 0.18s ease, filter 0.15s ease;
    font-family: inherit;
  }
  .tn-btn:hover {
    transform: scale(1.04) translateY(-2px);
    box-shadow: 0 10px 28px rgba(255,138,71,0.45);
    filter: brightness(1.06);
  }
  .tn-btn:active { transform: scale(0.97); box-shadow: none; }
  [data-hc="1"] .tn-btn, [data-hc="1"] .tn-btn:hover {
    background: #000 !important; color: #ff0 !important;
    box-shadow: none !important; filter: none !important; border: 2px solid #000 !important;
  }
  [data-theme="dark"][data-hc="1"] .tn-btn, [data-theme="dark"][data-hc="1"] .tn-btn:hover {
    background: #fff !important; color: #000 !important; border-color: #fff !important;
  }

  /* Shared utility toggles */
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
  .tn-hc-btn-active {
    background: #000 !important; color: #ff0 !important; border-color: #000 !important;
  }
  [data-theme="dark"] .tn-hc-btn-active {
    background: #fff !important; color: #000 !important; border-color: #fff !important;
  }

  /* Nav links */
  .tn-nav-link {
    font-size: 15px; color: var(--c-ink-soft); font-weight: 500;
    display: flex; align-items: center; gap: 4px;
    text-decoration: none; transition: color 0.15s ease;
  }
  .tn-nav-link:hover { color: var(--c-orange); }
  .tn-nav-link.active { color: var(--c-ink); font-weight: 700; }

  /* Footer */
  .tn-footer-link { color: var(--c-ink-soft); text-decoration: none; transition: color 0.15s; }
  .tn-footer-link:hover { color: var(--c-ink); }

  /* Responsive header */
  @media (max-width: 1024px) {
    .tn-desktop-nav { display: none !important; }
    .tn-desktop-cta { display: none !important; }
    .tn-hamburger   { display: flex !important; }
  }
  @media (min-width: 1025px) { .tn-hamburger { display: none !important; } }
`;

const navLinks = [
  { label: 'app',     href: 'https://thenews.com.br/app', external: true },
  { label: 'podcast', href: 'https://open.spotify.com/show/5cYtKjFwlRCSZKyV6ZC8Wq', external: true },
  { label: 'marcas',  href: '/marcas' },
  { label: 'dúvidas', href: '/#faq' },
];

// ─── Shared header ────────────────────────────────────────────────────────────
export function SiteHeader({ dark, setDark, hc, setHc, activePath = '/' }: {
  dark: boolean;
  setDark: (v: boolean | ((p: boolean) => boolean)) => void;
  hc:   boolean;
  setHc:   (v: boolean | ((p: boolean) => boolean)) => void;
  activePath?: string;
}) {
  const [menu, setMenu] = useState(false);

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'var(--c-header-bg)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid var(--c-line)', transition: 'background 0.3s' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={dark ? 'https://assets.thenewscc.com.br/newLogoWhite1.png' : 'https://assets.thenewscc.com.br/newLogo.png'} alt="the news" style={{ height: 34 }} />
        </a>

        <nav className="tn-desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {navLinks.map(l => (
            <a key={l.label} href={l.href}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noopener noreferrer' : undefined}
              className={`tn-nav-link${activePath === l.href ? ' active' : ''}`}>
              {l.label}
              {l.external && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>}
            </a>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* HC toggle */}
          <button
            className={`tn-dark-btn${hc ? ' tn-hc-btn-active' : ''}`}
            onClick={() => setHc(v => !v)}
            aria-pressed={hc}
            aria-label={hc ? 'Desativar alto contraste' : 'Ativar alto contraste'}
            title="Alto contraste"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 2a10 10 0 0 1 0 20V2z" fill="currentColor" stroke="none"/>
            </svg>
            contraste
          </button>
          {/* Dark toggle */}
          <button className="tn-dark-btn" onClick={() => setDark(v => !v)} aria-label={dark ? 'Ativar modo claro' : 'Ativar modo escuro'}>
            {dark
              ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>}
            {dark ? 'claro' : 'escuro'}
          </button>

          <a href="/#hero" className="tn-btn tn-desktop-cta" style={{ padding: '9px 22px', fontSize: 14, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
            inscreva-se
          </a>

          <button className="tn-hamburger" onClick={() => setMenu(v => !v)}
            style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 4, color: 'var(--c-ink)', display: 'none' }} aria-label="Menu">
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
          <a href="/#hero" onClick={() => setMenu(false)} className="tn-btn"
            style={{ display: 'inline-flex', marginTop: 16, padding: '12px 24px', fontSize: 15, textDecoration: 'none' }}>
            inscreva-se
          </a>
        </div>
      )}
    </header>
  );
}

// ─── Shared footer ─────────────────────────────────────────────────────────────
export function SiteFooter({ dark }: { dark: boolean }) {
  return (
    <footer style={{ borderTop: '1px solid var(--c-line)', padding: '32px 0', fontFamily: font }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <a href="/"><img src={dark ? 'https://assets.thenewscc.com.br/newLogoWhite1.png' : 'https://assets.thenewscc.com.br/newLogo.png'} alt="the news" style={{ height: 28 }} /></a>
        <div style={{ display: 'flex', gap: 24, fontSize: 13 }}>
          {[['privacidade', 'https://thenewscc.com.br/policies'], ['termos', 'https://thenewscc.com.br/terms'], ['fale conosco', 'https://thenewscc.com.br/contact']].map(([label, href]) => (
            <a key={label} href={href} className="tn-footer-link">{label}</a>
          ))}
        </div>
        <p style={{ fontSize: 13, color: 'var(--c-ink-soft)' }}>© 2026 Grupo TNS</p>
      </div>
    </footer>
  );
}

// ─── Gradient text helper ─────────────────────────────────────────────────────
export const gradText: CSSProperties = {
  background: 'linear-gradient(135deg, #FFCD08 0%, #FF8A47 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};
