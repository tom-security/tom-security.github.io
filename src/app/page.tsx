'use client'

import { motion } from 'framer-motion'
import {
  Shield,
  Terminal,
  Wifi,
  Server,
  Bug,
  Lock,
  ChevronRight,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowDown,
  Code2,
  Eye,
  FileSearch,
  Cpu,
  Menu,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { MatrixRain } from '@/components/matrix-rain'
import { TerminalTyping } from '@/components/terminal-typing'
import { SectionWrapper } from '@/components/section-wrapper'
import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { href: '#about', label: 'À propos' },
  { href: '#skills', label: 'Compétences' },
  { href: '#projects', label: 'Projets' },
  { href: '#contact', label: 'Contact' },
]

const SKILLS = [
  {
    category: 'Analyse Réseau',
    icon: Wifi,
    items: [
      { name: 'Wireshark', level: 75 },
      { name: 'Analyse PCAP', level: 70 },
      { name: 'Filtres réseau', level: 72 },
      { name: 'Protocoles (HTTP, DNS, TLS)', level: 68 },
    ],
  },
  {
    category: 'Linux & Systèmes',
    icon: Terminal,
    items: [
      { name: 'Commandes Linux', level: 78 },
      { name: 'Administration système', level: 65 },
      { name: 'Shell scripting', level: 55 },
      { name: 'Gestion des services', level: 60 },
    ],
  },
  {
    category: 'Cybersécurité',
    icon: Shield,
    items: [
      { name: 'Bonnes pratiques', level: 70 },
      { name: 'HTB Academy', level: 60 },
      { name: 'Analyse de vulnérabilités', level: 50 },
      { name: 'Chiffrement & TLS', level: 65 },
    ],
  },
  {
    category: 'Support IT',
    icon: Bug,
    items: [
      { name: 'Diagnostic', level: 80 },
      { name: 'Résolution de problèmes', level: 78 },
      { name: 'Assistance utilisateurs', level: 82 },
      { name: 'Documentation', level: 72 },
    ],
  },
]

const PROJECTS = [
  {
    title: 'Introduction à Wireshark',
    description: 'Analyse réseau approfondie avec Wireshark : observation du trafic, identification des protocoles, filtres avancés et analyse du handshake TLS.',
    tags: ['Wireshark', 'PCAP', 'TLS', 'DNS', 'Réseau'],
    icon: Eye,
    image: '/project-wireshark.png',
    details: [
      'Analyse du Client Hello et Server Hello TLS',
      'Identification du SNI (Server Name Indication)',
      'Filtres : tls.handshake, http, dns, tcp.port == 443',
      'Différenciation trafic chiffré / non chiffré',
    ],
    status: 'completed' as const,
  },
  {
    title: 'Scripts & Outils Linux',
    description: 'Automatisations simples, scripts shell et environnements d\'apprentissage Linux pour la cybersécurité.',
    tags: ['Bash', 'Linux', 'Automatisation', 'Scripts'],
    icon: Code2,
    image: null,
    details: [
      'Scripts de monitoring réseau',
      'Automatisation de tâches système',
      'Environnements de lab virtuels',
    ],
    status: 'coming' as const,
  },
  {
    title: 'HTB Academy Notes',
    description: 'Notes de cours, challenges et méthodologies issues de Hack The Box Academy.',
    tags: ['HTB', 'Pentest', 'CTF', 'Méthodologie'],
    icon: Cpu,
    image: null,
    details: [
      'Notes de cours structurées',
      'Write-ups de challenges',
      'Méthodologies d\'attaque',
    ],
    status: 'coming' as const,
  },
  {
    title: 'Documentation & Recherches',
    description: 'Documentation personnelle, outils développés et recherches en cybersécurité.',
    tags: ['Docs', 'Recherche', 'Outils', 'Veille'],
    icon: FileSearch,
    image: null,
    details: [
      'Veille technologique sécurité',
      'Outils personnalisés',
      'Guides et tutoriels',
    ],
    status: 'coming' as const,
  },
]

