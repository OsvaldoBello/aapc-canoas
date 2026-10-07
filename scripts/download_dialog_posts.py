import os
import time
import urllib.request
from playwright.sync_api import sync_playwright

def main():
    os.makedirs("public/img/posts_full", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1600, "height": 900})
        print("Opening profile...")
        page.goto("https://www.instagram.com/ong_aapc_/", wait_until="networkidle")
        time.sleep(2)
        page.keyboard.press("Escape")
        time.sleep(1)

        anchors = page.query_selector_all('article a[href*="/p/"], article a[href*="/reel/"]')
        print(f"Found {len(anchors)} anchors")

        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "Referer": "https://www.instagram.com/"
        }

        for idx, a in enumerate(anchors[:12]):
            href = a.get_attribute("href")
            print(f"\nClicking item {idx}: {href}")
            try:
                a.click()
                time.sleep(2)
                dialog = page.query_selector('div[role="dialog"]')
                if dialog:
                    imgs = dialog.query_selector_all("img")
                    print(f"  Found {len(imgs)} imgs in dialog")
                    for j, img in enumerate(imgs):
                        src = img.get_attribute("src")
                        srcset = img.get_attribute("srcset")
                        best_url = src
                        if srcset:
                            parts = [p.strip().split(' ') for p in srcset.split(',')]
                            if parts:
                                best_url = parts[-1][0]
                        if best_url and "instagram" in best_url and "150x150" not in best_url:
                            out_name = f"public/img/posts_full/full_{idx}_{j}.jpg"
                            req = urllib.request.Request(best_url, headers=headers)
                            with urllib.request.urlopen(req, timeout=10) as r, open(out_name, "wb") as f:
                                f.write(r.read())
                            print(f"  Saved {out_name} ({os.path.getsize(out_name)} bytes)")
                    page.keyboard.press("Escape")
                    time.sleep(1)
                else:
                    print("  No dialog appeared, possibly redirected to login")
                    # If redirected to login, go back to profile
                    if "login" in page.url:
                        page.goto("https://www.instagram.com/ong_aapc_/", wait_until="networkidle")
                        time.sleep(2)
                        page.keyboard.press("Escape")
            except Exception as e:
                print(f"  Error on item {idx}: {e}")

        browser.close()

if __name__ == "__main__":
    main()
