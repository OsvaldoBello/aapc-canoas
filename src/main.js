// AAPC Canoas · Lógica de Interações e Validações
const WHATSAPP_AAPC = '5551992701114';
const CHAVE_PIX = '59.074.303/0001-00';

document.addEventListener('DOMContentLoaded', () => {
  configurarCopiaPix();
  configurarFormularioVoluntario();
  configurarNavegacaoMobile();
  configurarRolagemSuave();
});

/* --------------------------------------------------------------------------
   1. Cópia da chave PIX com feedback tátil e acessível
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
   2. Formulário de Voluntariado com validação e WhatsApp
   -------------------------------------------------------------------------- */
function configurarFormularioVoluntario() {
  const form = document.getElementById('form-voluntario');
  if (!form) return;

  const campoNome = document.getElementById('campo-nome');
  const campoWhats = document.getElementById('campo-whatsapp');
  const campoArea = document.getElementById('campo-area');
  const campoDisp = document.getElementById('campo-disponibilidade');

  const erroNome = document.getElementById('erro-nome');
  const erroWhats = document.getElementById('erro-whatsapp');
  const erroArea = document.getElementById('erro-area');

  function validarNome() {
    const valor = campoNome.value.trim();
    if (!valor || valor.length < 3) {
      if (erroNome) erroNome.textContent = 'Informe seu nome completo (mínimo de 3 letras).';
      campoNome.classList.add('campo-invalido');
      return false;
    }
    if (erroNome) erroNome.textContent = '';
    campoNome.classList.remove('campo-invalido');
    return true;
  }

  function validarWhats() {
    const digitos = campoWhats.value.replace(/\D/g, '');
    if (digitos.length < 10 || digitos.length > 11) {
      if (erroWhats) erroWhats.textContent = 'Informe um WhatsApp com DDD, ex.: (51) 99999-0000.';
      campoWhats.classList.add('campo-invalido');
      return false;
    }
    if (erroWhats) erroWhats.textContent = '';
    campoWhats.classList.remove('campo-invalido');
    return true;
  }

  function validarArea() {
    const valor = campoArea.value;
    if (!valor) {
      if (erroArea) erroArea.textContent = 'Selecione uma área de atuação de sua preferência.';
      campoArea.classList.add('campo-invalido');
      return false;
    }
    if (erroArea) erroArea.textContent = '';
    campoArea.classList.remove('campo-invalido');
    return true;
  }

  campoNome.addEventListener('blur', validarNome);
  campoWhats.addEventListener('blur', validarWhats);
  campoArea.addEventListener('change', validarArea);

  // Máscara dinâmica para o telefone
  campoWhats.addEventListener('input', (e) => {
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
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nomeOk = validarNome();
    const whatsOk = validarWhats();
    const areaOk = validarArea();

    if (!nomeOk || !whatsOk || !areaOk) {
      if (!nomeOk) campoNome.focus();
      else if (!whatsOk) campoWhats.focus();
      else campoArea.focus();
      return;
    }

    const nome = campoNome.value.trim();
    const whatsapp = campoWhats.value.trim();
    const area = campoArea.value;
    const disp = campoDisp.value;

    const mensagem =
      `*Inscrição de Novo Voluntário: AAPC Canoas*\n\n` +
      `*Nome:* ${nome}\n` +
      `*WhatsApp:* ${whatsapp}\n` +
      `*Área de preferência:* ${area}\n` +
      `*Disponibilidade:* ${disp}\n\n` +
      `Olá! Preenchi o formulário no site da AAPC e gostaria de agendar uma visita à sede na Sete Povos para me integrar aos trabalhos voluntários.`;

    const url = `https://wa.me/${WHATSAPP_AAPC}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
    form.reset();
  });
}

/* --------------------------------------------------------------------------
   3. Menu Mobile Acessível
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
   4. Rolagem Suave para Âncoras
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
