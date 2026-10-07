import os
html = ["<html><body style='font-family:sans-serif; background:#f0f0f0; display:grid; grid-template-columns:repeat(4,1fr); gap:10px; padding:20px;'>"]
for i in range(1, 37):
    path = f"public/img/real/foto_feed_{i}.jpg"
    if os.path.exists(path):
        html.append(f"""
        <div style='background:#fff; padding:8px; border-radius:6px; box-shadow:0 2px 4px rgba(0,0,0,0.1); text-align:center;'>
            <img src='{os.path.abspath(path)}' style='width:100%; height:200px; object-fit:cover; border-radius:4px;'>
            <p><strong>Foto {i}</strong></p>
        </div>
        """)
html.append("</body></html>")

with open("artifacts/instagram_scrape/gallery.html", "w", encoding="utf-8") as f:
    f.write("\n".join(html))
print("Gallery written to artifacts/instagram_scrape/gallery.html")
