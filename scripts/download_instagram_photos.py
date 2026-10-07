import os
import time
import urllib.request
from playwright.sync_api import sync_playwright

def download_instagram_photos():
    os.makedirs("public/img/real", exist_ok=True)
    os.makedirs("artifacts/instagram_scrape/feed", exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={'width': 1366, 'height': 900},
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
        )
        page = context.new_page()
        print("Navigating to https://www.instagram.com/ong_aapc_/")
        page.goto('https://www.instagram.com/ong_aapc_/', wait_until='networkidle')
        time.sleep(2)

        # Close the login modal if present
        try:
            # Try clicking the close button on dialog
            close_btn = page.query_selector("div[role='dialog'] button, svg[aria-label='Close'], svg[aria-label='Fechar']")
            if close_btn:
                print("Clicking close modal button...")
                close_btn.click()
            else:
                print("Pressing Escape to close modal...")
                page.keyboard.press("Escape")
        except Exception as e:
            print(f"Error dismissing dialog: {e}")

        time.sleep(1)

        # Scroll multiple times to load posts and take screenshots
        all_imgs = []
        for scroll_idx in range(6):
            print(f"Scroll {scroll_idx + 1}...")
            # Capture screenshot of the visible section
            feed_ss = f"artifacts/instagram_scrape/feed/scroll_{scroll_idx + 1}.png"
            page.screenshot(path=feed_ss)
            print(f"Saved {feed_ss}")

            # Collect visible images
            imgs = page.eval_on_selector_all("main img", """
                imgs => imgs.map(img => ({
                    src: img.src,
                    alt: img.alt,
                    w: img.naturalWidth || img.width,
                    h: img.naturalHeight || img.height
                }))
            """)
            for im in imgs:
                if im['w'] > 200 and im not in all_imgs:
                    all_imgs.append(im)

            page.mouse.wheel(0, 1000)
            time.sleep(2)

        print(f"\nTotal unique post images found: {len(all_imgs)}")
        
        # Download images
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
        downloaded = []
        for i, img in enumerate(all_imgs):
            src = img['src']
            alt = img['alt']
            ext = "jpg"
            filename = f"public/img/real/insta_foto_{i+1}.{ext}"
            try:
                req = urllib.request.Request(src, headers=headers)
                with urllib.request.urlopen(req) as resp, open(filename, "wb") as out:
                    out.write(resp.read())
                print(f"Downloaded [{i+1}]: {filename} | {img['w']}x{img['h']} | Alt: {alt[:60] if alt else 'sem alt'}")
                downloaded.append({"file": filename, "alt": alt, "w": img['w'], "h": img['h']})
            except Exception as ex:
                print(f"Error downloading {src}: {ex}")

        with open("artifacts/instagram_scrape/downloaded_photos.json", "w", encoding="utf-8") as f:
            import json
            json.dump(downloaded, f, indent=2, ensure_ascii=False)

        browser.close()

if __name__ == "__main__":
    download_instagram_photos()
