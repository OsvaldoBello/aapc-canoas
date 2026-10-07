# DOCUMENTO MESTRE DO PROJETO (MASTER SPEC)
## Portal Voluntário & Captação Solidária: ONG AAPC Canoas
> **Documento Vivo do Projeto**: Versão 3.1 (Design Dinâmico, Organizado & Inspirado na Transformar RS)  
> **Status Atual**: Concluído, Validado Visualmente e Testado Responsivamente  
> **Repositório**: `c:\Users\Osvaldo\OneDrive\Desktop\AAPC`  
> **Servidor de Teste Local**: `http://localhost:3000` (Ativo)  
> **Target de Hospedagem**: Vercel

---

## 1. Visão Geral & Diretrizes do Novo Design

O portal da **Associação Amigos e Parceiros de Canoas (AAPC)** une a autenticidade real das ações da ONG com a energia visual dinâmica e organizada do benchmark **Transformar RS** (`transformarrs.com.br`).

### Principais Aprimoramentos Realizados
1. **Dinamismo Visual & Organização Moderna (Benchmark Transformar RS)**:
   - Header fixo com logotipo nítido, navegação limpa e botão de destaque para o PIX.
   - Hero dinâmico em 2 colunas: chamada emotiva forte, botões de ação e vitrine fotográfica da equipe voluntária na sede com badge flutuante.
   - Tipografia de alta legibilidade: `Poppins` (pesos 600, 700, 800) nos títulos e `DM Sans` (400, 500, 700) no corpo de texto.
   - Paleta equilibrada com Verde AAPC oficial (`#009639`), Azul solidário (`#0072CE`), fundo esbranquiçado suave (`#F6FAF7`), cards brancos com elevação e microinterações de hover.
2. **Substituição do Cartão Kraft por Doações Permanentes**:
   - Eliminado o cartão de pedidos temporários ("Falta esta semana") com fita e datas, evitando a necessidade de painel administrativo para atualizações constantes.
   - Implementada a seção organizada **"Itens essenciais que sempre fazem a diferença"** com 4 cards modernos:
     - 🥫 *Alimentos Não Perecíveis* (arroz, feijão, leite, óleo, massa, farinha, café).
     - 🧥 *Roupas, Calçados & Cobertores* (agasalhos, mantas térmicas, sapatos para o Pegue e Leve e Brechó).
     - 👶 *Fraldas & Itens Infantis* (fraldas infantis e geriátricas, brinquedos para o HCC).
     - 🧼 *Higiene Pessoal & Limpeza* (sabonetes, creme dental, sabão em barra, desinfetante).
3. **Fotos 100% Reais com Enquadramento e Resolução Otimizados**:
   - Removido o cartaz de baixa resolução da pizza de 2021.
   - Removidas todas as descrições/legendas (`figcaption`) abaixo das fotos. As fotografias agora integram a estética dos cards e do layout de maneira natural e elegante.
   - Recortes inteligentes executados para preservar rostos, banners oficiais e equipes completas:
     - `hero-equipe.jpg`: 4 voluntários com a camiseta da AAPC e fardos de água mineral na sede.
     - `entrega-prata-fatima.jpg`: Entrega real de 60 cestas básicas na Comunidade do Prata (Bairro Fátima).
     - `pegue-e-leve.jpg`: Voluntárias e banner na ação de roupas e calçados.
     - `bichinhos-caridosos.jpg`: Voluntárias sorrindo com camisetas da AAPC e crachá infantil no Hospital Criança Conceição.
     - `cestas-alimentos.jpg`: Porta-malas carregado de alimentos e mantimentos em alta definição.
     - `cestas-bairros.jpg`: Dezenas de cestas de alimentos prontas para distribuição comunitária.
4. **Captação PIX Direta**:
   - Bloco em verde floresta com chave oficial CNPJ `59.074.303/0001-00`, botão com cópia assistida e feedback acessível via `aria-live`.
   - QR Code SVG autêntico (BR Code padrão Banco Central).
5. **Seja Voluntário & Onde Estamos**:
   - Passos objetivos de acolhimento e formulário semântico com validação em tempo real que abre o WhatsApp oficial com dados preenchidos.
   - 3 cards com informações completas da sede, horários de funcionamento, brechó e contatos.

---

## 2. Dossiê Institucional da AAPC Canoas

- **Razão Social**: Associação Amigos e Parceiros de Canoas (AAPC)
- **CNPJ & Chave PIX**: `59.074.303/0001-00`
- **Endereço Sede**: Rua Sete Povos, 312 - Bairro Marechal Rondon / Canoas - RS, CEP 92020-430
- **Lema Institucional**: *"Amor & Solidariedade"*
- **Slogan**: *"Um gesto de amor pode mudar uma vida!"*
- **WhatsApp Geral & Doações**: `(51) 98465-4846`
- **WhatsApp Brechó Solidário**: `(51) 98133-4287`
- **Instagram**: [@ong_aapc_](https://www.instagram.com/ong_aapc_/)
- **Horários**:
  - Sede (Recebimento de doações): Segunda a sábado, das 9h às 17h
  - Brechó Solidário na sede: Terças e quintas, das 14h às 18h

---

## 3. Matriz de Arquivos do Projeto

| Arquivo | Função |
| :--- | :--- |
| `index.html` | Estrutura semântica limpa, cards dinâmicos, fotos integradas e SEO |
| `src/style.css` | Design System com Poppins/DM Sans, cores oficiais e responsividade total |
| `src/main.js` | Interações PIX, validação de formulário com WhatsApp, menu mobile e scroll |
| `public/img/fotos/` | Acervo de imagens autênticas otimizadas em alta definição |
| `public/img/pix-qrcode.svg` | QR Code SVG oficial padrão Banco Central do Brasil |
| `scripts/verify_redesign.py` | Script de validação visual e verificação de overflow mobile |

---

## 4. Evidências de Teste e Validação

- **Viewport Mobile (375px)**:
  - `scrollWidth`: 375px
  - `clientWidth`: 375px
  - **Status**: Zero scroll horizontal detectado.
- **Teste de Interação PIX**:
  - Clique no botão `#btn-copiar-chave-pix` copia `59.074.303/0001-00` e exibe mensagem de sucesso.
- **Capturas Geradas**:
  - `artifacts/redesign_verification/desktop_full.png`
  - `artifacts/redesign_verification/mobile_full.png`
