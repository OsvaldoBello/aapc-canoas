# Especificação de Design: Hub Como Ajudar, Voluntariado, Associados & Disparo de E-mail

- **Data**: 14 de Outubro de 2026
- **Projeto**: Portal Institucional da Associação Amigos e Parceiros de Canoas (AAPC)
- **Status**: Aprovado pelo Usuário
- **Autor / Agente**: Antigravity & Osvaldo Bello

---

## 1. Contexto e Objetivos

Após alinhamento e reunião com a coordenação da **ONG Associação Amigos e Parceiros de Canoas (AAPC)**, foram definidas melhorias centrais no portal:
1. **Hub "Como eu posso ajudar?"**: Apresentar de maneira moderna e atraente os 3 pilares de apoio (Doações, Voluntariado e Associados), inspirando-se no layout de referência da Associação Cirandar com cards de alto contraste e botões de chamada amarelos (`#FFC72C`).
2. **"Sem Sair de Casa" & Tipos de Apoio**: Explicar didaticamente como qualquer pessoa pode ajudar mesmo sem comparecer presencialmente (crochê/tricô, pequenas costuras, mobilização de campanhas, redes sociais).
3. **Credibilidade & Certificação de Horas Complementares**: Destacar que a AAPC emite certificados de horas voluntárias/extensão universitária e escolar, com foto e menção real da ação conjunta com os estudantes da **Universidade La Salle**.
4. **Formulário de Voluntariado Completo & Termo Oficial**: Substituir o formulário simplificado antigo pela ficha completa oficial com 11 itens, incorporando a íntegra dos **8 artigos do TERMO DE ADESÃO AO SERVIÇO VOLUNTÁRIO (Lei 9.608/1998)** e checkbox obrigatório de aceite.
5. **Formulário de Adesão de Associados**: Nova seção com gancho de conscientização sobre a sobrevivência da ONG sem recursos públicos municipais, ficha cadastral completa com valores sugeridos de contribuição mensal e termos de consentimento.
6. **Descentralização do WhatsApp & Envio por E-mail**: O envio dos dados dos formulários passa a ser enviado por e-mail formatado de maneira organizada, com endereço configurado para testes em `osvaldooliveirabello@gmail.com` (e destino de produção `ongamigoseparceiroscanoas@gmail.com`).

---

## 2. Arquitetura da Informação e Componentes

### 2.1. Navegação Principal (Header Fixo)
Adição das novas âncoras para acesso rápido:
- `Início` (`#topo`)
- `Como Ajudar` (`#como-ajudar`)
- `Associados` (`#associados`)
- `Voluntariado` (`#voluntariado`)
- `O Que Doar` (`#o-que-doar`)
- `Projetos` (`#projetos`)
- `Onde Estamos` (`#onde-estamos`)
- Botão de Destaque PIX (`#pix`)

### 2.2. Seção Hub: "Como eu posso ajudar?" (`#como-ajudar`)
- **Cabeçalho**: Título centralizado com sublinhado amarelo padrão ouro (`#FFC72C`).
- **Grade de 3 Cards Interativos**:
  1. **Doações**: Ícone de mãos acolhendo coração, texto explicativo sobre alimentos, roupas e PIX direto, botão `Conheça →` direcionando para `#o-que-doar`.
  2. **Voluntariado**: Ícone de voluntário, chamada destacando que não precisa sair de casa, botão `Conheça →` direcionando para `#voluntariado`.
  3. **Seja nosso Associado**: Ícone comunitário, chamada destacando a importância da contribuição mensal regular sem subsídios municipais, botão `Conheça →` direcionando para `#associados`.

### 2.3. Seção "Tipos de Ajuda & Sem Sair de Casa"
Inserida imediatamente antes da ficha de voluntariado:
- **Card 1: Sem Sair de Casa**
  - Confecção de tricô/crochê (toucas, mantas, roupinhas infantis).
  - Costura e pequenos consertos em agasalhos doados.
  - Divulgação digital e compartilhamento nas redes sociais.
  - Organização de ponto de arrecadação no condomínio ou ambiente de trabalho.
- **Card 2: Presencial & Logística**
  - Triagem de roupas e alimentos na sede (Rua Sete Povos, 312).
  - Apoio em ações externas de fim de semana (Pegue e Leve, distribuição de marmitas e cobertores).
  - Fretes e transporte de doações pesadas.
  - Atendimento ao público no Brechó Solidário.
- **Card 3: Certificação de Horas Complementares**
  - Exibição da fotografia real da ação de rua (`/img/fotos/acao-voluntarios-lasalle.jpg`).
  - Selo comprobatório de emissão de certificado oficial de atividades complementares e extensão universitária, mencionando o engajamento dos estudantes da Universidade La Salle.