const TERMINAL_LINES = [
  'whoami',
  'cat /etc/passwd | grep tom',
  'nmap -sV --script vuln target',
  'echo "Ready to secure the world"',
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative">
      <MatrixRain />

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border/50' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="flex items-center gap-2 group">
              <div className="relative">
                <Shield className="w-7 h-7 text-cyber group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-cyber/20 blur-lg rounded-full" />
              </div>
              <span className="font-mono font-bold text-lg tracking-tight">
                <span className="text-cyber">tom</span>
                <span className="text-muted-foreground">-</span>
                <span className="text-foreground">security</span>
              </span>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-mono text-muted-foreground hover:text-cyber transition-colors rounded-md hover:bg-cyber/5"
                >
                  {link.label}
                </a>
              ))}
              <Separator orientation="vertical" className="h-5 mx-2" />
              <a
                href="https://github.com/tom-security"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-cyber transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/tom-latchimy"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-cyber transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-cyber transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden pb-4 border-t border-border/50 pt-2"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-mono text-muted-foreground hover:text-cyber transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-2 px-3 pt-2">
                <a
                  href="https://github.com/tom-security"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-cyber transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/tom-latchimy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-cyber transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-10" />
          <img
            src="/cyber-bg.png"
            alt=""
            className="w-full h-full object-cover opacity-20"
            aria-hidden="true"
          />
        </div>

        <div className="relative z-20 max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left - Text content */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="outline" className="border-cyber/30 text-cyber bg-cyber/5 font-mono text-xs mb-4">
                <Lock className="w-3 h-3 mr-1" />
                BAC Pro CIEL — Alternance
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-foreground">Tom</span>{' '}
              <span className="text-cyber glow-text">Latchimy</span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Étudiant en <span className="text-cyber font-medium">cybersécurité</span>.
              Passionné par l&apos;analyse réseau, les environnements Linux et les outils de diagnostic.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button asChild className="bg-cyber hover:bg-cyber/90 text-cyber-foreground font-mono">
                <a href="#projects">
                  Voir mes projets
                  <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </Button>
              <Button asChild variant="outline" className="border-cyber/30 text-cyber hover:bg-cyber/10 font-mono">
                <a href="#contact">
                  Me contacter
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Right - Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-cyber/10 rounded-xl blur-xl" />
              <div className="relative bg-card/90 backdrop-blur-sm border border-border rounded-xl p-6 glow-border">
                <TerminalTyping
                  lines={TERMINAL_LINES}
                  speed={60}
                  delayBetweenLines={1200}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <a href="#about" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-cyber transition-colors">
            <span className="text-xs font-mono">scroll</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </motion.div>
      </section>

      {/* About Section */}
      <SectionWrapper id="about" className="relative z-10 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge variant="outline" className="border-cyber/30 text-cyber bg-cyber/5 font-mono text-xs mb-4">
              <Server className="w-3 h-3 mr-1" />
              À PROPOS
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2">
              Qui <span className="text-cyber">suis-je</span> ?
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-8 items-start">
            {/* Avatar */}
            <div className="md:col-span-2 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-2 bg-cyber/20 blur-xl rounded-2xl" />
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border-2 border-cyber/30 glow-border">
                  <img
                    src="/avatar.png"
                    alt="Tom Latchimy - Cybersecurity Student"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Status indicator */}
                <div className="absolute -bottom-2 -right-2 bg-card border border-cyber/30 rounded-lg px-3 py-1.5 flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-xs font-mono text-cyber">Disponible</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="md:col-span-3 space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Je suis <span className="text-foreground font-medium">Tom Latchimy</span>, étudiant en{' '}
                <span className="text-cyber font-medium">BAC Pro CIEL en alternance</span> et passionné
                par la cybersécurité. J&apos;explore l&apos;analyse réseau, les environnements Linux,
                les outils de diagnostic et les plateformes d&apos;apprentissage comme{' '}
                <span className="text-cyber font-medium">Hack The Box</span>.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Mon objectif : construire une carrière solide en cybersécurité et évoluer
                progressivement vers des responsabilités de sécurité. Je documente ici mes
                apprentissages, mes projets et mes analyses.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { icon: Wifi, label: 'Analyse réseau', value: 'Wireshark' },
                  { icon: Terminal, label: 'Systèmes', value: 'Linux' },
                  { icon: Shield, label: 'Plateforme', value: 'HTB Academy' },
                  { icon: Bug, label: 'Support', value: 'Diagnostic IT' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border/50 hover:border-cyber/30 transition-colors"
                  >
                    <item.icon className="w-5 h-5 text-cyber shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground font-mono">{item.label}</p>
                      <p className="text-sm font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Skills Section */}
      <SectionWrapper id="skills" className="relative z-10 py-20 sm:py-28 grid-pattern">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge variant="outline" className="border-cyber/30 text-cyber bg-cyber/5 font-mono text-xs mb-4">
              <Cpu className="w-3 h-3 mr-1" />
              COMPÉTENCES
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2">
              Mes <span className="text-cyber">compétences</span> techniques
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {SKILLS.map((category, idx) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="bg-card/60 backdrop-blur-sm border-border/50 hover:border-cyber/30 transition-all glow-border-hover h-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <category.icon className="w-5 h-5 text-cyber" />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.items.map((item) => (
                      <div key={item.name} className="space-y-1.5">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-mono text-muted-foreground">{item.name}</span>
                          <span className="text-cyber font-mono text-xs">{item.level}%</span>
                        </div>
                        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-cyber/80 to-cyber rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Projects Section */}
      <SectionWrapper id="projects" className="relative z-10 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge variant="outline" className="border-cyber/30 text-cyber bg-cyber/5 font-mono text-xs mb-4">
              <Code2 className="w-3 h-3 mr-1" />
              PROJETS
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2">
              Mes <span className="text-cyber">projets</span>
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Analyses, exercices, notes et expérimentations en cybersécurité.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="bg-card/60 backdrop-blur-sm border-border/50 hover:border-cyber/30 transition-all glow-border-hover group h-full overflow-hidden">
                  {/* Project image */}
                  {project.image && (
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent z-10" />
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <project.icon className="w-5 h-5 text-cyber shrink-0" />
                        {project.title}
                      </CardTitle>
                      {project.status === 'coming' ? (
                        <Badge variant="secondary" className="font-mono text-xs shrink-0">
                          À venir
                        </Badge>
                      ) : (
                        <Badge className="bg-cyber/20 text-cyber border-cyber/30 font-mono text-xs shrink-0">
                          Terminé
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="font-mono text-xs border-cyber/20 text-cyber/80"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Details */}
                    <div className="space-y-2">
                      {project.details.map((detail, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <ChevronRight className="w-3 h-3 text-cyber shrink-0 mt-1" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    {project.status === 'completed' && (
                      <Button
                        variant="outline"
                        className="w-full border-cyber/30 text-cyber hover:bg-cyber/10 font-mono mt-2"
                        asChild
                      >
                        <a
                          href="https://github.com/tom-security/tom-security.github.io/tree/main/projects/wireshark-intro"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Voir le projet
                          <ExternalLink className="w-3 h-3 ml-2" />
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Contact Section */}
      <SectionWrapper id="contact" className="relative z-10 py-20 sm:py-28 grid-pattern">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge variant="outline" className="border-cyber/30 text-cyber bg-cyber/5 font-mono text-xs mb-4">
              <Mail className="w-3 h-3 mr-1" />
              CONTACT
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2">
              Me <span className="text-cyber">contacter</span>
            </h2>
            <p className="text-muted-foreground mt-3">
              Intéressé par mon profil ? N&apos;hésitez pas à me contacter.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              {
                icon: Linkedin,
                label: 'LinkedIn',
                value: 'Tom Latchimy',
                href: 'https://www.linkedin.com/in/tom-latchimy',
                color: 'text-blue-400',
              },
              {
                icon: Github,
                label: 'GitHub',
                value: 'tom-security',
                href: 'https://github.com/tom-security',
                color: 'text-foreground',
              },
              {
                icon: Mail,
                label: 'Email',
                value: 'Adresse pro',
                href: 'mailto:contact@tom-security.dev',
                color: 'text-cyber',
              },
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="block"
                >
                  <Card className="bg-card/60 backdrop-blur-sm border-border/50 hover:border-cyber/30 transition-all glow-border-hover group cursor-pointer h-full">
                    <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-cyber/10 flex items-center justify-center group-hover:bg-cyber/20 transition-colors">
                        <item.icon className={`w-6 h-6 ${item.color}`} />
                      </div>
                      <div>
                        <p className="font-mono text-xs text-muted-foreground">{item.label}</p>
                        <p className="font-medium text-sm mt-0.5">{item.value}</p>
                      </div>
                      <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-cyber transition-colors" />
                    </CardContent>
                  </Card>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Footer */}
      <footer className="relative z-10 mt-auto border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyber" />
              <span className="font-mono text-sm">
                <span className="text-cyber">tom</span>
                <span className="text-muted-foreground">-</span>
                <span className="text-foreground">security</span>
              </span>
            </div>

            <p className="text-xs text-muted-foreground font-mono text-center">
              © {new Date().getFullYear()} Tom Latchimy — Portfolio Cybersécurité
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com/tom-security"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-cyber transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/tom-latchimy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-cyber transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
