# DOCUMENTO MESTRE DO PROJETO (MASTER SPEC)
## Portal Voluntário & Captação Solidária: ONG AAPC Canoas
> **Documento Vivo do Projeto**: Versão 4.0 (Reformulação Completa: Hub Como Ajudar, Associados, Voluntariado & Disparo por E-mail)  
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
     - `🤝 Quero ser Voluntário`: Ativa o painel de voluntariado com os blocos de ajuda domiciliar/presencial, foto institucional de horas complementares com a Universidade La Salle, formulário com 11 campos e o acordeão do Termo de Adesão ao Serviço Voluntário (8 artigos da Lei nº 9.608/1998).
     - `💚 Quero ser Associado`: Ativa o painel de associado contribuinte com gancho de sustentabilidade e independência, seletor de valores mensais em pílulas verdes (`R$ 20,00`, `R$ 50,00`, `R$ 100,00` e `Outro valor`), formulário cadastral completo e consentimentos estatutário e LGPD.
   - Suporte completo a navegação direta por âncoras (`#voluntariado` e `#associados`), com alternância automática da aba e rolagem suave.

3. **Motor de Disparo Assíncrono por E-mail (FormSubmit AJAX)**:
   - Os formulários de Voluntariado e Associados não dependem exclusivamente de envio manual via WhatsApp.
   - Envio assíncrono via `fetch()` para o endpoint AJAX do FormSubmit (`https://formsubmit.co/ajax/osvaldooliveirabello@gmail.com`).
   - Bloqueio temporário do botão durante o envio com feedback em tempo real.
   - Tratamento de sucesso com mensagem limpa, reset automático dos campos e botão alternativo de confirmação por WhatsApp caso desejado pelo usuário.
   - Configuração centralizada em `src/main.js`:
     ```javascript
     const EMAIL_DESTINO_TESTE = 'osvaldooliveirabello@gmail.com';
     // Produção futura: 'ongamigoseparceiroscanoas@gmail.com'
     ```

5. **Doações de Itens Essenciais Permanentes (`#o-que-doar`)**:
   - 4 categorias organizadas: Alimentos Não Perecíveis, Roupas e Cobertores, Fraldas e Itens Infantis, Higiene e Limpeza.

6. **Captação PIX Direta (`#como-doar-pix`)**:
   - Chave oficial CNPJ `59.074.303/0001-00` com botão de cópia assistida e feedback acessível.
   - QR Code SVG autêntico padrão Banco Central do Brasil.

---

## 2. Dossiê Institucional da AAPC Canoas

- **Razão Social**: Associação Amigos e Parceiros de Canoas (AAPC)
- **CNPJ & Chave PIX**: `59.074.303/0001-00`
- **Endereço Sede**: Rua Sete Povos, 312 - Bairro Marechal Rondon / Canoas - RS, CEP 92020-430
- **Lema Institucional**: *"Amor & Solidariedade"*
- **Slogan**: *"Um gesto de amor pode mudar uma vida!"*
- **WhatsApp Geral & Doações**: `(51) 99270-1114` (Renata)
- **WhatsApp Brechó Solidário**: `(51) 98133-4287` (Rosa)
- **Instagram**: [@ong_aapc_](https://www.instagram.com/ong_aapc_/)
- **Horários**:
  - Sede (Recebimento de doações): Segunda a sábado, das 9h às 17h
  - Brechó Solidário na sede: Terças e quintas, das 14h às 18h

---

## 3. Matriz de Arquivos do Projeto

| Arquivo | Função |
| :--- | :--- |
| `index.html` | Estrutura semântica completa: Hero, Hub Como Ajudar, História, Doações, Projetos, Associados, Voluntariado com Termo oficial, PIX e Sede |
| `src/style.css` | Design System com tokens, Poppins/DM Sans, cores oficiais, componentes de formulário, pílulas de valor e responsividade mobile estrita |
| `src/main.js` | Disparo AJAX via FormSubmit, máscaras de CPF/Telefone/CEP, seletores de valor, acordeão do termo, cópia do PIX e menu mobile |
| `public/robots.txt` | Instruções de indexação para robôs de busca (Googlebot) |
| `public/sitemap.xml` | Mapa de URLs indexáveis do portal |
| `vercel.json` | Cabeçalhos de segurança, Clean URLs e cache na Vercel |
| `public/img/fotos/` | Acervo fotográfico autêntico, incluindo `acao-voluntarios-lasalle.jpg` |
| `public/img/pix-qrcode.svg` | QR Code SVG oficial padrão Banco Central do Brasil |
| `scripts/verify_forms.py` | Script de teste automatizado Playwright (Desktop 1366px e Mobile 375px) |
| `scripts/verify_redesign.py` | Script complementar de captura das seções do redesign |

---

## 4. Evidências de Teste e Validação

- **Viewport Mobile (375px x 812px)**:
  - `scrollWidth`: 375px
  - `clientWidth`: 375px
  - **Status**: Zero scroll horizontal detectado após refinamento dos grids e formulários.
- **Viewport Desktop (1366px x 900px)**:
  - Presença e visibilidade confirmadas de `#como-ajudar` (3 cards com botão ouro), `#associados` e `#voluntariado`.
  - Acordeão do Termo de Adesão ao Serviço Voluntário validado com exibição integral dos 8 artigos da Lei nº 9.608/1998.
  - Seletor de valor de associados validado (seleção de valores fixos e exibição dinâmica do campo de outro valor).
  - Foto institucional com estudantes da Universidade La Salle validada.
- **Build de Produção**:
  - `npm run build` gerando bundle limpo em `dist/` em < 1.5s (Vite 6.4.4).
- **Capturas Geradas**:
  - `artifacts/verification_forms/desktop_hub_como_ajudar.png`
  - `artifacts/verification_forms/desktop_associados.png`
  - `artifacts/verification_forms/desktop_voluntariado.png`
  - `artifacts/verification_forms/mobile_como_ajudar.png`
  - `artifacts/verification_forms/mobile_associados.png`
  - `artifacts/verification_forms/mobile_voluntariado.png`
