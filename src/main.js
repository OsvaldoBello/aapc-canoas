// AAPC Canoas · Lógica de Interações, Validações e Envio por E-mail
const WHATSAPP_AAPC = '5551992701114';
const CHAVE_PIX = '59.074.303/0001-00';

// E-mail de destino dos formulários:
// Em ambiente de teste: osvaldooliveirabello@gmail.com
// Em ambiente de produção: ongamigoseparceiroscanoas@gmail.com
const EMAIL_DESTINO_TESTE = 'osvaldooliveirabello@gmail.com';

document.addEventListener('DOMContentLoaded', () => {
  configurarCopiaPix();
  configurarMascaras();
  configurarTermoVoluntarioToggle();
  configurarFormularioVoluntario();
  configurarFormularioAssociado();
  configurarNavegacaoMobile();
  configurarRolagemSuave();
});

/* --------------------------------------------------------------------------
   1. Cópia da chave PIX com feedback acessível
   -------------------------------------------------------------------------- */
function configurarCopiaPix() {
  const btnCopiar = document.getElementById('btn-copiar-chave-pix');
  const textoBtn = document.getElementById('texto-btn-pix');
  const statusAria = document.getElementById('pix-status-copia');
  if (!btnCopiar) return;

  btnCopiar.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(CHAVE_PIX);
      } else {
        const inputOculto = document.createElement('input');
        inputOculto.value = CHAVE_PIX;
        document.body.appendChild(inputOculto);
        inputOculto.select();
        document.execCommand('copy');
        document.body.removeChild(inputOculto);
      }

      const textoOriginal = textoBtn ? textoBtn.textContent : 'Copiar chave';
      if (textoBtn) textoBtn.textContent = 'Chave copiada!';
      btnCopiar.classList.add('copiado');
      if (statusAria) statusAria.textContent = 'Chave PIX copiada para a área de transferência.';

      setTimeout(() => {
        if (textoBtn) textoBtn.textContent = textoOriginal;
        btnCopiar.classList.remove('copiado');
        if (statusAria) statusAria.textContent = '';
      }, 3000);
    } catch (err) {
      console.error('Erro ao copiar chave PIX:', err);
      if (statusAria) statusAria.textContent = 'Não foi possível copiar automaticamente. Selecione a chave na tela.';
    }
  });
}

/* --------------------------------------------------------------------------
   2. Máscaras Dinâmicas de Entrada (Telefone, CPF, CEP)
   -------------------------------------------------------------------------- */
function configurarMascaras() {
  function aplicarMascaraTelefone(e) {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length > 6) {
      v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
    } else if (v.length > 2) {
      v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
    } else if (v.length > 0) {
      v = `(${v}`;
    }
    e.target.value = v;
  }

  function aplicarMascaraCPF(e) {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length > 9) {
      v = `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6, 9)}-${v.slice(9)}`;
    } else if (v.length > 6) {
      v = `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6)}`;
    } else if (v.length > 3) {
      v = `${v.slice(0, 3)}.${v.slice(3)}`;
    }
    e.target.value = v;
  }

  function aplicarMascaraCEP(e) {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 8) v = v.slice(0, 8);
    if (v.length > 5) {
      v = `${v.slice(0, 5)}-${v.slice(5)}`;
    }
    e.target.value = v;
  }

  const inputsTel = document.querySelectorAll('input[type="tel"]');
  inputsTel.forEach(input => input.addEventListener('input', aplicarMascaraTelefone));

  const inputsCPF = document.querySelectorAll('#campo-vol-cpf, #campo-assoc-cpf');
  inputsCPF.forEach(input => input.addEventListener('input', aplicarMascaraCPF));

  const inputCEP = document.getElementById('campo-assoc-cep');
  if (inputCEP) inputCEP.addEventListener('input', aplicarMascaraCEP);
}

/* --------------------------------------------------------------------------
   3. Acordeão do Termo de Adesão ao Serviço Voluntário
   -------------------------------------------------------------------------- */
