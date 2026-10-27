import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowRight, BadgeCheck, BarChart3, Box, Check, ChevronDown, ChevronRight,
  CircleHelp, Clock3, Code2, Cpu, Download, Facebook, FileText, HardDrive,
  Headphones, Heart, Instagram, Laptop, Mail, MapPin, Menu, Monitor, Package,
  Phone, Printer, Search, Send, ShoppingCart, Sparkles, Star,
  Store, Truck, Users, X, Youtube
} from 'lucide-react'
import './styles.css'
import './catalog.css'

const hardwareCategories = ['Tous', 'Imprimante & scanner', 'Ordinateur & PC portable', 'Stockages', 'Composants', 'Périphérique', 'Écrans et moniteur']

const categoryIcons = {
  Tous: Package,
  'Imprimante & scanner': Printer,
  'Ordinateur & PC portable': Laptop,
  Stockages: HardDrive,
  Composants: Cpu,
  Périphérique: Box,
  'Écrans et moniteur': Monitor,
  Commercial: BarChart3,
  Santé: BadgeCheck,
  Service: Headphones,
  Éducation: Users
}

const partnerLogos = [
  "421540737_881717170626752_523673560757711644_n.jpg",
  "APC TIZI OUZOU.jpg",
  "BGI.JPG",
  "CAPTO.jpg",
  "DALI BEL.JPG",
  "EURL GRAFAB.jpg",
  "EURL STEEL SOLIDE.jpg",
  "Giplait.jpg",
  "LE martinet.jpg",
  "OSMOSE.jpg",
  "SARL BTI.jpg",
  "chennane Agro.bmp",
  "clinique oliviers.jpg",
  "fnai.jpg",
  "hcm.JPG",
  "logo Ummto.jpg",
  "logo.jpg"
]

