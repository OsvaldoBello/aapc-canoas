import os
import time
from playwright.sync_api import sync_playwright

def capture_redesign_screenshots():
    os.makedirs("artifacts/redesign_verification", exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # 1. Desktop (1366px)
        page_desktop = browser.new_page(viewport={'width': 1366, 'height': 900})
        page_desktop.goto('http://localhost:3000', wait_until='networkidle')
        time.sleep(1)

        # Full page desktop
        page_desktop.screenshot(path="artifacts/redesign_verification/desktop_full.png", full_page=True)
        # Hero desktop
        page_desktop.locator('.secao-hero').screenshot(path="artifacts/redesign_verification/desktop_hero.png")
        # Historia desktop
        page_desktop.locator('.secao-historia').screenshot(path="artifacts/redesign_verification/desktop_historia.png")
        # Doacoes desktop
        page_desktop.locator('.secao-doacoes').screenshot(path="artifacts/redesign_verification/desktop_doacoes.png")
        # Projetos desktop
        page_desktop.locator('.secao-projetos').screenshot(path="artifacts/redesign_verification/desktop_projetos.png")
        # PIX desktop
        page_desktop.locator('.secao-pix').screenshot(path="artifacts/redesign_verification/desktop_pix.png")
        # Voluntariado desktop
        page_desktop.locator('.secao-voluntariado').screenshot(path="artifacts/redesign_verification/desktop_voluntariado.png")
        # Onde estamos desktop
        page_desktop.locator('.secao-local').screenshot(path="artifacts/redesign_verification/desktop_local.png")

        # 2. Test PIX Copy button
        btn_pix = page_desktop.locator('#btn-copiar-chave-pix')
        btn_pix.click()
        time.sleep(0.5)
        print("PIX Button text after click:", btn_pix.inner_text())

        # 3. Mobile (375px)
        page_mobile = browser.new_page(viewport={'width': 375, 'height': 812})
        page_mobile.goto('http://localhost:3000', wait_until='networkidle')
        page_mobile.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(1.5)
        page_mobile.evaluate("window.scrollTo(0, 0)")
        time.sleep(0.5)

        # Full page mobile
        page_mobile.screenshot(path="artifacts/redesign_verification/mobile_full.png", full_page=True)
        # Hero mobile
        page_mobile.locator('.secao-hero').screenshot(path="artifacts/redesign_verification/mobile_hero.png")
        # Doacoes mobile
        page_mobile.locator('.secao-doacoes').screenshot(path="artifacts/redesign_verification/mobile_doacoes.png")
        # Projetos mobile
        page_mobile.locator('.secao-projetos').screenshot(path="artifacts/redesign_verification/mobile_projetos.png")
        # PIX mobile
        page_mobile.locator('.secao-pix').screenshot(path="artifacts/redesign_verification/mobile_pix.png")

        # Check horizontal overflow on mobile
        scroll_width = page_mobile.evaluate("document.documentElement.scrollWidth")
        client_width = page_mobile.evaluate("document.documentElement.clientWidth")
        print(f"Mobile widths: scrollWidth={scroll_width}, clientWidth={client_width}")
        if scroll_width > client_width:
            print("WARNING: Horizontal scroll detected on mobile!")
        else:
            print("OK: No horizontal scroll on mobile!")

        browser.close()

if __name__ == "__main__":
    capture_redesign_screenshots()
