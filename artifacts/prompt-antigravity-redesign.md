# Prompt para o Antigravity: redesign do site AAPC Canoas

> Cole tudo abaixo da linha no Antigravity, com o repositório aberto.

---

## Contexto

Você vai refazer o design do site da **Associação Amigos e Parceiros de Canoas (AAPC)**, uma ONG de bairro com sede na Rua Sete Povos, 312 (Marechal Rondon, Canoas/RS). Ela é tocada por moradores voluntários que montam cestas básicas, organizam araras de roupa (Pegue e Leve), visitam crianças internadas no Hospital Criança Conceição (Bichinhos Caridosos), fazem brechó e pizzas solidárias e cozinharam marmitas durante as enchentes de 2024.

Arquivos: `index.html`, `src/style.css`, `src/main.js` (Vite, HTML/CSS/JS puro). **Mantenha a stack.** Não adicione React, Tailwind, frameworks de animação nem bibliotecas de UI. Uma lib pequena só é aceitável para gerar o QR Code PIX.

O site atual funciona, mas tem cara de template gerado por IA. Uma auditoria encontrou os padrões abaixo. Sua tarefa é eliminar esses padrões e implementar a direção visual descrita neste documento. **Siga a direção exatamente; não volte aos padrões "seguros".**

## Diagnóstico: o que está errado hoje (não repita nada disto)

### Confiança (prioridade máxima, corrigir antes do visual)
1. **As fotos são geradas por IA.** `hero-2.jpg` tem camisetas escrito "VOLUNTÁRO"; `bichinhos-caridosos.jpg` mostra crachá de outra ONG ("Amigos do Sorriso") e texto ilegível. Num site que pede doação, foto falsa destrói credibilidade. **Remova todas as imagens de `public/img/hero/` e `public/img/projetos/` do layout.** No lugar, use um componente `<figure class="foto-pendente">` com proporção fixa, fundo liso e a legenda "Foto real da ação: enviar do Instagram @ong_aapc_". Nunca gere imagens com pessoas.
2. **O QR Code do modal é desenho decorativo.** Quem escanear não paga nada. Gere um **BR Code PIX estático real** (payload EMV com chave CNPJ `59074303000100`, nome do recebedor, cidade CANOAS, CRC16-CCITT) e renderize como QR de verdade. Se não conseguir garantir validade, remova o QR e deixe só a chave copia-e-cola.
3. **Os números de impacto não têm fonte.** "+15 mil marmitas" e "+800 famílias" divergem do `PROJECT_MASTER.md` (que dizia +10.000 / +500). Não exiba número nenhum sem fonte. Mova para `src/data/conteudo.json` com `"verificado": false` e só renderize quando for `true`.
4. **WhatsApp `5551999999999` é placeholder.** Centralize numa constante `WHATSAPP_AAPC` no topo do `main.js` com comentário `// TODO: número real da coordenação`. Se continuar placeholder, esconda os botões de WhatsApp.

