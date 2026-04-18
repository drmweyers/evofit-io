"""
Generate EvoFit Blog hero image via Gemini nano-banana.
Theme: Fitness training + healthy eating — no medical equipment.
"""
import os, sys
from pathlib import Path

try:
    from google import genai
    from google.genai import types
except ImportError:
    print("ERROR: pip install google-genai")
    sys.exit(1)

API_KEY = os.environ.get("GEMINI_API_KEY")
if not API_KEY:
    print("ERROR: GEMINI_API_KEY not in env")
    sys.exit(1)

client = genai.Client(api_key=API_KEY)
MODEL = "models/nano-banana-pro-preview"

SHARED_STYLE = """
Style: Dark moody premium editorial photography, cinematic lighting, high contrast.
Predominantly dark tones (deep charcoal, near-black) with dramatic volumetric lighting.
Photorealistic, cinematic depth of field, shot on medium-format camera.
NO text, NO logos, NO watermarks, NO syringes, NO needles, NO medical equipment.
"""

PROMPT_DESKTOP = f"""{SHARED_STYLE}
Aspect ratio: 16:9 landscape.
Editorial negative space on LEFT side (about 40% darker/emptier) for overlaid text.

A split-scene editorial composition blending elite training and premium nutrition:
LEFT THIRD: Dark, nearly empty — deep charcoal black with subtle texture for text overlay.
CENTER and RIGHT: A dramatic scene showing:
- A lean, athletic male coach (late 30s, forearms visible) gripping heavy knurled dumbbells mid-rep,
  shot from waist level, dramatic rim lighting catching sweat on skin and the metallic sheen of the weights
- In the immediate foreground (slightly soft focus): a beautifully arranged meal prep scene —
  grilled salmon fillet, vibrant roasted vegetables, a glass jar of overnight oats with berries,
  halved avocado, and a stainless steel shaker bottle
- Gym floor in background, soft bokeh of cage/barbell equipment

Lighting: Single dramatic overhead beam of cold blue-white light from above. Warm amber rim light
from the right catching the athlete and the food. Deep shadows everywhere else.
The foreground food and background athlete create a depth story: fuel the machine.
Shot on Hasselblad X2D 100C. Ultra photorealistic, editorial magazine quality.
"""

PROMPT_MOBILE = f"""{SHARED_STYLE}
Aspect ratio: 9:16 portrait.
Dark empty space at TOP third for overlaid text.

A cinematic vertical editorial:
- Bottom half: A beautifully lit meal prep board on dark slate — grilled chicken breast,
  vibrant green broccoli, sweet potato wedges, avocado halves, mixed berries in a small bowl,
  a stainless shaker bottle with condensation, and a protein-packed overnight oats jar
- Upper half transitioning to: An athletic figure (cropped at chest, arms visible) gripping
  a barbell overhead in a dark gym, dramatic ceiling spotlight catching the arms and bar
- The two halves blend via a dark shadow/bokeh transition
- TOP third: Near-black dark space for headline text

Lighting: Cold blue-white dramatic overhead spots. Warm amber rim on the food. Deep shadows.
Shot on Hasselblad. Ultra photorealistic, premium wellness magazine.
"""

OUT_DIR = Path(r"C:\Users\drmwe\Claude\evofit-io\public\images")
OUT_DIR.mkdir(parents=True, exist_ok=True)

images = [
    ("blog-hero.png", PROMPT_DESKTOP, "Desktop"),
    ("blog-hero-mobile.png", PROMPT_MOBILE, "Mobile"),
]

for filename, prompt, label in images:
    out_path = OUT_DIR / filename
    print(f"Generating {label}: {out_path}")
    try:
        response = client.models.generate_content(
            model=MODEL,
            contents=[prompt],
            config=types.GenerateContentConfig(
                response_modalities=["IMAGE", "TEXT"],
            ),
        )
        saved = False
        for part in response.candidates[0].content.parts:
            if part.inline_data and part.inline_data.data:
                with open(out_path, "wb") as f:
                    f.write(part.inline_data.data)
                print(f"  Saved {len(part.inline_data.data):,} bytes -> {filename}")
                saved = True
                break
        if not saved:
            print(f"  No image data returned for {label}")
    except Exception as e:
        print(f"  ERROR: {e}")

print("Done.")
