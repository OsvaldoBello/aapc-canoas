# Reformulação do Voluntariado, Adesão de Associados & Hub "Como Posso Ajudar" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expandir o portal da AAPC com um novo Hub "Como eu posso ajudar?", seção "Tipos de Ajuda / Sem Sair de Casa", comprovação de Certificação de Horas com imagem real da La Salle, formulário oficial de Voluntariado com Termo de Adesão de 8 artigos, ficha de Adesão de Associados com contribuição mensal e disparo por e-mail via AJAX.

**Architecture:** A aplicação permanece estática e performática (Vite + Vanilla JS + CSS moderno), integrando os novos formulários semânticos no `index.html`, regras de estilo em `src/style.css` e manipulação de máscaras, validações e disparo assíncrono para o endpoint FormSubmit em `src/main.js`. O e-mail de destino está parametrizado por padrão para testes em `osvaldooliveirabello@gmail.com` (com o e-mail de produção `ongamigoseparceiroscanoas@gmail.com` catalogado).

**Tech Stack:** HTML5 Semântico, CSS3 Moderno (Grid, Flexbox, Variáveis CSS, Glassmorphism suave), JavaScript (ES Modules, Fetch API AJAX), Vite, Python / Playwright para verificação.

## Global Constraints

- **E-mail de Testes:** `osvaldooliveirabello@gmail.com`
- **E-mail Oficial Produção:** `ongamigoseparceiroscanoas@gmail.com`
- **Imagem da Ação La Salle:** `public/img/fotos/acao-voluntarios-lasalle.jpg`
- **Termo de Voluntariado:** Manter as 8 cláusulas integrais da Lei nº 9.608/1998 e LGPD.
- **Responsividade:** Zero overflow horizontal em 375px mobile e desktop.
- **Sem Dependências Pesadas:** Não introduzir frameworks desnecessários; manter arquitetura estática leve.

---

### Task 1: Atualização da Navegação e Âncoras do Header e Rodapé

**Files:**
- Modify: `index.html:85-115` e `index.html:565-595`

**Interfaces:**
- Produz: Âncoras `#como-ajudar`, `#associados`, `#voluntariado` conectadas no header e rodapé.

- [ ] **Step 1: Adicionar novos links no menu de navegação do header**

No elemento `<nav class="nav-principal" id="nav-principal">`:
```html
<a href="#topo" class="nav-link">Início</a>
<a href="#como-ajudar" class="nav-link">Como Ajudar</a>
<a href="#associados" class="nav-link">Associados</a>
<a href="#voluntariado" class="nav-link">Seja Voluntário</a>
<a href="#o-que-doar" class="nav-link">O Que Doar</a>
<a href="#projetos" class="nav-link">Projetos</a>
<a href="#onde-estamos" class="nav-link">Onde Estamos</a>
<a href="#pix" class="btn btn-header-pix">Doar via PIX</a>
```

- [ ] **Step 2: Atualizar lista de navegação do rodapé**

No `<div class="footer-coluna">` de navegação do `index.html`:
```html
<ul>
  <li><a href="#topo">Início</a></li>
  <li><a href="#como-ajudar">Como Ajudar</a></li>
  <li><a href="#associados">Seja Associado</a></li>
  <li><a href="#voluntariado">Seja Voluntário</a></li>
  <li><a href="#o-que-doar">O Que Doar</a></li>
  <li><a href="#projetos">Projetos em Ação</a></li>
  <li><a href="#pix">Doação via PIX</a></li>
  <li><a href="#onde-estamos">Onde Estamos</a></li>
</ul>
```

- [ ] **Step 3: Verificar build do Vite**

Run: `npm run build`
Expected: Build concluído com sucesso em `dist/`.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat(nav): adicionar links de Como Ajudar e Associados no header e footer"
```

---

### Task 2: Seção Hub "Como eu posso ajudar?" (Layout Inspirado no Benchmark)

**Files:**
- Modify: `index.html:150-210`
- Modify: `src/style.css`

**Interfaces:**
- Produz: Seção `#como-ajudar` com grid de 3 cards (Doações, Voluntariado, Associados), ícones SVG limpos e botões de chamada amarelos (`#FFC72C`).

