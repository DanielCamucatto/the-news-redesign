import { useState } from 'react';

// Mock editions — simulariam as edições reais do the news
const MOCK_EDITIONS = [
  {
    id: '1',
    date: 'Quinta, 26 de Junho',
    time: '06:06',
    headline: 'STF decide futuro das redes sociais no Brasil',
    summary: 'Ministros analisam regulação de plataformas digitais e responsabilidade sobre conteúdo',
    tags: ['🏛️ Política', '📱 Tech'],
    readTime: '4 min',
    isToday: true,
  },
  {
    id: '2',
    date: 'Quarta, 25 de Junho',
    time: '06:06',
    headline: 'Brasil atinge recorde de energia renovável',
    summary: 'Matriz elétrica brasileira alcança 92% de fontes limpas no primeiro semestre',
    tags: ['🌱 Sustentabilidade', '⚡ Energia'],
    readTime: '3 min',
    isToday: false,
    isNew: false,
  },
  {
    id: '3',
    date: 'Terça, 24 de Junho',
    time: '06:06',
    headline: 'Mercado financeiro: Ibovespa sobe 2,3% com otimismo',
    summary: 'Investidores reagem positivamente a novos dados econômicos e cenário internacional',
    tags: ['💰 Economia', '📈 Mercado'],
    readTime: '5 min',
    isToday: false,
    isNew: false,
  },
  {
    id: '4',
    date: 'Segunda, 23 de Junho',
    time: '06:06',
    headline: 'OpenAI anuncia novo modelo com raciocínio avançado',
    summary: 'Tecnologia promete revolucionar interação homem-máquina com compreensão contextual',
    tags: ['🤖 IA', '💻 Tecnologia'],
    readTime: '4 min',
    isToday: false,
    isNew: false,
  },
];

