# Superpowers Brainstorm: Portal Voluntário ONG AAPC

## Goal
Desenvolver um website institucional e de captação voluntária de alto impacto para a **ONG Associação Amigos e Parceiros de Canoas (AAPC)**, sediada em Canoas/RS. O portal deve tomar como referência estrutural e de UX o website da **Transformar RS** (layout dinâmico com ondulações, foco estratégico em doação via PIX, seções de história, projetos e voluntariado), aplicando com rigor a identidade visual e as cores da AAPC (Verde e Azul da logomarca oficial) e preparando a solução para hospedagem na **Vercel**.

O projeto é estruturado em três macro-entregas:
1. **Entrega 1 (Atual)**: Documento Mestre do Projeto (`PROJECT_MASTER.md`) e planejamento formal via Superpowers.
2. **Entrega 2**: Protótipo visual funcional interativo (design rico, responsivo, microanimações, modal PIX com cópia e QR code).
3. **Entrega 3**: Portal completo em produção, integrado e hospedado na Vercel.

---

## Constraints
- **Identidade Visual**: Fidelidade às cores institucionais da AAPC extraídas de sua logomarca (Verde `#009639` / `#138A36`, Azul Real `#0072CE` / `#1A6AFE`, Branco `#FFFFFF` e suporte a contrastes acessíveis).
- **Dados Reais da ONG**: Utilização dos dados extraídos do Instagram oficial `@ong_aapc_`:
  - **CNPJ / Chave PIX**: `59.074.303/0001-00`
  - **Razão Social / Nome**: Associação Amigos e Parceiros de Canoas
  - **Endereço**: Rua Sete Povos, 312 - Canoas / RS
  - **Slogan**: "Amor & Solidariedade" / "Um gesto de amor pode mudar uma vida!"
- **Referência Estrutural (Transformar RS)**: Ondulações orgânicas (SVG wave masks) separando seções, fluxo de doação ágil ("Doe agora" em destaque fixo no topo e na hero), páginas/seções de História, Projetos ("Pegue e Leve", "Bichinhos Caridosos / Ursinhos", "Brechó Solidário", "Pizza Solidária"), e canal direto para "Seja Voluntário!".
- **Hospedagem & Infraestrutura**: Deploy na Vercel com carregamento ultrarrápido, compatibilidade mobile-first, sem custos de servidor backend (arquitetura estática moderna/jamstack).
- **Governança Superpowers**: Obrigatoriedade de plano com portões de aprovação (`/superpowers-execute-plan`), persistência em `artifacts/superpowers/`, e documento mestre vivo atualizado a cada fase.

---

## Known context
1. **Perfil do Instagram (`@ong_aapc_`)**:
   - Organização comunitária atuante em Canoas/RS, com forte histórico em apoio alimentar, vestuário, ações hospitalares infantis e auxílio emergencial às famílias atingidas por enchentes e vulnerabilidade social.
   - Chave PIX oficial registrada na bio: `59.074.303/0001-00` (CNPJ).
   - Projetos de destaque observados nas postagens e destaques:
     - *Projeto Pegue e Leve* (Roupas, calçados e alimentação comunitária no Bairro Harmonia).
     - *Projeto Bichinhos/Ursinhos Caridosos* (Acolhimento lúdico hospitalar infantil, ex: Hospital Criança Conceição).
     - *Brechó e Alimentos Solidários* (Arrecadação e distribuição de toneladas de mantimentos).
     - *Campanha de Pizzas Solidárias* (Captação e sustentabilidade financeira).
2. **Benchmark Transformar RS (`transformarrs.com.br`)**:
   - Tipografia harmoniosa: `Poppins` (títulos marcantes), `DM Sans` (legibilidade de corpo de texto) e toques de `Playfair Display` itálico em citações.
   - Padrão visual com divisores ondulados SVG (`.ondula`, `--mask-up`, `--mask-down`).
   - Sticky header com logotipo, links de navegação limpos e botão CTA de destaque.
   - Modal e seção de doação com PIX simplificado (copia-e-cola e QR Code).
   - Apresentação de metas e ODS (Objetivos de Desenvolvimento Sustentável da ONU).