- [ ] **Step 1: Adicionar a marcação HTML da seção `#como-ajudar` após a Hero Section**

```html
<section class="secao-como-ajudar" id="como-ajudar">
  <div class="container">
    <div class="cabecalho-como-ajudar">
      <h2 class="titulo-como-ajudar">Como eu posso ajudar?</h2>
      <div class="divisor-amarelo" aria-hidden="true"></div>
    </div>

    <div class="grid-como-ajudar">
      <!-- Card 1: Doações -->
      <article class="card-ajuda">
        <div class="ajuda-icone-wrapper">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            <path d="M12 5v14"/>
          </svg>
        </div>
        <h3>Doações</h3>
        <p>Uma instituição e diversas formas de ajudar. Alimentos não perecíveis, agasalhos, cobertores, fraldas ou apoio direto via PIX. Saiba como colaborar!</p>
        <a href="#o-que-doar" class="btn-ajuda-amarelo">Conheça ➔</a>
      </article>

      <!-- Card 2: Voluntariado -->
      <article class="card-ajuda">
        <div class="ajuda-icone-wrapper">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M19 8v6"/>
            <path d="M22 11h-6"/>
          </svg>
        </div>
        <h3>Voluntariado</h3>
        <p>Reserve um pouco do seu tempo e fortaleça as nossas atividades comunitárias. Você pode ajudar presencialmente na sede, em ações de rua ou sem sair de casa!</p>
        <a href="#voluntariado" class="btn-ajuda-amarelo">Conheça ➔</a>
      </article>

      <!-- Card 3: Associado -->
      <article class="card-ajuda">
        <div class="ajuda-icone-wrapper">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <h3>Seja Associado</h3>
        <p>Faça parte dos nossos projetos através da doação mensal regular. A AAPC não tem recursos municipais e sobrevive 100% de doações voluntárias!</p>
        <a href="#associados" class="btn-ajuda-amarelo">Conheça ➔</a>
      </article>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Estilizar a seção `#como-ajudar` no `src/style.css`**

Implementar estilos para `.secao-como-ajudar`, `.titulo-como-ajudar`, `.divisor-amarelo`, `.grid-como-ajudar`, `.card-ajuda` e `.btn-ajuda-amarelo` com microinterações, sombra suave e responsividade para 1 coluna no mobile.

- [ ] **Step 3: Testar renderização no navegador e build**

Run: `npm run build`
Expected: Build gerado sem erros.

- [ ] **Step 4: Commit**

```bash
git add index.html src/style.css
git commit -m "feat(ui): implementar hub 'Como eu posso ajudar?' com 3 cards"
```

---

### Task 3: Seção "Tipos de Ajuda & Sem Sair de Casa" e Certificação de Horas (La Salle)

**Files:**
- Modify: `index.html:430-465`
- Modify: `src/style.css`

**Interfaces:**
- Consome: Foto real `public/img/fotos/acao-voluntarios-lasalle.jpg`.
- Produz: Bloco didático de formas de voluntariado (costura, tricô, ponto de coleta, redes) e card de credibilidade acadêmica.

- [ ] **Step 1: Adicionar a estrutura visual de tipos de ajuda antes da ficha de voluntariado**

Incluir:
1. Card interativo *"Não precisa sair de casa"*:
   - Tricô e crochê solidário (toucas e mantas).
   - Costura e pequenos consertos em agasalhos.
   - Divulgação ativa nas redes sociais.
   - Ponto de arrecadação no condomínio ou trabalho.
2. Card *"Presencial & Ações Externas"*:
   - Triagem e organização na Sete Povos.
   - Montagem de cestas básicas.
   - Distribuição de marmitas e agasalhos no centro e comunidades.
3. Card Institucional de Credibilidade *"Certificação Oficial de Horas Complementares"*:
   - Imagem real: `<img src="/img/fotos/acao-voluntarios-lasalle.jpg" alt="Ação voluntária de rua da AAPC com estudantes da Universidade La Salle">`
   - Selo comprobatório destacando a emissão de certificados de horas complementares e extensão universitária para acadêmicos da **Universidade La Salle** e voluntários em geral.