### 2.4. Formulário de Voluntariado & Termo de Adesão
- **Campos**:
  - Nome completo (texto, obrigatório)
  - Data de nascimento (data)
  - CPF (texto com máscara `000.000.000-00`)
  - Endereço completo (rua, número, complemento, bairro, cidade, CEP)
  - Telefone / WhatsApp (com máscara `(00) 00000-0000`)
  - E-mail (email, obrigatório)
  - Já participou de ações voluntárias anteriormente? (radio: Sim / Não)
  - Áreas de interesse (checkboxes múltiplos das 11 áreas catalogadas)
  - Motivação para ajudar (textarea)
  - Autorização de imagem nas redes sociais (radio: Autorizo / Não autorizo)
- **Termo de Adesão ao Serviço Voluntário**:
  - Container colapsável/expansível ou modal estilizado contendo a íntegra dos 8 artigos:
    1. Do Serviço Voluntário (Lei Federal nº 9.608/1998)
    2. Da Ausência de Vínculo Empregatício
    3. Das Atividades
    4. Dos Deveres do Voluntário
    5. Da Utilização de Imagem
    6. Da Proteção de Dados Pessoais (LGPD - Lei 13.709/2018)
    7. Do Desligamento
    8. Da Declaração de Concordância
  - Checkbox obrigatório: `☑ Declaro que li e concordo com os termos descritos no Termo de Adesão ao Serviço Voluntário da AAPC.`

### 2.5. Seção & Formulário de Associados (`#associados`)
- **Texto de Gancho Emotivo e Transparência**:
  > *"A AAPC sobrevive 100% de doações e não recebe nenhum subsídio ou recurso público municipal. Como nosso associado contribuinte, você garante o sustento contínuo de centenas de famílias atendidas com alimentos e dignidade."*
- **Campos**:
  - Nome completo (obrigatório)
  - Data de nascimento
  - CPF (com máscara)
  - Endereço completo
  - Bairro
  - Cidade / UF
  - CEP (com máscara)
  - Telefone / WhatsApp (com máscara)
  - E-mail (obrigatório)
  - Profissão
  - Como conheceu a ONG? (select)
  - Valor da contribuição mensal (botões rápidos de R$ 20, R$ 50, R$ 100 e campo para outro valor)
  - Observações / Mensagem
  - Checkboxes obrigatórios:
    - `☑ Declaro que desejo me associar e que estou de acordo com o Estatuto da Associação.`
    - `☑ Autorizo o uso dos dados informados para meu cadastro e para comunicações relacionadas à associação.`

---

## 3. Fluxo de Dados e Integração por E-mail

- **Endpoint de Disparo**: `https://formsubmit.co/ajax/{EMAIL_DESTINO}`
- **Configuração de E-mail**:
  - **E-mail de Testes**: `osvaldooliveirabello@gmail.com`
  - **E-mail de Produção**: `ongamigoseparceiroscanoas@gmail.com`
  - Controlado por constante clara e centralizada no JavaScript (`const EMAIL_DESTINO_FORM = 'osvaldooliveirabello@gmail.com';`).
- **Payload & Formatação**:
  - Envio assíncrono via `fetch()` (JSON).
  - Assunto configurado via `_subject`:
    - `[AAPC Voluntariado] <Nome do Voluntário>`
    - `[AAPC Novo Associado] <Nome do Associado>`
  - Desativação de captcha visual do FormSubmit via `_captcha: false` para submissão fluida.
- **Feedback ao Usuário**:
  - Estado de envio com botão desabilitado e mensagem *"Enviando cadastro..."*.
  - Mensagem de sucesso estilizada com confirmação de recebimento.
  - Botão opcional *"Avisar coordenação no WhatsApp"* caso o candidato queira contato imediato.

---

## 4. Testes e Critérios de Aceite

1. **Validação de Formulários**: Campos obrigatórios validados com mensagens de erro acessíveis em tempo real.
2. **Máscaras de Entrada**: CPF, Telefone e CEP formatam dígitos automaticamente.
3. **Disparo de E-mail**: Ambos os formulários disparam com sucesso via AJAX para `osvaldooliveirabello@gmail.com` sem quebrar a página ou recarregar.
4. **Responsividade Mobile**: Layout de 3 colunas e formulários adaptam perfeitamente para 375px sem scroll horizontal.
5. **Acessibilidade**: Elementos interativos navegáveis por teclado e com atributos ARIA adequados.
