# DOCUMENTO MESTRE DO PROJETO (MASTER SPEC)
## Portal Voluntário & Captação Solidária: ONG AAPC Canoas
> **Documento Vivo do Projeto**: Versão 5.0 (Humanização Integral, Acervo Fotográfico Real & Integração com Planilha Compartilhada Excel / Google Sheets)  
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

2. **Seção Unificada de Engajamento: "Faça Parte da Nossa Causa" (`#faca-parte`)**:
   - Consolidação dos dois fluxos de engajamento em uma **única seção central**, eliminando duplicação visual e otimizando a jornada do usuário.
   - **Seletor de Abas Interativo**:
     - `Quero ser Voluntário`: Ativa o painel de voluntariado com os blocos de ajuda domiciliar/presencial, fotos institucionais autênticas da AAPC, formulário com 11 campos e o acordeão do Termo de Adesão ao Serviço Voluntário (8 artigos da Lei nº 9.608/1998).
     - `Quero ser Associado`: Ativa o painel de associado contribuinte com gancho de sustentabilidade e independência, seletor de valores mensais em pílulas verdes (`R$ 20,00`, `R$ 50,00`, `R$ 100,00` e `Outro valor`), formulário cadastral completo e consentimentos estatutário e LGPD.
   - Suporte completo a navegação direta por âncoras (`#voluntariado` e `#associados`), com alternância automática da aba e rolagem suave.

3. **Acervo Fotográfico Real nos Cards de Colaboração (`#faca-parte`)**:
   - **Card 1 (Sem sair de casa - Doação de talento e carinho)**: Foto autêntica do trabalho de tricô e crochê solidário feito pelas voluntárias (`trico-croche-solidario.jpg`).
   - **Card 2 (Ações presenciais - Na sede e nas comunidades)**: Foto dos voluntários com o porta-malas do carro carregado com doações e cestas básicas (`voluntarios-sede-comunidades.jpg`).
   - **Card 3 (Certificação universitária - Horas complementares)**: Foto nítida e limpa da ação com estudantes da Universidade La Salle (`acao-voluntarios-lasalle.jpg`), sem botão de reprodução de vídeo.

4. **Humanização Textual Rigorosa (Skill `humanizer`)**:
   - Eliminação de travessões robóticos (`—`), títulos artificiais e formulaicos.
   - Remoção de todos os emojis decorativos de cabeçalhos, botões e listas, substituindo-os por ícones SVG vetoriais precisos e elegantes.
   - Tom de voz dinâmico, caloroso, direto e enraizado na realidade comunitária de Canoas/RS.

5. **Motor de Disparo Assíncrono Duplo: E-mail (FormSubmit AJAX) + Planilha Compartilhada (Excel / Google Sheets)**:
   - **E-mail**: Notificação instantânea para a coordenação (`osvaldooliveirabello@gmail.com`).
   - **Planilha Compartilhada**: Suporte nativo a envio em paralelo para endpoint Webhook (`WEBHOOK_PLANILHA_URL`).
   - Cada preenchimento gera automaticamente uma nova linha na planilha compartilhada do Google Sheets ou Microsoft 365 Excel Online.

---

## 2. Como Funciona a Integração com Planilha Compartilhada

O sistema foi preparado com **duplo disparo (dual-dispatch)** em `src/main.js`:

```javascript
const EMAIL_DESTINO_TESTE = 'osvaldooliveirabello@gmail.com';
const WEBHOOK_PLANILHA_URL = ''; // URL do Webhook do Google Apps Script ou Power Automate
```

### Opção Recomendada 1: Google Planilhas (Sincronizado / Exportável para Excel)
1. Crie uma planilha no Google Drive com as colunas: `Data`, `Tipo`, `Nome`, `E-mail`, `Telefone`, `CPF`, `Endereço`, `Detalhes`.
2. Vá em **Extensões > Apps Script** e cole o seguinte código:
   ```javascript
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     var data = JSON.parse(e.postData.contents);
     sheet.appendRow([
       new Date(),
       data.tipo_registro || '',
       data.nome_completo || '',
       data.email || '',
       data.telefone || '',
       data.cpf || '',
       data.endereco || '',
       JSON.stringify(data)
     ]);
     return ContentService.createTextOutput(JSON.stringify({result: "success"}))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```
3. Clique em **Implantar > Nova Implantação**, selecione **App da Web**, configure acesso para **Qualquer pessoa** e copie a URL gerada para `WEBHOOK_PLANILHA_URL`.

### Opção 2: Microsoft 365 Excel Online (Via Power Automate)
1. No portal do Power Automate (Office 365), crie um fluxo: **"Quando uma requisição HTTP for recebida"**.
2. Adicione a ação: **"Excel Online (Business) - Adicionar uma linha em uma tabela"**, apontando para sua pasta de trabalho compartilhada no OneDrive ou SharePoint.
3. Copie a URL do gatilho HTTP gerada e cole em `WEBHOOK_PLANILHA_URL`.

---

## 3. Matriz de Arquivos do Projeto

| Arquivo | Função |
| :--- | :--- |
| `index.html` | Estrutura semântica completa: Hero, Hub Como Ajudar, História, Doações, Projetos, Associados, Voluntariado com Termo oficial, PIX e Sede |
| `src/style.css` | Design System com tokens, Poppins/DM Sans, cores oficiais, componentes de formulário, pílulas de valor e responsividade mobile estrita |
| `src/main.js` | Disparo AJAX via FormSubmit e Planilha Compartilhada, máscaras, seletores de valor, acordeão do termo, cópia do PIX e menu mobile |
| `public/img/fotos/acao-voluntarios-lasalle.jpg` | Foto real limpa (sem play) dos voluntários com a Universidade La Salle |
| `public/img/fotos/trico-croche-solidario.jpg` | Foto real dos trabalhos manuais de tricô e crochê solidário para o inverno |
| `public/img/fotos/voluntarios-sede-comunidades.jpg` | Foto real da entrega direta de alimentos e cestas básicas com o porta-malas do carro |
| `scripts/verify_forms.py` | Script de teste automatizado Playwright (Desktop 1366px e Mobile 375px) |

---

## 4. Evidências de Teste e Validação

- **Viewport Mobile (375px x 812px)**: Zero scroll horizontal (`scrollWidth === clientWidth === 375px`).
- **Viewport Desktop (1366px x 900px)**:
  - Header da seção sem travessão robótico: *"Você pode ajudar de várias formas, até mesmo sem sair de casa"*.
  - Os 3 cards com as 3 fotos reais perfeitamente enquadradas (altura 160px, zoom no hover).
  - Ícones SVG vetoriais substituindo 100% dos emojis anteriores.
- **Build de Produção**: `npm run build` gerando bundle limpo em `dist/` em 1.95s com 0 erros.fication_forms/mobile_como_ajudar.png`
  - `artifacts/verification_forms/mobile_associados.png`
  - `artifacts/verification_forms/mobile_voluntariado.png`
