# Especificação Técnica: Melhorias e Atualizações do Portal AAPC (Feedback da ONG)

> **Data:** 26/10/2026  
> **Origem:** Documento de Feedback `site ong.docx` e capturas de tela da diretoria da ONG  
> **Status:** Especificação Validada  
> **Repositório:** `c:\Users\Osvaldo\OneDrive\Desktop\AAPC`

---

## 1. Contexto e Objetivos

A diretoria da **Associação Amigos e Parceiros de Canoas (AAPC)** realizou uma revisão detalhada do portal e enviou ajustes práticos de conteúdo, novos pontos de coleta, ajuste fino de horários de funcionamento, canal direto de contato com a coordenação (Rosa) e a inclusão oficial do **Projeto NanaNenê** (em substituição ao card provisório de socorro emergencial).

Todas as alterações preservam a identidade visual já estabelecida (Verde Oficial `#009639`, Amarelo Sol `#FFCC00`, tipografia Poppins/DM Sans, ausência de emojis decorativos, estrita conformidade com a LGPD e privacidade de dados das famílias atendidas).

---

## 2. Levantamento Completo de Requisitos & Mudanças

### 2.1. Aba Associados (`#faca-parte` / Painel Associados)
- **Item**: Benefício "Alimentação garantida o ano todo".
- **Texto Anterior**: `Cestas básicas e marmitas distribuídas continuamente para quem tem fome.`
- **Novo Texto**: `Cestas básicas e parceria com grupos que distribuem marmitas em ações sociais para quem mais precisa.`
- **Motivação**: Deixar claro que a AAPC atua em parceria com coletivos e grupos distribuidores de marmitas.

### 2.2. Aba Voluntariado (`#faca-parte` / Painel Voluntariado)
- **Item**: Card "Ações presenciais - Sede e comunidades" / Item de lista "Entregas nos bairros vulneráveis".
- **Texto Anterior**: `Distribuição de marmitas, roupas e cobertores diretamente aos moradores mais necessitados.`
- **Novo Texto**: `Participação em ações sociais de distribuição de cestas básicas, Pegue e Leve de roupas, cobertores e utensílios nas comunidades vulneráveis.`
- **Motivação**: Alinhar o escopo voluntário com as ações de campo reais (cestas, Pegue e Leve, utensílios e agasalhos).

### 2.3. Seção "O Que Você Pode Doar" (`#o-que-doar`)
Ajustar os cards de doação com foco nas necessidades concretas da triagem:
1. **Card 1: Alimentos Não Perecíveis (Segurança Alimentar)**
   - **Descrição**: Montagem de cesta básica "slim" para famílias cadastradas e situações emergenciais (trabalhamos com o formato slim para que mais famílias recebam os itens essenciais com os recursos disponíveis).
   - **Lista de Itens**:
     - Arroz e feijão
     - Óleo de soja
     - Massa e açúcar
     - Leite em caixa
     - Complementos: café, farinha de trigo, polenta, sal, achocolatado, erva-mate (Chima), molhos e enlatados
2. **Card 2: Vestuário, Cama, Mesa e Banho (`Vestuário & Dignidade`)**
   - **Descrição**: Abastecimento das araras livres do Pegue e Leve, brechó solidário e suporte a lares carentes.
   - **Lista de Itens**:
     - Cobertores, mantas, lençóis, fronhas e toalhas de banho
     - Agasalhos, casacos, camisetas, calças e moletons
     - Roupas e calçados masculinos (alta demanda contínua)
     - Roupas infantis, pijamas (infantil e adulto), meias e roupas íntimas
     - Calçados de todos os tipos e tamanhos
     - Móveis e utensílios de cozinha
     - Tampinhas plásticas e blisters de remédio vazios (reciclagem e sustentabilidade)
3. **Card 3: Cuidado Infantil e Idosos (`Apoio & Acolhimento`)**
   - **Título**: `CUIDADO INFANTIL E IDOSOS`
   - **Descrição**: Produtos de higiene e cuidados. Apoio ao Projeto NanaNenê, mães vulneráveis, assistência a Lares e Asilos de Idosos e a Pessoas com Deficiência (PCD).
   - **Lista de Itens**:
     - Fraldas infantis e geriátricas de todos os tamanhos
     - Lenços umedecidos, pomadas para assaduras, sabonetes e cotonetes
     - Cremes hidratantes e shampoos (especial atenção a asilos de idosos)
     - Roupas e peças para enxovais de bebês: bodys, tip-tops, cueiros, toalhinhas, mijões, babeiros, sapatinhos e casaquinhos
     - Berços, colchões, banheiras e carrinhos para bebês
     - Brinquedos e pelúcias higienizadas

