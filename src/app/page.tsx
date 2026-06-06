'use client'

import { motion, AnimatePresence } from 'framer-motion'
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
  ArrowUp,
  Code2,
  Eye,
  FileSearch,
  Cpu,
  Menu,
  X,
  GraduationCap,
  Briefcase,
  Clock,
  BookOpen,
  Monitor,
  Wrench,
  Users,
  Globe,
  Heart,
  Languages,
  Mountain,
  Plane,
  Printer,
  Cable,
  Download,
  Award,
  CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { MatrixRain } from '@/components/matrix-rain'
import { TerminalTyping } from '@/components/terminal-typing'
import { SectionWrapper } from '@/components/section-wrapper'
import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { href: '#about', label: 'À propos' },
  { href: '#parcours', label: 'Parcours' },
  { href: '#skills', label: 'Compétences' },
  { href: '#projects', label: 'Projets' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#contact', label: 'Contact' },
]

// Compétences réajustées pour un élève de 1ère BAC Pro CIEL
// Niveaux : "découverte" = je découvre, "en_cours" = j'apprends activement, "notions" = j'ai les bases
const SKILLS = [
  {
    category: 'Administration & Support',
    icon: Server,
    items: [
      { name: 'Active Directory (comptes & groupes)', level: 'en_cours' },
      { name: 'Résolution de tickets (Helpdesk)', level: 'en_cours' },
      { name: 'Assistance utilisateurs N1', level: 'en_cours' },
      { name: 'Installation & config postes', level: 'notions' },
    ],
  },
  {
    category: 'Matériel & Réseau',
    icon: Wrench,
    items: [
      { name: 'Dépannage matériel & imprimantes', level: 'en_cours' },
      { name: 'Installation OS & maintenance', level: 'notions' },
      { name: 'Câblage RJ45', level: 'notions' },
      { name: 'Wireshark — bases', level: 'découverte' },
    ],
  },
  {
    category: 'Systèmes & Réseaux',
    icon: Terminal,
    items: [
      { name: 'Windows / Active Directory', level: 'notions' },
      { name: 'Commandes Linux de base', level: 'découverte' },
      { name: 'Modèle OSI / TCP-IP', level: 'en_cours' },
      { name: 'Protocoles (HTTP, DNS)', level: 'notions' },
    ],
  },
  {
    category: 'Cybersécurité',
    icon: Shield,
    items: [
      { name: 'Bonnes pratiques de sécurité', level: 'en_cours' },
      { name: 'HTB Academy (débuts)', level: 'découverte' },
      { name: 'Chiffrement & TLS (concepts)', level: 'découverte' },
      { name: 'Sensibilisation aux risques', level: 'notions' },
    ],
  },
]

const LEVEL_CONFIG = {
  notions: { label: 'Notions', color: 'bg-amber-500/80', textColor: 'text-amber-400', borderColor: 'border-amber-500/30', percent: 40 },
  en_cours: { label: 'En cours', color: 'bg-cyber/80', textColor: 'text-cyber', borderColor: 'border-cyber/30', percent: 60 },
  découverte: { label: 'Découverte', color: 'bg-slate-500/80', textColor: 'text-slate-400', borderColor: 'border-slate-500/30', percent: 20 },
} as const

