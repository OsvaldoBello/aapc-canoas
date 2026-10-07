import os
from PIL import Image, ImageEnhance, ImageFilter

def process_photos():
    os.makedirs("public/img/fotos_otimizadas", exist_ok=True)
    os.makedirs("img/fotos_otimizadas", exist_ok=True)

    # 1. Hero: Voluntários da AAPC com camisetas e suprimentos
    # Original: public/img/real/foto_feed_10.jpg (360x640)
    im_hero = Image.open("public/img/real/foto_feed_10.jpg")
    crop_hero = im_hero.crop((0, 135, 360, 495)) # Sem barra preta superior
    crop_hero = crop_hero.resize((720, 720), Image.Resampling.LANCZOS)
    enhancer = ImageEnhance.Sharpness(crop_hero)
    crop_hero = enhancer.enhance(1.2)
    crop_hero.save("public/img/fotos_otimizadas/hero-equipe.jpg", quality=95)
    crop_hero.save("img/fotos_otimizadas/hero-equipe.jpg", quality=95)
    print("Hero saved")

    # 2. Pegue e Leve: Voluntárias e banner na calçada
    # Original: public/img/real/foto_feed_30.jpg (361x640)
    im_pegue = Image.open("public/img/real/foto_feed_30.jpg")
    crop_pegue = im_pegue.crop((0, 115, 361, 535))
    crop_pegue = crop_pegue.resize((720, 840), Image.Resampling.LANCZOS)
    enhancer = ImageEnhance.Sharpness(crop_pegue)
    crop_pegue = enhancer.enhance(1.15)
    crop_pegue.save("public/img/fotos_otimizadas/pegue-e-leve.jpg", quality=95)
    crop_pegue.save("img/fotos_otimizadas/pegue-e-leve.jpg", quality=95)
    print("Pegue e Leve saved")

    # 3. Bichinhos Caridosos: Voluntárias no Hospital Criança Conceição
    # Original: public/img/real/foto_feed_1.jpg (361x640)
    im_bichinhos = Image.open("public/img/real/foto_feed_1.jpg")
    crop_bichinhos = im_bichinhos.crop((0, 184, 361, 455)) # Enquadramento exato sem barras pretas
    crop_bichinhos = crop_bichinhos.resize((800, 600), Image.Resampling.LANCZOS)
    enhancer = ImageEnhance.Sharpness(crop_bichinhos)
    crop_bichinhos = enhancer.enhance(1.2)
    crop_bichinhos.save("public/img/fotos/bichinhos-caridosos.jpg", quality=95)
    crop_bichinhos.save("img/fotos/bichinhos-caridosos.jpg", quality=95)
    crop_bichinhos.save("public/img/fotos_otimizadas/bichinhos-caridosos.jpg", quality=95)
    crop_bichinhos.save("img/fotos_otimizadas/bichinhos-caridosos.jpg", quality=95)
    print("Bichinhos Caridosos saved")

    # 4. Cestas de Alimentos (Porta-malas do carro com mantimentos)
    # Original: public/img/real/foto_feed_8.jpg (640x361 landscape)
    im_cestas = Image.open("public/img/real/foto_feed_8.jpg")
    # Resize to 1280x722 for crisp high-res display
    res_cestas = im_cestas.resize((1280, 722), Image.Resampling.LANCZOS)
    enhancer = ImageEnhance.Sharpness(res_cestas)
    res_cestas = enhancer.enhance(1.15)
    res_cestas.save("public/img/fotos_otimizadas/cestas-alimentos.jpg", quality=95)
    res_cestas.save("img/fotos_otimizadas/cestas-alimentos.jpg", quality=95)
    print("Cestas alimentos saved")

    # 5. Brechó Solidário da Sete Povos (Roupas organizadas e dados de funcionamento)
    # Original: public/img/real/foto_feed_21.jpg (361x640)
    im_brecho = Image.open("public/img/real/foto_feed_21.jpg")
    # Center section with araras of clothes and "ROUPAS COM AMOR"
    crop_brecho = im_brecho.crop((0, 70, 361, 540))
    crop_brecho = crop_brecho.resize((720, 936), Image.Resampling.LANCZOS)
    crop_brecho.save("public/img/fotos_otimizadas/brecho-solidario.jpg", quality=95)
    crop_brecho.save("img/fotos_otimizadas/brecho-solidario.jpg", quality=95)
    print("Brecho solidario saved")

    # 6. Entrega Comunidade do Prata / Cheias de Canoas
    # Original: public/img/real/foto_feed_31.jpg (480x640)
    im_prata = Image.open("public/img/real/foto_feed_31.jpg")
    # Crop from y: 40 to 600 (faces of 3 volunteers + truck bed full of food)
    crop_prata = im_prata.crop((0, 40, 480, 580))
    crop_prata = crop_prata.resize((960, 1080), Image.Resampling.LANCZOS)
    enhancer = ImageEnhance.Sharpness(crop_prata)
    crop_prata = enhancer.enhance(1.2)
    crop_prata.save("public/img/fotos_otimizadas/entrega-prata-fatima.jpg", quality=95)
    crop_prata.save("img/fotos_otimizadas/entrega-prata-fatima.jpg", quality=95)
    print("Entrega Prata saved")

    # 7. Ação de Alimentos nos Bairros (foto_feed_34.jpg - 59 cestas)
    im_bairros = Image.open("public/img/real/foto_feed_34.jpg")
    crop_bairros = im_bairros.crop((0, 100, 361, 560))
    crop_bairros = crop_bairros.resize((720, 916), Image.Resampling.LANCZOS)
    crop_bairros.save("public/img/fotos_otimizadas/cestas-bairros.jpg", quality=95)
    crop_bairros.save("img/fotos_otimizadas/cestas-bairros.jpg", quality=95)
    print("Cestas bairros saved")

if __name__ == "__main__":
    process_photos()
