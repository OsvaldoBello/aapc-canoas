# DOCUMENTO MESTRE DO PROJETO (MASTER SPEC)
## Portal Voluntário & Captação Solidária: ONG AAPC Canoas
> **Documento Vivo do Projeto**: Versão 6.0 (Atualizações Oficiais da Diretoria da AAPC: Projeto NanaNenê com Foto Real Anonimizada, Cesta Slim, Ponto de Coleta Loja Essence, Contato da Rosa e Novos Horários)  
> **Status Atual**: Concluído, Validado Visualmente, Responsivo e Testado via Playwright  
> **Repositório**: `c:\Users\Osvaldo\OneDrive\Desktop\AAPC`  
> **Target de Hospedagem**: Vercel  
> **E-mail de Teste Configurado**: `osvaldooliveirabello@gmail.com`  
> **E-mail Oficial de Produção**: `ongamigoseparceiroscanoas@gmail.com`

---

## 1. Visão Geral & Diretrizes do Portal

O portal da **Associação Amigos e Parceiros de Canoas (AAPC)** une a autenticidade real das ações da ONG com uma arquitetura moderna, responsiva e estruturada para engajar voluntários, associados contribuintes e doadores.

### Principais Módulos do Sistema

1. **Hub "Como eu posso ajudar?" (`#como-ajudar`)**:
   - Grid de 3 colunas (layout inspirado nas melhores práticas de captação de ONGs):
     - **Doações**: Direcionamento para doações materiais permanentes e chave PIX.
     - **Voluntariado**: Convite à atuação presencial ou "sem sair de casa".
     - **Seja Associado**: Adesão a contribuições financeiras mensais recorrentes.
   - Botões de chamada no Verde Oficial AAPC (`var(--verde-aapc)` / `#009639`).

2. **Seção "O Que Você Pode Doar na Sede" (`#o-que-doar`)**:
   - **Card 1 (Segurança Alimentar - Alimentos Não Perecíveis)**: Foco na cesta básica *"slim"* para atendimento emergencial e famílias cadastradas (arroz, feijão, óleo de soja, massa, açúcar, leite em caixa e complementos como café, farinha, polenta, sal, achocolatado, erva-mate/Chima, molhos e enlatados).
   - **Card 2 (Vestuário & Dignidade - Roupas, Calçados & Utensílios)**: Peças para Pegue e Leve, brechó solidário e auxílio na montagem de lares (cobertores, lençóis, toalhas, agasalhos, alta procura por roupas e calçados masculinos, roupas infantis, meias, roupas íntimas, pijamas, calçados, móveis, utensílios de cozinha, além de tampinhas plásticas e blisters vazios de medicamentos para reciclagem solidária).
   - **Card 3 (Infância & Longevidade - Cuidado Infantil e Idosos)**: Apoio direto ao Projeto NanaNenê, mães em vulnerabilidade e acolhimento em asilos de idosos e PCD (fraldas infantis e geriátricas, lenços umedecidos, pomadas, sabonetes, cremes hidratantes, shampoos, enxovais de bebês, berços, colchões, banheiras, carrinhos e brinquedos higienizados).
   - **Card 4 (Saúde & Higiene - Higiene Pessoal & Limpeza)**: Kits de dignidade e produtos de limpeza para lares acolhidos.

3. **Seção de Projetos em Ação (`#projetos`)**:
   - **Projeto Pegue e Leve**: Araras comunitárias abertas com atendimento em bairros de Canoas (como Rio Branco e Fátima) e na Região Metropolitana, inclusive em Porto Alegre.
   - **Bichinhos Caridosos**: Parceria que troca pelúcias por doações e realiza acolhimento comunitário e visitas a instituições de saúde e lares.
   - **Cestas Básicas & Brechó Solidário**: Sede na Rua Sete Povos, com captação de recursos mantida por associados, pelo brechó e pela tradicional feira do uniforme escolar.
   - **Projeto NanaNenê (Maternidade Solidária)**: Parceria com grupo de mulheres que montam enxovais para mães vulneráveis de comunidades carentes, com gestão de inscrições e arrecadação pela AAPC. Exibição com foto real tratada e anonimizada (`projeto-nananene.jpg`), preservando a identidade das famílias conforme diretriz da ONG e a LGPD.