export function EditionsScreen() {
  const [selectedEdition, setSelectedEdition] = useState<string | null>(null);
  const [readingProgress] = useState(3); // edições lidas esta semana

  const handleOpenEdition = (id: string) => {
    setSelectedEdition(id);
    // Scroll to top da edição
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedEdition(null);
  };

  // Se uma edição está selecionada, mostrar o conteúdo completo
  if (selectedEdition) {
    const edition = MOCK_EDITIONS.find(e => e.id === selectedEdition);
    if (!edition) return null;

    return (
      <div className="page-enter" style={{
        padding: 'var(--spacing-lg)',
        minHeight: '100dvh',
      }}>
        {/* Header da edição */}
        <header style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-md)',
          marginBottom: 'var(--spacing-xl)',
        }}>
          <button
            onClick={handleBack}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--color-bg-secondary)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
              {edition.date}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
              ☕️ Edição das {edition.time}
            </div>
          </div>
        </header>

        {/* Conteúdo da edição */}
        <article>
          <div style={{
            display: 'flex',
            gap: 'var(--spacing-sm)',
            flexWrap: 'wrap',
            marginBottom: 'var(--spacing-md)',
          }}>
            {edition.tags.map((tag, i) => (
              <span key={i} style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--color-bg-secondary)',
                fontSize: '12px',
                fontWeight: 500,
                color: 'var(--color-text-secondary)',
              }}>
                {tag}
              </span>
            ))}
            <span style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--color-brand-yellow)',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
            }}>
              {edition.readTime}
            </span>
          </div>

          <h1 style={{
            fontSize: '32px',
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: '-1px',
            color: 'var(--color-text-primary)',
            marginBottom: 'var(--spacing-lg)',
            fontFamily: "'Helvetica Now Display', 'Inter', sans-serif",
          }}>
            {edition.headline}
          </h1>

          <p style={{
            fontSize: '17px',
            lineHeight: 1.6,
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--spacing-xl)',
          }}>
            {edition.summary}
          </p>

          {/* Corpo simulado da notícia */}
          <div style={{
            fontSize: '16px',
            lineHeight: 1.8,
            color: 'var(--color-text-primary)',
          }}>
            <p style={{ marginBottom: 'var(--spacing-md)' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p style={{ marginBottom: 'var(--spacing-md)' }}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <div style={{
              background: 'var(--color-bg-secondary)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--spacing-md)',
              marginBottom: 'var(--spacing-md)',
              borderLeft: '3px solid var(--color-brand-yellow)',
            }}>
              <p style={{ fontSize: '15px', fontStyle: 'italic', color: 'var(--color-text-secondary)' }}>
                "O contexto é fundamental para entender as nuances desta decisão histórica. Acompanhe os desdobramentos nos próximos dias."
              </p>
            </div>
            <p style={{ marginBottom: 'var(--spacing-md)' }}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>
        </article>

        {/* Ações da edição */}
        <div style={{
          display: 'flex',
          gap: 'var(--spacing-sm)',
          marginTop: 'var(--spacing-xl)',
          paddingTop: 'var(--spacing-lg)',
          borderTop: '1px solid var(--color-bg-muted)',
        }}>
          <button style={{
            flex: 1,
            padding: '14px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--color-bg-secondary)',
            border: 'none',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            color: 'var(--color-text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--spacing-sm)',
          }}>
            👍 Gostei
          </button>
          <button style={{
            flex: 1,
            padding: '14px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--color-bg-secondary)',
            border: 'none',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            color: 'var(--color-text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--spacing-sm)',
          }}>
            🔗 Compartilhar
          </button>
        </div>
      </div>
    );
  }

  // Lista de edições
  return (
    <div className="page-enter" style={{
      padding: 'var(--spacing-lg)',
      minHeight: '100dvh',
    }}>
      {/* Header */}
      <header style={{
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
            <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>📰 Edições</div>
          </div>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-sm)',
          padding: '8px 14px',
          borderRadius: 'var(--radius-full)',
          background: 'var(--color-bg-secondary)',
          fontSize: '13px',
          fontWeight: 600,
          color: 'var(--color-text-secondary)',
        }}>
          📖 {readingProgress}/7 essa semana
        </div>
      </header>

      {/* Destaque do dia */}
      {MOCK_EDITIONS.filter(e => e.isToday).map((edition) => (
        <button
          key={edition.id}
          onClick={() => handleOpenEdition(edition.id)}
          style={{
            width: '100%',
            textAlign: 'left',
            padding: 'var(--spacing-lg)',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--color-text-primary)',
            color: 'var(--color-brand-yellow)',
            border: 'none',
            cursor: 'pointer',
            marginBottom: 'var(--spacing-xl)',
            transition: 'transform var(--transition-fast)',
            position: 'relative',
            overflow: 'hidden',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.01)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--color-brand-yellow)',
            color: 'var(--color-text-primary)',
            fontSize: '11px',
            fontWeight: 700,
          }}>
            HOJE
          </div>
          <div style={{
            fontSize: '13px',
            fontWeight: 500,
            opacity: 0.7,
            marginBottom: 'var(--spacing-sm)',
          }}>
            ☕️ Edição de hoje • {edition.time}
          </div>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: '-0.5px',
            color: 'var(--color-brand-yellow)',
            marginBottom: 'var(--spacing-sm)',
            fontFamily: "'Helvetica Now Display', 'Inter', sans-serif",
          }}>
            {edition.headline}
          </h2>
          <p style={{
            fontSize: '14px',
            lineHeight: 1.5,
            color: 'var(--color-brand-yellow)',
            opacity: 0.8,
            marginBottom: 'var(--spacing-md)',
          }}>
            {edition.summary}
          </p>
          <div style={{
            display: 'flex',
            gap: 'var(--spacing-sm)',
          }}>
            {edition.tags.map((tag, i) => (
              <span key={i} style={{
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(249, 208, 41, 0.15)',
                fontSize: '11px',
                fontWeight: 500,
              }}>
                {tag}
              </span>
            ))}
          </div>
        </button>
      ))}

      {/* Lista de edições anteriores */}
      <div style={{
        marginBottom: 'var(--spacing-md)',
      }}>
        <div style={{
          fontSize: '16px',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          marginBottom: 'var(--spacing-md)',
        }}>
          Edições anteriores
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-sm)',
        }}>
          {MOCK_EDITIONS.filter(e => !e.isToday).map((edition) => (
            <button
              key={edition.id}
              onClick={() => handleOpenEdition(edition.id)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: 'var(--spacing-md)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-bg-secondary)',
                border: 'none',
                cursor: 'pointer',
                transition: 'transform var(--transition-fast)',
                display: 'flex',
                gap: 'var(--spacing-md)',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.01)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--color-bg-primary)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <div style={{ fontSize: '16px', fontWeight: 900, lineHeight: 1, color: 'var(--color-text-primary)' }}>
                  {edition.date.split(',')[0].substring(0, 3)}
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--color-text-secondary)',
                  marginBottom: '2px',
                }}>
                  {edition.date} • {edition.readTime}
                </div>
                <div style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  lineHeight: 1.3,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {edition.headline}
                </div>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                color: 'var(--color-text-tertiary)',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}