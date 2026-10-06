# Superpowers Implementation Plan — Portal Voluntário ONG AAPC

## Goal
Construir e disponibilizar o portal web para a ONG AAPC Canoas, inspirado na arquitetura de alto engajamento da Transformar RS, com foco em captação de doações via PIX, apresentação da história, catálogo de projetos comunitários e canal para voluntariado, pronto para implantação na Vercel.

---

## Assumptions
1. O repositório servirá tanto como protótipo interativo local quanto para build e hospedagem contínua na Vercel.
2. A identidade visual adotará rigorosamente a paleta da ONG AAPC (Verde institucional `#009639`, Azul real `#0072CE`, Branco `#FFFFFF` e variantes).
3. A chave PIX prioritária para doações imediatas é o CNPJ `59.074.303/0001-00`.
4. O documento `PROJECT_MASTER.md` na raiz servirá como a fonte única da verdade para evolução contínua do projeto entre as 3 fases.

---

## Plan

### Step 1: Estruturação do Documento Mestre Vivo (Fase 1)
- **Files**:
  - `PROJECT_MASTER.md`
  - `artifacts/superpowers/brainstorm.md`
  - `artifacts/superpowers/plan.md`
- **Change**:
  - Consolidar em `PROJECT_MASTER.md` todo o dossiê da ONG AAPC (dados extraídos do Instagram, chave PIX, projetos reais, histórico comunitário), análise comparativa da Transformar RS, tokens de design (cores, tipografia, espaçamento), especificação completa das páginas/componentes, e o quadro kanban vivo de fases.
- **Verify**:
  - Verificar existência dos arquivos e integridade de conteúdo via filesystem.

### Step 2: Configuração do Boilerplate & Design System AAPC (Fase 2 - Pré-Protótipo)
- **Files**:
  - `package.json`
  - `index.html`
  - `src/style.css`
  - `assets/img/logo-aapc.png`
- **Change**:
  - Inicializar estrutura moderna com Vite + HTML5 + Vanilla CSS com variáveis customizadas para as cores da AAPC (substituindo a paleta do Transformar RS), fontes Google Fonts (`Poppins`, `DM Sans`, `Playfair Display`), reset CSS e utilitários de grid/flexbox.
  - Adicionar as máscaras vetoriais de ondulação SVG (`--mask-up` e `--mask-down`) adaptadas para o verde e azul da AAPC.
- **Verify**:
  - Executar `npm run build` ou testar visualização estática local sem erros de sintaxe ou referências quebradas.

### Step 3: Implementação da Interface & Componentes Principais (Fase 2 - Protótipo Funcional)
- **Files**:
  - `index.html`
  - `src/main.js`
  - `src/style.css`
- **Change**:
  - **Header**: Sticky header com logo AAPC, menu responsivo (Início, História, Projetos, Envolva-se) e botão de ação rápida "Doe agora".
  - **Hero Section**: Slogan "Um gesto de amor pode mudar uma vida!", banner dinâmico com fotos da atuação em Canoas e CTA principal com botão para abrir o Modal de Doação.
  - **Seção História**: Resumo institucional, missão da AAPC, atuação nas enchentes de Canoas e acolhimento comunitário.
  - **Seção ODS / Impacto**: Alinhamento com metas da ONU (Erradicação da Pobreza, Fome Zero, Saúde e Bem-Estar, Redução das Desigualdades).
  - **Seção Projetos**: Cards interativos com *Projeto Pegue e Leve*, *Bichinhos Caridosos*, *Brechó Solidário*, *Pizza Solidária* e *Apoio Emergencial*.
  - **Seção Seja Voluntário!**: Formulário interativo com seleção de áreas de interesse e geração de mensagem direta para o WhatsApp da ONG.
  - **Modal de Doação PIX**: Popup acessível com Chave CNPJ `59.074.303/0001-00`, QR Code renderizado, botão interativo de 1-clique "Copiar Chave PIX" com animação de confirmação e instruções para o app bancário.
  - **Footer**: Endereço na Rua Sete Povos, 312 - Canoas/RS, links para Instagram `@ong_aapc_`, dados de contato e créditos institucionais.
- **Verify**:
  - Abrir navegador via `browser_subagent` ou servidor local, testar clique no botão "Copiar PIX", testar abertura e fechamento do modal, verificar responsividade mobile (375px) e desktop (1440px).

### Step 4: Otimização de Performance, Acessibilidade e SEO (Fase 3 - Pré-Deploy)
- **Files**:
  - `index.html`
  - `vercel.json`
- **Change**:
  - Inserir meta tags Open Graph (para compartilhamento no WhatsApp e Instagram), favicon da AAPC, tags ARIA para leitores de tela, compressão de imagens e configuração de roteamento/cache para Vercel.
- **Verify**:
  - Validar integridade semântica de tags HTML e ausência de warnings no console.

### Step 5: Publicação & Hospedagem na Vercel (Fase 3 - Deploy)
- **Files**:
  - `vercel.json`
  - Scripts de deploy / Vercel CLI ou MCP
- **Change**:
  - Criar projeto ou disparar deploy para a Vercel, gerando URL pública ativa.
- **Verify**:
  - Acessar a URL de produção na Vercel e validar que o site está 100% online, funcional e com o fluxo de PIX testado.

---

## Risks & mitigations
- **Risco**: Chave PIX copiada incorretamente pelo usuário.
  - **Mitigação**: Botão direto com validação de suporte a `navigator.clipboard` com fallback para seleção de texto clássica e modal claro de instrução.
- **Risco**: Quebra de layout em telas de smartphone.
  - **Mitigação**: Testes em viewports móveis de 360px a 414px, utilizando flex-wrap e CSS grid fluido.

---

## Rollback plan
- Cada fase possui checkpoints isolados no Git.
- Caso qualquer componente do protótipo apresente regressão visual ou erro de build, reverter commits atômicos específicos e restaurar o estado estável anterior.
