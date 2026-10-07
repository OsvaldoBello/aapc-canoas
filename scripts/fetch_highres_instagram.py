import os
import time
import json
import urllib.request
from playwright.sync_api import sync_playwright

def main():
    os.makedirs("public/img/real_hd", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={"width": 1920, "height": 1080},
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
        )
        page = context.new_page()
        print("Navigating to Instagram profile...")
        page.goto("https://www.instagram.com/ong_aapc_/", wait_until="networkidle")
        time.sleep(2)
        page.keyboard.press("Escape")
        time.sleep(1)

        # Scroll to load several rows of posts
        for _ in range(3):
            page.evaluate("window.scrollBy(0, 1000)")
            time.sleep(1)

        # Extract all image elements with their highest src in srcset
        images_info = page.evaluate("""() => {
            const results = [];
            const imgEls = document.querySelectorAll('article img, main img');
            imgEls.forEach((img, idx) => {
                let bestUrl = img.src;
                if (img.srcset) {
                    const parts = img.srcset.split(',').map(s => s.trim().split(' '));
                    if (parts.length > 0) {
                        bestUrl = parts[parts.length - 1][0];
                    }
                }
                results.push({
                    index: idx,
                    src: img.src,
                    bestUrl: bestUrl,
                    alt: img.alt || '',
                    width: img.naturalWidth,
                    height: img.naturalHeight
                });
            });
            return results;
        }""")

        print(f"Discovered {len(images_info)} images")
        with open("artifacts/instagram_scrape/hd_images_meta.json", "w", encoding="utf-8") as f:
            json.dump(images_info, f, indent=2, ensure_ascii=False)

        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
            "Referer": "https://www.instagram.com/"
        }

        downloaded = []
        for i, item in enumerate(images_info):
            url = item.get("bestUrl") or item.get("src")
            if not url or "blob:" in url:
                continue
            fname = f"public/img/real_hd/hd_foto_{i+1}.jpg"
            try:
                req = urllib.request.Request(url, headers=headers)
                with urllib.request.urlopen(req, timeout=10) as response, open(fname, "wb") as out_file:
                    out_file.write(response.read())
                sz = os.path.getsize(fname)
                print(f"Downloaded {fname} ({sz} bytes) - alt: {item.get('alt')[:40]}")
                downloaded.append((fname, sz, item.get("alt")))
            except Exception as e:
                print(f"Failed {i}: {e}")

        browser.close()

if __name__ == "__main__":
    main()