const products = [
  {
    id: 1, kind: 'Matériel', category: 'Imprimante & scanner', name: 'Pack caisse Pro', price: '89 900 DA',
    tag: 'Best-seller', image: 'https://unsplash.com/fr/photos/configuration-dordinateur-de-jeu-en-lumiere-violette-2rQoMZLVXHc',
    summary: 'Tout le nécessaire pour démarrer une caisse moderne et efficace.',
    specs: ['Écran tactile 15,6 pouces', 'Imprimante tickets thermique', 'Tiroir-caisse sécurisé', 'Garantie 12 mois'],
    technical: { 'Référence': 'FM-PACK-CAISSE-01', 'Type': 'Pack point de vente', 'Processeur': 'Intel Celeron J4125', 'RAM': '8 Go', 'Disque dur': 'SSD 256 Go', 'Système': 'Windows 11 Pro' },
    numericPrice: 89900, rating: 4.8, reviews: 24, stock: 12, description: 'Un pack complet pour équiper votre point de vente avec un terminal tactile, une imprimante de tickets et un tiroir-caisse professionnel.'
  },
  {
    id: 2, kind: 'Matériel', category: 'Écrans et moniteur', name: 'Terminal caisse tactile', price: '64 500 DA',
    image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=900&q=85',
    summary: 'Un terminal compact et rapide pour vos points de vente.',
    specs: ['Écran tactile Full HD', 'Processeur Intel', 'Wi-Fi & Ethernet', 'Windows inclus'],
    technical: { 'Référence': 'FM-TAC-156', 'Type': 'Terminal tactile', 'Processeur': 'Intel Core i3', 'RAM': '8 Go', 'Disque dur': 'SSD 256 Go', 'Carte graphique': 'Intel UHD Graphics', 'Système': 'Windows 11 Pro' },
    numericPrice: 64500, rating: 4.7, reviews: 18, stock: 8, description: 'Un terminal tactile rapide et compact conçu pour les commerces, restaurants et points de service.'
  },
  {
    id: 3, kind: 'Matériel', category: 'Périphérique', name: 'Lecteur code-barres', price: '12 800 DA',
    image: 'https://unsplash.com/fr/photos/un-ordinateur-lumineux-avec-un-moniteur-affichant-une-foret-ETvLAlAAd4M',
    summary: 'Lecture rapide et fiable pour fluidifier chaque passage en caisse.',
    specs: ['Lecture 1D & 2D', 'USB Plug & Play', 'Résistant aux chutes', 'Garantie 12 mois'],
    technical: { 'Référence': 'FM-SCAN-2D', 'Type': 'Lecteur code-barres', 'Lecture': 'Codes 1D & 2D', 'Connexion': 'USB Plug & Play', 'Vitesse': '300 scans/seconde', 'Résistance': 'Chute jusqu’à 1,5 m' },
    numericPrice: 12800, rating: 4.9, reviews: 31, stock: 25, description: 'Un lecteur fiable et précis pour accélérer l’encaissement et réduire les erreurs de saisie.'
  },
  {
    id: 4, kind: 'Logiciel', category: 'Commercial', name: 'FM Commerce', price: 'À partir de 25 000 DA',
    tag: 'Populaire', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85',
    summary: 'Pilotez vos ventes, votre stock et vos clients depuis une seule interface.',
    specs: ['Gestion des ventes & achats', 'Stock multi-dépôts', 'Statistiques temps réel', 'Support inclus'],
    technical: { 'Version actuelle': '4.2.0', 'Système': 'Windows 10/11, Linux', 'Type': 'Gestion commerciale', 'Durée de licence': '12 mois renouvelable', 'Déploiement': 'Local ou réseau', 'Support': 'Inclus' },
    rating: 4.9, reviews: 42, updated: '15 septembre 2024', description: 'FM Commerce centralise vos ventes, achats, stocks, clients et statistiques dans une interface claire pour piloter votre commerce au quotidien.', demoUrl: '#'
  },
  {
    id: 5, kind: 'Logiciel', category: 'Santé', name: 'FM Santé', price: 'Sur devis',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=85',
    summary: 'Une solution claire pour organiser les dossiers et rendez-vous de santé.',
    specs: ['Dossiers patients sécurisés', 'Planning & rendez-vous', 'Facturation', 'Sauvegarde automatique'],
    technical: { 'Version actuelle': '3.8.1', 'Système': 'Windows 10/11', 'Type': 'Gestion médicale', 'Durée de licence': '12 mois renouvelable', 'Déploiement': 'Local ou réseau', 'Sécurité': 'Chiffrement des données' },
    rating: 4.8, reviews: 19, updated: '28 août 2024', description: 'FM Santé aide les cabinets et centres de soins à organiser les dossiers patients, rendez-vous, factures et suivis avec un haut niveau de confidentialité.', demoUrl: '#'
  },
  {
    id: 6, kind: 'Logiciel', category: 'Éducation', name: 'FM School', price: 'Sur devis',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=85',
    summary: 'La gestion d’établissement pensée pour les équipes pédagogiques.',
    specs: ['Élèves & inscriptions', 'Notes et absences', 'Paiements & reçus', 'Portail parent'],
    technical: { 'Version actuelle': '2.6.0', 'Système': 'Windows 10/11', 'Type': 'Gestion scolaire', 'Durée de licence': '12 mois renouvelable', 'Déploiement': 'Local ou réseau', 'Utilisateurs': 'Multi-utilisateurs' },
    rating: 4.7, reviews: 16, updated: '2 septembre 2024', description: 'FM School simplifie la gestion des établissements, des inscriptions, des notes, des absences et de la communication avec les parents.', demoUrl: '#'
  },
]

const softwareCategories = [
  { label: 'Commercial', icon: BarChart3, text: 'Ventes, achats et stocks' },
  { label: 'Santé', icon: BadgeCheck, text: 'Cabinets et centres de soins' },
  { label: 'Service', icon: Headphones, text: 'Interventions et clients' },
  { label: 'Éducation', icon: Users, text: 'Écoles et formations' }
]

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

