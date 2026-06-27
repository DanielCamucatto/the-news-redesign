# The News Redesign — Documento de Decisões de Design

## 📋 Entrega 2 — Decisões de Design

### Por que essas telas e não outras? Qual o impacto?

Escolhi **Hábito (Streak)** e **Edições (Leitura)** por serem as duas telas com maior potencial de impacto em retenção e engajamento:

1. **Tela de Streak/Hábito**: O Streak é o mecanismo mais poderoso de gamificação do app. Analisando o site atual do the news, identifiquei que o conceito de "Hábito" é central na proposta de valor ("criando bons hábitos e te deixando mais inteligente"). No entanto, ao navegar pelo app, o feedback visual do streak é fraco — não há celebração do progresso, nem visibilidade clara do streak atual. Redesenhei para:
   - Número do streak em **120px bold** (mesmo estilo ousado da landing page original)
   - Calendário semanal visual com dias checkados ✅
   - Barra de progresso semanal
   - Toast de celebração ao clicar "Ler edição de hoje"
   - Cards explicando os benefícios do hábito (reforço positivo)

   **Impacto esperado**: Aumento na retenção diária, redução de churn e mais indicações (pessoas engajadas indicam mais).

2. **Tela de Edições**: O app atual apresenta as edições de forma textual, sem hierarquia clara. Redesenhei com:
   - Destaque escuro (fundo preto + texto amarelo) para a edição de hoje — invertendo a hierarquia padrão
   - Cards compactos para edições anteriores com data, headline truncada e seta
   - Leitura em tela cheia com tipografia grande, espaçamento generoso
   - Tags coloridas (Política, Tech, Economia) para escaneabilidade
   - Botões de reação (👍 Gostei, 🔗 Compartilhar)

   **Impacto esperado**: Mais tempo de leitura, maior clareza na comunicação das notícias, incentivo à leitura diária.

### Por que essas escolhas de cor, hierarquia e tipografia?

**Design System extraído diretamente do site oficial**:
- Usei o MCP do Chrome para inspecionar o CSS, extraindo cores exatas: amarelo `#F9D029`, preto `#111111`, escala de cinzas no espaço oklch
- Fonte primária: "Helvetica Now Display" (a mesma do site), stack com fallbacks
- Hierarquia tipográfica: headings em 120px/32px/24px seguindo a ousadia da marca

**Decisões de cor**:
- Mantive o **alto contraste preto/branco** característico da marca the news
- Usei **amarelo como cor de destaque** (streak number, botão CTA, tags) — consistente com a identidade
- Fundo secundário sutil (`#F8F8F7`) para cards, mantendo o ar minimalista

**Hierarquia visual**:
- Número do streak é o elemento mais proeminente (120px bold) — o que o usuário mais se importa
- CTA "Ler edição de hoje" usa fundo preto com texto amarelo e animação glow
- Na tela de edições, a edição de hoje é DESTAQUE absoluto (card escuro), edições anteriores são secundárias

**Tipografia**:
- "Helvetica Now Display" para headings (mesma do site original)
- Pesos: 900 para impacto máximo, 700 para corpo, 400-500 para labels
- Letter-spacing negativo nos números grandes (técnica tipográfica profissional)
- Line-height generoso (1.5-1.8) para legibilidade

### Qual era a tensão mais difícil de resolver e como resolveu?

**A tensão principal**: Como ser ousado sem perder a essência minimalista do the news.

O the news tem uma identidade muito forte: é limpo, direto, sem firulas. O risco ao redesenhar era "poluir" visualmente com elementos de gamificação.

**Minha solução**:
1. Usei o **mesmo design system** (cores, fontes, espaçamento) extraído do site oficial — então qualquer tela redesenhada "poderia ser do the news"
2. Adicionei animações sutis (pulse no dia atual, glow no número do streak ao celebrar, fadeInUp nas páginas) — micro-interações que enriquecem sem poluir
3. Mantive o **espaço negativo generoso** (padding 24px, gaps consistentes) — característica do design original
4. Todo elemento novo serve a um propósito funcional (calendário → progresso, barra → meta semanal, tags → escaneabilidade) — nada é decorativo

---

## 📋 Entrega 3 — Autocrítica

### O que faria diferente se tivesse mais 1 dia?

1. **Testes de usabilidade com usuários reais**: Faria 3-5 entrevistas com leitores do the news para validar se o redesign do streak realmente motiva ou se parece "gamificação forçada"

2. **Animações mais refinadas**: Usaria Framer Motion para transições entre telas (slide, shared elements), melhor feedback tátil nos botões (haptic feedback)

3. **Estados adicionais**:
   - Tela de streak com 0 dias (onboarding)
   - Streak quebrado (emoji triste + CTA "Recomece seu hábito")
   - Edição já lida (indicador visual de "check")
   - Loading states com skeleton screens

4. **Acessibilidade**: Faria auditoria completa de contraste (WCAG AA), testaria com VoiceOver/TalkBack, adicionaria `aria-labels` e `role` attributes

5. **Performance**: Implementaria lazy loading para o conteúdo das edições, code splitting por rota

### O que ficou aberto?

- **Sincronização real**: Os dados são mock. Faltou integrar com API real do the news (Streak API, Editions API)
- **Push notifications**: Lógica de lembrete diário às 06:06 para reforçar o hábito
- **Indicação e recompensas**: A tela de streak menciona "indique e ganhe prêmios" mas não implementei o fluxo
- **Modo escuro**: O design atual assume fundo branco, mas o the news poderia ter dark mode
- **Métricas e analytics**: Eventos para rastrear engajamento (streak viewed, edition opened, CTA clicked)

### O que não gostei?

- **Barra de navegação inferior**: Usei SVG inline, mas idealmente seria um componente de ícone separado com estados ativo/inativo mais refinados
- **Mock data hardcoded**: Os dados das edições estão no código. Uma versão real precisaria de um CMS ou API
- **Falta de internacionalização**: Alguns textos estão em português hardcoded

### O que testaria a seguir?

1. **A/B test**: Versão atual vs. redesign medindo streak retention rate
2. **Heatmap**: Onde os usuários clicam na tela de edições (CTA é realmente o elemento mais clicado?)
3. **Tempo de leitura**: Se a hierarquia visual das edições aumenta o tempo médio de leitura
4. **Survey qualitativo**: "O streak te motiva a ler todo dia?" (1-5 escala Likert)