- [ ] **Step 2: Estilizar os cards de tipos de ajuda e o badge de certificação em `src/style.css`**

- [ ] **Step 3: Verificar build**

Run: `npm run build`
Expected: Build sem erros.

- [ ] **Step 4: Commit**

```bash
git add index.html src/style.css
git commit -m "feat(voluntariado): adicionar secao de tipos de ajuda e certificacao La Salle"
```

---

### Task 4: Formulário Oficial de Voluntariado & Termo de Adesão (8 Cláusulas)

**Files:**
- Modify: `index.html:460-520`
- Modify: `src/style.css`
- Modify: `src/main.js`

**Interfaces:**
- Produz: Formulário `#form-voluntario` com 11 campos, modal/acordeão do Termo de Adesão ao Serviço Voluntário e validação em tempo real.

- [ ] **Step 1: Estruturar os 11 campos no formulário `#form-voluntario`**

Campos:
- Nome completo (`campo-vol-nome`)
- Data de nascimento (`campo-vol-nascimento`)
- CPF (`campo-vol-cpf`)
- Endereço completo (`campo-vol-endereco`)
- Telefone / WhatsApp (`campo-vol-telefone`)
- E-mail (`campo-vol-email`)
- Experiência prévia em voluntariado (radio `sim` / `nao`)
- Áreas de interesse (checkboxes com as 11 opções oficiais)
- Motivação para ajudar (`campo-vol-motivacao`)
- Autorização de uso de imagem nas redes sociais (radio `autorizo` / `nao-autorizo`)
- Termo de Adesão ao Serviço Voluntário:
  - Botão de abertura: `📄 Visualizar Termo de Adesão ao Serviço Voluntário (Lei nº 9.608/1998)`
  - Painel com os 8 artigos completos.
  - Checkbox obrigatório: `☑ Declaro que li e concordo integralmente com as condições do Termo de Adesão ao Serviço Voluntário da AAPC.`

- [ ] **Step 2: Adicionar estilos para o formulário e acordeão do termo em `src/style.css`**

- [ ] **Step 3: Implementar validação e máscaras de CPF e telefone no `src/main.js`**

- [ ] **Step 4: Testar validações no formulário**

- [ ] **Step 5: Commit**

```bash
git add index.html src/style.css src/main.js
git commit -m "feat(voluntariado): integrar campos oficiais e termo de adesao ao servico voluntario"
```

---

### Task 5: Seção & Formulário de Adesão: "Seja Nosso Associado"

**Files:**
- Modify: `index.html` (nova seção `#associados`)
- Modify: `src/style.css`
- Modify: `src/main.js`

**Interfaces:**
- Produz: Seção `#associados` com gancho institucional de sobrevivência por doações, formulário `#form-associado`, seletor de valores de contribuição mensal e termos de consentimento.

- [ ] **Step 1: Criar a seção `#associados` com o gancho emotivo e ficha de adesão**

Campos:
- Nome completo (`campo-assoc-nome`)
- Data de nascimento (`campo-assoc-nascimento`)
- CPF (`campo-assoc-cpf`)
- Endereço completo (`campo-assoc-endereco`)
- Bairro (`campo-assoc-bairro`)
- Cidade/UF (`campo-assoc-cidade`)
- CEP (`campo-assoc-cep`)
- Telefone/WhatsApp (`campo-assoc-telefone`)
- E-mail (`campo-assoc-email`)
- Profissão (`campo-assoc-profissao`)
- Como conheceu a ONG? (`campo-assoc-origem`)
- Valor da contribuição mensal (botões rápidos: `R$ 20`, `R$ 50`, `R$ 100` e campo `Outro`)
- Observações (`campo-assoc-obs`)
- Checkbox 1: `☑ Declaro que desejo me associar e que estou de acordo com o Estatuto da Associação.`
- Checkbox 2: `☑ Autorizo o uso dos dados informados para meu cadastro e para comunicações relacionadas à associação.`

