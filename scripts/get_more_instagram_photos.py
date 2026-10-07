import os
import time
import urllib.request
import json
from playwright.sync_api import sync_playwright

def get_more_instagram_photos():
    os.makedirs("public/img/real", exist_ok=True)
    os.makedirs("artifacts/instagram_scrape/feed_deep", exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={'width': 1366, 'height': 900},
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
        )
        page = context.new_page()
        page.goto('https://www.instagram.com/ong_aapc_/', wait_until='networkidle')
        time.sleep(2)

        # Close login modal
        try:
            close_btn = page.query_selector("div[role='dialog'] button, svg[aria-label='Close'], svg[aria-label='Fechar']")
            if close_btn:
                close_btn.click()
            else:
                page.keyboard.press("Escape")
        except Exception:
            pass
        time.sleep(1)

        # Click "Show more posts" button
        try:
            show_more = page.query_selector("button:has-text('Show more posts'), span:has-text('Show more posts')")
            if show_more:
                print("Clicking 'Show more posts'...")
                show_more.click()
                time.sleep(3)
        except Exception as e:
            print("Show more click error:", e)

        # Scroll several times to load dozens of posts
        all_imgs = []
        for i in range(10):
            page.mouse.wheel(0, 1200)
            time.sleep(1.5)
            # Dismiss any popup if re-appeared
            try:
                page.keyboard.press("Escape")
            except:
                pass
            
            imgs = page.eval_on_selector_all("main img", """
                imgs => imgs.map(img => ({
                    src: img.src,
                    alt: img.alt || '',
                    w: img.naturalWidth || img.width,
                    h: img.naturalHeight || img.height
                }))
            """)
            for im in imgs:
                if im['w'] > 250 and not any(x['src'] == im['src'] for x in all_imgs):
                    all_imgs.append(im)
            
            # Save periodic screenshot
            page.screenshot(path=f"artifacts/instagram_scrape/feed_deep/scroll_{i+1}.png")

        print(f"Total post images discovered: {len(all_imgs)}")
        
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
        downloaded = []
        for idx, item in enumerate(all_imgs):
            filename = f"public/img/real/foto_feed_{idx+1}.jpg"
            try:
                req = urllib.request.Request(item['src'], headers=headers)
                with urllib.request.urlopen(req) as resp, open(filename, "wb") as out:
                    out.write(resp.read())
                downloaded.append({
                    "file": filename,
                    "w": item['w'],
                    "h": item['h'],
                    "alt": item['alt']
                })
                print(f"Saved [{idx+1}]: {filename} ({item['w']}x{item['h']}) - {item['alt'][:60]}")
            except Exception as e:
                print(f"Failed to download image {idx+1}: {e}")

        with open("artifacts/instagram_scrape/feed_deep/manifest.json", "w", encoding="utf-8") as f:
            json.dump(downloaded, f, indent=2, ensure_ascii=False)

        browser.close()

if __name__ == "__main__":
    get_more_instagram_photos()
