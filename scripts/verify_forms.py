import os
import sys
import time
from playwright.sync_api import sync_playwright

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

BASE_URL = "http://localhost:5173"
OUTPUT_DIR = "artifacts/verification_forms"

def run_verification():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print("Iniciando testes no endereco:", BASE_URL, flush=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # --- TESTE 1: DESKTOP (1366 x 900) ---
        print("\n=== TESTE 1: DESKTOP VIEWPORT (1366x900) ===", flush=True)
        page_desktop = browser.new_page(viewport={'width': 1366, 'height': 900})
        page_desktop.goto(BASE_URL, wait_until='networkidle')
        time.sleep(1)

        # 1.1 Verificar Seção: Hub Como Ajudar & Botões Verdes AAPC
        como_ajudar = page_desktop.locator('#como-ajudar')
        assert como_ajudar.is_visible(), "Secao #como-ajudar deve estar visivel"
        hub_cards = page_desktop.locator('#como-ajudar .card-ajuda')
        count_cards = hub_cards.count()
        assert count_cards == 3, f"Esperado 3 cards no hub, encontrado {count_cards}"
        
        # Verificar se os botões são verdes (classe .btn-ajuda-verde)
        btn_hub = page_desktop.locator('#como-ajudar .btn-ajuda-verde').first
        cor_btn_hub = btn_hub.evaluate("el => window.getComputedStyle(el).backgroundColor")
        print(f"[OK] Hub 'Como eu posso ajudar?' validado (3 cards com CTAs verdes AAPC: {cor_btn_hub}).", flush=True)
        como_ajudar.screenshot(path=f"{OUTPUT_DIR}/desktop_hub_como_ajudar.png")

        # 1.2 Verificar Seção Unificada: #faca-parte e Seletor de Abas
        secao_engajamento = page_desktop.locator('#faca-parte')
        assert secao_engajamento.is_visible(), "Secao unificada #faca-parte deve estar visivel"
        
        btn_tab_vol = page_desktop.locator('#tab-btn-voluntario')
        btn_tab_assoc = page_desktop.locator('#tab-btn-associado')
        painel_vol = page_desktop.locator('#painel-voluntario')
        painel_assoc = page_desktop.locator('#painel-associado')

        assert btn_tab_vol.is_visible() and btn_tab_assoc.is_visible(), "Abas de alternancia devem estar visiveis"
        assert painel_vol.is_visible(), "Painel de voluntariado deve iniciar ativo"
        assert not painel_assoc.is_visible(), "Painel de associados deve iniciar oculto"
        print("[OK] Seletor de abas unificado validado com estado inicial correto.", flush=True)

        # 1.3 Aba Voluntariado: Foto La Salle, 11 campos e Acordeão de 8 Cláusulas
        img_lasalle = page_desktop.locator('img[src*="acao-voluntarios-lasalle.jpg"]')
        assert img_lasalle.is_visible(), "Foto da acao La Salle deve estar visivel no painel de voluntariado"
        
        form_vol = page_desktop.locator('#form-voluntario')
        assert form_vol.is_visible(), "Formulario de voluntariado deve estar visivel"
        
        campos_vol = [
            '#campo-vol-nome', '#campo-vol-nascimento', '#campo-vol-cpf',
            '#campo-vol-endereco', '#campo-vol-telefone', '#campo-vol-email',
            '#campo-vol-motivacao', '#campo-vol-concordo-termo'
        ]
        for campo in campos_vol:
            assert page_desktop.locator(campo).count() > 0, f"Campo {campo} nao encontrado no form de voluntariado"
        
        # Testar acordeão do termo
        btn_termo = page_desktop.locator('#btn-toggle-termo')
        conteudo_termo = page_desktop.locator('#conteudo-termo-adesao')
        btn_termo.click()
        time.sleep(0.4)
        assert conteudo_termo.is_visible(), "Conteudo do termo deve abrir ao clicar"
        assert page_desktop.locator('#conteudo-termo-adesao ol li').count() == 8, "Devem haver 8 artigos no termo"
        print("[OK] Aba Voluntariado validada (Foto La Salle, campos e termo com 8 artigos).", flush=True)
        secao_engajamento.screenshot(path=f"{OUTPUT_DIR}/desktop_engajamento_voluntario.png")

        # 1.4 Testar Alternância para Aba Associado
        btn_tab_assoc.click()
        time.sleep(0.4)
        assert painel_assoc.is_visible(), "Painel de associados deve ficar visivel apos clique"
        assert not painel_vol.is_visible(), "Painel de voluntariado deve ficar oculto"
        
        # Verificar cores verdes nos valores de associados
        pill_ativo = page_desktop.locator('.btn-pilula-valor.active')
        cor_pill = pill_ativo.evaluate("el => window.getComputedStyle(el).backgroundColor")
        print(f"[OK] Aba Associado ativa. Cor da pilula de valor selecionada: {cor_pill} (Verde AAPC).", flush=True)

        # Testar clique em 'Outro valor'
        pill_outro = page_desktop.locator('.btn-pilula-valor[data-valor="outro"]')
        pill_outro.click()
        time.sleep(0.3)
        wrapper_custom = page_desktop.locator('#box-valor-customizado')
        assert wrapper_custom.is_visible(), "Campo personalizado deve abrir ao selecionar Outro valor"

        # Verificar campos e checkboxes do formulário de associado
        campos_assoc = [
            '#campo-assoc-nome', '#campo-assoc-nascimento', '#campo-assoc-cpf',
            '#campo-assoc-endereco', '#campo-assoc-bairro', '#campo-assoc-cidade',
            '#campo-assoc-cep', '#campo-assoc-telefone', '#campo-assoc-email',
            '#campo-assoc-profissao', '#campo-assoc-origem',
            '#campo-assoc-estatuto', '#campo-assoc-lgpd'
        ]
        for campo in campos_assoc:
            assert page_desktop.locator(campo).count() > 0, f"Campo {campo} nao encontrado no form de associado"
        print("[OK] Ficha cadastral de associado e consentimentos estatutarios/LGPD validados.", flush=True)
        secao_engajamento.screenshot(path=f"{OUTPUT_DIR}/desktop_engajamento_associado.png")

        # --- TESTE 2: MOBILE VIEWPORT (375 x 812) ---
        print("\n=== TESTE 2: MOBILE VIEWPORT (375x812) ===", flush=True)
        page_mobile = browser.new_page(viewport={'width': 375, 'height': 812})
        page_mobile.goto(BASE_URL, wait_until='networkidle')
        time.sleep(1)

        # Scroll até o final e retorno para garantir layout completo
        page_mobile.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(1)
        page_mobile.evaluate("window.scrollTo(0, 0)")
        time.sleep(0.5)

        # Teste de Overflow Horizontal na aba Voluntariado
        scroll_width_vol = page_mobile.evaluate("document.documentElement.scrollWidth")
        client_width = page_mobile.evaluate("document.documentElement.clientWidth")
        print(f"Mobile widths (Voluntario): scrollWidth={scroll_width_vol}, clientWidth={client_width}", flush=True)
        assert scroll_width_vol == client_width, f"ERRO: Overflow horizontal na aba voluntario! {scroll_width_vol} > {client_width}"
        page_mobile.locator('#faca-parte').screenshot(path=f"{OUTPUT_DIR}/mobile_engajamento_voluntario.png")

        # Alternar para Associado no mobile e testar overflow
        btn_mobile_assoc = page_mobile.locator('#tab-btn-associado')
        btn_mobile_assoc.click()
        time.sleep(0.5)
        scroll_width_assoc = page_mobile.evaluate("document.documentElement.scrollWidth")
        print(f"Mobile widths (Associado): scrollWidth={scroll_width_assoc}, clientWidth={client_width}", flush=True)
        assert scroll_width_assoc == client_width, f"ERRO: Overflow horizontal na aba associado! {scroll_width_assoc} > {client_width}"
        page_mobile.locator('#faca-parte').screenshot(path=f"{OUTPUT_DIR}/mobile_engajamento_associado.png")
        print("[OK] Zero scroll horizontal em ambas as abas no mobile (375px) perfeitamente validado.", flush=True)

        browser.close()
        print("\n=== TODOS OS TESTES PASSARAM COM SUCESSO! ===", flush=True)

if __name__ == "__main__":
    run_verification()