function configurarTermoVoluntarioToggle() {
  const toggleBtn = document.getElementById('btn-toggle-termo');
  const caixaTermo = document.querySelector('.caixa-termo-adesao');
  if (!toggleBtn || !caixaTermo) return;

  function alternarTermo() {
    const estaAberto = caixaTermo.classList.toggle('termo-aberto');
    toggleBtn.setAttribute('aria-expanded', String(estaAberto));
  }

  toggleBtn.addEventListener('click', alternarTermo);
  toggleBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      alternarTermo();
    }
  });
}

/* --------------------------------------------------------------------------
   4. Formulário Oficial de Voluntariado & Disparo por E-mail
   -------------------------------------------------------------------------- */
function configurarFormularioVoluntario() {
  const form = document.getElementById('form-voluntario');
  if (!form) return;

  const campoNome = document.getElementById('campo-vol-nome');
  const campoNasc = document.getElementById('campo-vol-nascimento');
  const campoCPF = document.getElementById('campo-vol-cpf');
  const campoTel = document.getElementById('campo-vol-telefone');
  const campoEmail = document.getElementById('campo-vol-email');
  const campoEndereco = document.getElementById('campo-vol-endereco');
  const campoMotivacao = document.getElementById('campo-vol-motivacao');
  const campoTermo = document.getElementById('campo-vol-concordo-termo');
  const submitBtn = document.getElementById('btn-submit-voluntario');
  const statusBox = document.getElementById('status-envio-voluntario');

  const erroNome = document.getElementById('erro-vol-nome');
  const erroNasc = document.getElementById('erro-vol-nascimento');
  const erroCPF = document.getElementById('erro-vol-cpf');
  const erroTel = document.getElementById('erro-vol-telefone');
  const erroEmail = document.getElementById('erro-vol-email');
  const erroEndereco = document.getElementById('erro-vol-endereco');
  const erroAreas = document.getElementById('erro-vol-areas');
  const erroTermo = document.getElementById('erro-vol-termo');

  function validarEmailStr(str) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let temErro = false;

    // 1. Nome
    if (!campoNome.value.trim() || campoNome.value.trim().length < 3) {
      erroNome.textContent = 'Informe seu nome completo (mínimo de 3 caracteres).';
      campoNome.classList.add('campo-invalido');
      temErro = true;
    } else {
      erroNome.textContent = '';
      campoNome.classList.remove('campo-invalido');
    }

    // 2. Data de Nascimento
    if (!campoNasc.value) {
      erroNasc.textContent = 'Informe sua data de nascimento.';
      campoNasc.classList.add('campo-invalido');
      temErro = true;
    } else {
      erroNasc.textContent = '';
      campoNasc.classList.remove('campo-invalido');
    }

    // 3. CPF
    const digitosCPF = campoCPF.value.replace(/\D/g, '');
    if (digitosCPF.length !== 11) {
      erroCPF.textContent = 'Informe um CPF válido com 11 dígitos.';
      campoCPF.classList.add('campo-invalido');
      temErro = true;
    } else {
      erroCPF.textContent = '';
      campoCPF.classList.remove('campo-invalido');
    }

    // 4. Telefone
    const digitosTel = campoTel.value.replace(/\D/g, '');
    if (digitosTel.length < 10 || digitosTel.length > 11) {
      erroTel.textContent = 'Informe um telefone/WhatsApp válido com DDD.';
      campoTel.classList.add('campo-invalido');
      temErro = true;
    } else {
      erroTel.textContent = '';
      campoTel.classList.remove('campo-invalido');
    }

    // 5. E-mail
    if (!validarEmailStr(campoEmail.value.trim())) {
      erroEmail.textContent = 'Informe um endereço de e-mail válido.';
      campoEmail.classList.add('campo-invalido');
      temErro = true;
    } else {
      erroEmail.textContent = '';
      campoEmail.classList.remove('campo-invalido');
    }

    // 6. Endereço
    if (!campoEndereco.value.trim() || campoEndereco.value.trim().length < 6) {
      erroEndereco.textContent = 'Informe seu endereço completo (rua, número, bairro, cidade).';
      campoEndereco.classList.add('campo-invalido');
      temErro = true;
    } else {
      erroEndereco.textContent = '';
      campoEndereco.classList.remove('campo-invalido');
    }

    // 7. Áreas de Atuação (ao menos 1 selecionada)
    const checkboxesAreas = form.querySelectorAll('input[name="areas_atuacao"]:checked');
    if (checkboxesAreas.length === 0) {
      erroAreas.textContent = 'Selecione ao menos uma área em que deseja colaborar.';
      temErro = true;
    } else {
      erroAreas.textContent = '';
    }

    // 8. Aceite do Termo
    if (!campoTermo.checked) {
      erroTermo.textContent = 'É obrigatório aceitar o Termo de Adesão ao Serviço Voluntário.';
      temErro = true;
    } else {
      erroTermo.textContent = '';
    }

    if (temErro) {
      const primeiroInvalido = form.querySelector('.campo-invalido') || (checkboxesAreas.length === 0 ? form.querySelector('.grid-checkboxes-areas') : campoTermo);
      if (primeiroInvalido && primeiroInvalido.scrollIntoView) {
        primeiroInvalido.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Coleta dos dados formatados
    const areasSelecionadas = Array.from(checkboxesAreas).map(cb => cb.value).join('; ');
    const expPrevia = form.querySelector('input[name="experiencia_previa"]:checked')?.value || 'Não informada';
    const autoImagem = form.querySelector('input[name="autorizacao_imagem"]:checked')?.value || 'Autorizo';

    const payload = {
      tipo_cadastro: 'Novo Voluntário AAPC',
      nome_completo: campoNome.value.trim(),
      data_nascimento: campoNasc.value,
      cpf: campoCPF.value.trim(),
      telefone_whatsapp: campoTel.value.trim(),
      email: campoEmail.value.trim(),
      endereco_completo: campoEndereco.value.trim(),
      experiencia_previa: expPrevia,
      areas_de_interesse: areasSelecionadas,
      motivacao_para_ajudar: campoMotivacao.value.trim() || 'Não informada',
      autorizacao_uso_imagem: autoImagem,
      termo_adesao_voluntario: 'CONCORDOU com o Termo de Adesão (Lei nº 9.608/1998 e LGPD)',
      data_registro: new Date().toLocaleString('pt-BR')
    };

    const assunto = `[AAPC Voluntariado] ${payload.nome_completo}`;
    await enviarDadosEmail(payload, assunto, form, statusBox, submitBtn, 'voluntario');
  });
}

