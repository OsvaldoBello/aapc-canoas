# DOCUMENTO MESTRE DO PROJETO (MASTER SPEC)
## Portal Voluntário & Captação Solidária: ONG AAPC Canoas
> **Documento Vivo do Projeto**: Versão 3.0 (Redesign Completo: "Galpão da Sete Povos")  
> **Status Atual**: Redesign Executado, Validado Visualmente e Testado Responsivamente  
> **Repositório**: `c:\Users\Osvaldo\OneDrive\Desktop\AAPC`  
> **Servidor de Teste Local**: `http://localhost:3000` (Ativo)  
> **Target de Hospedagem**: Vercel

---

## 1. Visão Geral & Diretriz de Redesign ("Galpão da Sete Povos")

O portal oficial da **Associação Amigos e Parceiros de Canoas (AAPC)** foi completamente redesenhado para substituir uma estética genérica de agência/IA por uma identidade editorial genuína de organização comunitária de bairro da Região Metropolitana de Porto Alegre.

### O Princípio Orientador
O site transmite a realidade concreta da AAPC: um galpão acolhedor na Rua Sete Povos que distribui comida, agasalhos e acolhimento direto para famílias de Canoas. 

### Pilares da Transformação
1. **Fotos 100% Autênticas**: Eliminação total de imagens de banco de dados ou IA. Todas as fotografias foram extraídas diretamente do perfil oficial no Instagram (`@ong_aapc_`), retratando voluntários reais com camisetas da ONG, entregas de cestas básicas na Comunidade do Prata (Bairro Fátima), ações pediátricas com broches de pelúcia e arrecadações na sede.
2. **Eliminação de Clichês de IA**:
   - Zero divisórias em onda SVG (`.ondula`, `.onda-cima`).
   - Zero fundos alternados em tons pastéis artificiais.
   - Zero badges com brilho/glow ou carrosséis automáticos genéricos.
   - Zero cards de ODS da ONU desconectados da rotina prática.
   - Zero barras flutuantes com estatísticas não comprovadas.
   - Zero travessões artificiais de IA (`—`).
3. **Cartão Kraft "Falta esta semana"**:
   - Componente dinâmico que carrega itens essenciais de `src/data/necessidades.json`.
   - Badges de urgência reais (`urgente`, `pouco`, `ok por enquanto`).
   - Tratamento para listas com mais de 21 dias (alerta sutil orientando consulta por WhatsApp).
4. **PIX Estático BR Code Real**:
   - Chave oficial CNPJ `59074303000100` codificada em formato EMV padrão Banco Central com CRC16-CCITT (`00020126360014BR.GOV.BCB.PIX0114590743030001005204000053039865802BR5911AAPC CANOAS6006CANOAS62070503***63049CA3`).
   - QR Code SVG autêntico e botão de cópia de chave acessível com `aria-live`.
5. **Apresentação Editorial de Projetos**:
   - Linhas editoriais alternadas em vez de grids de cards promocionais.
   - Cada projeto destaca o que foi feito, o que precisa no momento e canal direto de apoio.

---

## 2. Dossiê Oficial da ONG AAPC (Auditado via `@ong_aapc_`)

- **Razão Social**: Associação Amigos e Parceiros de Canoas (AAPC)
- **CNPJ Oficial & Chave PIX**: `59.074.303/0001-00`
- **Endereço Sede**: Rua Sete Povos, 312 - Bairro Marechal Rondon / Canoas - RS, CEP 92020-430
- **Lema Institucional**: *"Amor & Solidariedade"*
- **Slogan**: *"Um gesto de amor pode mudar uma vida!"*
- **Telefones / WhatsApp Auditados nos Materiais Oficiais**:
  - `(51) 98465-4846` (Geral / Doações e Voluntariado)
  - `(51) 98133-4287` (Brechó Solidário da Sete Povos, 312)
