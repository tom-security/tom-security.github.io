# tom-security.github.io

Portfolio professionnel en cybersécurité — Tom Latchimy

## 🛡️ À propos

Étudiant en 1ère BAC Pro CIEL en alternance, passionné par la cybersécurité, l'analyse réseau et le support informatique.

## 🚀 Tech Stack

- **Framework** : [Next.js 16](https://nextjs.org/) avec App Router
- **Langage** : TypeScript 5
- **Styling** : Tailwind CSS 4 + shadcn/ui
- **Animations** : Framer Motion
- **Déploiement** : GitHub Pages (export statique)

## 🏗️ Développement local

```bash
# Installer les dépendances
bun install

# Lancer le serveur de dev
bun run dev

# Builder pour la production
bun run build
```

## 📦 Déploiement

Le site est déployé automatiquement sur GitHub Pages via GitHub Actions à chaque push sur la branche `main`.

Le workflow se trouve dans `.github/workflows/deploy.yml`.

### Configuration GitHub Pages

1. Aller dans **Settings** → **Pages**
2. Source : **GitHub Actions**
3. Le workflow se charge du reste !

## 📁 Structure

```
src/
├── app/
│   ├── globals.css          # Thème cybersécurité dark
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Page portfolio
├── components/
│   ├── matrix-rain.tsx      # Animation Matrix en canvas
│   ├── terminal-typing.tsx  # Effet de frappe terminal
│   ├── section-wrapper.tsx  # Animations au scroll
│   └── ui/                  # Composants shadcn/ui
└── public/
    ├── avatar.png            # Avatar généré par IA
    ├── cyber-bg.png          # Fond héro
    └── project-wireshark.png # Image projet Wireshark
```

## 📄 Licence

© 2025 Tom Latchimy
