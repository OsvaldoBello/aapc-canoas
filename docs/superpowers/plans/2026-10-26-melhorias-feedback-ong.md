# Plano de Implementação: Atualizações e Melhorias do Portal AAPC (Feedback da ONG)

> **Plano Baseado na Spec:** `docs/superpowers/specs/2026-10-26-melhorias-feedback-ong-design.md`  
> **Target:** Vercel / Vite SPA  
> **Status:** Pronto para Execução

---

## Task 1: Preparação e Otimização dos Assets Visuais do Projeto NanaNenê

**Files:**
- Create: `public/img/fotos/projeto-nananene.jpg`
- Create: `img/fotos/projeto-nananene.jpg`
- Create: `public/img/fotos_otimizadas/projeto-nananene.jpg` (se aplicável)
- Create: `img/fotos_otimizadas/projeto-nananene.jpg` (se aplicável)

**Interfaces:**
- Produz: Imagem real do Projeto NanaNenê em proporção 4:3 (800x600), com o laço lilás e a logo oficial "Projeto Nana Nenê por Margaridas", sem expor dados pessoais manuscritos, em conformidade com o pedido da ONG e a LGPD.

- [ ] **Step 1: Gerar e salvar imagem do Projeto NanaNenê**
Executar script Python para gerar a versão nítida e anonimizada em `public/img/fotos/projeto-nananene.jpg` e `img/fotos/projeto-nananene.jpg`.

- [ ] **Step 2: Verificar dimensões e integridade do arquivo gerado**

---

## Task 2: Ajuste dos Textos nas Abas de Engajamento (`#faca-parte`)

**Files:**
- Modify: `index.html:610-630` (Aba Voluntariado)
- Modify: `index.html:920-940` (Aba Associados)

- [ ] **Step 1: Atualizar texto do card de voluntariado presencial**
Alterar a descrição do item "Entregas nos bairros vulneráveis":
```html
<li>
  <strong>Entregas nos bairros vulneráveis</strong>
  <span>Participação em ações sociais de distribuição de cestas básicas, Pegue e Leve de roupas, cobertores e utensílios nas comunidades vulneráveis.</span>
</li>
```

- [ ] **Step 2: Atualizar texto do benefício de alimentação na aba Associados**
Alterar a descrição de "Alimentação garantida o ano todo":
```html
<div class="beneficio-item">
  <span class="beneficio-check" aria-hidden="true">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  </span>
  <div>
    <strong>Alimentação garantida o ano todo</strong>
    <p>Cestas básicas e parceria com grupos que distribuem marmitas em ações sociais para quem mais precisa.</p>
  </div>
</div>
```

---

## Task 3: Atualização dos Cards de Doações Físicas (`#o-que-doar`)

**Files:**
- Modify: `index.html:280-355`

- [ ] **Step 1: Atualizar Card 1 (Alimentos Não Perecíveis / Cesta Slim)**
Incluir o conceito de cesta básica "slim" e a lista de itens solicitada pela ONG:
```html
<div class="card-doacao">
  <div class="card-doacao-topo">
    <span class="card-doacao-icone" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    </span>
    <span class="card-doacao-categoria">Segurança Alimentar</span>
  </div>
  <h3>Alimentos Não Perecíveis</h3>
  <p class="card-doacao-desc">
    Montagem de cesta básica "slim" para famílias cadastradas e emergências, garantindo os nutrientes essenciais com os recursos disponíveis.
  </p>
  <ul class="lista-itens-doacao">
    <li>Arroz, feijão e óleo de soja</li>
    <li>Massa, açúcar e leite em caixa</li>
    <li>Farinha de trigo, polenta, sal e café</li>
    <li>Achocolatado, erva-mate (Chima) e enlatados</li>
  </ul>
  <a href="#onde-estamos" class="link-acao-doacao">Ponto de entrega na sede</a>
</div>
```

- [ ] **Step 2: Atualizar Card 2 (Vestuário, Utensílios, Masculino, Tampinhas e Blisters)**
Expandir a lista de doações de vestuário e utilidades domésticas:
```html
<div class="card-doacao">
  <div class="card-doacao-topo">
    <span class="card-doacao-icone" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>
      </svg>
    </span>
    <span class="card-doacao-categoria">Vestuário & Dignidade</span>
  </div>
  <h3>Roupas, Calçados & Utensílios</h3>
  <p class="card-doacao-desc">
    Abastecimento das araras livres do Pegue e Leve, peças acessíveis no brechó e auxílio na montagem de lares.
  </p>
  <ul class="lista-itens-doacao">
    <li>Cobertores, lençóis, fronhas, mantas e toalhas</li>
    <li>Agasalhos, casacos, camisetas, blusas e calças</li>
    <li>Roupas e calçados masculinos (alta demanda)</li>
    <li>Roupas infantis, pijamas, meias e roupas íntimas</li>
    <li>Calçados de todos os tipos e tamanhos</li>
    <li>Móveis e utensílios de cozinha</li>
    <li>Tampinhas plásticas e blisters de remédio vazios</li>
  </ul>
  <a href="#onde-estamos" class="link-acao-doacao">Ponto de entrega na sede</a>
</div>
```