### Padrões visuais de template IA a remover
- Ondas SVG entre todas as seções (`.ondula`, `.onda-cima`, `.onda-baixo`, `--mask-up/down`). **Apague o sistema inteiro.**
- Fundos pastéis alternados por seção (azul-claro, branco, verde-claro, branco, cinza).
- Etiqueta-pílula em caixa alta acima de cada H2 + título centralizado + subtítulo cinza (`.tag-secao` + `.secao-header-centro`). Esse bloco se repete 4 vezes.
- Hero com badge de vidro e bolinha verde brilhando (`.hero-badge`, `.badge-dot` com glow), overlay em gradiente escuro sobre foto, carrossel automático de 2 slides com dots e botão com `pulse-glow` infinito.
- Barra de estatísticas flutuando sobre o hero (margin negativa) com ícone em quadrado pastel + número + rótulo. "100% Trabalho voluntário" e "Canoas, RS" não são métricas.
- Ícones Lucide/Feather dentro de quadradinhos arredondados pastéis (impacto, valores, contato).
- Grade de cards idênticos: 5 cards ODS com borda colorida no topo, 5 cards de projeto em grid de 3 (sobram 2 órfãos), 3 cards de contato centralizados. Todos com `translateY(-Npx)` no hover e zoom na imagem.
- Lista com check verde em círculo e "**Título em negrito:** frase", e trincas de valores genéricos ("Acolhimento real / Transparência / Comunidade unida").
- Paleta padrão do Tailwind misturada à marca: `#64748B`, `#E2E8F0`, `#94A3B8`, `#34D399`, `#E11D48`, `#F59E0B` e o roxo `#FAF5FF`/`#7E22CE` no passo a passo do modal, que não tem nada a ver com a marca.
- Três fontes de clichê: Poppins 800 (títulos), DM Sans e Playfair Display itálico para "frase inspiradora".
- Faixa de citação itálica solta acima do hero.
- Botão de doação repetido umas 10 vezes; chave PIX exibida 5 vezes.
- Rodapé escuro de 4 colunas com "Feito com carinho".
- Seção inteira de ODS da ONU. Para um grupo de bairro, soa como relatório corporativo.
- Comentários-banner `/* ===== 1. CABEÇALHO ===== */` numerados no CSS/HTML.

### Clichês de texto a remover
"Você pode fazer a diferença", "um gesto de amor pode mudar uma vida" (pode ficar **uma vez**, no rodapé, como lema oficial), "faça parte", "juntos transformamos", "ambiente acolhedor", "cada centavo vai direto…" (afirmação sem prova), listas de 3 itens por reflexo, negrito no começo de cada item, Title Case nos botões.

## Direção de design: "Galpão da Sete Povos"

O site deve parecer feito **pelo galpão da ONG**, não por uma agência. O vocabulário visual vem do que existe na sede: caixas de papelão, fita crepe escrita com caneta, a lista do que falta colada na porta, araras de roupa, marmitas com a tampa anotada. Nada de "amor abstrato": a página mostra coisas concretas.

**Única função da página:** fazer a pessoa de Canoas doar (PIX ou item físico) ou se oferecer como voluntária, sabendo exatamente o que está faltando.

### Paleta (use só estes tokens)

```css
:root {
  --papel:       #FFFFFF; /* fundo principal. Branco limpo, NÃO creme */
  --tinta:       #18241C; /* texto */
  --tinta-suave: #4B5A50; /* texto secundário (contraste ≥ 4.5:1 sobre branco) */
  --verde-aapc:  #009639; /* marca. Ação primária e superfícies grandes */
  --verde-texto: #00702B; /* verde para texto pequeno e links (AA) */
  --mata:        #0E3B26; /* blocos escuros: PIX e rodapé */
  --azul-aapc:   #0072CE; /* só detalhes da marca e foco; nunca segundo CTA */
  --kraft:       #CDA67E; /* papelão. Só no cartão "o que falta" e nas fichas de projeto */
  --fita:        #F0E4B4; /* fita crepe. Só nos rótulos */
  --linha:       #D9DDD6; /* divisórias */
}
```

Regras: o verde `#009639` com texto branco só passa contraste em texto grande/negrito ≥ 18.66px. Para botões menores use `--verde-texto` ou aumente a fonte. Azul **não** é cor de botão; o site tem **um** CTA primário (verde). Nada de sombras coloridas, glow ou gradiente.

### Tipografia (Google Fonts)

- **Display: `Archivo`** (eixo de largura variável). Títulos em `font-stretch: 112%–125%`, peso 800, `letter-spacing: -0.01em`, line-height 1.0–1.05. Lembra letra de carimbo em caixa de doação e faixa de mutirão. Use com moderação: H1, H2 e nomes de projeto.
- **Texto: `Atkinson Hyperlegible Next`**, 400/600, base 18px, line-height 1.6. Foi criada para baixa visão; boa parte de quem doa em Canoas é gente mais velha lendo no celular.
- **Utilitária: `Atkinson Hyperlegible Mono`** para chave PIX, CNPJ, datas, endereço e horários.
- **Proibido:** Poppins, DM Sans, Playfair, Inter, fontes manuscritas (Caveat, Permanent Marker etc.).
- Escala: 14 / 16 / 18 / 22 / 30 / 44 / clamp(48px, 7vw, 88px) no H1. Sentence case em tudo, inclusive botões.