---

## Risks
1. **Risco de Dependências Excessivas**: Adotar frameworks pesados que adicionem atrito de build ou sobrecarreguem uma ONG sem equipe técnica para manutenção contínua.
   - *Mitigação*: Arquitetura moderna em Vite + HTML5 Semântico / CSS moderno com tokens / JS modular nativo, garantindo performance 100 no Lighthouse, deploy instantâneo na Vercel e manutenção descomplicada.
2. **Risco de Ruptura de Fluxo no PIX**: O usuário não conseguir copiar a chave PIX ou o QR code não abrir em dispositivos móveis.
   - *Mitigação*: Botão de 1-clique com API `navigator.clipboard`, fallback visual com tooltip de confirmação ("Chave copiada com sucesso!"), e renderização de QR Code SVG direto da chave CNPJ `59.074.303/0001-00`.
3. **Risco de Desalinhamento Visual**: Misturar a paleta vermelha/amarela da Transformar RS com a paleta da AAPC.
   - *Mitigação*: Criar design tokens específicos no CSS (`--verde-aapc`, `--azul-aapc`, `--verde-escuro`, `--azul-profundo`), substituindo integralmente as cores do benchmark pela identidade oficial da AAPC.

---

## Options (2 a 4)
- **Opção 1 (Recomendada): Vite Single-Page Application Modular com Roteamento por Seções / Hash e Subpáginas Limpas**:
  - Arquitetura extremamente rápida com Vite, CSS moderno Vanilla (Custom Properties, Flexbox/Grid, SVG wave dividers), componentes modulares e zero overhead de runtime.
  - Perfeito para Vercel (build em segundos, CDN global, cache automático).
  - Inclui modal interativo de PIX, carrossel de hero, filtros de projetos e formulário interativo de voluntariado com integração para WhatsApp/E-mail.
- **Opção 2: Next.js (App Router) com React e Tailwind**:
  - Ecossistema robusto, porém com complexidade desnecessária para um portal institucional de ONG, demandando mais bundles JS e tempo de carregamento em redes móveis 3G/4G no RS.
- **Opção 3: Multi-Página HTML Tradicional estática pura (sem bundler)**:
  - Muito simples, porém com perda de ergonomia de desenvolvimento, repetição de headers/footers e menor fluidez nas transições de prototipagem.

---

## Recommendation
Adotar a **Opção 1**: Aplicação construída com **Vite** e padrões modernos da web (HTML5 semântico, CSS avançado com tokens baseados na AAPC e JavaScript modular). Essa abordagem une:
1. Máxima velocidade de carregamento para os voluntários e doadores (inclusive em celulares modestos);
2. Visual premium ("wow factor") com microanimações e ondas elegantes como no Transformar RS;
3. Compatibilidade nativa e imediata com a Vercel via CLI ou Git;
4. Facilidade de personalização pelo documento mestre vivo.

---

## Acceptance criteria
1. **Documento Mestre (`PROJECT_MASTER.md`)**:
   - Conter análise completa do Instagram `@ong_aapc_` e do benchmark `transformarrs.com.br`.
   - Conter especificação de design tokens, paleta de cores (Verde AAPC `#009639`, Azul AAPC `#0072CE`), tipografia e arquitetura de componentes.
   - Conter estrutura detalhada das telas: Home com foco em Doação, Nossa História, Projetos, Seja Voluntário! e Modal PIX.
   - Conter tabela de status vivo (Fase 1, Fase 2, Fase 3) para acompanhamento transparente.
2. **Portão de Aprovação Superpowers**:
   - Salvar `artifacts/superpowers/brainstorm.md` e `artifacts/superpowers/plan.md`.
   - Confirmar a persistência em disco.
   - Aguardar aprovação formal do usuário antes de iniciar o código do protótipo funcional.
