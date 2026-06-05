# CLAUDE.md — Portfolio Tom Latchimy

## Contexte du projet

Portfolio professionnel en cybersécurité pour **Tom Latchimy**, élève en **1ère Professionnelle CIEL** (Cybersécurité, Informatique et Réseaux, Électronique) à la **SEPR**, en alternance chez **DOMINO-RH** au service informatique.

> ⚠️ Tom est un élève de BAC Pro en 1ère année, pas un expert. Les compétences doivent rester honnêtes et réalistes. Les niveaux utilisés sont : **Découverte** (je découvre), **En cours** (j'apprends activement), **Notions** (j'ai les bases).

## Identité

- **Nom** : Tom Latchimy
- **Formation** : SEPR — 1ère Professionnelle CIEL (2025-2027)
- **Alternance** : DOMINO-RH — Service Informatique (depuis août 2025)
- **Email** : tomiatchimy6@gmail.com
- **GitHub** : https://github.com/tom-security
- **LinkedIn** : https://www.linkedin.com/in/tom-latchimy
- **Site** : https://tom-security.github.io

## Parcours

1. **Août 2025 – 2027** : DOMINO-RH — Alternant Service Informatique
2. **2025 – 2027** : SEPR — Première Professionnelle CIEL (en alternance)
3. **Mai – Juin 2025** : DOMINO-RH — Stage Assistant Technicien
4. **2024 – 2025** : École La Mache — Seconde Professionnelle CIEL
5. **2023 – 2024** : BIOMERIEUX — Stage d'observation (3ème)
6. **2023 – 2024** : Notre Dame du Bon Conseil — Troisième Générale (DNB 2024)

## Stack technique

| Techno | Usage |
|--------|-------|
| Next.js 16 (App Router) | Framework principal |
| TypeScript 5 | Langage |
| Tailwind CSS 4 | Styling |
| shadcn/ui | Composants UI |
| Framer Motion | Animations scroll & transitions |
| Canvas API | Animation Matrix Rain |
| GitHub Pages | Hébergement (export statique) |
| GitHub Actions | CI/CD automatique |

## Architecture

```
src/
├── app/
│   ├── globals.css          # Thème dark cybersécurité + effets glow
│   ├── layout.tsx           # Layout avec metadata SEO
│   └── page.tsx             # Page unique (tout le portfolio)
├── components/
│   ├── matrix-rain.tsx      # Animation canvas Matrix (avec mask fondu)
│   ├── terminal-typing.tsx  # Effet de frappe terminal
│   ├── section-wrapper.tsx  # Wrapper animation scroll (Framer Motion)
│   └── ui/                  # Composants shadcn/ui
└── public/
    ├── avatar.png            # Avatar IA
    ├── cyber-bg.png          # Background héro
    ├── project-wireshark.png # Image projet Wireshark
    └── .nojekyll             # Requis pour GitHub Pages
```

## Sections du portfolio (dans l'ordre)

1. **Hero** — Nom, badge formation, terminal typing, CTA
2. **Fondu** — Transition Hero → About (gradient)
3. **À propos** — Bio + 4 cartes info (Formation, Alternance, Intérêt, Objectif)
4. **Fondu** — Transition About → Parcours
5. **Parcours** — Timeline + carte alternance DOMINO-RH
6. **Fondu** — Transition Parcours → Skills
7. **Compétences** — 4 catégories avec barres de niveau (Découverte/En cours/Notions)
8. **Fondu** — Transition Skills → Projects
9. **Projets** — 4 projets (Wireshark terminé, 3 à venir)
10. **Fondu** — Transition Projects → Contact
11. **Contact** — LinkedIn, GitHub, Email
12. **Fondu** — Transition Contact → About me
13. **À propos (suite)** — Qualités personnelles, Langues, Centres d'intérêt
14. **Footer** — Copyright + liens

## Règles importantes

### Déploiement
- **`output: "export"`** dans `next.config.ts` — site statique uniquement
- **Pas d'API routes** (incompatible avec l'export statique)
- **`images: { unoptimized: true }`** — requis pour GitHub Pages
- **`devIndicators: false`** — supprime le logo "N" en bas à gauche
- Déploiement automatique via `.github/workflows/deploy.yml` à chaque push sur `main`
- GitHub Pages Source doit être **"GitHub Actions"** (pas "Deploy from a branch")
- Le repo est `tom-security.github.io` → pas besoin de `basePath`

### Style & Design
- Thème **dark cybersécurité** avec accents **vert émeraude** (couleur `cyber`)
- Variables CSS custom : `--cyber`, `--cyber-foreground`, `--cyber-muted`, `--cyber-glow`
- Effets : `glow-text`, `glow-border`, `glow-border-hover`, `grid-pattern`
- **Pas de couleurs indigo/bleu** sauf si demandé
- Design responsive mobile-first
- Footer sticky en bas de page
- Matrix Rain avec `maskImage` pour fondu progressif (invisible en haut, visible en bas)
- Transitions en fondu (`h-20` gradient) entre chaque section

### Contenu
- **Grammaire** : "à la SEPR" (pas "au SEPR") — c'est féminin
- **Niveaux de compétences** : rester honnête, Tom est en 1ère BAC Pro
- **Commandes terminal** : basiques (whoami, ip addr show, etc.), pas de commandes avancées
- **Projets** : titres adaptés au niveau (pas "Pentesting avancé" mais "Introduction à Wireshark")

### Accessibilité
- Lien "Aller au contenu" (skip-to-content)
- `prefers-reduced-motion` respecté dans Matrix Rain
- `aria-hidden` sur les éléments décoratifs
- Navigation au clavier

## Commandes utiles

```bash
bun install          # Installer les dépendances
bun run dev          # Serveur de développement (port 3000)
bun run build        # Build statique (dossier out/)
bun run lint         # Vérifier la qualité du code
```

## Déploiement GitHub

```bash
git add .
git commit -m "Description du changement"
git push origin main
```

Le workflow GitHub Actions se lance automatiquement. Vérifier dans l'onglet **Actions** du repo.

## Futur améliorations possibles

- [ ] Intégrer les infos du CV (`upload/CV_TomLATCHIMY_V3.pdf`)
- [ ] Ajouter un bouton de téléchargement du CV en PDF
- [ ] Mode clair/sombre (toggle)
- [ ] Formulaire de contact fonctionnel
- [ ] Section certifications
- [ ] Blog / veille technologique
- [ ] Optimisation SEO (sitemap, structured data)
- [ ] Lazy loading des images

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