function normalizeApiProduct(product) {
  const normalizedType = product.type?.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  const isHardware = normalizedType?.includes('materiel') || normalizedType?.includes('hardware') || normalizedType?.startsWith('mat')
  const numericPrice = Number(product.prix) || 0
  const category = product.categorie_nom || 'Tous'

  return {
    id: `db-${product.id_produit}`,
    databaseId: product.id_produit,
    kind: isHardware ? 'Matériel' : 'Logiciel',
    category,
    name: product.nom,
    price: numericPrice ? `${numericPrice.toLocaleString('fr-FR')} DA` : 'Sur devis',
    numericPrice,
    image: product.image || 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=900&q=85',
    summary: product.description || 'Produit FM Soft disponible dans notre catalogue.',
    description: product.description || 'Contactez FM Soft pour obtenir toutes les informations sur ce produit.',
    specs: [],
    technical: {
      Référence: `FM-${product.id_produit}`,
      Type: product.type,
      Quantité: product.quantite
    },
    rating: 0,
    reviews: 0,
    stock: Number(product.quantite) || 0,
    updated: product.date_mise_a_jour
      ? new Date(product.date_mise_a_jour).toLocaleDateString('fr-FR')
      : 'Non renseignée',
    demoUrl: '#'
  }
}

function Brand({ compact = false, href = '#accueil' }) {
  return <a className={`brand ${compact ? 'brand-compact' : ''}`} href={href} aria-label="FM Soft accueil">
    <img className="brand-logo" src="/fm-soft-logo.png" alt="Force Manager SOFT" />
  </a>
}

function ProductMenu() {
  const productHref = (type, category = 'Tous') => `/produits?type=${encodeURIComponent(type)}&category=${encodeURIComponent(category)}`
  return <div className="products-menu">
    <a className="products-menu-trigger" href="/produits">Produits <ChevronDown size={15} /></a>
    <div className="products-dropdown">
      <div className="products-dropdown-group">
        <strong><Package size={15} /> Matériel</strong>
        {hardwareCategories.filter((category) => category !== 'Tous').map((category) => {
          const Icon = categoryIcons[category] || Package
          return <a key={category} href={productHref('Matériel', category)}><Icon size={14} />{category}</a>
        })}
      </div>
      <div className="products-dropdown-group">
        <strong><Code2 size={15} /> Logiciel</strong>
        {softwareCategories.map(({ label }) => {
          const Icon = categoryIcons[label] || Code2
          return <a key={label} href={productHref('Logiciel', label)}><Icon size={14} />{label}</a>
        })}
      </div>
    </div>
  </div>
}

function CatalogPage({ catalogType, setCatalogType, activeCategory, setActiveCategory, hardwareCategories, softwareCategories, productsLoading, productsError, filteredProducts, openProduct, setSearch }) {
  return <section id="catalogue" className="catalog-page section">
    <div className="container">
      <div className="catalog-page-heading"><div><div className="eyebrow muted">Catalogue FM Soft</div><h1>Des solutions pour <em>chaque besoin.</em></h1><p>Choisissez une catégorie, consultez les détails et préparez votre commande.</p></div><button className="button button-outline" onClick={() => { setCatalogType('Matériel'); setActiveCategory('Tous'); setSearch('') }}>Réinitialiser les filtres</button></div>
      <div className="catalog-switcher" role="tablist" aria-label="Type de catalogue">{['Matériel', 'Logiciel'].map((type) => <button key={type} className={catalogType === type ? 'active' : ''} onClick={() => { setCatalogType(type); setActiveCategory('Tous') }}>{type === 'Matériel' ? <Package size={17} /> : <Code2 size={17} />}{type}</button>)}</div>
      <div className="category-tabs">{(catalogType === 'Matériel' ? hardwareCategories : ['Tous', ...softwareCategories.map(({ label }) => label)]).map((category) => { const Icon = categoryIcons[category] || Package; return <button key={category} className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)}><Icon size={15} />{category}</button> })}</div>
      {productsLoading && <div className="catalog-status">Chargement des produits depuis PostgreSQL...</div>}
      {productsError && <div className="catalog-status catalog-status-warning">{productsError}</div>}
      <div className="product-grid">{filteredProducts.map((product) => <article className="product-card" key={product.id} onClick={() => openProduct(product)}><div className="product-image"><img src={product.image} alt={product.name} />{product.tag && <span className="product-tag">{product.tag}</span>}<button aria-label={`Voir ${product.name}`}><ArrowRight size={17} /></button></div><div className="product-info"><div className="product-meta"><span>{product.kind}</span><span>{product.category}</span></div><h3>{product.name}</h3><p>{product.summary}</p><div className="product-rating"><span>{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={12} fill={star <= Math.round(product.rating) ? 'currentColor' : 'none'} />)}</span><small>{product.rating ? `${product.rating} (${product.reviews})` : 'Nouvel ajout'}</small></div><strong>{product.price}</strong></div></article>)}</div>
      {!productsLoading && !filteredProducts.length && <div className="empty-state"><Search size={24} /><p>Aucun produit ne correspond à votre recherche.</p></div>}
    </div>
  </section>
}