### Elemento-assinatura: "O que está faltando esta semana"

O elemento que o visitante vai lembrar. É a versão digital da lista colada na porta da sede:

- Cartão em `--kraft` com um rótulo de fita crepe (`--fita`, levemente rotacionado `-1.5deg`, texto em Archivo caixa alta) escrito **"Falta esta semana"**.
- Itens concretos com quantidade e status: `Leite integral (caixa 1L), urgente`, `Fralda G, pouco`, `Cobertor de casal, ok por enquanto`. O status aparece como texto, não só como cor.
- Rodapé do cartão em mono: `Atualizada em 03/10 · Rua Sete Povos, 312 · seg a sáb, 9h–17h` (os horários vêm do JSON e ficam marcados como TODO).
- Os dados vêm de `src/data/necessidades.json` para os voluntários editarem sem mexer em HTML. Se `atualizadaEm` tiver mais de 21 dias, o cartão mostra "Lista desatualizada, pergunte no WhatsApp" em vez dos itens.
- O mesmo rótulo de fita é usado **somente** para rotular coisas reais (nome de cada projeto, como etiqueta de caixa). Ele não substitui as pílulas em todas as seções.

### Layout (alinhado à esquerda, sem centralizar seções)

```
HEADER (branco, linha fina embaixo, sem blur)
[logo]  Projetos  Voluntariado  Onde estamos             [Doar via PIX]

HERO, sem foto de fundo, sem overlay, sem carrossel
┌──────────────────────────────────────┬─────────────────────────┐
│ Comida, roupa e companhia            │ ▬FALTA ESTA SEMANA▬     │
│ para quem mora perto.     (H1 Archivo│ Leite integral  urgente │
│                            largo)    │ Fralda G          pouco │
│ 1 frase concreta sobre a AAPC.       │ Cobertor casal       ok │
│ [Doar via PIX]  Levar doação na sede→│ atualizada 03/10 · mono │
└──────────────────────────────────────┴─────────────────────────┘
[ foto-pendente larga, cantos retos, proporção 21:9 ]

PROJETOS: lista editorial, NÃO grid de cards
─────────────────────────────────────────────────────────────────
▬PEGUE E LEVE▬   Araras de roupa no Harmonia e   [foto 4:3]
                 em praças. O que precisa: …
─────────────────────────────────────────────────────────────────
[foto 4:3]       ▬BICHINHOS CARIDOSOS▬  Visitas ao HCC…
─────────────────────────────────────────────────────────────────
(alternar o lado da foto; 5 linhas; divisórias --linha)

ENCHENTE 2024: bloco de registro com data, texto curto,
o que foi feito (marmitas, água, colchões) e bairros citados.
Sem números inventados.

BLOCO PIX (fundo --mata, texto branco). ÚNICO lugar com a chave
┌──────────────────────────────────────────────────────────────┐
│ Doar via PIX                                                  │
│ 59.074.303/0001-00 (mono, grande)   [Copiar chave]   [QR real]│
│ Associação Amigos e Parceiros de Canoas · CNPJ                │
│ Abra o app do banco › PIX › colar chave › conferir o nome.   │
└──────────────────────────────────────────────────────────────┘

VOLUNTARIADO: texto + formulário curto lado a lado
"O que acontece depois": 1. a coordenação chama no WhatsApp
2. você conhece a sede 3. escolhe um turno. (É sequência real,
então aqui a numeração faz sentido.)

ONDE ESTAMOS: endereço em mono, mapa estático ou link para o
Google Maps, horários, Instagram. Em linha, sem cards.

RODAPÉ (--mata): lema "Amor e solidariedade", CNPJ, endereço,
Instagram. Uma linha de navegação. Sem "feito com carinho".
```

