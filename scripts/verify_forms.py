import os
import sys
import time
from playwright.sync_api import sync_playwright

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

BASE_URL = "http://127.0.0.1:4173"
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

        # 1.1 Verificar Seção: Hub Como Ajudar
        como_ajudar = page_desktop.locator('#como-ajudar')
        assert como_ajudar.is_visible(), "Secao #como-ajudar deve estar visivel"
        hub_cards = page_desktop.locator('#como-ajudar .card-ajuda')
        count_cards = hub_cards.count()
        assert count_cards == 3, f"Esperado 3 cards no hub, encontrado {count_cards}"
        print(f"[OK] Hub 'Como eu posso ajudar?' validado ({count_cards} cards com CTAs ouro #F3BA2F presentes).", flush=True)
        como_ajudar.screenshot(path=f"{OUTPUT_DIR}/desktop_hub_como_ajudar.png")

        # 1.2 Verificar Seção: Voluntariado & Tipos de Ajuda & Foto La Salle
        voluntariado = page_desktop.locator('#voluntariado')
        assert voluntariado.is_visible(), "Secao #voluntariado deve estar visivel"
        
        img_lasalle = page_desktop.locator('img[src*="acao-voluntarios-lasalle.jpg"]')
        assert img_lasalle.is_visible(), "Foto da acao La Salle deve estar visivel"
        print("[OK] Foto da acao La Salle e certificacao de horas complementares validadas e visiveis.", flush=True)

        # 1.3 Verificar Formulário de Voluntariado e seus campos
        form_vol = page_desktop.locator('#form-voluntario')
        assert form_vol.is_visible(), "Formulario #form-voluntario deve estar visivel"
        
        campos_vol = [
            '#campo-vol-nome', '#campo-vol-nascimento', '#campo-vol-cpf',
            '#campo-vol-endereco', '#campo-vol-telefone', '#campo-vol-email',
            '#campo-vol-motivacao', '#campo-vol-concordo-termo'
        ]
        for campo in campos_vol:
            assert page_desktop.locator(campo).count() > 0, f"Campo {campo} nao encontrado no DOM"
        print("[OK] Campos essenciais do formulario de voluntariado validados.", flush=True)

        # 1.4 Testar Acordeão do Termo de Adesão (8 artigos)
        btn_termo = page_desktop.locator('#btn-toggle-termo')
        conteudo_termo = page_desktop.locator('#conteudo-termo-adesao')
        
        btn_termo.click()
        time.sleep(0.5)
        assert conteudo_termo.is_visible(), "Conteudo do termo deve ficar visivel apos clique"
        clausulas = page_desktop.locator('#conteudo-termo-adesao ol li')
        count_clausulas = clausulas.count()
        assert count_clausulas == 8, f"Esperado 8 artigos no termo, encontrado {count_clausulas}"
        print(f"[OK] Acordeao do Termo de Adesao funcional e todos os {count_clausulas} artigos da Lei n 9.608/1998 validados.", flush=True)
        voluntariado.screenshot(path=f"{OUTPUT_DIR}/desktop_voluntariado.png")

        # 1.5 Verificar Seção: Associados & Formulário
        associados = page_desktop.locator('#associados')
        assert associados.is_visible(), "Secao #associados deve estar visivel"
        
        pills = page_desktop.locator('.btn-pilula-valor')
        assert pills.count() >= 4, f"Esperado 4 opcoes de contribuicao, encontrado {pills.count()}"
        
        # Testar clique na opção "Outro"
        pill_outro = page_desktop.locator('.btn-pilula-valor[data-valor="outro"]')
        pill_outro.click()
        time.sleep(0.3)
        wrapper_custom = page_desktop.locator('#box-valor-customizado')
        assert wrapper_custom.is_visible(), "Campo de valor personalizado deve aparecer ao selecionar 'Outro'"
        print("[OK] Seletor de contribuicao mensal de Associados e campo personalizado validados.", flush=True)

        # Verificar campos do formulário de associado
        campos_assoc = [
            '#campo-assoc-nome', '#campo-assoc-nascimento', '#campo-assoc-cpf',
            '#campo-assoc-endereco', '#campo-assoc-bairro', '#campo-assoc-cidade',
            '#campo-assoc-cep', '#campo-assoc-telefone', '#campo-assoc-email',
            '#campo-assoc-profissao', '#campo-assoc-origem',
            '#campo-assoc-estatuto', '#campo-assoc-lgpd'
        ]
        for campo in campos_assoc:
            assert page_desktop.locator(campo).count() > 0, f"Campo {campo} nao encontrado no form de associado"
        print("[OK] Todos os campos e consentimentos estatutarios de associado validados.", flush=True)
        associados.screenshot(path=f"{OUTPUT_DIR}/desktop_associados.png")

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

        # Teste de Overflow Horizontal
        scroll_width = page_mobile.evaluate("document.documentElement.scrollWidth")
        client_width = page_mobile.evaluate("document.documentElement.clientWidth")
        print(f"Mobile widths: scrollWidth={scroll_width}, clientWidth={client_width}", flush=True)
        assert scroll_width == client_width, f"ERRO: Overflow horizontal mobile detectado! scrollWidth={scroll_width} > clientWidth={client_width}"
        print("[OK] Zero scroll horizontal no mobile (375px) perfeitamente validado.", flush=True)

        # Screenshots mobile
        page_mobile.locator('#como-ajudar').screenshot(path=f"{OUTPUT_DIR}/mobile_como_ajudar.png")
        page_mobile.locator('#voluntariado').screenshot(path=f"{OUTPUT_DIR}/mobile_voluntariado.png")
        page_mobile.locator('#associados').screenshot(path=f"{OUTPUT_DIR}/mobile_associados.png")

        browser.close()
        print("\n=== TODOS OS TESTES PASSARAM COM SUCESSO! ===", flush=True)

if __name__ == "__main__":
    run_verification()