### 2.4. Seção "Projetos em Ação" (`#projetos`)
1. **Projeto Pegue e Leve**:
   - Ajustar texto retirando restrição ao Bairro Harmonia:
   - *Texto*: `Araras e estruturas comunitárias abertas montadas em bairros de Canoas (como Rio Branco e Fátima) e na Região Metropolitana, inclusive em Porto Alegre. Quem precisa escolhe roupas, agasalhos e calçados com total respeito e liberdade de escolha.`
2. **Bichinhos Caridosos**:
   - Ajustar texto conforme redação oficial da parceria:
   - *Texto*: `Nosso parceiro Bichinhos Caridosos troca pelúcias por doações e realiza ações junto com outros parceiros através de eventos comunitários e acolhimento em Instituições de Saúde e Lares.`
   - *Como apoiar*: `Pelúcias higienizadas e brinquedos novos`
3. **Cestas Básicas & Brechó Solidário**:
   - Enriquecer com as formas de captação de recursos:
   - *Texto*: `Ponto permanente na Rua Sete Povos, 312 para montagem de cestas de alimentos. A captação de recursos da ONG é mantida por associados contribuintes, pelo brechó solidário e pela tradicional feira do uniforme escolar.`
4. **Substituição do Card "Socorro Imediato a Famílias" pelo "Projeto NanaNenê"**:
   - **Badge**: `Maternidade Solidária`
   - **Título**: `Projeto NanaNenê`
   - **Resumo**: `Através da parceria com um grupo de mulheres que montam enxovais para mães vulneráveis de comunidades carentes, recolhemos as doações e administramos as inscrições das gestantes.`
   - **Como apoiar**: `Peças de enxoval de bebê, berços e fraldas infantis`
   - **Foto**: Foto real do projeto tratada e anonimizada (`public/img/fotos/projeto-nananene.jpg`), sem exibir nomes de gestantes nem crianças, atendendo ao pedido explícito da ONG.

### 2.5. Seção "Onde Estamos", Horários e Contato (`#onde-estamos` e Footer)
1. **Horários de Atendimento na Sede**:
   - **Recebimento de doações**: Segunda a quinta-feira, das 14h às 18h.
   - **Entrega dos pedidos**: Terças e quintas-feiras, das 14h às 18h.
   - **Brechó Solidário**: Terças e quintas-feiras, das 14h às 18h.
2. **Ponto de Coleta Parceiro**:
   - **Loja Essence**: Ao lado da sede da ONG, recebendo doações em horário comercial.
3. **Canais Oficiais de Contato**:
   - **WhatsApp Geral da AAPC**: (51) 99270-1114
   - **Rosa / Coordenação**: (51) 98133-4287 (link direto `https://wa.me/5551981334287`)
   - **Instagram Oficial**: `@ong_aapc_`

---

## 3. Diretrizes de Privacidade e LGPD

Conforme a orientação expressa no feedback:
> *"foto do card do projeto, só teria que apagar o nome das gestantes, pois não divulgamos nome e nem foto delas."*

Garantir que qualquer imagem veiculada no portal que remeta ao Projeto NanaNenê preserve o anonimato das beneficiárias e seus filhos, em conformidade com o Estatuto da Criança e do Adolescente (ECA) e a LGPD (Lei nº 13.709/2018).

---

## 4. Estratégia de Verificação e Validação

1. **Compilação do Bundle**: Executar `npm run build` para garantir que o Vite não apresente erros de sintaxe ou assets faltantes.
2. **Testes Automatizados Playwright**: Rodar `scripts/verify_forms.py` validando os seletores, envio de dados e responsividade em 1366px e 375px.
3. **Inspeção Visual**: Capturar evidências nos viewports mobile e desktop comprovando que nenhum texto transborda e que as novas seções mantêm a estética premium.