- Container de 1180px, grid de 12 colunas, gutter de 24px, mobile com 16px de margem lateral.
- Seções separadas por espaço (96–128px) e, quando preciso, uma linha reta `--linha`. Fundo sempre `--papel`, exceto PIX e rodapé (`--mata`).
- Border-radius: 4px em botões e inputs, 0 nas fotos. O cartão kraft pode ter 2px. Nada de pílulas, exceto a fita.

### Fluxo de doação
- O botão "Doar via PIX" do header **rola até o bloco PIX** (âncora). Remova o modal ou deixe-o só no mobile como bottom sheet, sem duplicar conteúdo.
- O botão de copiar troca o texto para "Chave copiada" por 3s e anuncia via `aria-live`. O toast pode sair.
- Ao lado do PIX, um link secundário "Prefere doar alimentos ou roupas? Veja o que falta" leva à lista.

### Movimento
- Remova carrossel, pulse-glow, hover-lift, zoom em imagem e transições `all`.
- Um único momento intencional: ao carregar, os itens da lista "o que falta" entram em sequência (opacity + translateY 6px, 40ms de intervalo, total < 400ms).
- Hover de links: sublinhado com `text-underline-offset: 4px`. Hover de botão: só a cor muda.
- Respeite `@media (prefers-reduced-motion: reduce)` desligando tudo.

### Acessibilidade (obrigatório)
- `:focus-visible` com outline de 3px `--azul-aapc` e offset de 2px em todos os interativos. Nunca `outline: none` sem substituto.
- Validação do formulário inline, abaixo do campo, com `aria-describedby`. Sem `alert()`. Mensagens dizem o que corrigir ("Informe um WhatsApp com DDD, ex.: 51 99999-0000").
- Se mantiver o modal: focus trap, devolver o foco ao gatilho ao fechar, e usar `inert` no fundo.
- Contraste AA em todo texto. Alvos de toque ≥ 44px.

### Regras de texto
- Escreva como um voluntário da sede escreveria: frases curtas, concretas, com nomes de bairros, itens e lugares.
- Cada seção diz uma coisa só. Sem trincas por reflexo, sem negrito no início de itens e sem adjetivos de venda.
- Botões dizem a ação: "Doar via PIX", "Copiar chave", "Enviar pelo WhatsApp", "Ver o que falta".
- Mantenha os fatos já presentes no `index.html` (endereço, CNPJ, projetos, bairros, HCC). Não invente fatos novos. Onde faltar informação, deixe `<!-- TODO: confirmar com a AAPC -->`.

### Código
- Reescreva `style.css` do zero a partir dos tokens acima e apague as classes mortas (ondas, ODS, impacto, carrossel, toast se removido).
- Comentários curtos e sem banners numerados.
- Conteúdo editável em `src/data/necessidades.json` e `src/data/conteudo.json`.
- Ao terminar, rode `npm run build` e confira que não há erros.

## Critérios de aceite (verifique cada um no navegador, em 1366px e 375px)
- [ ] Nenhuma foto gerada por IA no layout; placeholders `foto-pendente` no lugar.
- [ ] QR Code decodifica para um BR Code PIX válido da chave CNPJ, ou foi removido.
- [ ] Nenhum número de impacto sem `"verificado": true`.
- [ ] Zero ondas, zero pílulas de eyebrow, zero ícones em quadrado pastel, zero glow, zero carrossel.
- [ ] Só as fontes Archivo, Atkinson Hyperlegible Next e Atkinson Hyperlegible Mono são carregadas.
- [ ] Nenhuma cor fora dos tokens (procure `#64748B`, `#E2E8F0`, `#7E22CE`, `#34D399` e outras no CSS; nenhuma deve existir).
- [ ] Chave PIX aparece em um só bloco (mais o rodapé, em texto pequeno).
- [ ] Cartão "Falta esta semana" lê do JSON e trata lista desatualizada.
- [ ] Projetos em lista editorial alternada, não em grid de cards.
- [ ] Foco visível em todos os interativos; reduced-motion respeitado; sem scroll horizontal em 375px.
- [ ] Entregue screenshots desktop e mobile de cada seção e uma lista do que ficou como TODO para a AAPC confirmar.