function ContactPage({ contactSent, setContactSent }) {
  return <section className="contact-page section">
    <div className="container">
      <div className="contact-page-heading">
        <div className="eyebrow muted">Contact FM Soft</div>
        <h1>Parlez-nous de votre <em>projet.</em></h1>
        <p>Un conseiller FM Soft vous répondra dans les meilleurs délais.</p>
      </div>
      <div className="contact-page-grid">
        <div className="contact-page-map">
          <div className="map-placeholder"><iframe title="Localisation FM Soft à Tizi Ouzou" src="https://www.google.com/maps?q=93+Rue+Abane+Ramdane,+Tizi+Ouzou,+Algeria,+15000&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div>
          <div className="contact-page-details">
            <a href="mailto:fmsoft.infos@gmail.com"><Mail size={18} /><span><small>Email</small><b>fmsoft.infos@gmail.com</b></span></a>
            <a href="tel:+213791197842"><Phone size={18} /><span><small>Téléphone</small><b>+213 (0) 791 19 78 42</b></span></a>
            <div><MapPin size={18} /><span><small>Adresse</small><b>93 Rue Abane Ramdane<br />Tizi Ouzou, Algeria, 15000</b></span></div>
          </div>
        </div>
        <form className="contact-form contact-page-form" onSubmit={(event) => { event.preventDefault(); setContactSent(true) }}>
          <div className="form-row"><label>Votre nom<input required placeholder="Nom et prénom" /></label><label>Téléphone<input required placeholder="+213 ..." /></label></div>
          <label>Votre adresse e-mail<input required type="email" placeholder="vous@entreprise.com" /></label>
          <label>Votre message<textarea required rows="7" placeholder="Comment pouvons-nous vous aider ?" /></label>
          <button className="button button-primary" type="submit">{contactSent ? <>Message envoyé <Check size={17} /></> : <>Envoyer le message <Send size={17} /></>}</button>
        </form>
      </div>
    </div>
  </section>
}