/* --------------------------------------------------------------------------
   5. Formulário de Associados & Seletor de Contribuição Mensal
   -------------------------------------------------------------------------- */
function configurarFormularioAssociado() {
  const form = document.getElementById('form-associado');
  if (!form) return;

  const campoNome = document.getElementById('campo-assoc-nome');
  const campoNasc = document.getElementById('campo-assoc-nascimento');
  const campoCPF = document.getElementById('campo-assoc-cpf');
  const campoTel = document.getElementById('campo-assoc-telefone');
  const campoEmail = document.getElementById('campo-assoc-email');
  const campoProfissao = document.getElementById('campo-assoc-profissao');
  const campoEndereco = document.getElementById('campo-assoc-endereco');
  const campoBairro = document.getElementById('campo-assoc-bairro');
  const campoCidade = document.getElementById('campo-assoc-cidade');
  const campoCEP = document.getElementById('campo-assoc-cep');
  const campoOrigem = document.getElementById('campo-assoc-origem');
  const campoValorFinal = document.getElementById('campo-assoc-valor-final');
  const boxCustom = document.getElementById('box-valor-customizado');
  const inputCustom = document.getElementById('campo-assoc-valor-custom');
  const campoObs = document.getElementById('campo-assoc-obs');
  const campoEstatuto = document.getElementById('campo-assoc-estatuto');
  const campoLGPD = document.getElementById('campo-assoc-lgpd');
  const submitBtn = document.getElementById('btn-submit-associado');
  const statusBox = document.getElementById('status-envio-associado');

  const erroNome = document.getElementById('erro-assoc-nome');
  const erroNasc = document.getElementById('erro-assoc-nascimento');
  const erroCPF = document.getElementById('erro-assoc-cpf');
  const erroTel = document.getElementById('erro-assoc-telefone');
  const erroEmail = document.getElementById('erro-assoc-email');
  const erroProfissao = document.getElementById('erro-assoc-profissao');
  const erroEndereco = document.getElementById('erro-assoc-endereco');
  const erroBairro = document.getElementById('erro-assoc-bairro');
  const erroCidade = document.getElementById('erro-assoc-cidade');
  const erroCEP = document.getElementById('erro-assoc-cep');
  const erroOrigem = document.getElementById('erro-assoc-origem');
  const erroValor = document.getElementById('erro-assoc-valor');
  const erroEstatuto = document.getElementById('erro-assoc-estatuto');
  const erroLGPD = document.getElementById('erro-assoc-lgpd');

  // Interatividade das pílulas de valor
  const botoesValor = form.querySelectorAll('.btn-pilula-valor');
  botoesValor.forEach(btn => {
    btn.addEventListener('click', () => {
      botoesValor.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const valor = btn.getAttribute('data-valor');
      if (valor === 'outro') {
        boxCustom.style.display = 'block';
        if (inputCustom.value.trim()) {
          campoValorFinal.value = inputCustom.value.trim();
        } else {
          campoValorFinal.value = 'Outro valor (A combinar)';
        }
        inputCustom.focus();
      } else {
        boxCustom.style.display = 'none';
        campoValorFinal.value = valor;
      }
    });
  });

  if (inputCustom) {
    inputCustom.addEventListener('input', (e) => {
      let v = e.target.value.trim();
      campoValorFinal.value = v.startsWith('R$') ? v : `R$ ${v}`;
    });
  }

  function validarEmailStr(str) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let temErro = false;

    // 1. Nome
    if (!campoNome.value.trim() || campoNome.value.trim().length < 3) {
      erroNome.textContent = 'Informe seu nome completo (mínimo de 3 caracteres).';
      campoNome.classList.add('campo-invalido');
      temErro = true;
    } else {
      erroNome.textContent = '';
      campoNome.classList.remove('campo-invalido');
    }

    // 2. Data de Nascimento
    if (!campoNasc.value) {
      erroNasc.textContent = 'Informe sua data de nascimento.';
      campoNasc.classList.add('campo-invalido');
      temErro = true;
    } else {
      erroNasc.textContent = '';
      campoNasc.classList.remove('campo-invalido');
    }

    // 3. CPF
    const digitosCPF = campoCPF.value.replace(/\D/g, '');
    if (digitosCPF.length !== 11) {
      erroCPF.textContent = 'Informe um CPF válido com 11 dígitos.';
      campoCPF.classList.add('campo-invalido');
      temErro = true;
    } else {
      erroCPF.textContent = '';
      campoCPF.classList.remove('campo-invalido');
    }

    // 4. Telefone
    const digitosTel = campoTel.value.replace(/\D/g, '');
    if (digitosTel.length < 10 || digitosTel.length > 11) {
      erroTel.textContent = 'Informe um telefone/WhatsApp válido com DDD.';
      campoTel.classList.add('campo-invalido');
      temErro = true;
    } else {
      erroTel.textContent = '';
      campoTel.classList.remove('campo-invalido');
    }

    // 5. E-mail
    if (!validarEmailStr(campoEmail.value.trim())) {
      erroEmail.textContent = 'Informe um e-mail válido.';
      campoEmail.classList.add('campo-invalido');
      temErro = true;
    } else {
      erroEmail.textContent = '';
      campoEmail.classList.remove('campo-invalido');
    }

    // 6. Profissão
    if (!campoProfissao.value.trim()) {
      erroProfissao.textContent = 'Informe sua profissão ou ocupação.';
      campoProfissao.classList.add('campo-invalido');
      temErro = true;
    } else {
      erroProfissao.textContent = '';
      campoProfissao.classList.remove('campo-invalido');
    }

    // 7. Endereço, Bairro, Cidade e CEP
    if (!campoEndereco.value.trim() || campoEndereco.value.trim().length < 4) {
      erroEndereco.textContent = 'Informe o logradouro e número.';
      campoEndereco.classList.add('campo-invalido');
      temErro = true;
    } else {
      erroEndereco.textContent = '';
      campoEndereco.classList.remove('campo-invalido');
    }

    if (!campoBairro.value.trim()) {
      erroBairro.textContent = 'Informe o bairro.';
      campoBairro.classList.add('campo-invalido');
      temErro = true;
    } else {
      erroBairro.textContent = '';
      campoBairro.classList.remove('campo-invalido');
    }

    if (!campoCidade.value.trim()) {
      erroCidade.textContent = 'Informe a cidade/UF (ex: Canoas/RS).';
      campoCidade.classList.add('campo-invalido');
      temErro = true;
    } else {
      erroCidade.textContent = '';
      campoCidade.classList.remove('campo-invalido');
    }

    const digitosCEP = campoCEP.value.replace(/\D/g, '');
    if (digitosCEP.length !== 8) {
      erroCEP.textContent = 'Informe um CEP válido com 8 dígitos.';
      campoCEP.classList.add('campo-invalido');
      temErro = true;
    } else {
      erroCEP.textContent = '';
      campoCEP.classList.remove('campo-invalido');
    }

    // 8. Origem
    if (!campoOrigem.value) {
      erroOrigem.textContent = 'Selecione como conheceu a associação.';
      campoOrigem.classList.add('campo-invalido');
      temErro = true;
    } else {
      erroOrigem.textContent = '';
      campoOrigem.classList.remove('campo-invalido');
    }

    // 9. Valor da Contribuição
    if (!campoValorFinal.value || campoValorFinal.value === 'Outro valor (A combinar)' && !inputCustom.value.trim()) {
      erroValor.textContent = 'Informe o valor da contribuição mensal desejada.';
      temErro = true;
    } else {
      erroValor.textContent = '';
    }

    // 10. Aceite Estatuto e LGPD
    if (!campoEstatuto.checked) {
      erroEstatuto.textContent = 'É necessário concordar com o Estatuto da Associação.';
      temErro = true;
    } else {
      erroEstatuto.textContent = '';
    }

    if (!campoLGPD.checked) {
      erroLGPD.textContent = 'É necessário autorizar o uso dos dados para comunicações oficiais.';
      temErro = true;
    } else {
      erroLGPD.textContent = '';
    }

    if (temErro) {
      const primeiroInvalido = form.querySelector('.campo-invalido') || (!campoEstatuto.checked ? campoEstatuto : campoLGPD);
      if (primeiroInvalido && primeiroInvalido.scrollIntoView) {
        primeiroInvalido.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const payload = {
      tipo_cadastro: 'Novo Associado AAPC',
      nome_completo: campoNome.value.trim(),
      data_nascimento: campoNasc.value,
      cpf: campoCPF.value.trim(),
      telefone_whatsapp: campoTel.value.trim(),
      email: campoEmail.value.trim(),
      profissao: campoProfissao.value.trim(),
      endereco_logradouro: campoEndereco.value.trim(),
      bairro: campoBairro.value.trim(),
      cidade_uf: campoCidade.value.trim(),
      cep: campoCEP.value.trim(),
      como_conheceu_a_ong: campoOrigem.value,
      valor_contribuicao_mensal: campoValorFinal.value,
      observacoes: campoObs.value.trim() || 'Nenhuma',
      concordancia_estatuto: 'SIM - Concordou com o Estatuto da Associação',
      autorizacao_dados_lgpd: 'SIM - Autorizou uso cadastral e comunicações',
      data_registro: new Date().toLocaleString('pt-BR')
    };

    const assunto = `[AAPC Novo Associado] ${payload.nome_completo}`;
    await enviarDadosEmail(payload, assunto, form, statusBox, submitBtn, 'associado');
  });
}

