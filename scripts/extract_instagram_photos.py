import os
import json
import urllib.request
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a realistic viewport and user agent
        context = browser.new_context(
            viewport={'width': 1280, 'height': 900},
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
        )
        page = context.new_page()
        print("Navigating to Instagram...")
        page.goto('https://www.instagram.com/ong_aapc_/', wait_until='networkidle')
        
        # Take a screenshot to inspect what the page looks like
        os.makedirs("artifacts/instagram_scrape", exist_ok=True)
        page.screenshot(path="artifacts/instagram_scrape/profile_page.png")
        print("Screenshot saved to artifacts/instagram_scrape/profile_page.png")

        # Find all img tags
        images = page.eval_on_selector_all("article img, main img", """
            imgs => imgs.map(img => ({
                src: img.src,
                alt: img.alt,
                width: img.naturalWidth || img.width,
                height: img.naturalHeight || img.height
            }))
        """)
        
        print(f"Found {len(images)} images in article/main")
        for i, img in enumerate(images):
            print(f"[{i}] {img['width']}x{img['height']} | Alt: {img['alt'][:60] if img['alt'] else 'None'} | Src: {img['src'][:80]}...")

        # Also get post links
        links = page.eval_on_selector_all("a[href*='/p/'], a[href*='/reel/']", """
            links => links.map(a => a.href)
        """)
        print(f"Found {len(links)} post links:")
        for l in links[:10]:
            print("Post:", l)

        with open("artifacts/instagram_scrape/images_data.json", "w", encoding="utf-8") as f:
            json.dump({"images": images, "links": links}, f, indent=2, ensure_ascii=False)

        browser.close()

if __name__ == "__main__":
    run()