function App() {
  const isCatalogPage = window.location.pathname === '/produits'
  const isContactPage = window.location.pathname === '/contact'
  const catalogParams = new URLSearchParams(window.location.search)
  const catalogTypeFromUrl = catalogParams.get('type') === 'Logiciel' ? 'Logiciel' : 'Matériel'
  const categoryFromUrl = catalogParams.get('category') || 'Tous'
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [catalogType, setCatalogType] = useState(catalogTypeFromUrl)
  const [activeCategory, setActiveCategory] = useState(categoryFromUrl)
  const [search, setSearch] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [productQuantity, setProductQuantity] = useState(1)
  const [favorites, setFavorites] = useState([])
  const [catalogProducts, setCatalogProducts] = useState(products)
  const [productsLoading, setProductsLoading] = useState(true)
  const [productsError, setProductsError] = useState('')
  const [contactSent, setContactSent] = useState(false)

  useEffect(() => {
    document.body.style.overflow = drawerOpen || cartOpen || selectedProduct ? 'hidden' : ''
    const escape = (event) => event.key === 'Escape' && (setDrawerOpen(false), setCartOpen(false), setSelectedProduct(null))
    window.addEventListener('keydown', escape)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', escape) }
  }, [drawerOpen, cartOpen, selectedProduct])

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products`)
        if (!response.ok) throw new Error('Impossible de charger les produits.')
        const data = await response.json()
        setCatalogProducts(data.map(normalizeApiProduct))
        setProductsError('')
      } catch (error) {
        setProductsError('Le catalogue en ligne est indisponible. Les produits de démonstration sont affichés.')
      } finally {
        setProductsLoading(false)
      }
    }

    loadProducts()
  }, [])

  const filteredProducts = useMemo(() => catalogProducts.filter((product) => {
    if (product.category === 'Sécurité & antivirus') return false
    const categoryMatch = activeCategory === 'Tous' || product.category === activeCategory
    const typeMatch = product.kind === catalogType
    return typeMatch && categoryMatch && `${product.name} ${product.summary}`.toLowerCase().includes(search.toLowerCase())
  }), [activeCategory, catalogProducts, catalogType, search])

  const addToCart = (product) => {
    setCart((current) => current.some((item) => item.id === product.id)
      ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + productQuantity } : item)
      : [...current, { ...product, quantity: productQuantity }])
    setSelectedProduct(null)
    setProductQuantity(1)
    setCartOpen(true)
  }

  const openProduct = (product) => {
    setSelectedProduct(product)
    setProductQuantity(1)
  }

  const toggleFavorite = (productId) => {
    setFavorites((current) => current.includes(productId)
      ? current.filter((id) => id !== productId)
      : [...current, productId])
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const whatsappMessage = encodeURIComponent(`Bonjour FM Soft, je souhaite commander : ${cart.map(item => `${item.name} (x${item.quantity})`).join(', ')}.`)

  const homeHref = isCatalogPage || isContactPage ? '/#accueil' : '#accueil'
  const contactHref = '/contact'
  const goToProducts = (type) => { window.location.href = type ? `/produits?type=${type}` : '/produits' }
  const quoteWhatsappUrl = `https://wa.me/213791197842?text=${encodeURIComponent('Bonjour FM Soft, je souhaite demander un devis pour vos solutions.')}`

  return <div className={`site-shell ${isCatalogPage ? 'catalog-route' : ''}`}>
    <header className="site-header">
      <div className="container nav-wrap">
        <Brand href={homeHref} />
        <nav className="desktop-nav" aria-label="Navigation principale">
          <a href={homeHref}>Accueil</a>
          <ProductMenu />
          <a href={contactHref}>Contact</a>
        </nav>
        <div className="nav-actions">
          <label className="nav-search"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Rechercher..." /></label>
          <button className="cart-button" onClick={() => setCartOpen(true)} aria-label="Ouvrir le panier"><ShoppingCart size={21} />{cartCount > 0 && <span>{cartCount}</span>}</button>
          <button className="mobile-menu" onClick={() => setDrawerOpen(true)} aria-label="Ouvrir le menu"><Menu size={24} /></button>
        </div>
      </div>
    </header>

    <main>
      {isCatalogPage && <CatalogPage catalogType={catalogType} setCatalogType={setCatalogType} activeCategory={activeCategory} setActiveCategory={setActiveCategory} hardwareCategories={hardwareCategories} softwareCategories={softwareCategories} productsLoading={productsLoading} productsError={productsError} filteredProducts={filteredProducts} openProduct={openProduct} setSearch={setSearch} />}
      {isContactPage && <ContactPage contactSent={contactSent} setContactSent={setContactSent} />}
      {!isCatalogPage && !isContactPage && <section id="accueil" className="hero">
        <div className="hero-shape hero-shape-one" /><div className="hero-shape hero-shape-two" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> Votre partenaire digital depuis 2014</div>
            <p className="hero-intro">Force Manager Soft (FM Soft) est une entreprise algérienne créée en 2014, spécialisée dans le développement de logiciels de gestion et la vente de matériel informatique. Son objectif est d’accompagner les entreprises dans leur développement en leur proposant des solutions informatiques performantes, adaptées à leurs besoins, afin de simplifier leur gestion, améliorer leur productivité et soutenir leur croissance.</p>
            <div className="hero-buttons"><button className="button button-primary" onClick={goToProducts}>Explorer nos produits <ArrowRight size={18} /></button></div>
          </div>
          <div className="hero-visual developer-visual">
            <div className="developer-photo"><img src="https://unsplash.com/photos/vpOeXr5wmR4/download?force=true&w=1200" alt="Ordinateur portable noir allumé sur une table" /></div>
          </div>
        </div>
        <div className="hero-brands"><div className="container"><span>Des outils pour chaque métier</span><div><b>COMMERCE</b><b>SANTÉ</b><b>ÉDUCATION</b><b>SERVICES</b></div></div></div>
      </section>}

      {!isCatalogPage && !isContactPage && <section id="produits" className="products-section section home-catalogue-hidden">
        <div className="container"><div className="section-heading"><div><div className="eyebrow muted">Notre catalogue</div><h2>Tout ce qu'il faut pour <em>bien gérer.</em></h2></div><p>Explorez nos solutions et trouvez l'outil adapté à votre activité.</p></div>
          <div className="catalog-switcher" role="tablist" aria-label="Type de catalogue">
            {['Matériel', 'Logiciel'].map((type) => <button key={type} className={catalogType === type ? 'active' : ''} onClick={() => { setCatalogType(type); setActiveCategory('Tous') }}><span className="switcher-icon">{type === 'Matériel' ? <Package size={17} /> : <Code2 size={17} />}</span>{type}</button>)}
          </div>
          <div className="category-tabs">{(catalogType === 'Matériel' ? hardwareCategories : ['Tous', ...softwareCategories.map(({ label }) => label)]).map((category) => { const Icon = categoryIcons[category] || Package; return <button key={category} className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)}><Icon size={15} />{category}</button> })}</div>
          {productsLoading && <div className="catalog-status">Chargement des produits depuis PostgreSQL...</div>}
          {productsError && <div className="catalog-status catalog-status-warning">{productsError}</div>}
          <div className="product-grid">{filteredProducts.map((product) => <article className="product-card" key={product.id} onClick={() => openProduct(product)}><div className="product-image"><img src={product.image} alt={product.name} />{product.tag && <span className="product-tag">{product.tag}</span>}<button aria-label={`Voir ${product.name}`}><ArrowRight size={17} /></button></div><div className="product-info"><div className="product-meta"><span>{product.kind}</span><span>{product.category}</span></div><h3>{product.name}</h3><p>{product.summary}</p><div className="product-rating"><span>{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={12} fill={star <= Math.round(product.rating) ? 'currentColor' : 'none'} />)}</span><small>{product.rating ? `${product.rating} (${product.reviews})` : 'Nouvel ajout'}</small></div><strong>{product.price}</strong></div></article>)}</div>
          {!filteredProducts.length && <div className="empty-state"><Search size={24} /><p>Aucun produit ne correspond à votre recherche.</p></div>}
          <div className="center-action"><button className="button button-outline" onClick={() => { setActiveCategory('Tous'); setSearch('') }}>Voir tous les produits <ArrowRight size={17} /></button></div>
        </div>
      </section>}

      {!isCatalogPage && !isContactPage && <><section className="business-proof"><div className="container"><div className="hero-proof"><div className="avatar-stack"><span>AM</span><span>SK</span><span>YC</span><span>+</span></div><div><strong>+1000 entreprises</strong><small>nous font confiance</small></div></div></div></section><section className="partners-section section"><div className="container"><p className="partners-intro">Nous sommes fiers d'accompagner des entreprises, établissements et institutions qui partagent notre exigence de qualité.</p><div className="partners-marquee"><div className="partners-track">{[...partnerLogos, ...partnerLogos].map((logo, index) => <div className="partner-logo" key={`${logo}-${index}`}><img src={`/references/${encodeURIComponent(logo)}`} alt={index < partnerLogos.length ? `Logo partenaire ${index + 1}` : ''} aria-hidden={index >= partnerLogos.length} /></div>)}</div></div></div></section></>}

      {!isCatalogPage && !isContactPage && <section id="contact" className="contact-section section">
        <div className="container contact-combined">
          <div className="map-card home-map-card">
            <div className="map-placeholder"><iframe title="Localisation FM Soft à Tizi Ouzou" src="https://www.google.com/maps?q=93+Rue+Abane+Ramdane,+Tizi+Ouzou,+Algeria,+15000&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div>
            <div className="address-card"><div className="eyebrow muted">Nous contacter</div><h3>Nos coordonnées</h3><p><Mail size={17} /> fmsoft.infos@gmail.com</p><p><Phone size={17} /> +213 (0) 791 19 78 42</p><p><MapPin size={17} /> 93 Rue Abane Ramdane<br />Tizi Ouzou, Algeria, 15000</p><a className="arrow-link" href="https://www.google.com/maps/search/?api=1&query=93+Rue+Abane+Ramdane,+Tizi+Ouzou,+Algeria,+15000" target="_blank" rel="noreferrer">Ouvrir dans Google Maps <ArrowRight size={16} /></a></div>
          </div>
        </div>
      </section>}

    </main>

    <footer className="footer"><div className="container footer-main"><div><Brand compact href={homeHref} /><p>Des solutions simples et fiables pour faire grandir votre activité.</p><div className="socials"><a href="#footer" aria-label="Facebook"><Facebook size={17} /></a><a href="#footer" aria-label="Instagram"><Instagram size={17} /></a><a href="#footer" aria-label="Youtube"><Youtube size={17} /></a></div></div><div><h4>Navigation</h4><a href={homeHref}>Accueil</a><a href="/produits">Produits</a><a href={contactHref}>Contact</a></div><div>    <h4>Nos solutions</h4><a href="/produits?type=Logiciel">Logiciels de gestion</a><a href="/produits">Matériel informatique</a><a href={quoteWhatsappUrl} target="_blank" rel="noreferrer">Demander un devis</a><a href={contactHref}>Support client</a></div><div><h4>Contact</h4><a href="
      0791 19 78 42"><Phone size={15} /> +213 (0) 791 19 78 42</a><a href="fmsoft.infos@gmail.com"><Mail size={15} /> fmsoft.infos@gmail.com </a><span className="footer-address"><MapPin size={15} /> 93 Rue Abane Ramdane , Tizi Ouzou, Algeria, 15000</span></div></div><div className="container footer-bottom"><span>© 2024 Force Manager SOFT. Tous droits réservés.</span><span>Conçu avec soin pour les professionnels.</span></div></footer>

    <div className={`overlay ${drawerOpen || cartOpen || selectedProduct ? 'visible' : ''}`} onClick={() => { setDrawerOpen(false); setCartOpen(false); setSelectedProduct(null) }} />
    <aside className={`drawer menu-drawer ${drawerOpen ? 'open' : ''}`}><div className="drawer-head"><Brand compact href={homeHref} /><button onClick={() => setDrawerOpen(false)} aria-label="Fermer le menu"><X /></button></div><div className="drawer-links"><a href={homeHref} onClick={() => setDrawerOpen(false)}>Accueil</a><button className="drawer-main-link" onClick={() => { setCatalogType('Matériel'); setActiveCategory('Tous'); setDrawerOpen(false); goToProducts() }}>Tous les produits <ChevronRight size={18} /></button><button className="drawer-main-link" onClick={() => { setCatalogType('Matériel'); setActiveCategory('Tous'); setDrawerOpen(false); goToProducts('Matériel') }}>Matériel <ChevronRight size={18} /></button><div className="drawer-group"><span>Logiciels</span>{softwareCategories.map(({ label }) => <button key={label} onClick={() => { setCatalogType('Logiciel'); setActiveCategory(label); setDrawerOpen(false); goToProducts('Logiciel') }}>{label}<ChevronRight size={16} /></button>)}</div><a href={contactHref} onClick={() => setDrawerOpen(false)}>Contact</a></div><div className="drawer-note"><CircleHelp size={18} /><span>Besoin d'aide ?<b>Parler à un conseiller</b></span></div></aside>

    <aside className={`drawer cart-drawer ${cartOpen ? 'open' : ''}`}><div className="drawer-head"><div><div className="eyebrow muted">Votre sélection</div><h3>Mon panier <span>{cartCount}</span></h3></div><button onClick={() => setCartOpen(false)} aria-label="Fermer le panier"><X /></button></div>{cart.length ? <><div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.id}><img src={item.image} alt="" /><div><b>{item.name}</b><small>{item.price}</small><div className="quantity"><button onClick={() => setCart(cart.map((cartItem) => cartItem.id === item.id ? { ...cartItem, quantity: Math.max(1, cartItem.quantity - 1) } : cartItem))}>−</button><span>{item.quantity}</span><button onClick={() => setCart(cart.map((cartItem) => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem))}>+</button></div></div><button className="remove-item" onClick={() => setCart(cart.filter((cartItem) => cartItem.id !== item.id))}><X size={15} /></button></div>)}</div><div className="cart-footer"><p><span>Total estimé</span><strong>Sur devis</strong></p><a className="button whatsapp-button" href={`https://wa.me/213550000000?text=${whatsappMessage}`} target="_blank" rel="noreferrer"><Send size={17} /> Commander via WhatsApp</a><small>Votre demande sera transmise directement à notre équipe.</small></div></> : <div className="cart-empty"><ShoppingCart size={35} /><h3>Votre panier est vide</h3><p>Ajoutez un produit pour préparer votre demande de commande.</p><button className="button button-primary" onClick={() => { setCartOpen(false); goToProducts() }}>Voir les produits</button></div>}</aside>

    {selectedProduct && <div className="product-modal">
      <button className="modal-close" onClick={() => setSelectedProduct(null)} aria-label="Fermer la fiche"><X /></button>
      <div className="modal-image"><img src={selectedProduct.image} alt={selectedProduct.name} /></div>
      <div className="modal-content">
        <div className="modal-heading"><div><span className="product-meta">{selectedProduct.kind} · {selectedProduct.category}</span><h2>{selectedProduct.name}</h2></div><button className={`favorite-button ${favorites.includes(selectedProduct.id) ? 'liked' : ''}`} onClick={() => toggleFavorite(selectedProduct.id)} aria-label="Ajouter aux favoris"><Heart size={21} fill={favorites.includes(selectedProduct.id) ? 'currentColor' : 'none'} /></button></div>
        <div className="modal-rating"><span>{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={15} fill={star <= Math.round(selectedProduct.rating) ? 'currentColor' : 'none'} />)}</span><b>{selectedProduct.rating}</b><small>({selectedProduct.reviews} évaluations)</small></div>
        <p className="modal-description">{selectedProduct.description}</p>
        <div className="modal-details"><div><h4>Fiche technique</h4><dl>{Object.entries(selectedProduct.technical).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></div><div><h4>Points clés</h4><ul>{selectedProduct.specs.map((spec) => <li key={spec}><Check size={16} />{spec}</li>)}</ul></div></div>
        {selectedProduct.kind === 'Matériel' ? <div className="modal-commerce"><div className="modal-price"><small>Prix unitaire</small><strong>{selectedProduct.numericPrice.toLocaleString('fr-FR')} DA</strong><span>En stock : {selectedProduct.stock} unités</span></div><div className="quantity-control"><small>Quantité</small><div><button onClick={() => setProductQuantity((quantity) => Math.max(1, quantity - 1))}>−</button><strong>{productQuantity}</strong><button onClick={() => setProductQuantity((quantity) => Math.min(selectedProduct.stock, quantity + 1))}>+</button></div></div><div className="modal-total"><small>Total</small><strong>{(selectedProduct.numericPrice * productQuantity).toLocaleString('fr-FR')} DA</strong></div><button className="button button-primary" onClick={() => addToCart(selectedProduct)}>Ajouter au panier <ShoppingCart size={17} /></button></div> : <div className="modal-commerce software-commerce"><div className="modal-price"><small>Prix</small><strong>{selectedProduct.price}</strong><span>Dernière mise à jour : {selectedProduct.updated}</span></div><div className="modal-actions"><a className="button button-outline" href={selectedProduct.demoUrl} download><Download size={17} /> Télécharger la démo</a><a className="button whatsapp-button" href={`https://wa.me/213791197842?text=${encodeURIComponent(`Bonjour FM Soft, je souhaite demander un devis pour ${selectedProduct.name} (${selectedProduct.price}).`)}`} target="_blank" rel="noreferrer"><Send size={17} /> Demander un devis</a></div></div>}
      </div>
    </div>}
  </div>
}

export default App

createRoot(document.getElementById('root')).render(<App />)
