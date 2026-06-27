import React, { useState } from 'react';

// ─── Design tokens (mobile) ───────────────────────────────────────────────────
const C = {
  yellow: '#FFCD08', orange: '#FF8A47',
  grad: 'linear-gradient(135deg,#FFCD08 0%,#FF8A47 100%)',
  ink: '#111111', soft: '#6B6869', paper: '#FFFFFF',
  warm: '#F7F6F3', line: '#E9E9E7',
  dark: '#141312', darkWarm: '#1C1B19', darkLine: '#2C2B29',
};
const FONT = "'Helvetica Now Display',-apple-system,BlinkMacSystemFont,sans-serif";

type Tab = 'home' | 'explorar' | 'leitura' | 'perfil';

// ─── Status Bar ───────────────────────────────────────────────────────────────
function StatusBar({ dark }: { dark: boolean }) {
  const c = dark ? '#F0EFED' : '#111';
  return (
    <div style={{ height: 54, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 28px 8px', flexShrink: 0 }}>
      <span style={{ fontSize: 15, fontWeight: 700, color: c, letterSpacing: '-0.02em' }}>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {/* Signal */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill={c}>
          <rect x="0" y="4" width="3" height="8" rx="1" opacity=".4"/>
          <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" opacity=".7"/>
          <rect x="9" y="0" width="3" height="12" rx="1"/>
          <rect x="13.5" y="0" width="3" height="12" rx="1"/>
        </svg>
        {/* Wifi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" fill={c}/>
          <path d="M3.5 6.5C4.9 5.1 6.35 4.4 8 4.4s3.1.7 4.5 2.1" stroke={c} strokeWidth="1.4" strokeLinecap="round" fill="none"/>
          <path d="M1 3.5C3 1.5 5.4.5 8 .5s5 1 7 3" stroke={c} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity=".5"/>
        </svg>
        {/* Battery */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <div style={{ width: 25, height: 13, border: `1.5px solid ${c}`, borderRadius: 3, position: 'relative', opacity: 0.9 }}>
            <div style={{ position: 'absolute', inset: 2, right: 3, background: c, borderRadius: 1.5 }}/>
          </div>
          <div style={{ width: 2, height: 6, background: c, borderRadius: 1, opacity: 0.5 }}/>
        </div>
      </div>
    </div>
  );
}

// ─── Dynamic Island ───────────────────────────────────────────────────────────
function DynamicIsland() {
  return (
    <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 120, height: 34, background: '#000', borderRadius: 20, zIndex: 10 }}/>
  );
}

// ─── Bottom Tab Bar ───────────────────────────────────────────────────────────
function TabBar({ active, onChange, dark }: { active: Tab; onChange: (t: Tab) => void; dark: boolean }) {
  const bg = dark ? C.dark : C.paper;
  const border = dark ? C.darkLine : C.line;

  const tabs: { key: Tab; label: string; icon: (active: boolean) => React.ReactElement }[] = [
    {
      key: 'home', label: 'início',
      icon: (a) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={a ? 2.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
    },
    {
      key: 'explorar', label: 'explorar',
      icon: (a) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={a ? 2.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      ),
    },
    {
      key: 'leitura', label: 'leitura',
      icon: (a) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={a ? 2.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
      ),
    },
    {
      key: 'perfil', label: 'perfil',
      icon: (a) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={a ? 2.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
    },
  ];

  return (
    <div style={{ borderTop: `1px solid ${border}`, background: bg, padding: '8px 0 24px', display: 'flex', flexShrink: 0 }}>
      {tabs.map(t => {
        const isActive = t.key === active;
        const color = isActive ? C.orange : (dark ? '#6B6869' : '#9A9896');
        return (
          <button key={t.key} onClick={() => onChange(t.key)}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', color, padding: '6px 0' }}>
            {t.icon(isActive)}
            <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 500, fontFamily: FONT, letterSpacing: '-0.01em' }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── HOME SCREEN ─────────────────────────────────────────────────────────────
function HomeScreen({ dark }: { dark: boolean }) {
  const bg = dark ? C.dark : C.paper;
  const ink = dark ? '#F0EFED' : C.ink;
  const soft = dark ? '#9A9896' : C.soft;
  const warm = dark ? C.darkWarm : C.warm;
  const line = dark ? C.darkLine : C.line;

  const [saved, setSaved] = useState<number[]>([]);

  const editions = [
    { id: 1, tag: 'morning', tagColor: C.orange, time: '06:06', title: 'Trump anuncia novas tarifas; mercados reagem antes da abertura', topics: ['economia', 'EUA', 'mercados'], read: 5, streak: true },
    { id: 2, tag: 'business', tagColor: '#7C3AED', time: '13:13', title: 'Nubank bate recorde de usuários; fintechs brigam por crédito', topics: ['finanças', 'startups'], read: 4, streak: false },
    { id: 3, tag: 'sports', tagColor: '#DC2626', time: '17:00', title: 'Flamengo na Libertadores: confronto define vaga nas oitavas', topics: ['futebol', 'Libertadores'], read: 3, streak: false },
  ];

  return (
    <div style={{ flex: 1, overflow: 'auto', background: bg, fontFamily: FONT }}>
      {/* App header */}
      <div style={{ padding: '4px 20px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <img src={dark ? 'https://assets.thenewscc.com.br/newLogoWhite1.png' : 'https://assets.thenewscc.com.br/newLogo.png'} alt="the news" style={{ height: 26 }}/>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ background: warm, border: `1px solid ${line}`, borderRadius: 20, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={soft} strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </button>
          <div style={{ width: 36, height: 36, borderRadius: 20, background: C.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, color: '#111' }}>D</div>
        </div>
      </div>

      {/* Streak strip */}
      <div style={{ margin: '0 20px 18px', background: warm, border: `1px solid ${line}`, borderRadius: 14, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 11, color: soft, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>sequência</div>
          <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.03em', background: C.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>
            47 dias 🔥
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: soft, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>esta semana</div>
          <div style={{ display: 'flex', gap: 4 }}>
            {['S','T','Q','Q','S'].map((d, i) => (
              <div key={i} style={{ width: 28, height: 28, borderRadius: 8, background: i < 4 ? C.grad : line, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: i < 4 ? '#111' : soft }}>
                {d}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section label */}
      <div style={{ padding: '0 20px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 13, fontWeight: 800, color: ink, letterSpacing: '-0.01em' }}>edições de hoje</span>
        <span style={{ fontSize: 12, color: C.orange, fontWeight: 600 }}>ver todas</span>
      </div>

      {/* Edition cards */}
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {editions.map(ed => (
          <div key={ed.id} style={{ background: warm, border: `1px solid ${line}`, borderRadius: 16, padding: '14px 16px', position: 'relative' }}>
            {/* top row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <div style={{ background: ed.tagColor + '22', border: `1px solid ${ed.tagColor}44`, borderRadius: 999, padding: '2px 9px' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: ed.tagColor, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{ed.tag}</span>
                </div>
                <span style={{ fontSize: 11, color: soft, fontWeight: 500 }}>· {ed.time}</span>
              </div>
              <button onClick={() => setSaved(s => s.includes(ed.id) ? s.filter(x => x !== ed.id) : [...s, ed.id])}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill={saved.includes(ed.id) ? C.orange : 'none'} stroke={saved.includes(ed.id) ? C.orange : soft} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
              </button>
            </div>
            {/* headline */}
            <p style={{ fontSize: 14, fontWeight: 700, color: ink, lineHeight: 1.35, letterSpacing: '-0.015em', marginBottom: 10 }}>{ed.title}</p>
            {/* bottom row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 5 }}>
                {ed.topics.map(tp => (
                  <span key={tp} style={{ fontSize: 10, fontWeight: 600, color: soft, background: line, borderRadius: 999, padding: '2px 8px' }}>{tp}</span>
                ))}
              </div>
              <span style={{ fontSize: 11, color: soft, fontWeight: 500 }}>{ed.read} min</span>
            </div>
          </div>
        ))}
      </div>

      {/* Para você */}
      <div style={{ padding: '20px 20px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 13, fontWeight: 800, color: ink, letterSpacing: '-0.01em' }}>para você</span>
        <span style={{ fontSize: 12, color: C.orange, fontWeight: 600 }}>explorar tudo</span>
      </div>

      {/* Horizontal scroll newsletters */}
      <div style={{ paddingLeft: 20, paddingBottom: 20, display: 'flex', gap: 10, overflowX: 'auto', scrollbarWidth: 'none' }}>
        {[
          { name: 'night', color: '#4F46E5', desc: 'O resumo da noite' },
          { name: 'money', color: '#059669', desc: 'Finanças pessoais' },
          { name: 'cult', color: '#BE185D', desc: 'Cultura & arte' },
          { name: 'health', color: '#0891B2', desc: 'Saúde & bem-estar' },
        ].map(n => (
          <div key={n.name} style={{ flexShrink: 0, width: 130, background: warm, border: `1px solid ${line}`, borderRadius: 14, padding: '12px 13px' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: n.color + '22', border: `1.5px solid ${n.color}44`, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: n.color, letterSpacing: '-0.01em' }}>{n.name}</span>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: ink, marginBottom: 3, letterSpacing: '-0.01em' }}>the news {n.name}</div>
            <div style={{ fontSize: 11, color: soft, lineHeight: 1.3 }}>{n.desc}</div>
          </div>
        ))}
        <div style={{ width: 20, flexShrink: 0 }}/>
      </div>
    </div>
  );
}

// ─── EXPLORAR SCREEN ──────────────────────────────────────────────────────────
function ExplorarScreen({ dark }: { dark: boolean }) {
  const bg = dark ? C.dark : C.paper;
  const ink = dark ? '#F0EFED' : C.ink;
  const soft = dark ? '#9A9896' : C.soft;
  const warm = dark ? C.darkWarm : C.warm;
  const line = dark ? C.darkLine : C.line;

  const [activeFilter, setActiveFilter] = useState('todos');
  const [subscribed, setSubscribed] = useState<string[]>(['morning', 'business']);

  const filters = ['todos', 'notícias', 'negócios', 'esportes', 'saúde', 'lifestyle'];

  const brands = [
    { key: 'morning', name: 'morning', color: C.orange, cat: 'notícias', freq: 'diária · manhã', desc: 'O resumo do dia em 5 minutos antes de você começar.' },
    { key: 'night', name: 'night', color: '#4F46E5', cat: 'notícias', freq: 'diária · noite', desc: 'O que aconteceu enquanto você trabalhava.' },
    { key: 'business', name: 'business', color: '#7C3AED', cat: 'negócios', freq: 'ter · qui', desc: 'Negócios, startups e o mercado em profundidade.' },
    { key: 'sports', name: 'sports', color: '#DC2626', cat: 'esportes', freq: 'diária', desc: 'Resultados, transferências e análises esportivas.' },
    { key: 'money', name: 'money', color: '#059669', cat: 'negócios', freq: 'diária', desc: 'Finanças pessoais e educação financeira.' },
    { key: 'health', name: 'health', color: '#0891B2', cat: 'saúde', freq: 'semanal', desc: 'Saúde, medicina e bem-estar com base científica.' },
    { key: 'cult', name: 'cult', color: '#BE185D', cat: 'lifestyle', freq: 'semanal', desc: 'Arte, cultura e entretenimento para o fim de semana.' },
    { key: 'travel', name: 'travel', color: '#1D4ED8', cat: 'lifestyle', freq: 'semanal', desc: 'Dicas de viagem, destinos e experiências.' },
  ];

  const filtered = activeFilter === 'todos' ? brands : brands.filter(b => b.cat === activeFilter);

  return (
    <div style={{ flex: 1, overflow: 'auto', background: bg, fontFamily: FONT }}>
      {/* Header */}
      <div style={{ padding: '4px 20px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 20, fontWeight: 900, color: ink, letterSpacing: '-0.03em' }}>explorar</span>
        <button style={{ background: warm, border: `1px solid ${line}`, borderRadius: 20, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={soft} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </button>
      </div>

      {/* Search bar */}
      <div style={{ margin: '0 20px 16px', background: warm, border: `1px solid ${line}`, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', height: 42 }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={soft} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <span style={{ fontSize: 14, color: soft, fontWeight: 400 }}>buscar newsletter…</span>
      </div>

      {/* Filter chips */}
      <div style={{ padding: '0 20px 16px', display: 'flex', gap: 7, overflowX: 'auto', scrollbarWidth: 'none' }}>
        {filters.map(f => {
          const isActive = f === activeFilter;
          return (
            <button key={f} onClick={() => setActiveFilter(f)}
              style={{ flexShrink: 0, padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700, fontFamily: FONT, cursor: 'pointer', transition: 'all 0.15s', border: isActive ? 'none' : `1.5px solid ${line}`, background: isActive ? C.grad : 'none', color: isActive ? '#111' : soft }}>
              {f}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div style={{ padding: '0 20px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {filtered.map(b => {
          const isSub = subscribed.includes(b.key);
          return (
            <div key={b.key} style={{ background: warm, border: `1px solid ${line}`, borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {/* Color band */}
              <div style={{ height: 6, background: b.color }}/>
              <div style={{ padding: '12px 12px 12px' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: b.color, letterSpacing: '-0.01em', marginBottom: 4 }}>the news {b.name}</div>
                <div style={{ fontSize: 10, color: soft, marginBottom: 6, lineHeight: 1.4 }}>{b.desc}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 9, fontWeight: 600, color: soft, background: line, borderRadius: 999, padding: '2px 7px' }}>{b.freq}</span>
                  <button onClick={() => setSubscribed(s => s.includes(b.key) ? s.filter(x => x !== b.key) : [...s, b.key])}
                    style={{ background: isSub ? b.color + '22' : b.color, border: 'none', borderRadius: 999, padding: '4px 10px', fontSize: 10, fontWeight: 700, color: isSub ? b.color : '#fff', cursor: 'pointer', fontFamily: FONT }}>
                    {isSub ? '✓ salvo' : '+ seguir'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── PLACEHOLDER SCREEN ───────────────────────────────────────────────────────
function PlaceholderScreen({ label, dark }: { label: string; dark: boolean }) {
  const bg = dark ? C.dark : C.paper;
  const ink = dark ? '#F0EFED' : C.ink;
  const soft = dark ? '#9A9896' : C.soft;
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: bg, gap: 12, fontFamily: FONT }}>
      <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg,#FFCD08,#FF8A47)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>📖</div>
      <p style={{ fontSize: 16, fontWeight: 800, color: ink, letterSpacing: '-0.02em' }}>{label}</p>
      <p style={{ fontSize: 13, color: soft, textAlign: 'center', maxWidth: 200, lineHeight: 1.5 }}>Tela disponível na versão completa do app</p>
    </div>
  );
}

// ─── IPHONE FRAME ─────────────────────────────────────────────────────────────
function IPhoneFrame({ dark, children }: { dark: boolean; children: React.ReactNode }) {
  const frameColor = dark ? '#1C1B19' : '#E8E6E1';
  const innerBorder = dark ? '#2C2B29' : '#D0CEC9';
  return (
    <div style={{
      width: 390, height: 844,
      background: dark ? C.dark : C.paper,
      borderRadius: 52,
      border: `10px solid ${frameColor}`,
      boxShadow: `0 0 0 1.5px ${innerBorder}, 0 48px 100px rgba(0,0,0,0.4), 0 16px 40px rgba(0,0,0,0.25)`,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      <DynamicIsland />
      {children}
    </div>
  );
}

// ─── MAIN APP PROTOTYPE ───────────────────────────────────────────────────────
const OUTER = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0D0C0B; font-family: 'Helvetica Now Display', -apple-system, sans-serif; }
  ::-webkit-scrollbar { display: none; }

  @font-face {
    font-family: 'Helvetica Now Display';
    src: url('https://assets.thenewscc.com.br/fonts/HelveticaNowDisplay-Regular.woff2') format('woff2');
    font-weight: 400;
  }
  @font-face {
    font-family: 'Helvetica Now Display';
    src: url('https://assets.thenewscc.com.br/fonts/HelveticaNowDisplay-Bold.woff2') format('woff2');
    font-weight: 700;
  }
  @font-face {
    font-family: 'Helvetica Now Display';
    src: url('https://assets.thenewscc.com.br/fonts/HelveticaNowDisplay-Black.woff2') format('woff2');
    font-weight: 900;
  }
`;

export function AppPrototype() {
  const [tab, setTab] = useState<Tab>('home');
  const [dark, setDark] = useState(true);
  const [showGuide, setShowGuide] = useState(true);

  const renderScreen = () => {
    switch (tab) {
      case 'home':     return <HomeScreen dark={dark} />;
      case 'explorar': return <ExplorarScreen dark={dark} />;
      case 'leitura':  return <PlaceholderScreen label="leitura" dark={dark} />;
      case 'perfil':   return <PlaceholderScreen label="perfil" dark={dark} />;
    }
  };

  return (
    <>
      <style>{OUTER}</style>

      {/* Full‑page wrapper */}
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg,#1a1816 0%,#0D0C0B 60%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', gap: 32 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <img src="https://assets.thenewscc.com.br/newLogoWhite1.png" alt="the news" style={{ height: 28, marginBottom: 4 }}/>
          <h1 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B6869' }}>protótipo interativo · app redesign</h1>
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <span style={{ fontSize: 11, color: '#6B6869', background: '#1C1B19', border: '1px solid #2C2B29', borderRadius: 999, padding: '3px 12px', fontWeight: 600 }}>início · tela principal</span>
            <span style={{ fontSize: 11, color: '#6B6869', background: '#1C1B19', border: '1px solid #2C2B29', borderRadius: 999, padding: '3px 12px', fontWeight: 600 }}>explorar · marcas</span>
          </div>
        </div>

        {/* Phone */}
        <IPhoneFrame dark={dark}>
          <StatusBar dark={dark} />
          {renderScreen()}
          <TabBar active={tab} onChange={setTab} dark={dark} />
        </IPhoneFrame>

        {/* Controls */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button onClick={() => setDark(d => !d)}
            style={{ background: '#1C1B19', border: '1px solid #2C2B29', borderRadius: 999, padding: '9px 20px', fontSize: 13, fontWeight: 600, color: '#F0EFED', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
            {dark
              ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>modo claro</>
              : <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>modo escuro</>}
          </button>
          <a href="/" style={{ background: 'linear-gradient(135deg,#FFCD08,#FF8A47)', borderRadius: 999, padding: '9px 20px', fontSize: 13, fontWeight: 700, color: '#111', textDecoration: 'none' }}>
            ver landing page →
          </a>
        </div>

        {/* Guide tooltip */}
        {showGuide && (
          <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: '#1C1B19', border: '1px solid #2C2B29', borderRadius: 14, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
            <span style={{ fontSize: 13, color: '#9A9896' }}>👆 toque nas abas para navegar entre as telas</span>
            <button onClick={() => setShowGuide(false)} style={{ background: 'none', border: 'none', color: '#6B6869', cursor: 'pointer', fontSize: 16, lineHeight: 1 }}>✕</button>
          </div>
        )}
      </div>
    </>
  );
}
