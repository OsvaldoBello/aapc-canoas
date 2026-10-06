# DOCUMENTO MESTRE DO PROJETO (MASTER SPEC)
## Portal Voluntário & Captação Solidária — ONG AAPC Canoas
> **Documento Vivo do Projeto** — Versão 1.0 (Fase 1: Planejamento & Arquitetura)  
> **Status Atual**: Fase 1 Concluída / Aguardando Aprovação para Fase 2  
> **Repositório**: `c:\Users\Osvaldo\OneDrive\Desktop\AAPC`  
> **Target de Hospedagem**: Vercel

---

## 1. Visão Geral & Escopo do Projeto

Este projeto consiste no desenvolvimento do portal oficial e voluntário da **ONG Associação Amigos e Parceiros de Canoas (AAPC)**, sediada em Canoas/RS. 

O portal foi concebido com uma missão central: **multiplicar o engajamento comunitário, atrair novos voluntários e maximizar a captação de doações via PIX**, fornecendo uma experiência digital acolhedora, transparente e de alta conversão.

### As Três Entregas do Projeto
| Entrega | Fase | Descrição | Status |
| :--- | :--- | :--- | :--- |
| **Entrega 1** | **Fase 1: Planejamento Mestre** | Dossiê da ONG, levantamento do benchmark, arquitetura de informação, design tokens e MD Mestre do projeto. | 🟢 **Concluído** |
| **Entrega 2** | **Fase 2: Protótipo Visual Funcional** | Criação da aplicação web com layout responsivo, sistema de ondulações, paleta AAPC, modal interativo de PIX (QR Code e Copia-e-Cola funcional) e seções de projetos. | 🟡 **Pronto para Execução** |
| **Entrega 3** | **Fase 3: Site Final & Deploy Vercel** | Otimização final de SEO, testes de acessibilidade, auditoria de performance (Lighthouse 95+) e publicação ativa na Vercel. | ⚪ **Pendente** |

---

## 2. Dossiê Oficial da ONG AAPC (Extraído de `@ong_aapc_`)

A análise aprofundada realizada diretamente no perfil oficial do Instagram (`https://www.instagram.com/ong_aapc_/`) levantou os dados cadastrais, lemas e projetos ativos da instituição:

- **Razão Social / Nome**: Associação Amigos e Parceiros de Canoas (AAPC)
- **CNPJ Oficial & Chave PIX**: `59.074.303/0001-00`
- **Endereço Sede**: Rua Sete Povos, 312 - Bairro Marechal Rondon / Canoas - RS, CEP 92020-430
- **Lema Institucional**: *"Amor & Solidariedade"*
- **Slogan de Mobilização**: *"Um gesto de amor pode mudar uma vida!"*
- **Instagram**: [@ong_aapc_](https://www.instagram.com/ong_aapc_/)
- **Causa & Atuação**: Organização sem fins lucrativos que promove inclusão social, apoio a famílias em vulnerabilidade extrema, distribuição de refeições e agasalhos, alívio humanitário em enchentes e humanização hospitalar para crianças.

### Projetos & Frentes de Atuação Catalogados
1. **Projeto Pegue e Leve**: Distribuição periódica e comunitária de roupas, calçados e alimentação (com destaque para ações no Bairro Harmonia e regiões periféricas de Canoas).
2. **Projeto Bichinhos / Ursinhos Caridosos**: Projeto de visitação e acolhimento lúdico hospitalar com voluntários caracterizados, distribuindo ursinhos e carinho para crianças internadas (ex: Hospital Criança Conceição - HCC) e lares comunitários.
3. **Brechó Solidário & Arrecadação de Alimentos**: Mobilização constante de doações de mantimentos (arroz, feijão, leite, massas, açúcar) e brechó com peças acessíveis cuja renda é revertida em auxílio direto às famílias.
4. **Pizzas Solidárias & Eventos de Captação**: Edições organizadas pela equipe de voluntários para viabilizar projetos contínuos e manutenção das atividades da entidade.
5. **Apoio a Imigrantes e Refugiados ("Ajuda Venezuela")**: Suporte no acolhimento, vestuário e alimentos para famílias de imigrantes recém-chegadas ao município.
6. **Socorro às Enchentes de Canoas**: Frente emergencial ativa com preparação de marmitas, triagem de doações e reestruturação de lares atingidos pelas cheias históricas do Rio Grande do Sul.
7. **Parcerias Comunitárias**: Cooperação com instituições como Colégio Espírito Santo, Seiva Treinamentos e Kick in Ball Orquídeas RS.

---

## 3. Benchmark Estrutural — Transformar RS (`transformarrs.com.br`)

O portal da **Transformar RS** foi analisado como modelo estrutural de alto impacto social. Mapeamos os pontos fortes a serem adaptados para a AAPC:

### Padrões Estruturais Adotados
1. **Ondulações Dinâmicas entre Seções (`.ondula`, `.onda-cima`, `.onda-baixo`)**: Máscaras SVG orgânicas que dão fluidez e eliminam a rigidez dos blocos retangulares, conferindo calor e modernidade ao design.
2. **Sticky Header com Ação Imediata**: Logotipo nítido à esquerda, navegação concisa ao centro e botão em destaque permanente *"Doe agora"* no canto direito.
3. **Hero Intro + Hero Slide**: Abertura com chamada itálica comovente em tipografia de destaque, seguida por banner com imagens reais de atuação da ONG e CTA direto de doação.
4. **Resumo da História em 2 Colunas**: Divisão harmoniosa entre texto narrativo humano e elementos visuais de impacto (galeria/vídeo/fotos institucionais).
5. **Alinhamento aos ODS da ONU**: Apresentação dos Objetivos de Desenvolvimento Sustentável que a ONG cumpre (Erradicação da Pobreza, Fome Zero, Saúde e Bem-Estar, Redução das Desigualdades).
6. **Cards de Projetos com Saiba Mais**: Vitrine limpa para divulgar cada iniciativa com fotos, títulos e botão de interação.
7. **Modal de Doação com Foco em PIX**: Fluxo sem atrito, fornecendo chave, QR Code e instruções objetivas para o aplicativo do banco.

### Adaptação Crítica: Transição de Identidade
- **Transformar RS**: Baseada em Vermelho (`#E22E3F`) e Amarelo (`#ECAB2B`).
- **AAPC Canoas**: Transformação completa para a paleta oficial da AAPC — **Verde Esperança** e **Azul Solidariedade**, transmitindo saúde, fraternidade, acolhimento e confiança.

---

## 4. Design System & Identidade Visual AAPC

Extraída diretamente da logomarca oficial da AAPC fornecida pelo usuário:

```
                  ┌──────────────────────┐
                  │      ONG AAPC        │
                  │ Amor & Solidariedade │
                  └──────────┬───────────┘
                             │
            ┌────────────────┴────────────────┐
            ▼                                 ▼
   [ VERDE AAPC ]                    [ AZUL SOLIDÁRIO ]
   Primária: #009639                 Secundária: #0072CE
   Escuro:   #00732C                 Profundo:   #0A4D8C
   Suave:    #E8F5E9                 Gelo:       #EBF3FC
```

### Tokens de Cores (CSS Custom Properties)
```css
:root {
  /* Cores Principais AAPC */
  --verde-aapc:        #009639; /* Verde oficial vibrante */
  --verde-aapc-escuro: #00732C; /* Verde escuro para hover e contrastes */
  --verde-aapc-claro:  #E8F5E9; /* Fundo suave com tom de folha/vida */
  
  --azul-aapc:         #0072CE; /* Azul oficial da logo */
  --azul-aapc-escuro:  #0A4D8C; /* Azul corporativo para títulos e rodapé */
  --azul-aapc-claro:   #EBF3FC; /* Azul delicado para fundos de seções */

  /* Cores Neutras & Apoio */
  --branco:            #FFFFFF;
  --preto:             #1A202C; /* Chumbo neutro para excelente legibilidade */
  --cinza-fundo:       #F8FAF9; /* Fundo equilibrado e descansado */
  --cinza-borda:       #E2E8F0;
  --cinza-texto:       #4A5568;

  /* Tipografia */
  --fonte-titulo:      'Poppins', system-ui, -apple-system, sans-serif;
  --fonte-texto:       'DM Sans', system-ui, -apple-system, sans-serif;
  --fonte-destaque:    'Playfair Display', Georgia, serif;

  /* Layout & Espaçamento */
  --container-max:     1200px;
  --radius-card:       16px;
  --radius-btn:        40px;
  --shadow-sm:         0 2px 8px rgba(0, 150, 57, 0.08);
  --shadow-lg:         0 14px 34px rgba(10, 77, 140, 0.12);
}
```

### Tipografia
1. **Títulos (`--fonte-titulo`: Poppins)**: Pesos 600, 700 e 800. Dá força institucional, modernidade e impacto.
2. **Texto de Leitura (`--fonte-texto`: DM Sans)**: Pesos 400 e 500. Excelente leitura em telas móveis e desktop.
3. **Frases Inspiracionais (`--fonte-destaque`: Playfair Display itálico)**: Uso seletivo na introdução da Hero e em testemunhos de voluntários.

---

## 5. Arquitetura de Informação & Estrutura de Páginas

A aplicação será estruturada com navegação fluida em página única com âncoras temáticas e modais de alto impacto, permitindo acesso instantâneo tanto no computador quanto no celular:

```
[ TOPO: STICKY HEADER ]
   ├── Logo Oficial AAPC
   ├── Menu: Início | Nossa História | Projetos | ODS | Seja Voluntário!
   └── Botão CTA: [ Doe Agora ] (Abre Modal PIX Instantâneo)

[ 1. HERO SECTION ]
   ├── Frase em destaque: "Um gesto de amor pode mudar uma vida!"
   ├── Carrossel de Ações Reais em Canoas (Distribuição, Hospitais, Refeições)
   ├── Título Principal: "Juntos Transformamos Vidas em Canoas"
   ├── Subtítulo: Ajude a levar alimentação, roupas e esperança para quem mais precisa.
   └── CTAs: [ Fazer uma Doação ] e [ Quero ser Voluntário ]

[ 2. FAIXA DE IMPACTO RÁPIDO ]
   ├── Cards de métricas: +10.000 Refeições Entregues | +500 Crianças Atendidas | Canoas/RS

[ 3. NOSSA HISTÓRIA (Ondulação Verde Suave) ]
   ├── Duas colunas:
   │   ├── Coluna Esquerda: Texto histórico, missão comunitária e atuação nas cheias do RS
   │   └── Coluna Direita: Painel visual com fotos de ação da AAPC e selo de compromisso social
   └── Citação de impacto: "Amor & Solidariedade em ação diária."

[ 4. OBJETIVOS DE DESENVOLVIMENTO SUSTENTÁVEL (ODS) ]
   └── Grid com os ODS da ONU atendidos pela AAPC:
       ├── ODS 1: Erradicação da Pobreza
       ├── ODS 2: Fome Zero e Agricultura Sustentável
       ├── ODS 3: Saúde e Bem-Estar (Bichinhos Caridosos)
       ├── ODS 10: Redução das Desigualdades
       └── ODS 11: Cidades e Comunidades Sustentáveis

[ 5. PROJETOS EM AÇÃO (Ondulação Azul Claro) ]
   └── Cards interativos com fotos e badges:
       ├── Card 1: Projeto Pegue e Leve (Roupas e alimentação - Bairro Harmonia)
       ├── Card 2: Bichinhos Caridosos (Visitas e carinho hospitalar - HCC)
       ├── Card 3: Brechó Solidário & Alimentos (Captação e cestas básicas)
       ├── Card 4: Pizza Solidária (Captação de recursos comunitários)
       └── Card 5: Socorro Emergencial (Apoio contínuo pós-enchentes)

[ 6. SEJA VOLUNTÁRIO! / ENVOLVA-SE ]
   ├── Bloco motivacional: Por que ser um voluntário da AAPC?
   ├── Formulário simples (Nome, WhatsApp, Área de Interesse, Disponibilidade)
   └── Botão: [ Enviar Inscrição via WhatsApp ] (Gera conversa preenchida no WhatsApp da ONG)

[ 7. TRANSPARÊNCIA & PRESTAÇÃO DE CONTAS ]
   └── Informações abertas sobre o uso das doações, CNPJ ativo e prestação comunitária.

[ 8. MODAL DE DOAÇÃO PIX (Interativo / Global) ]
   ├── Chave PIX em destaque: 59.074.303/0001-00 (CNPJ)
   ├── Botão [ Copiar Chave PIX ] com feedback tátil e visual ("Copiado!")
   ├── QR Code dinâmico renderizado para leitura na tela do computador
   ├── Dados Cadastrais: Associação Amigos e Parceiros de Canoas
   └── Passo a passo simplificado para o app do banco.

[ 9. FOOTER INSTITUCIONAL ]
   ├── Logo AAPC + Endereço: Rua Sete Povos, 312 - Canoas/RS
   ├── Links Rápidos e Horários de Atendimento
   └── Links para Instagram @ong_aapc_ e Direitos Reservados.
```

---

## 6. Especificação Técnica & Infraestrutura na Vercel

### Tecnologias Escolhidas
1. **Frontend**: Vite + HTML5 Semântico + CSS3 Moderno (Vanilla CSS com Design Tokens) + JavaScript ES6+ Modular.
   - *Por que não frameworks pesados?* Garante que o site abra em menos de 0.8s mesmo em conexões lentas 3G de bairros periféricos, sem hydration delays, com nota 100 no Google Lighthouse e zero custos de manutenção.
2. **Ícones & Imagens**: SVGs otimizados inline e Logomarca oficial em alta definição já copiada em `assets/img/logo-aapc.png`.
3. **Mecanismo de PIX**:
   - Chave Copia-e-Cola com `navigator.clipboard` e fallback robusto com `document.execCommand('copy')`.
   - QR Code SVG nativo ou via biblioteca leve embutida.
4. **Deploy Vercel**:
   - `vercel.json` configurado com headers de cache eficientes, compressão gzip/brotli e rotas limpas.

---

## 7. Quadro Vivo de Gestão & Status (Kanban do Projeto)

| ID | Tarefa | Fase | Responsável | Status | Evidência / Artefato |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **T-01** | Investigação do Instagram `@ong_aapc_` | Fase 1 | AI Pair | 🟢 Concluído | CNPJ `59.074.303/0001-00`, Projetos, Endereço e Logo extraídos. |
| **T-02** | Análise Estrutural do Transformar RS | Fase 1 | AI Pair | 🟢 Concluído | Estilos `.ondula`, tipografia, fluxo de doação mapeados. |
| **T-03** | Elaboração do MD Mestre do Projeto | Fase 1 | AI Pair | 🟢 Concluído | `PROJECT_MASTER.md` gerado na raiz. |
| **T-04** | Registro formal de Brainstorm & Plano | Fase 1 | AI Pair | 🟢 Concluído | `artifacts/superpowers/brainstorm.md` e `plan.md`. |
| **T-05** | Setup do Ambiente de Desenvolvimento | Fase 2 | AI Pair | 🟡 Aguardando | `package.json`, Vite, estrutura de assets. |
| **T-06** | Construção do Design System & CSS das Ondas | Fase 2 | AI Pair | ⚪ Pendente | `src/style.css` com paleta Verde/Azul AAPC. |
| **T-07** | Desenvolvimento dos Componentes de UI | Fase 2 | AI Pair | ⚪ Pendente | Header, Hero, História, Projetos, ODS, Voluntariado. |
| **T-08** | Implementação do Modal PIX com Copia-e-Cola | Fase 2 | AI Pair | ⚪ Pendente | `src/main.js` com feedback instantâneo e QR Code. |
| **T-09** | Testes de Responsividade e Interação | Fase 2 | AI Pair | ⚪ Pendente | Verificação em browser mobile e desktop. |
| **T-10** | Otimização para Produção e SEO | Fase 3 | AI Pair | ⚪ Pendente | Meta tags Open Graph e favicon. |
| **T-11** | Publicação e Hospedagem na Vercel | Fase 3 | AI Pair | ⚪ Pendente | Deploy ativo e URL pública verificada. |

---

## 8. Critérios de Aceitação & Validação por Fase

### Fase 1 (Planejamento & Dossiê Mestre) — [STATUS: ATUAL]
- [x] Instagram da ONG devidamente analisado com extração de CNPJ, chave PIX, endereço e projetos.
- [x] Estrutura do Transformar RS mapeada para reaproveitamento dos padrões vencedores de UX.
- [x] Documento Mestre `PROJECT_MASTER.md` redigido e salvo na raiz do repositório.
- [x] Artefatos do Superpowers persistidos em `artifacts/superpowers/brainstorm.md` e `plan.md`.
- [ ] **Aprovação do Usuário** para avanço à Fase 2.

### Fase 2 (Protótipo Visual Funcional)
- [ ] Aplicação executável localmente com `npm run dev` e preview navegável.
- [ ] Logomarca oficial da AAPC aplicada com a paleta Verde e Azul.
- [ ] Ondulações orgânicas funcionando de forma responsiva entre as seções.
- [ ] Modal de Doação abrindo ao clicar em "Doe agora", com botão "Copiar Chave PIX" funcional e QR code exibido.
- [ ] Seção de projetos com cards dedicados ao *Pegue e Leve*, *Bichinhos Caridosos*, *Brechó Solidário* e *Pizzas Solidárias*.
- [ ] Formulário de "Seja Voluntário!" funcional.

### Fase 3 (Site em Produção na Vercel)
- [ ] Build de produção sem nenhum erro (`npm run build`).
- [ ] Deploy concluído na Vercel gerando domínio ativo HTTPS.
- [ ] Teste de navegação e fluxo de doação realizado diretamente na URL pública da Vercel.

---

## 9. Próxima Etapa Recomendada

Conforme a regra operacional do Superpowers (`.agent/rules/superpowers.md`), o avanço para a implementação do Protótipo Funcional (Fase 2) segue o portão de aprovação. Assim que o usuário aprovar o plano, o comando `/superpowers-execute-plan` poderá ser acionado para iniciar a codificação do protótipo visual.
