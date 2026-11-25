# Decupagem · Abertura em scroll-frame "O Despertar"

A rolagem toca o filme. Duas colunas gregas monumentais, uma em cada canto, guardam uma lótus no centro de um lago. Conforme o usuário rola, a lótus desperta com o sol, a logo aparece, e as colunas se torcem até virarem o símbolo da Phillautia.

- **Escala/linguagem:** main stage de grande festival europeu (cenografia colossal, névoa, feixes de luz, lasers quentes): **só como inspiração de escala**. Nada de nomes, palcos, logos ou personagens de festivais reais no prompt.
- **Sem pessoas no plano.** A artista entra no site depois (manifesto/galeria). Evita problema de rosto e de direito de imagem.
- **Um plano contínuo, sem cortes.** A rolagem vai e volta; corte de cena quebra a ilusão.
- **Logo e emblema NÃO são gerados por IA.** IA distorce tipografia e símbolos. O vídeo constrói a *forma* (colunas em espiral + disco dourado); a logo e o emblema reais (SVG) entram por cima, no código, encaixados no ponto exato do quadro.

---

## Ficha técnica

| Item | Valor |
|---|---|
| Duração total | 16 s (2 clipes de 8 s encadeados) |
| Frames na rolagem | ~200 (12,5 fps de amostragem) · WebP |
| Altura da rolagem | ~500 vh (pin do hero) |
| Proporção | 16:9 · assunto sempre no **terço central** (o celular recorta no centro) |
| Câmera | dolly-in lento e constante + leve crane up no final |
| Paleta | noite `#0A051C` → violeta `#5B12C9` → magenta `#D6249F` → ouro `#E2A93B` |
| Luz | começa em luar violeta, termina em nascer do sol dourado (Full On Morning) |
| Áudio | nenhum |
| Modelo vídeo | Cinema Studio Video 3.0 · 1080p · genre `epic` · start + end image |
| Modelo imagem | Nano Banana Pro · 2k · 16:9 |

---

## Decupagem plano a plano (por % da rolagem)

| # | Rolagem | Tempo | Frames | Imagem (vídeo) | Camada do site (código) |
|---|---|---|---|---|---|
| **1. Guardiões** | 0–15% | 0–2,5 s | 1–30 | Noite violeta. Duas colunas dóricas colossais de mármore branco com veios dourados, **uma em cada borda do quadro**, perdendo-se na névoa no alto. Ao centro, um lago espelhado e um **botão de lótus fechado**, rosado, com gotas de orvalho. Feixes de luz fria e estáticos atravessam a névoa. | Nada além de "role" e o emblema pequeno no header. Silêncio visual. |
| **2. Primeira luz** | 15–35% | 2,5–5,5 s | 31–70 | Dolly-in lento sobre a água. Um brilho magenta nasce no horizonte entre as colunas. As **primeiras pétalas externas se abrem**, translúcidas, iluminadas por trás. Lasers quentes começam a varrer a névoa devagar. | **Wordmark PHILLAUTIA** entra (máscara de baixo para cima) no terço superior. |
| **3. Florescer** | 35–55% | 5,5–8 s | 71–100 | A lótus **abre por completo**, macro realista: textura de pétala, veios, pólen dourado flutuando. O sol começa a surgir. Reflexo perfeito na água. **Fim do clipe A** (frame = quadro-chave K2). | Linha: *"Amor por si, energia em movimento."* · eyebrow **Full On Morning**. |
| **4. Torção** | 55–80% | 8–12 s | 101–160 | As colunas **começam a se torcer**: o mármore flui como líquido, os veios dourados acendem, os fustes se curvam para dentro em arco sobre a lótus. A câmera sobe levemente (crane up). | Wordmark sai (fade + blur). Texto some: a imagem fala sozinha. |
| **5. O símbolo** | 80–100% | 12–16 s | 161–200 | As duas colunas se fecham num **círculo espiralado** acima da lótus, com o **disco solar dourado** no centro: a silhueta do emblema. Luz dourada plena. **Fim do clipe B** (frame = quadro-chave K3). | **Emblema SVG real** entra exatamente sobre a espiral (fade + giro de 30°), brilho dourado; depois o hero solta e vem o Manifesto. |

> Os 5 planos acima são **momentos de um único plano contínuo**, não cortes.

---

## Quadros-chave (gerar primeiro · Nano Banana Pro, 2k, 16:9)