const PROJECTS = [
  {
    title: 'Introduction à Wireshark',
    description: 'Premières analyses réseau avec Wireshark : observer le trafic, identifier les protocoles et comprendre les échanges.',
    tags: ['Wireshark', 'PCAP', 'Réseau', 'TLS'],
    icon: Eye,
    image: '/project-wireshark.png',
    details: [
      'Observation du trafic sur une capture .pcap',
      'Identification des protocoles (HTTP, DNS, TLS)',
      'Utilisation de filtres de base (http, dns, tcp.port)',
      'Découverte du handshake TLS et du SNI',
    ],
    learnings: [
      'Même chiffré, le trafic révèle des métadonnées',
      'Le SNI permet d\'identifier le domaine visé',
      'Wireshark est un outil puissant pour comprendre le réseau',
    ],
    status: 'completed' as const,
  },
  {
    title: 'Commandes Linux essentielles',
    description: 'Apprentissage des commandes Linux de base pour l\'administration et le diagnostic système.',
    tags: ['Linux', 'Bash', 'Terminal', 'Système'],
    icon: Terminal,
    image: null,
    details: [
      'Navigation : ls, cd, pwd, find, grep',
      'Gestion : chmod, chown, ps, top, systemctl',
      'Réseau : ping, ifconfig, netstat, curl',
    ],
    learnings: [],
    status: 'coming' as const,
  },
  {
    title: 'HTB Academy — Premiers pas',
    description: 'Notes et exercices de mes débuts sur Hack The Box Academy : fondamentaux de la sécurité.',
    tags: ['HTB', 'Sécurité', 'Apprentissage'],
    icon: BookOpen,
    image: null,
    details: [
      'Modules fondamentaux HTB',
      'Introduction au pentesting',
      'Méthodologie de base',
    ],
    learnings: [],
    status: 'coming' as const,
  },
  {
    title: 'Veille & Documentation',
    description: 'Veille technologique en cybersécurité et documentation de mes apprentissages.',
    tags: ['Veille', 'Documentation', 'Recherche'],
    icon: Globe,
    image: null,
    details: [
      'Articles et ressources suivies',
      'Notes personnelles structurées',
      'Guides et mémos',
    ],
    learnings: [],
    status: 'coming' as const,
  },
]

const CERTIFICATIONS = [
  {
    title: 'HTB Certified Junior Cybersecurity Associate',
    issuer: 'Hack The Box',
    status: 'a_venir' as const,
    link: 'https://academy.hackthebox.com/preview/certifications/htb-certified-junior-cybersecurity-associate',
  },
]

// Statuts de certification avec couleurs distinctes
const CERT_STATUS_CONFIG = {
  obtenu: { label: 'Obtenu', icon: CheckCircle2, badgeClass: 'bg-cyber/20 text-cyber border-cyber/30', borderClass: 'hover:border-cyber/40', iconClass: 'text-cyber' },
  en_cours: { label: 'En cours', icon: Clock, badgeClass: 'bg-amber-500/20 text-amber-400 border-amber-500/30', borderClass: 'hover:border-amber-500/40', iconClass: 'text-amber-400' },
  a_venir: { label: 'À venir', icon: Clock, badgeClass: 'bg-slate-500/20 text-slate-400 border-slate-500/30', borderClass: 'hover:border-slate-500/40', iconClass: 'text-slate-400' },
} as const

// Commandes terminal adaptées au niveau d'un élève de 1ère BAC Pro
const TERMINAL_LINES = [
  'whoami',
  'ip addr show',
  'wireshark &',
  'echo "En apprentissage permanent"',
]

const TIMELINE = [
  {
    period: 'Août 2025 – 2027',
    title: 'DOMINO-RH — Alternant Service Informatique',
    subtitle: 'Technicien support IT en alternance',
    description: 'Gestion Active Directory, résolution de tickets, installation de postes, dépannage matériel et imprimantes.',
    icon: Briefcase,
    current: true,
  },
  {
    period: '2025 – 2027',
    title: 'SEPR — Première Professionnelle CIEL',
    subtitle: 'Cybersécurité, Informatique et Réseaux, Électronique — En alternance',
    description: 'Formation en cybersécurité, informatique et réseaux avec alternance chez DOMINO-RH.',
    icon: GraduationCap,
    current: true,
  },
  {
    period: 'Mai – Juin 2025',
    title: 'DOMINO-RH — Stage Assistant Technicien',
    subtitle: 'Stage de découverte du Service Informatique',
    description: 'Découverte de l\'environnement professionnel, assistance utilisateurs et résolution de problèmes N1.',
    icon: Briefcase,
    current: false,
  },
  {
    period: '2024 – 2025',
    title: 'École La Mache — Seconde Professionnelle CIEL',
    subtitle: 'Cybersécurité, Informatique et Réseaux, Électronique',
    description: 'Année de seconde professionnelle, découverte du domaine CIEL et des fondamentaux informatiques.',
    icon: GraduationCap,
    current: false,
  },
  {
    period: '2023 – 2024',
    title: 'BIOMERIEUX — Stage d\'observation (3ème)',
    subtitle: 'Découverte des métiers de l\'informatique',
    description: 'Stage d\'observation en entreprise, découverte du milieu professionnel et des métiers IT.',
    icon: Briefcase,
    current: false,
  },
  {
    period: '2023 – 2024',
    title: 'Notre Dame du Bon Conseil — Troisième Générale',
    subtitle: 'Obtention du DNB (2024)',
    description: 'Troisième générale avec obtention du Diplôme National du Brevet.',
    icon: GraduationCap,
    current: false,
  },
]