- [ ] **Step 3: Atualizar Card 3 (Cuidado Infantil e Idosos / NanaNenê / Asilos)**
Ajustar título, descrição e itens para cuidado infantil, geriátrico e mães do Projeto NanaNenê:
```html
<div class="card-doacao">
  <div class="card-doacao-topo">
    <span class="card-doacao-icone" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
      </svg>
    </span>
    <span class="card-doacao-categoria">Infância & Longevidade</span>
  </div>
  <h3>Cuidado Infantil e Idosos</h3>
  <p class="card-doacao-desc">
    Produtos de higiene e cuidados em apoio ao Projeto NanaNenê, mães vulneráveis e assistência a Lares de Idosos e PCD.
  </p>
  <ul class="lista-itens-doacao">
    <li>Fraldas infantis e geriátricas (todos os tamanhos)</li>
    <li>Lenços umedecidos, pomadas, sabonetes e cotonetes</li>
    <li>Cremes hidratantes e shampoos (especial para asilos)</li>
    <li>Bodys, tip-tops, cueiros, mijões, toalhinhas e sapatinhos</li>
    <li>Berços, colchões, banheiras e carrinhos para bebês</li>
    <li>Brinquedos infantis e pelúcias higienizadas</li>
  </ul>
  <a href="#onde-estamos" class="link-acao-doacao">Ponto de entrega na sede</a>
</div>
```

---

## Task 4: Atualização dos Cards de Projetos em Ação (`#projetos`)

**Files:**
- Modify: `index.html:395-475`

- [ ] **Step 1: Atualizar Projeto Pegue e Leve**
Retirar o foco exclusivo no Harmonia e incluir Rio Branco, Fátima, Canoas e Região Metropolitana (inclusive Porto Alegre).
- [ ] **Step 2: Atualizar Projeto Bichinhos Caridosos**
Ajustar texto para troca de pelúcias por doações, eventos comunitários e acolhimento em Instituições de Saúde e Lares.
- [ ] **Step 3: Atualizar Cestas Básicas & Brechó Solidário**
Destacar a captação de recursos via associados, brechó e feira do uniforme escolar.
- [ ] **Step 4: Substituir Card 4 pelo Projeto NanaNenê**
Configurar badge `Maternidade Solidária`, imagem `/img/fotos/projeto-nananene.jpg`, parceria com o grupo de mulheres que confecciona enxovais para gestantes vulneráveis.

---

## Task 5: Atualização de Horários de Atendimento, Ponto de Coleta Parceiro e Contatos

**Files:**
- Modify: `index.html:1120-1145` (Cards de Sede e Contato)
- Modify: `index.html:1175-1190` (Coluna Atendimento do Rodapé)

- [ ] **Step 1: Atualizar horários na seção "Onde Estamos"**
  - Recebimento de doações: Segunda a quinta-feira, das 14h às 18h
  - Entrega dos pedidos: Terças e quintas-feiras, das 14h às 18h
  - Brechó Solidário: Terças e quintas-feiras, das 14h às 18h
  - Ponto de coleta parceiro: **Loja Essence** (ao lado da sede, em horário comercial)
- [ ] **Step 2: Adicionar contato direto da Rosa (Coordenação)**
  - WhatsApp Geral: (51) 99270-1114
  - Rosa / Coordenação: (51) 98133-4287 (link `https://wa.me/5551981334287`)
- [ ] **Step 3: Sincronizar horários e contatos no rodapé da página**

---

## Task 6: Verificação, Build e Testes Automatizados

**Files:**
- Run: `npm run build`
- Run: `python scripts/verify_forms.py`

- [ ] **Step 1: Validar build do Vite sem erros de compilação**
- [ ] **Step 2: Executar testes de interação com formulários e responsividade**
- [ ] **Step 3: Capturar evidências visuais das novas seções**

---

## Task 7: Atualização do Documento Mestre `PROJECT_MASTER.md`

**Files:**
- Modify: `PROJECT_MASTER.md`

- [ ] **Step 1: Documentar as novas diretrizes da ONG na especificação viva**
