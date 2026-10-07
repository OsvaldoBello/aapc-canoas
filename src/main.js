// TODO: confirmar número definitivo da coordenação com a diretoria da AAPC.
// Número institucional extraído das divulgações oficiais no Instagram @ong_aapc_:
const WHATSAPP_AAPC = '5551984654846';
const CHAVE_PIX = '59.074.303/0001-00';

document.addEventListener('DOMContentLoaded', () => {
  carregarListaNecessidades();
  configurarCopiaPix();
  configurarFormularioVoluntario();
  configurarNavegacaoMobile();
});

/* --------------------------------------------------------------------------
   1. Cartão "Falta esta semana" (src/data/necessidades.json)
   -------------------------------------------------------------------------- */
async function carregarListaNecessidades() {
  const container = document.getElementById('lista-necessidades-container');
  const rodapeInfo = document.getElementById('necessidades-rodape-info');
  if (!container) return;

  try {
    const res = await fetch('/src/data/necessidades.json');
    if (!res.ok) throw new Error('Falha ao carregar lista de necessidades');
    const data = await res.json();

    const dataAtualizacao = new Date(data.atualizadaEm);
    const hoje = new Date();
    const diferencaDias = Math.floor((hoje - dataAtualizacao) / (1000 * 60 * 60 * 24));

    if (diferencaDias > 21) {
      container.innerHTML = `
        <p class="aviso-desatualizado">
          Lista desatualizada. Por favor, pergunte no WhatsApp o que está em falta no momento.
        </p>
      `;
      return;
    }

    const listaHtml = document.createElement('ul');
    listaHtml.className = 'itens-falta';

    data.itens.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = 'item-falta-linha';
      li.style.animationDelay = `${index * 40}ms`;

      const statusClasse = item.status === 'urgente' ? 'status-urgente'
        : item.status === 'pouco' ? 'status-pouco'
        : 'status-ok';

      li.innerHTML = `
        <span class="item-nome">${item.nome}</span>
        <span class="item-status ${statusClasse}">${item.status}</span>
      `;
      listaHtml.appendChild(li);
    });

    container.innerHTML = '';
    container.appendChild(listaHtml);

    if (rodapeInfo) {
      const dataFormatada = dataAtualizacao.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      rodapeInfo.textContent = `Atualizada em ${dataFormatada} · ${data.endereco} · ${data.horario}`;
    }
  } catch (err) {
    console.error('Erro ao buscar necessidades:', err);
    container.innerHTML = `
      <ul class="itens-falta">
        <li class="item-falta-linha"><span class="item-nome">Leite integral (caixa 1L)</span><span class="item-status status-urgente">urgente</span></li>
        <li class="item-falta-linha"><span class="item-nome">Fralda infantil G</span><span class="item-status status-pouco">pouco</span></li>
        <li class="item-falta-linha"><span class="item-nome">Feijão e arroz (1kg)</span><span class="item-status status-urgente">urgente</span></li>
        <li class="item-falta-linha"><span class="item-nome">Cobertor de frio</span><span class="item-status status-ok">ok por enquanto</span></li>
      </ul>
    `;
  }
}

/* --------------------------------------------------------------------------
   2. Cópia da chave PIX com feedback acessível
   -------------------------------------------------------------------------- */
function configurarCopiaPix() {
  const btnCopiar = document.getElementById('btn-copiar-chave-pix');
  const statusAria = document.getElementById('pix-copia-status');
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

      const textoOriginal = btnCopiar.textContent;
      btnCopiar.textContent = 'Chave copiada!';
      btnCopiar.classList.add('copiado');
      if (statusAria) statusAria.textContent = 'Chave PIX copiada para a área de transferência com sucesso.';

      setTimeout(() => {
        btnCopiar.textContent = textoOriginal;
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
   3. Formulário de Voluntariado com validação inline
   -------------------------------------------------------------------------- */
function configurarFormularioVoluntario() {
  const form = document.getElementById('form-voluntario');
  if (!form) return;

  const campoNome = document.getElementById('vol-nome');
  const campoWhats = document.getElementById('vol-whats');
  const campoArea = document.getElementById('vol-area');
  const campoDisp = document.getElementById('vol-disp');

  const erroNome = document.getElementById('erro-vol-nome');
  const erroWhats = document.getElementById('erro-vol-whats');
  const erroArea = document.getElementById('erro-vol-area');

  function validarNome() {
    const valor = campoNome.value.trim();
    if (!valor || valor.length < 3) {
      erroNome.textContent = 'Informe seu nome completo (mínimo de 3 letras).';
      campoNome.setAttribute('aria-invalid', 'true');
      return false;
    }
    erroNome.textContent = '';
    campoNome.removeAttribute('aria-invalid');
    return true;
  }

  function validarWhats() {
    const valor = campoWhats.value.replace(/\D/g, '');
    if (valor.length < 10 || valor.length > 11) {
      erroWhats.textContent = 'Informe um WhatsApp com DDD, ex.: (51) 99999-0000.';
      campoWhats.setAttribute('aria-invalid', 'true');
      return false;
    }
    erroWhats.textContent = '';
    campoWhats.removeAttribute('aria-invalid');
    return true;
  }

  function validarArea() {
    const valor = campoArea.value;
    if (!valor) {
      erroArea.textContent = 'Selecione uma área de atuação de sua preferência.';
      campoArea.setAttribute('aria-invalid', 'true');
      return false;
    }
    erroArea.textContent = '';
    campoArea.removeAttribute('aria-invalid');
    return true;
  }

  campoNome.addEventListener('blur', validarNome);
  campoWhats.addEventListener('blur', validarWhats);
  campoArea.addEventListener('change', validarArea);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nomeValido = validarNome();
    const whatsValido = validarWhats();
    const areaValida = validarArea();

    if (!nomeValido || !whatsValido || !areaValida) {
      if (!nomeValido) campoNome.focus();
      else if (!whatsValido) campoWhats.focus();
      else campoArea.focus();
      return;
    }

    const nome = campoNome.value.trim();
    const whatsapp = campoWhats.value.trim();
    const area = campoArea.value;
    const disp = campoDisp.value;

    const mensagem =
      `*Inscrição de Voluntário: AAPC Canoas*\n\n` +
      `*Nome:* ${nome}\n` +
      `*WhatsApp:* ${whatsapp}\n` +
      `*Área de preferência:* ${area}\n` +
      `*Disponibilidade:* ${disp}\n\n` +
      `Olá! Preenchi o formulário no site e gostaria de conversar sobre os próximos passos.`;

    const url = `https://wa.me/${WHATSAPP_AAPC}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
    form.reset();
  });
}

/* --------------------------------------------------------------------------
   4. Menu Mobile
   -------------------------------------------------------------------------- */
function configurarNavegacaoMobile() {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav-principal');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const expandido = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expandido));
    nav.classList.toggle('aberto', !expandido);
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('aberto');
    });
  });
}
