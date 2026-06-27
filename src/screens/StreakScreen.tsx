import { useState } from 'react';

// Mock data — simularia o backend real
const mockStreakDays = [
  { label: 'Seg', read: true },
  { label: 'Ter', read: true },
  { label: 'Qua', read: true },
  { label: 'Qui', read: false, today: true },
  { label: 'Sex', read: false },
];

export function StreakScreen() {
  const [streak] = useState(12); // dias consecutivos
  const [showMotivation, setShowMotivation] = useState(false);

  const handleReadToday = () => {
    setShowMotivation(true);
    setTimeout(() => setShowMotivation(false), 2000);
  };

  return (
    <div className="page-enter" style={{
      padding: 'var(--spacing-lg)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100dvh',
    }}>
      {/* Header minimalista */}
      <header style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 'var(--spacing-xl)',
        paddingTop: 'var(--spacing-md)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-sm)',
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--color-text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-brand-yellow)',
            fontWeight: 800,
            fontSize: '12px',
            letterSpacing: '-0.5px',
          }}>
            TN
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, lineHeight: 1.2 }}>the news</div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>☕️ Hábito de leitura</div>
          </div>
        </div>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: 'var(--radius-full)',
          background: 'var(--color-bg-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
        }}>
          👤
        </div>
      </header>

      {/* Streak principal — número grande + chama */}
      <div style={{
        width: '100%',
        textAlign: 'center',
        marginBottom: 'var(--spacing-xl)',
      }}>
        <div style={{
          fontSize: '14px',
          color: 'var(--color-text-secondary)',
          fontWeight: 500,
          marginBottom: 'var(--spacing-sm)',
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
        }}>
          Seu Streak 🔥
        </div>
        <div style={{
          fontSize: '120px',
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: '-4px',
          color: 'var(--color-text-primary)',
          animation: showMotivation ? 'streakFireGlow 0.8s ease infinite' : 'none',
          fontFamily: "'Helvetica Now Display', 'Inter', sans-serif",
        }}>
          {streak}
        </div>
        <div style={{
          fontSize: '18px',
          fontWeight: 600,
          color: 'var(--color-text-secondary)',
          marginTop: 'var(--spacing-sm)',
        }}>
          dias consecutivos
        </div>
        <div style={{
          fontSize: '13px',
          color: 'var(--color-text-tertiary)',
          marginTop: '4px',
        }}>
          {streak >= 7 ? '🎉 Você está no nível Café Espresso!' : 'Continue lendo para desbloquear recompensas'}
        </div>
      </div>

      {/* Calendário semanal simplificado */}
      <div style={{
        width: '100%',
        background: 'var(--color-bg-secondary)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--spacing-lg)',
        marginBottom: 'var(--spacing-lg)',
      }}>
        <div style={{
          fontSize: '13px',
          fontWeight: 600,
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--spacing-md)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          Esta semana
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 'var(--spacing-sm)',
        }}>
          {mockStreakDays.map((day, i) => (
            <div key={i} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
              flex: 1,
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: day.read 
                  ? 'var(--color-brand-yellow)' 
                  : day.today 
                    ? 'var(--color-bg-primary)' 
                    : 'var(--color-bg-tertiary)',
                border: day.today ? '2px solid var(--color-brand-yellow)' : 'none',
                fontSize: '20px',
                animation: day.today ? 'pulse 2s ease infinite' : 'none',
                position: 'relative',
              }}>
                {day.read ? '✅' : day.today ? '📖' : ''}
                {day.today && !day.read && (
                  <div style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '-2px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--color-brand-yellow)',
                  }}/>
                )}
              </div>
              <span style={{
                fontSize: '11px',
                fontWeight: day.today ? 700 : 400,
                color: day.today ? 'var(--color-brand-yellow)' : 'var(--color-text-secondary)',
              }}>
                {day.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Progresso da semana */}
      <div style={{
        width: '100%',
        marginBottom: 'var(--spacing-lg)',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--spacing-sm)',
        }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
            Progresso da semana
          </span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
            3/5
          </span>
        </div>
        <div style={{
          width: '100%',
          height: '8px',
          borderRadius: 'var(--radius-full)',
          background: 'var(--color-bg-tertiary)',
          overflow: 'hidden',
        }}>
          <div style={{
            width: '60%',
            height: '100%',
            borderRadius: 'var(--radius-full)',
            background: 'var(--color-brand-yellow)',
            transition: 'width var(--transition-slow)',
          }}/>
        </div>
      </div>

      {/* CTA Principal — "Ler edição de hoje" */}
      <button
        onClick={handleReadToday}
        style={{
          width: '100%',
          padding: '20px 24px',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--color-text-primary)',
          color: 'var(--color-brand-yellow)',
          border: 'none',
          fontSize: '17px',
          fontWeight: 700,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--spacing-sm)',
          animation: 'buttonGlow 2s ease infinite',
          transition: 'transform var(--transition-fast)',
          marginBottom: 'var(--spacing-xl)',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <span style={{ fontSize: '20px' }}>☕️</span>
        Ler edição de hoje
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>

      {/* Benefícios do hábito — cards */}
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-sm)',
        marginBottom: 'var(--spacing-xl)',
      }}>
        <h2 style={{
          fontSize: '16px',
          fontWeight: 700,
          marginBottom: 'var(--spacing-sm)',
          color: 'var(--color-text-primary)',
        }}>
          Por que manter o hábito?
        </h2>
        
        {[
          { icon: '🧠', title: 'Mais inteligente em 5 min', desc: 'Notícias curadas, direto ao ponto' },
          { icon: '🎁', title: 'Brindes exclusivos', desc: 'Indique amigos e ganhe prêmios do the news' },
          { icon: '📊', title: 'Acompanhe sua evolução', desc: 'Cada dia conta para sua sequência' },
        ].map((item, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-md)',
            padding: 'var(--spacing-md)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--color-bg-secondary)',
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-bg-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              flexShrink: 0,
            }}>
              {item.icon}
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toast de motivação */}
      {showMotivation && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--color-text-primary)',
          color: 'var(--color-brand-yellow)',
          padding: '12px 24px',
          borderRadius: 'var(--radius-full)',
          fontSize: '14px',
          fontWeight: 600,
          zIndex: 200,
          animation: 'scaleIn var(--transition-normal) forwards',
          boxShadow: 'var(--shadow-lg)',
        }}>
          🔥 Continue assim! Você está criando um hábito incrível!
        </div>
      )}
    </div>
  );
}