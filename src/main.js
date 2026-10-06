/**
 * ONG AAPC CANOAS — Lógica e Interações do Portal
 * Modais, Carrossel Hero, Cópia de PIX de 1-Clique, Menu Mobile e Formulário WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initStickyHeader();
  initMobileMenu();
  initModalDoacao();
  initPixCopy();
  initFormVoluntario();
});

/* ==========================================================================
   1. HERO SLIDER COM AUTOPLAY E CONTROLE POR PONTOS (DOTS)
   ========================================================================== */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.dot-btn');
  const heroSection = document.querySelector('.hero');
  if (!slides.length || !dots.length) return;

  let currentSlide = 0;
  let slideInterval = null;
  const slideDuration = 6000; // 6 segundos

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function startAutoplay() {
    stopAutoplay();
    slideInterval = setInterval(nextSlide, slideDuration);
  }

  function stopAutoplay() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      goToSlide(idx);
      startAutoplay();
    });
  });

  if (heroSection) {
    heroSection.addEventListener('mouseenter', stopAutoplay);
    heroSection.addEventListener('mouseleave', startAutoplay);
  }

  startAutoplay();
}

/* ==========================================================================
   2. STICKY HEADER COM SOMBRA DINÂMICA
   ========================================================================== */
function initStickyHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   3. MENU MOBILE RESPONSIVO
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Fechar o menu ao clicar em qualquer link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Fechar ao clicar fora
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target) && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ==========================================================================
   4. MODAL INTERATIVO DE DOAÇÃO PIX
   ========================================================================== */
function initModalDoacao() {
  const modal = document.getElementById('modal-doar');
  const btnFechar = document.getElementById('modal-fechar');
  const btnFecharAcao = document.getElementById('btn-fechar-modal-acao');
  const triggers = document.querySelectorAll('[data-modal-trigger="doar"]');

  if (!modal) return;

  function abrirModal() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Foco acessível
    const btnCopy = document.getElementById('btn-copy-modal-pix');
    if (btnCopy) setTimeout(() => btnCopy.focus(), 150);
  }

  function fecharModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      abrirModal();
    });
  });

  if (btnFechar) btnFechar.addEventListener('click', fecharModal);
  if (btnFecharAcao) btnFecharAcao.addEventListener('click', fecharModal);

  // Fechar clicando no backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) fecharModal();
  });

  // Fechar na tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      fecharModal();
    }
  });
}

/* ==========================================================================
   5. CÓPIA DE PIX DE 1-CLIQUE COM TOAST E FEEDBACK VISUAL
   ========================================================================== */
const CHAVE_PIX_OFICIAL = '59.074.303/0001-00';

function initPixCopy() {
  const btnHeroCopy = document.getElementById('btn-copy-hero-pix');
  const btnModalCopy = document.getElementById('btn-copy-modal-pix');
  const btnModalConcluir = document.getElementById('btn-modal-concluir-copia');
  const inputChave = document.getElementById('input-chave-pix');

  async function copiarChave(botaoAcionado, textoOriginal = 'Copiar') {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(CHAVE_PIX_OFICIAL);
      } else {
        // Fallback robusto
        if (inputChave) {
          inputChave.select();
          document.execCommand('copy');
        }
      }

      exibirToast('Chave PIX copiada com sucesso! Cole no aplicativo do seu banco.');

      if (botaoAcionado) {
        const spanTexto = botaoAcionado.querySelector('.copy-text') || botaoAcionado.querySelector('span');
        if (spanTexto) {
          const original = spanTexto.textContent;
          spanTexto.textContent = 'Copiado! ✅';
          botaoAcionado.style.backgroundColor = '#00732C';
          setTimeout(() => {
            spanTexto.textContent = original;
            botaoAcionado.style.backgroundColor = '';
          }, 2500);
        }
      }
    } catch (err) {
      console.error('Erro ao copiar chave:', err);
      exibirToast('Selecione e copie manualmente: ' + CHAVE_PIX_OFICIAL);
    }
  }

  if (btnHeroCopy) {
    btnHeroCopy.addEventListener('click', () => copiarChave(btnHeroCopy, 'Copiar'));
  }

  if (btnModalCopy) {
    btnModalCopy.addEventListener('click', () => copiarChave(btnModalCopy, 'Copiar Chave'));
  }

  if (btnModalConcluir) {
    btnModalConcluir.addEventListener('click', () => copiarChave(btnModalConcluir, 'Copiar Chave PIX'));
  }
}

function exibirToast(mensagem) {
  const toast = document.getElementById('toast-aviso');
  const toastMsg = document.getElementById('toast-msg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = mensagem;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* ==========================================================================
   6. FORMULÁRIO DE VOLUNTARIADO (VALIDAÇÃO E DISPARO VIA WHATSAPP)
   ========================================================================== */
function initFormVoluntario() {
  const form = document.getElementById('form-voluntario');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = form.nome.value.trim();
    const whatsapp = form.whatsapp.value.trim();
    const email = form.email ? form.email.value.trim() : '';
    const area = form.area.value;
    const disponibilidade = form.disponibilidade ? form.disponibilidade.value : '';

    if (!nome) {
      alert('Por favor, informe seu nome completo.');
      form.nome.focus();
      return;
    }

    if (!whatsapp) {
      alert('Por favor, informe seu número de WhatsApp para contato.');
      form.whatsapp.focus();
      return;
    }

    if (!area) {
      alert('Por favor, selecione uma área de maior interesse.');
      form.area.focus();
      return;
    }

    // Montar mensagem amigável para o WhatsApp institucional da AAPC
    const textoMensagem = `*Inscrição de Voluntário — ONG AAPC Canoas*
` +
      `👋 Olá! Gostaria de fazer parte do voluntariado da AAPC!
` +
      `👤 *Nome:* ${nome}
` +
      `📱 *WhatsApp:* ${whatsapp}
` +
      (email ? `✉️ *E-mail:* ${email}\n` : '') +
      `🎯 *Área de Interesse:* ${area}
` +
      (disponibilidade ? `⏰ *Disponibilidade:* ${disponibilidade}\n` : '') +
      `\nUm gesto de amor pode mudar uma vida! 💚💙`;

    const textoCodificado = encodeURIComponent(textoMensagem);
    // Link direto para WhatsApp (número referencial da coordenação da AAPC)
    const urlWhatsApp = `https://wa.me/5551999999999?text=${textoCodificado}`;

    exibirToast('Redirecionando para o WhatsApp da AAPC...');
    
    // Abre em nova aba
    window.open(urlWhatsApp, '_blank');

    form.reset();
  });
}
