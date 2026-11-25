# Vídeo · "O Templo do Amanhecer"

Vídeo de 8–10 s para o hero do site e para reels: a Phillautia tocando num templo grego fantástico ao nascer do sol, em escala de main stage de festival.

> **Referência de festival:** a inspiração é a *escala e a teatralidade* dos grandes palcos de festival europeus (cenografia monumental, multidão, luz, pirotecnia suave). **Não** citar nem copiar palcos, nomes, logos ou personagens de nenhum festival real no prompt: a cenografia precisa ser 100% da Phillautia.
>
> **Uso de imagem:** é a imagem real da Giovanna gerada por IA. Validar com ela antes de publicar.

---

## Conceito

| Elemento | Tradução visual | Por quê |
|---|---|---|
| Templo grego | Templo colossal de mármore branco com veios dourados, emergindo de um lago | Colunas greco-romanas do logo |
| Colunas torcidas | Duas colunas gigantes que se torcem em espiral e se encontram no alto | O emblema = distorção de duas colunas |
| Disco solar dourado | Sol nascendo exatamente entre as colunas, como o emblema | Full On Morning |
| Lago de lótus | Milhares de lótus que se abrem com a luz | Os 7 ciclos / a lótus da artista |
| Paleta | Céu violeta → magenta → ouro; névoa rosada | Identidade (presskit + site) |
| Ela | No topo da escadaria, numa cabine de DJ esculpida em mármore e ouro | Protagonista, serena, olhos fechados |

**Não colocar texto/logo na geração.** O wordmark entra depois, na edição ou no site (IA erra tipografia).

---

## Etapa 1 · Keyframe (imagem)

**Modelo recomendado:** `Nano Banana Pro` (aceita até 14 referências: mantém o rosto dela) · alternativa: `Seedream 4.5`.
**Referências (subir no Higgsfield):**
- `public/images/giovanna-galaxia.jpg` (corpo inteiro, figurino de galáxia)
- `public/images/giovanna-perfil.jpg` (rosto em luz suave)
- `public/images/giovanna-bracos.jpg` (gesto de entrega)

**Formato:** 16:9 (site/desktop) e depois repetir em 9:16 (reels/mobile) · resolução 2k.

**Prompt (EN):**
```
Cinematic wide shot at golden-hour sunrise. A colossal fantasy Greek temple of white marble with veins of gold rises from a still lake covered in thousands of glowing pink lotus flowers. Two gigantic fluted Greco-Roman columns twist in a spiral and meet high above the stage, framing a huge golden sun disk rising exactly between them. At the top of a grand marble staircase, the woman from the reference photos stands behind a DJ booth carved from marble with gold inlays, wearing the purple galaxy-print kimono from the reference, long wavy brown hair, eyes closed, one hand raised, serene and euphoric. Below, a vast festival crowd in silhouette with raised hands, soft haze, volumetric god rays, floating flower petals, subtle warm lasers fanning through the mist. Color palette: deep violet sky fading into magenta and molten gold. Monumental festival main-stage scale, epic fantasy production design, photorealistic, shot on ARRI Alexa, anamorphic 35mm lens, shallow depth of field on the artist, rich film grain.
```

**Evitar (negative / instruções extras):**
```
no text, no logos, no letters, no festival branding, no extra fingers, no distorted face, no cartoon, no neon cyberpunk, no harsh blue light, no skulls, no psychedelic clip-art
```

Gere 3–4 variações e escolha a que mais preserva o rosto dela. Esse frame vira o `start_image` do vídeo **e** o poster do site.

---

## Etapa 2 · Vídeo (image-to-video)

**Modelo recomendado:** `Cinema Studio Video 3.0` (genre: `epic`, 1080p, sem áudio) · alternativa com melhor consistência de rosto: `Seedance 2.0` (modo `std` exige plano Plus).
**Entrada:** `start_image` = keyframe escolhido · duração 8–10 s · 16:9 (repetir em 9:16).

**Prompt (EN):**
```
Slow cinematic crane shot: the camera glides forward over the lotus lake and the silhouetted crowd, rising toward the artist at the top of the marble temple. The golden sun climbs between the twisted columns and floods the scene with warm light; lotus flowers open as the light touches them. The artist sways gently to the music, eyes closed, hand lifting toward the sun. Petals and haze drift through volumetric light rays, soft warm lasers sweep slowly. Smooth, graceful, euphoric morning energy, no cuts, no fast camera shake, photorealistic, consistent face and outfit.
```

**Para loop do hero (opcional):** usar o mesmo keyframe como `end_image`. O vídeo volta ao começo sem corte visível.

---

## Custos e plano

- Saldo atual do workspace: **3,6 créditos (plano free)**. Provavelmente não cobre keyframe + vídeo 1080p; confira o custo na tela do modelo antes de gerar.
- Para testar barato: keyframe em `Nano Banana 2` (1k) e vídeo em `Seedance 2.0 Mini` (720p) ou `Grok Imagine Video 1.5 Lite`, só para validar composição; depois renderizar no modelo premium.

---

## Entrega para o site

Quando o vídeo estiver pronto, coloque em:
```
public/video/templo-16x9.mp4      (desktop, 1080p, sem áudio, ≤ 8 MB)
public/video/templo-9x16.mp4      (mobile)
public/video/templo-poster.jpg    (o keyframe)
```
Aí eu integro no hero com `autoplay muted loop playsinline`, poster, versão mobile e fallback para "reduzir movimento".