- **Instagram**: [@ong_aapc_](https://www.instagram.com/ong_aapc_/)
- **Horários Auditados**:
  - Segunda a sábado: 9h às 17h (triagem e recebimento de doações)
  - Brechó Solidário na sede: terças e quintas, das 14h às 18h

---

## 3. Design System "Galpão da Sete Povos"

### Tokens Estritos de Cores
```css
:root {
  --papel:        #FBF9F4; /* Papel off-white acolhedor */
  --tinta:        #18241C; /* Verde-chumbo quase preto para texto */
  --tinta-suave:  #4E5D52; /* Secundário com contraste WCAG AA */
  --verde-aapc:   #1B7A3E; /* Verde institucional equilibrado */
  --verde-texto:  #145C2E; /* Verde escuro para texto sobre claro */
  --mata:         #0E331B; /* Verde floresta escuro para blocos de peso */
  --azul-aapc:    #165C9E; /* Azul institucional secundário */
  --kraft:        #E8DFC8; /* Tom papelão kraft para o cartão semanal */
  --fita:         #F3C969; /* Tom fita crepe para etiquetas/selos */
  --linha:        #E2DDD2; /* Bordas e divisores discretos */
}
```

### Tipografia
- **Títulos (`--fonte-display`)**: `Archivo`, sans-serif geométrica robusta (peso 800).
- **Corpo (`--fonte-corpo`)**: `Atkinson Hyperlegible Next`, legibilidade superior (pesos 400 e 600).
- **Dados / Metadados (`--fonte-mono`)**: `Atkinson Hyperlegible Mono`, clareza para números, CNPJ e horários.

---

## 4. Estrutura Semântica da Aplicação

1. **Header Fixo**: Logotipo oficial, endereço conciso na Sete Povos, links de navegação (`Projetos`, `Voluntariado`, `Onde estamos`) e botão PIX. Menu mobile acessível via hambúrguer.
2. **Hero com Cartão Kraft**:
   - Lado esquerdo: Título editorial *"Comida, roupa e acolhimento para quem mora perto."*, descrição objetiva e botões diretos de doação e entrega.
   - Lado direito: Cartão kraft *"Falta esta semana"* com lista dinâmica de necessidades carregada de `src/data/necessidades.json`.
   - Abaixo: Fotografia real dos voluntários da AAPC organizando fardos de água e mantimentos na sede.
3. **Projetos em Andamento (Lista Editorial Alternada)**:
   - *Pegue e Leve*: Araras de roupas no Bairro Harmonia e praças com foto de cobertores e placa oficial.
   - *Bichinhos Caridosos*: Acolhimento no Hospital Criança Conceição com foto de voluntárias com broches.
   - *Cestas de Mantimentos e Brechó*: Ponto permanente na Rua Sete Povos com foto do porta-malas carregado de alimentos.
   - *Pizzas Solidárias*: Produção artesanal de pizzas pré-assadas para manter as despesas da sede.
   - *Socorro Emergencial*: Apoio imediato durante alagamentos com foto da voluntária e mascote.
4. **Registro Histórico (Enchente de Maio de 2024)**:
   - Narrativa factual do polo de apoio na Sete Povos durante as enchentes em Canoas.
   - Bairros atendidos: Mathias Velho, Harmonia, Rio Branco, Fátima e imediações.
   - Fotografia real da entrega de 60 cestas básicas na Comunidade do Prata (Bairro Fátima).
5. **Bloco PIX Único (Fundo `--mata`)**:
   - Caixa com chave CNPJ em destaque (`59.074.303/0001-00`), botão *"Copiar chave"* com cópia para a área de transferência e mensagem *"Chave copiada!"*.
   - QR Code SVG autêntico (BR Code padrão Banco Central).
   - Orientações objetivas para confirmação no app bancário.
6. **Seja Voluntário**:
   - Descrição dos passos simples de integração na Sete Povos.
   - Formulário semântico com validação em tempo real e redirecionamento direto para o WhatsApp oficial com mensagem pré-formatada.
7. **Endereço & Atendimento**:
   - Endereço completo com link para o Google Maps.
   - Horários de funcionamento da sede e do brechó.
   - Contato de WhatsApp e link oficial para o Instagram.
8. **Rodapé Editorial**:
   - Dados de CNPJ, endereço e lema institucional *"Amor e solidariedade"*.

---

## 5. Matriz de Arquivos do Projeto

| Arquivo | Função |
| :--- | :--- |
| `index.html` | Estrutura semântica limpa, sem clichês de IA, tags Open Graph e acessibilidade total |
| `src/style.css` | Folha de estilos vanilla com design tokens do "Galpão da Sete Povos" e responsividade |
| `src/main.js` | Carregador dinâmico de `necessidades.json`, cópia segura de PIX com `aria-live`, formulário para WhatsApp |
| `src/data/necessidades.json` | Lista semanal de itens com status de estoque e timestamp de atualização |
| `src/data/conteudo.json` | Dados de contato e métricas unverified isoladas (`"verificado": false`) |
| `public/img/fotos/` | Acervo de imagens 100% autênticas extraídas do Instagram oficial `@ong_aapc_` |
| `public/img/pix-qrcode.svg` | QR Code SVG genuíno gerado com payload EMV oficial do Banco Central |
| `scripts/verify_redesign.py` | Script de teste Playwright para validação visual e verificação de overflow mobile |

---

## 6. Histórico de Verificações & Garantia de Qualidade

- **Validação de Responsividade Mobile (375px)**:
  - `scrollWidth`: 375px
  - `clientWidth`: 375px
  - **Resultado**: Zero scroll horizontal detectado.
- **Teste de Interação do PIX**:
  - Clique no botão `#btn-copiar-chave-pix` copia a chave `59.074.303/0001-00` para a área de transferência.
  - O texto do botão altera dinamicamente para "Chave copiada!" e retorna para "Copiar chave" após 3 segundos.
- **Teste de Validação de Formulário**:
  - Validação inline sem `alert()`, com destaque visual em vermelho nos campos inválidos e geração de link `https://wa.me/5551984654846` com texto codificado.
- **Evidências Visuais Capturadas**:
  - `artifacts/redesign_verification/desktop_full.png`
  - `artifacts/redesign_verification/desktop_hero.png`
  - `artifacts/redesign_verification/desktop_projetos.png`
  - `artifacts/redesign_verification/desktop_enchente.png`
  - `artifacts/redesign_verification/desktop_pix.png`
  - `artifacts/redesign_verification/desktop_voluntariado.png`
  - `artifacts/redesign_verification/mobile_full.png`