/* --------------------------------------------------------------------------
   6. Motor de Envio Assíncrono por E-mail (FormSubmit AJAX)
   -------------------------------------------------------------------------- */
async function enviarDadosEmail(dados, assunto, formElement, statusBox, submitBtn, tipo) {
  if (statusBox) {
    statusBox.innerHTML = `
      <div class="status-enviando">
        <span>⏳ Enviando informações com segurança para a AAPC...</span>
      </div>`;
  }
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
        _template: 'table',
        _captcha: 'false',
        ...dados
      })
    });

    const resultado = await response.json();

    if (response.ok && (resultado.success === 'true' || resultado.success === true || resultado.message)) {
      const msgSucessoTitulo = tipo === 'voluntario' 
        ? 'Inscrição de Voluntariado Recebida!' 
        : 'Adesão de Associado Registrada!';

      const msgSucessoTexto = tipo === 'voluntario'
        ? `Muito obrigado por se voluntariar, <strong>${dados.nome_completo}</strong>! Seus dados foram arquivados com sucesso em nosso e-mail oficial e a coordenação da AAPC entrará em contato.`
        : `Gratidão imensa pelo seu apoio mensal, <strong>${dados.nome_completo}</strong>! Sua adesão como associado garante a continuidade das nossas ações para quem mais tem fome.`;

      const msgWhatsApp = encodeURIComponent(
        `Olá! Acabei de enviar minha ficha de ${tipo === 'voluntario' ? 'voluntário' : 'associado'} pelo site da AAPC (${dados.nome_completo}) e gostaria de confirmar o recebimento.`
      );

      if (statusBox) {
        statusBox.innerHTML = `
          <div class="feedback-sucesso">
            <h4>✅ ${msgSucessoTitulo}</h4>
            <p>${msgSucessoTexto}</p>
            <a href="https://wa.me/${WHATSAPP_AAPC}?text=${msgWhatsApp}" target="_blank" rel="noopener noreferrer" class="btn-aviso-whatsapp">
              <span>💬 Deseja avisar a coordenação no WhatsApp? (Opcional)</span>
            </a>
          </div>`;
      }
      formElement.reset();
    } else {
      throw new Error(resultado.message || 'Falha no processamento pelo serviço de e-mail.');
    }
  } catch (err) {
    console.error('Erro no envio assíncrono:', err);
    if (statusBox) {
      statusBox.innerHTML = `
        <div class="feedback-erro">
          <p>⚠️ Não foi possível registrar os dados automaticamente no momento. Por favor, tente novamente ou entre em contato diretamente pelo nosso WhatsApp oficial <strong>(51) 99270-1114</strong>.</p>
        </div>`;
    }
  } finally {
    if (submitBtn) submitBtn.disabled = false;
  }
}

/* --------------------------------------------------------------------------
   7. Menu Mobile Acessível
   -------------------------------------------------------------------------- */
function configurarNavegacaoMobile() {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav-principal');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const expandido = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expandido));
    nav.classList.toggle('menu-aberto', !expandido);
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('menu-aberto');
    });
  });
}

/* --------------------------------------------------------------------------
   8. Rolagem Suave para Âncoras
   -------------------------------------------------------------------------- */
function configurarRolagemSuave() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}