- [ ] **Step 2: Estilizar a seção de Associados em `src/style.css`**

- [ ] **Step 3: Adicionar validações e seleção rápida de valor em `src/main.js`**

- [ ] **Step 4: Verificar build do Vite**

Run: `npm run build`
Expected: Build gerado sem erros.

- [ ] **Step 5: Commit**

```bash
git add index.html src/style.css src/main.js
git commit -m "feat(associados): implementar secao e formulario de adesao com valores mensais"
```

---

### Task 6: Integração de Disparo AJAX por E-mail (FormSubmit) & Feedback Visual

**Files:**
- Modify: `src/main.js`
- Modify: `src/style.css`

**Interfaces:**
- Configura: `const EMAIL_DESTINO = 'osvaldooliveirabello@gmail.com';` (e constante para produção `ongamigoseparceiroscanoas@gmail.com`).
- Produz: Envio assíncrono para os dois formulários com feedback imediato em tela (spinner de carregamento, card de sucesso e botão opcional de WhatsApp).

- [ ] **Step 1: Implementar função `enviarFormularioEmail(dados, assunto, formElement, feedbackElement)` em `src/main.js`**

```javascript
async function enviarFormularioEmail(dados, assunto, formElement, statusElement) {
  statusElement.innerHTML = '<span class="status-enviando">⏳ Enviando seus dados com segurança...</span>';
  const submitBtn = formElement.querySelector('button[type="submit"]');
  if (submitBtn) submitBtn.disabled = true;

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${EMAIL_DESTINO_TESTE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: assunto,
        _captcha: 'false',
        ...dados
      })
    });

    const resJson = await response.json();
    if (response.ok && resJson.success) {
      statusElement.innerHTML = `
        <div class="feedback-sucesso">
          <h4>✅ Cadastro enviado com sucesso!</h4>
          <p>Recebemos suas informações por e-mail e nossa coordenação entrará em contato em breve.</p>
        </div>`;
      formElement.reset();
    } else {
      throw new Error(resJson.message || 'Erro no envio');
    }
  } catch (err) {
    statusElement.innerHTML = `
      <div class="feedback-erro">
        <p>⚠️ Não foi possível enviar automaticamente. Por favor, tente novamente ou fale conosco diretamente pelo WhatsApp.</p>
      </div>`;
  } finally {
    if (submitBtn) submitBtn.disabled = false;
  }
}
```

- [ ] **Step 2: Conectar o envio nos eventos `submit` de `#form-voluntario` e `#form-associado`**

- [ ] **Step 3: Estilizar feedbacks de status e mensagens em `src/style.css`**

- [ ] **Step 4: Testar envio e build do Vite**

Run: `npm run build`
Expected: Build gerado com sucesso.

- [ ] **Step 5: Commit**

```bash
git add src/main.js src/style.css
git commit -m "feat(email): integrar envio assincrono via FormSubmit para email de testes"
```

---

### Task 7: Validação Automatizada, Responsividade Mobile e Atualização da Documentação

**Files:**
- Create: `scripts/verify_forms.py`
- Modify: `PROJECT_MASTER.md`

**Interfaces:**
- Produz: Relatório automatizado de verificação dos formulários, ausência de overflow horizontal em 375px e documentação atualizada no `PROJECT_MASTER.md`.

- [ ] **Step 1: Criar script de validação `scripts/verify_forms.py`**

Testa se os campos existem no DOM, se as âncoras estão funcionais, se não há overflow horizontal em 375px e 1440px.

- [ ] **Step 2: Executar script de verificação**

Run: `python scripts/verify_forms.py`
Expected: Todas as asserções passam com sucesso.

- [ ] **Step 3: Atualizar `PROJECT_MASTER.md`**

Registrar as novas seções (`#como-ajudar`, `#associados`, `#voluntariado`), campos oficiais, foto da La Salle e configuração de e-mail.

- [ ] **Step 4: Commit final**

```bash
git add scripts/verify_forms.py PROJECT_MASTER.md
git commit -m "chore: validar novos formularios e atualizar DOCUMENTO MESTRE"
```