4. **Seção Unificada de Engajamento: "Faça Parte da Nossa Causa" (`#faca-parte`)**:
   - **Seletor de Abas Interativo**:
     - `Quero ser Voluntário`: Ações domiciliares ("sem sair de casa") e presenciais (com entrega de cestas básicas, Pegue e Leve de roupas e cobertores nas comunidades vulneráveis), acervo com fotos reais (La Salle, tricô solidário, entrega de mantimentos), formulário completo e acordeão do Termo de Adesão ao Serviço Voluntário (8 artigos da Lei nº 9.608/1998).
     - `Quero ser Associado`: Gancho de sustentabilidade sem verbas públicas, benefício de alimentação garantida em parceria com grupos de marmitas, seletor de valores em pílulas verdes (`R$ 20,00`, `R$ 50,00`, `R$ 100,00` e `Outro valor`), formulário cadastral completo e consentimentos estatutário e LGPD.

5. **Localização, Horários & Contato (`#onde-estamos`)**:
   - **Horários Oficiais de Atendimento na Sede**:
     - Recebimento de doações: Segunda a quinta-feira, das 14h às 18h.
     - Entrega de pedidos e Brechó Solidário: Terças e quintas-feiras, das 14h às 18h.
   - **Ponto de Coleta Parceiro**:
     - **Loja Essence**: Ao lado da sede da AAPC, com recebimento contínuo em horário comercial.
   - **Canais Oficiais**:
     - WhatsApp Geral: `(51) 99270-1114`
     - Rosa / Coordenação: `(51) 98133-4287`
     - Instagram Oficial: `@ong_aapc_`

6. **Motor de Disparo Assíncrono Duplo: E-mail (FormSubmit AJAX) + Planilha Compartilhada (Excel / Google Sheets)**:
   - **E-mail**: Notificação instantânea para a coordenação (`osvaldooliveirabello@gmail.com`).
   - **Planilha Compartilhada**: Disparo paralelo para Webhook (`WEBHOOK_PLANILHA_URL`).

---

## 2. Matriz de Arquivos do Projeto

| Arquivo | Função |
| :--- | :--- |
| `index.html` | Estrutura semântica completa: Hero, Hub Como Ajudar, História, Doações com Cesta Slim e Idosos, Projetos com NanaNenê, Associados, Voluntariado, PIX e Sede com Loja Essence e Rosa |
| `src/style.css` | Design System com tokens, Poppins/DM Sans, cores oficiais, cards de projetos, badges de ponto de coleta parceiro e responsividade mobile estrita |
| `src/main.js` | Disparo AJAX via FormSubmit e Planilha Compartilhada, máscaras, seletores de valor, acordeão do termo, cópia do PIX e menu mobile |
| `public/img/fotos/projeto-nananene.jpg` | Foto real tratada e anonimizada do Projeto NanaNenê (laço lilás e identidade oficial) |
| `public/img/fotos/acao-voluntarios-lasalle.jpg` | Foto real limpa dos voluntários com a Universidade La Salle |
| `public/img/fotos/trico-croche-solidario.jpg` | Foto real dos trabalhos manuais de tricô e crochê solidário para o inverno |
| `public/img/fotos/voluntarios-sede-comunidades.jpg` | Foto real da entrega direta de alimentos e cestas básicas no porta-malas |
| `scripts/verify_forms.py` | Suite de testes automatizados Playwright com validação de doações, projetos, horários e responsividade |

---

## 3. Evidências de Teste e Validação

- **Viewport Mobile (375px x 812px)**: Zero scroll horizontal (`scrollWidth === clientWidth === 375px`).
- **Viewport Desktop (1366px x 900px)**:
  - 4 cards de doações com alinhamento visual perfeito e conteúdo detalhado.
  - 4 cards de projetos sociais incluindo Projeto NanaNenê, Pegue e Leve metropolitano e Bichinhos Caridosos.
  - Card de atendimento com horários das 14h às 18h e destaque do Ponto de Coleta Parceiro Loja Essence.
  - Canal direto da Rosa (Coordenação) integrado aos canais oficiais e rodapé.
- **Build de Produção**: `npm run build` gerando bundle limpo em `dist/` em 1.73s com 0 erros.
- **Evidências Fotográficas**:
  - `artifacts/verification_forms/desktop_projetos_nananene.png`
  - `artifacts/verification_forms/desktop_doacoes_slim.png`
  - `artifacts/verification_forms/desktop_sede_horarios_essence.png`
  - `artifacts/verification_forms/mobile_projetos_nananene.png`
  - `artifacts/verification_forms/mobile_sede_horarios.png`