Todos levam o mesmo bloco de estilo no fim:

```
STYLE: sacred, monumental, euphoric, cinematic still, anamorphic 35mm lens, volumetric haze, color palette deep violet #0A051C, magenta #D6249F, molten gold #E2A93B, film grain, photorealistic, epic festival main-stage scale production design, no text, no letters, no logo, no watermark, no people, no frame, no border.
```

**K1 · Abertura (start do clipe A)**
```
Wide symmetrical establishing shot at night. Two colossal white marble Doric columns with glowing gold veins stand at the far left and far right edges of the frame, rising into violet mist. Between them, a perfectly still dark lake; in the exact center third, a single closed pink lotus bud with dew drops floats on the water, softly lit. Faint cool light beams cut through the haze above. Deep negative space, mysterious and sacred. STYLE: ...
```

**K2 · Lótus aberta (end do clipe A = start do clipe B)**
```
Same symmetrical composition and camera position slightly closer. The lotus in the center is now fully open, hyper-realistic petals glowing from within, translucent pink to gold, golden pollen floating, perfect reflection on the water. The two marble columns still stand straight at the left and right edges. A magenta-gold sunrise glow rises on the horizon between them, warm lasers fanning softly through the mist. STYLE: ...
```

**K3 · Símbolo (end do clipe B)**: use a imagem do emblema (`public/brand/emblem-dourado.svg` exportado em PNG) como **referência de composição**, não de estampa:
```
Same scene from a slightly higher angle. The two marble columns have twisted and bent inward like flowing liquid stone, their shafts curving into a single circular spiral ring that hovers above the fully open lotus, gold veins blazing. In the center of the ring, a radiant golden sun disk. The overall silhouette echoes the circular spiral emblem in the reference image. Full golden sunrise light, haze glowing. STYLE: ...
```

Aprove os 3 quadros antes de gerar vídeo: são eles que garantem cor, composição e o encaixe do emblema.

---

## Clipes (Cinema Studio Video 3.0 · 1080p · 8 s · epic · sem áudio)

**Clipe A · start K1 → end K2**
```
Single continuous shot, no cuts. The camera performs a slow, steady dolly-in across the still lake toward the lotus bud between the two marble columns. A magenta glow rises on the horizon; the lotus slowly blooms petal by petal, lit from behind, golden pollen drifting; warm lasers begin to sweep gently through the haze. Smooth constant speed, no camera shake, the columns stay at the frame edges, no text, no people. Lighting transitions from violet night to first light.
```

**Clipe B · start K2 → end K3**
```
Single continuous shot, no cuts. The camera keeps a slow dolly-in with a gentle crane up. The two marble columns begin to twist like liquid stone, gold veins igniting, bending inward in graceful arcs over the open lotus until they merge into one circular spiral ring; a radiant golden sun disk rises into its center. Smooth constant speed, no camera shake, no text, no people, no sudden transformations. Lighting transitions to full golden sunrise.
```

Checagem antes de aprovar cada clipe: sem corte de cena, sem texto/marca d'água, colunas não "pulam", a lótus fica no centro, movimento suave (ele vai rodar de trás pra frente também).

---

## Como entra no site

1. Baixar `clipe-a.mp4` e `clipe-b.mp4` para `fonte/` (fora do `public/`).
2. Juntar e fatiar com o script da skill (local, sem custo): ~200 frames WebP, `desktop/` 1920 px e `mobile/` 960 px.
3. Hero vira um `<canvas>` preso por ~500 vh; o ScrollTrigger troca o frame conforme a rolagem; pré-carrego os primeiros 30 frames e o resto em segundo plano.
4. Overlays em SVG/HTML sincronizados pelos % da tabela (wordmark → tagline → emblema).
5. A seção "O símbolo" atual (colunas em SVG que viram emblema) fica **redundante**: a abertura passa a contar essa história. Proposta: remover e mover o texto do símbolo para o Manifesto.
6. Com "reduzir movimento": mostro só o K3 parado com o emblema por cima.

## Custo

Saldo atual: 3,6 créditos (free). 3 imagens Nano Banana Pro + 2 clipes Cinema Studio 3.0 em 1080p **não cabem**. Opções: recarregar; ou validar barato (K1–K3 em Nano Banana 2 · clipes em Seedance 2.0 Mini 720p) e só renderizar a final no Cinema Studio 3.0.
