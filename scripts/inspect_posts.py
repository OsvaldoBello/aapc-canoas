import os
import json
import urllib.request
from playwright.sync_api import sync_playwright

def inspect_posts():
    with open("artifacts/instagram_scrape/images_data.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    post_links = data.get("links", [])
    os.makedirs("public/img/real", exist_ok=True)
    os.makedirs("artifacts/instagram_scrape/posts", exist_ok=True)

    results = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={'width': 1280, 'height': 900},
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
        )
        page = context.new_page()

        for idx, url in enumerate(post_links[:12]):
            try:
                print(f"Opening post {idx+1}/{len(post_links)}: {url}")
                page.goto(url, wait_until='domcontentloaded', timeout=15000)
                page.wait_for_timeout(2000)

                # Get caption/text
                caption = ""
                caption_elem = page.query_selector("h1, article div[role='button'] ~ div, article span")
                if caption_elem:
                    caption = caption_elem.inner_text()

                # Get primary image in the post
                img_src = page.eval_on_selector("article img[style*='object-fit'], article img[srcset], article img", "img => img ? img.src : null")
                
                # Take screenshot of the post
                screenshot_path = f"artifacts/instagram_scrape/posts/post_{idx+1}.png"
                page.screenshot(path=screenshot_path)

                post_info = {
                    "index": idx + 1,
                    "url": url,
                    "caption": caption[:300] if caption else "",
                    "img_src": img_src,
                    "screenshot": screenshot_path
                }
                results.append(post_info)
                print(f"Captured: {caption[:80]}... | Img: {img_src[:60] if img_src else 'None'}")

            except Exception as e:
                print(f"Error on {url}: {e}")

        browser.close()

    with open("artifacts/instagram_scrape/posts_details.json", "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    inspect_posts()