const ALTERNANCE_TASKS = [
  { icon: Users, label: 'Active Directory', desc: 'Création, modification de comptes utilisateurs et groupes' },
  { icon: Bug, label: 'Résolution de tickets', desc: 'Incidents et requêtes support niveau 1' },
  { icon: Monitor, label: 'Installation postes', desc: 'Configuration pour les nouveaux arrivants' },
  { icon: Wrench, label: 'Dépannage matériel', desc: 'Diagnostic et réparation de pannes' },
  { icon: Printer, label: 'Configuration imprimantes', desc: 'Installation et mise en service' },
  { icon: Cable, label: 'Câblage RJ45', desc: 'Raccordement et câblage réseau' },
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      setShowBackToTop(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative">
      <MatrixRain />

      {/* Skip to content - Accessibility */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-cyber focus:text-cyber-foreground focus:rounded-md focus:font-mono"
      >
        Aller au contenu
      </a>

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
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
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
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/70 z-10" />
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
                <GraduationCap className="w-3 h-3 mr-1" />
                SEPR — 1ère Pro CIEL · Alternance
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
              Étudiant à la <span className="text-cyber font-medium">SEPR</span> en 1ère Professionnelle CIEL, en alternance chez <span className="text-cyber font-medium">DOMINO-RH</span>.
              Je me forme en cybersécurité, support IT et administration système.
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
              <Button asChild variant="outline" className="border-cyber/30 text-cyber hover:bg-cyber/10 hover:glow-border font-mono">
                <a href="/CV_TomLATCHIMY.pdf" download>
                  <Download className="w-4 h-4 mr-1" />
                  Télécharger mon CV
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Right - Terminal (visible lg+), mobile shows compact version */}
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

          {/* Mobile terminal - compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="lg:hidden"
          >
            <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 glow-border">
              <TerminalTyping
                lines={TERMINAL_LINES}
                speed={60}
                delayBetweenLines={1000}
              />
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

      {/* Transition fondu Hero → About */}
      <div className="relative z-10 h-32 -mt-1 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-transparent" />
      </div>

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

          <div className="max-w-3xl mx-auto">
            {/* Bio */}
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Je suis <span className="text-foreground font-medium">Tom Latchimy</span>, élève à la{' '}
                <span className="text-cyber font-medium">SEPR en 1ère Professionnelle CIEL</span>, en alternance au service informatique de <span className="text-cyber font-medium">DOMINO-RH</span>.
                Je me forme chaque jour en administration système, support IT et cybersécurité.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                En alternance chez DOMINO-RH, je gère l&apos;Active Directory, résous des tickets helpdesk, installe des postes et dépanne le matériel.
                En autonomie, j&apos;apprends avec <span className="text-cyber font-medium">Wireshark</span>,{' '}
                <span className="text-cyber font-medium">Linux</span> et{' '}
                <span className="text-cyber font-medium">HTB Academy</span>.
                Ce portfolio documente ma progression.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { icon: GraduationCap, label: 'Formation', value: 'SEPR — 1ère Pro CIEL' },
                  { icon: Briefcase, label: 'Alternance', value: 'DOMINO-RH — SI' },
                  { icon: Wifi, label: 'Intérêt', value: 'Analyse réseau' },
                  { icon: Shield, label: 'Objectif', value: 'Cybersécurité' },
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

      {/* Fondu About → Parcours */}
      <div className="relative z-10 h-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent" />
      </div>

      {/* Parcours / Formation Section */}
      <SectionWrapper id="parcours" className="relative z-10 py-20 sm:py-28 grid-pattern">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge variant="outline" className="border-cyber/30 text-cyber bg-cyber/5 font-mono text-xs mb-4">
              <GraduationCap className="w-3 h-3 mr-1" />
              PARCOURS
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2">
              Mon <span className="text-cyber">parcours</span>
            </h2>
          </div>

          {/* Timeline */}
          <div className="max-w-2xl mx-auto space-y-6 mb-16">
            {TIMELINE.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative pl-8 border-l-2 border-cyber/30"
              >
                <div className="absolute -left-[13px] top-1 w-6 h-6 rounded-full bg-card border-2 border-cyber flex items-center justify-center">
                  {item.current && <div className="w-2 h-2 bg-cyber rounded-full animate-pulse" />}
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono text-cyber">{item.period}</span>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <item.icon className="w-5 h-5 text-cyber" />
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium">{item.subtitle}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Alternance detail */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card/60 backdrop-blur-sm border-border/50 glow-border overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Briefcase className="w-6 h-6 text-cyber" />
                  Mon alternance chez DOMINO-RH
                </CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  En alternance au service informatique de DOMINO-RH depuis août 2025, je participe activement
                  au support et à l&apos;administration au quotidien. Voici les missions que je réalise.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ALTERNANCE_TASKS.map((task, idx) => (
                    <motion.div
                      key={task.label}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.08 }}
                      className="p-4 rounded-lg bg-background/50 border border-border/50 hover:border-cyber/20 transition-colors"
                    >
                      <task.icon className="w-5 h-5 text-cyber mb-2" />
                      <p className="font-medium text-sm">{task.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">{task.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SectionWrapper>

      {/* Fondu Parcours → Skills */}
      <div className="relative z-10 h-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      </div>

      {/* Skills Section - Avec système de niveaux */}
      <SectionWrapper id="skills" className="relative z-10 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <Badge variant="outline" className="border-cyber/30 text-cyber bg-cyber/5 font-mono text-xs mb-4">
              <Cpu className="w-3 h-3 mr-1" />
              COMPÉTENCES
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2">
              Mes <span className="text-cyber">compétences</span>
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Je suis en formation continue — ces compétences évoluent chaque jour avec mon alternance et mes apprentissages personnels.
            </p>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-4 sm:gap-6 mb-10">
            {(Object.entries(LEVEL_CONFIG) as [keyof typeof LEVEL_CONFIG, typeof LEVEL_CONFIG[keyof typeof LEVEL_CONFIG]][]).map(([key, config]) => (
              <div key={key} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${config.color}`} />
                <span className={`text-xs font-mono ${config.textColor}`}>{config.label}</span>
              </div>
            ))}
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
                  <CardContent className="space-y-3">
                    {category.items.map((item) => {
                      const config = LEVEL_CONFIG[item.level as keyof typeof LEVEL_CONFIG]
                      return (
                        <div key={item.name} className="space-y-1.5">
                          <div className="flex justify-between items-center text-sm">
                            <span className="font-mono text-muted-foreground text-xs sm:text-sm">{item.name}</span>
                            <Badge
                              variant="outline"
                              className={`font-mono text-[10px] px-1.5 py-0 ${config.borderColor} ${config.textColor}`}
                            >
                              {config.label}
                            </Badge>
                          </div>
                          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${config.color}`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${config.percent}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Fondu Skills → Projects */}
      <div className="relative z-10 h-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent" />
      </div>

      {/* Projects Section */}
      <SectionWrapper id="projects" className="relative z-10 py-20 sm:py-28 grid-pattern">
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
              Mes analyses, exercices et notes — en progression constante.
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
                          <Clock className="w-3 h-3 mr-1" />
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
                      <p className="text-xs font-mono text-cyber/70 uppercase tracking-wider">Ce que j&apos;ai fait</p>
                      {project.details.map((detail, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <ChevronRight className="w-3 h-3 text-cyber shrink-0 mt-1" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>

                    {/* Learnings */}
                    {project.learnings.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-border/50">
                        <p className="text-xs font-mono text-cyber/70 uppercase tracking-wider flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          Ce que j&apos;ai appris
                        </p>
                        {project.learnings.map((learning, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <ChevronRight className="w-3 h-3 text-amber-400 shrink-0 mt-1" />
                            <span>{learning}</span>
                          </div>
                        ))}
                      </div>
                    )}

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

      {/* Fondu Projects → Certifications */}
      <div className="relative z-10 h-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      </div>

      {/* Certifications Section */}
      <SectionWrapper id="certifications" className="relative z-10 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge variant="outline" className="border-cyber/30 text-cyber bg-cyber/5 font-mono text-xs mb-4">
              <Award className="w-3 h-3 mr-1" />
              CERTIFICATIONS
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2">
              Mes <span className="text-cyber">certifications</span>
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Les certifications que je vise pour valider mes compétences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {CERTIFICATIONS.map((cert, idx) => {
              const statusConfig = CERT_STATUS_CONFIG[cert.status]
              const StatusIcon = statusConfig.icon
              return (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Card className={`bg-card/60 backdrop-blur-sm border-border/50 ${statusConfig.borderClass} transition-all glow-border-hover group h-full`}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Award className={`w-5 h-5 ${statusConfig.iconClass} shrink-0`} />
                          {cert.title}
                        </CardTitle>
                        <Badge className={`${statusConfig.badgeClass} font-mono text-xs shrink-0`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusConfig.label}
                        </Badge>
                      </div>
                      <CardDescription className="text-muted-foreground leading-relaxed">
                        Émise par <span className="text-cyber font-medium">{cert.issuer}</span>
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <Button
                        variant="outline"
                        className="w-full border-cyber/30 text-cyber hover:bg-cyber/10 font-mono"
                        asChild
                      >
                        <a href={cert.link} target="_blank" rel="noopener noreferrer">
                          Voir la certification
                          <ExternalLink className="w-3 h-3 ml-2" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </SectionWrapper>

      {/* Fondu Certifications → Contact */}
      <div className="relative z-10 h-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      </div>

      {/* Contact Section */}
      <SectionWrapper id="contact" className="relative z-10 py-20 sm:py-28">
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
              Pour une alternance, un projet ou simplement échanger — n&apos;hésitez pas !
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
                value: 'tomiatchimy6@gmail.com',
                href: 'mailto:tomiatchimy6@gmail.com',
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

      {/* Fondu Contact → Soft Skills */}
      <div className="relative z-10 h-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent" />
      </div>

      {/* Soft Skills, Langues & Centres d'intérêt */}
      <SectionWrapper id="about-me" className="relative z-10 py-20 sm:py-28 grid-pattern">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Soft Skills */}
            <Card className="bg-card/60 backdrop-blur-sm border-border/50 glow-border h-full">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Heart className="w-5 h-5 text-cyber" />
                  Qualités personnelles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['Esprit d\'équipe', 'Polyvalent', 'Rigoureux', 'Motivé', 'Investi', 'Gestion de projet'].map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="font-mono text-xs border-cyber/20 text-cyber/80 hover:bg-cyber/10 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Langues */}
            <Card className="bg-card/60 backdrop-blur-sm border-border/50 glow-border h-full">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Languages className="w-5 h-5 text-cyber" />
                  Langues
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Français</span>
                  <Badge className="bg-cyber/20 text-cyber border-cyber/30 font-mono text-[10px]">Langue maternelle</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Anglais</span>
                  <Badge variant="outline" className="font-mono text-[10px] border-amber-500/30 text-amber-400">En cours</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Centres d'intérêt */}
            <Card className="bg-card/60 backdrop-blur-sm border-border/50 glow-border h-full">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Heart className="w-5 h-5 text-cyber" />
                  Centres d&apos;intérêt
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { icon: Mountain, label: 'Randonnée' },
                    { icon: Globe, label: 'Voyage' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3 p-2 rounded-lg bg-background/30 border border-border/30">
                      <item.icon className="w-4 h-4 text-cyber shrink-0" />
                      <span className="text-sm">{item.label}</span>
                    </div>
                  ))}
                  {['Mode', 'Volley'].map((item) => (
                    <div key={item} className="flex items-center gap-3 p-2 rounded-lg bg-background/30 border border-border/30">
                      <Heart className="w-4 h-4 text-cyber shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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

      {/* Back to top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-cyber/90 hover:bg-cyber text-cyber-foreground flex items-center justify-center shadow-lg transition-colors"
            aria-label="Retour en haut"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
