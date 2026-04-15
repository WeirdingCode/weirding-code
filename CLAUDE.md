# Weirding Code — Site vitrine de Flavien Desse

## Présentation
Portfolio / site vitrine fullstack pour **Flavien Desse** (Weirding Code), développeur fullstack freelance.
- Email : weirding.code@gmail.com
- Téléphone : 06 49 19 80 86

## Stack technique
- **Frontend** : React 19 + TypeScript + Vite 8 + Tailwind CSS v4
- **Backend** : Spring Boot + Java 21 (port 8080)
- **Déploiement** : script `deploy.sh`, HTTPS
- **3D** : Three.js installé (`three` + `@types/three`) — composant `RetroPC.tsx` existant mais non utilisé pour le moment

## Structure du projet
```
weirding-code/
├── frontend/               # App React
│   ├── src/
│   │   ├── App.tsx         # Composant principal (toute la page)
│   │   ├── index.css       # Toutes les variables CSS + classes utilitaires
│   │   ├── components/
│   │   │   └── RetroPC.tsx # Scène 3D retrowave (en standby)
│   │   └── main.tsx
│   ├── public/
│   │   └── WC.png          # Logo officiel (brun/sable bicolore)
│   └── vite.config.ts      # usePolling: true (requis pour WSL2 + /mnt/c/)
├── src/main/java/          # Backend Spring Boot
├── pom.xml
└── .idea/runConfigurations/
    └── Frontend_Dev.xml    # Run config IntelliJ → npm run dev
```

## Palette couleurs
| Variable | Valeur | Usage |
|---|---|---|
| `--bg` | `#f8f7f5` | Fond global (crème chaud) |
| `--surface` | `#f0ede8` | Cards, sections alternées |
| `--surface-2` | `#e6e2db` | Inputs, badges |
| `--surface-3` | `#dbd6ce` | Hover, élévation max |
| `--text` | `#141210` | Texte principal |
| `--text-2` | `#4a4540` | Texte secondaire |
| `--muted` | `#8a8480` | Texte tertiaire, labels mono |
| `--accent` | `#4c061d` | Rouge bordeaux du logo — CTA uniquement |
| `--border` | `rgba(0,0,0,0.08)` | Bordures neutres |

**Règle rouge** : `#e8536b` utilisé UNIQUEMENT sur :
1. "solutions WEB" dans le titre hero
2. Les labels de section (`● 01 / RÉALISATIONS`)
3. Le bouton CTA principal

## Logo
`/public/WC.png` — Logo brun/sable bicolore (couleur du logo intentionnellement différente du reste du site).
Utilisé dans la nav et le footer. **Ne pas changer les couleurs du logo.**

## Sections de la page
1. **Nav** — Logo WC.png + liens + bouton CTA
2. **Hero** — Titre avec révélation mot par mot, badge "Disponible", sous-titre, CTAs, tags tech
3. **Marquee** — Défilement des technos
4. **À propos** (01) — Texte + stats + code block
5. **Réalisations** (02) — 3 projets : SEMASC, Emmael Céramique, Weirding Code
6. **Services** (03) — 6 services numérotés
7. **Contact** (04) — Email + téléphone uniquement (pas de formulaire)
8. **Footer** — Logo + copyright

## Animations CSS existantes
- `.word-wrap` / `.word-inner` — révélation par slide-up (titre hero)
- `.word-glow` — pulse rouge sur "solutions WEB" après révélation
- `.fade-up` + `.delay-1/2/3` — entrées génériques
- `.marquee-track` — défilement horizontal infini
- `.blob` — orbes de fond avec pulse

## Développement local
```bash
cd frontend && npm run dev   # port 5173
```
Ou via IntelliJ : run config **Frontend Dev**.

⚠️ **WSL2** : `usePolling: true` dans `vite.config.ts` est indispensable pour le hot reload sur `/mnt/c/`.
Le serveur doit être redémarré après chaque modification de `vite.config.ts`.

## Prochaines étapes (en cours)
- [ ] Effets whaou section par section (en cours — hero fait)
- [ ] 3D hero à revoir : scène retrowave (`RetroPC.tsx`) en standby, direction à reprendre
- [ ] Inspiration design : **github.com** (clean, aéré, sobre, hiérarchie claire)
- [ ] Effets scroll-reveal sur les autres sections (About, Projects, Services)
- [ ] Éventuellement : hero full-screen avec fond 3D si direction validée
