import { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  Users, 
  MapPin, 
  Truck, 
  CheckCircle, 
  ArrowRight, 
  ChevronRight, 
  Phone, 
  Mail, 
  Calendar, 
  Building, 
  Shield, 
  Cpu, 
  Award, 
  X, 
  Check
} from 'lucide-react';


// ==========================================================================
// 1. DATA MODELS & CONFIGURATIONS
// ==========================================================================

interface ServiceDetail {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  icon: string;
  highlights: string[];
  protocol: string;
  bestFor: string;
  turnaround: string;
}

interface BranchDetail {
  id: string;
  name: string;
  role: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  manager: string;
}

// 5 Key Service Offerings Featured in the Flyer
const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'uniforms',
    title: 'Uniform Cleaning',
    shortDesc: 'Professional care for all types of uniforms, from corporate wear to heavy-duty industrial coveralls.',
    longDesc: 'Our specialized uniform cleaning service is trusted by Qatar\'s leading corporations, factories, and schools. We understand that clean, pristine uniforms represent your brand image. We utilize automated chemical dosing to ensure consistent brightness, deep stain removal, and complete hygiene while extending the life cycle of your garments.',
    icon: 'Shield',
    highlights: ['Corporate & executive uniforms', 'Factory wear & safety coveralls', 'Medical & hospitality scrubs', 'High-visibility reflective gear'],
    protocol: 'High-temperature thermal disinfection (up to 75°C) combined with medical-grade hypoallergenic detergents to ensure absolute cleanliness.',
    bestFor: 'Factories, Hotels, Schools, Hospitals, Airlines, Security Firms',
    turnaround: '24 to 48 Hours'
  },
  {
    id: 'linens',
    title: 'Linens & Towels',
    shortDesc: 'Fresh, clean, and highly hygienic solutions for hotels, spas, salons, and hospitality clients.',
    longDesc: 'Delight your guests with fresh, soft, and sanitised linens. ROTA provides high-capacity batch washing for bedsheets, pillowcases, duvet covers, bath towels, and napkins. Our advanced flatwork ironers (Primus systems) deliver a perfectly flat, crisp finish, ensuring your tables and beds look flawless.',
    icon: 'Award',
    highlights: ['Hotel bedsheets & duvet covers', 'Thick, fluffy salon & spa towels', 'Restaurant table linens & napkins', 'Hygienic storage wrapping'],
    protocol: 'Continuous batch washing with specialized whitening agents and optical brighteners, followed by high-speed calendar ironing at 180°C for sterilization and a perfect finish.',
    bestFor: 'Hotels, Spas, Salons, Fine Dining Restaurants, Event Management',
    turnaround: 'Daily Dedicated Delivery (24 Hours)'
  },
  {
    id: 'specialized',
    title: 'Specialized Cleaning',
    shortDesc: 'Expert treatment for tough industrial stains, delicate fabrics, and complex garments.',
    longDesc: 'For garments requiring extraordinary care, ROTA\'s specialized fabric care lab is second to none. We analyze fibers and stains individually to apply the correct biological agents, eco-friendly solvents, or hand-treatment procedures, salvaging garments that other services declare un-cleanable.',
    icon: 'Cpu',
    highlights: ['Tough grease & chemical stain removal', 'Delicate silks, wools, & cachemeres', 'Wedding dresses & evening gowns', 'Flame-retardant fabric restoration'],
    protocol: 'Individual stain pre-treatment, followed by gentle, solvent-free dry wet-cleaning in computer-controlled delicate washers.',
    bestFor: 'Factories, Hotels, High-end Boutiques, Individual Executives',
    turnaround: '3 to 5 Days'
  },
  {
    id: 'industrial',
    title: 'Industrial Garments',
    shortDesc: 'Safe, durable cleaning for factory wear, protective coveralls, and high-use tactical gear.',
    longDesc: 'Industrial workers face extreme conditions, accumulating heavy grease, oil, carbon, and chemicals. ROTA utilizes heavy-duty industrial Danube washers equipped with specialized emulsifiers to strip stubborn petroleum products and oils while fully preserving the garment\'s flame-retardant and reflective safety ratings.',
    icon: 'Building',
    highlights: ['Grease-heavy coveralls & overalls', 'Protective flame-resistant wear', 'Tactical & military uniforms', 'Heavy canvas & thermal jackets'],
    protocol: 'Heavy thermal alkaline washing, pre-soaking with specialized grease cutters, and reinforced wash cycles designed for heavy canvas and denim.',
    bestFor: 'Factories, Construction Companies, Oil & Gas Refineries, Workshops',
    turnaround: '48 Hours'
  },
  {
    id: 'drycleaning',
    title: 'Dry Cleaning',
    shortDesc: 'Gentle, precise cleaning and flawless pressing for delicate, formal, and premium garments.',
    longDesc: 'Our premium dry cleaning combines 22+ years of expertise with environment-friendly cleaning technology. We ensure your suits, blazers, delicate dresses, and traditional Qatari thobes are cleaned gently, preserving their color, texture, and shape. Every garment is hand-inspected and pressed to perfection on Primus pressing systems.',
    icon: 'Clock',
    highlights: ['Corporate suits & formal jackets', 'Traditional Qatari Thobes & Abayas', 'Delicate knitwear & embroidered gowns', 'Hand-finished pressing & shaping'],
    protocol: 'Eco-friendly closed-loop dry cleaning systems using premium European solvents that are gentle on fibers and leave zero chemical odor.',
    bestFor: 'Corporate Clients, Hospitality Executives, Premium Individual Care',
    turnaround: '24 Hours / Express Available'
  }
];

// Four fully equipped branches across Qatar
const BRANCHES_DATA: BranchDetail[] = [
  {
    id: 'doha-hq',
    name: 'Doha Head Office',
    role: 'Corporate Headquarters & Logistics',
    address: 'D-Ring Road, Block 42, Doha, Qatar',
    phone: '+974 4455 1201',
    email: 'doha@rota-laundry.com',
    hours: 'Saturday – Thursday: 7:30 AM – 9:00 PM | Friday: Closed',
    manager: 'Eng. Nasser Al-Kuwari'
  },
  {
    id: 'ind-hub',
    name: 'Industrial Area Hub',
    role: 'Main Mega-Facility (2,000 sqm)',
    address: 'Street 38, Portal 501, Industrial Area, Qatar',
    phone: '+974 4488 5601',
    email: 'industrial@rota-laundry.com',
    hours: 'Open 24/7 for Commercial & Industrial Contracts',
    manager: 'Mr. Rajesh Kumar (Operations)'
  },
  {
    id: 'al-rayyan',
    name: 'Al Rayyan Branch',
    role: 'Commercial Services & Dry Cleaning Outlet',
    address: 'Al Shafi Street, Building 88, Al Rayyan, Qatar',
    phone: '+974 4477 8902',
    email: 'rayyan@rota-laundry.com',
    hours: 'Saturday – Thursday: 8:00 AM – 10:00 PM | Friday: 4:00 PM – 9:00 PM',
    manager: 'Mr. Hassan Mahmoud'
  },
  {
    id: 'al-khor',
    name: 'Al Khor Outlet',
    role: 'Northern Region Service Center',
    address: 'Al Khor Commercial Road, Block 12, Al Khor, Qatar',
    phone: '+974 4422 3403',
    email: 'alkhor@rota-laundry.com',
    hours: 'Saturday – Thursday: 8:00 AM – 9:00 PM | Friday: 4:00 PM – 9:00 PM',
    manager: 'Mr. Ibrahim Al-Jaber'
  }
];

// Custom SVGs representing the official YW / WO logo from the flyer
const LogoSVG = () => (
  <svg viewBox="0 0 100 100" width="48" height="48" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0px 2px 5px rgba(0,0,0,0.15))' }}>
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f3cd5f" />
        <stop offset="50%" stopColor="#d4af37" />
        <stop offset="100%" stopColor="#b89025" />
      </linearGradient>
    </defs>
    {/* Stylized circular "O" (Gold) */}
    <circle cx="62" cy="50" r="21" fill="none" stroke="url(#goldGrad)" strokeWidth="6" />
    
    {/* Elegant stylized letter "W" or "Y" curve (White for readability on dark backgrounds) */}
    <path 
      d="M16 28 C 21 34, 25 74, 30 74 C 35 74, 40 45, 45 45 C 50 45, 55 74, 60 74 C 65 74, 70 34, 75 28" 
      fill="none" 
      stroke="#ffffff" 
      strokeWidth="6" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    
    {/* Top gold circle dot */}
    <circle cx="62" cy="20" r="5.5" fill="url(#goldGrad)" />
  </svg>
);


function App() {
  // ==========================================================================
  // 2. STATE HOOKS & CONTROLLERS
  // ==========================================================================
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isHeaderSticky, setIsHeaderSticky] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<BranchDetail>(BRANCHES_DATA[0]);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  
  // Contact Form Inputs
  const [formName, setFormName] = useState<string>('');
  const [formCompany, setFormCompany] = useState<string>('');
  const [formService, setFormService] = useState<string>('uniforms');
  const [formPhone, setFormPhone] = useState<string>('');
  const [formMessage, setFormMessage] = useState<string>('');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Modal Form Inputs
  const [modalName, setModalName] = useState<string>('');
  const [modalCompany, setModalCompany] = useState<string>('');
  const [modalService, setModalService] = useState<string>('uniforms');
  const [modalPhone, setModalPhone] = useState<string>('');
  const [modalMessage, setModalMessage] = useState<string>('');
  const [modalStatus, setModalStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  // References for dynamic scrolling check
  const sectionRefs = {
    home: useRef<HTMLElement | null>(null),
    about: useRef<HTMLElement | null>(null),
    services: useRef<HTMLElement | null>(null),
    industries: useRef<HTMLElement | null>(null),
    equipment: useRef<HTMLElement | null>(null),
    contact: useRef<HTMLElement | null>(null)
  };

  // Preloader Timer (900ms simulation)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  // Window scroll event listener for sticky header and highlighting links
  useEffect(() => {
    const handleScroll = () => {
      // Sticky header check
      if (window.scrollY > 40) {
        setIsHeaderSticky(true);
      } else {
        setIsHeaderSticky(false);
      }

      // Intersection detection logic
      const scrollPos = window.scrollY + 120;
      
      for (const [sectionId, ref] of Object.entries(sectionRefs)) {
        if (ref.current) {
          const top = ref.current.offsetTop;
          const height = ref.current.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll helper
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    const targetRef = sectionRefs[sectionId as keyof typeof sectionRefs];
    if (targetRef.current) {
      window.scrollTo({
        top: targetRef.current.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  };

  // Form submission simulators
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone) {
      alert("Please fill out your name and phone number so we can reach you.");
      return;
    }
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
    }, 1200);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalName || !modalPhone) {
      alert("Please fill out your name and phone number.");
      return;
    }
    setModalStatus('submitting');
    setTimeout(() => {
      setModalStatus('success');
      setTimeout(() => {
        setIsQuoteModalOpen(false);
        setModalStatus('idle');
        setModalName('');
        setModalCompany('');
        setModalPhone('');
        setModalMessage('');
      }, 2000);
    }, 1200);
  };

  // Lucide helper for icons mapping
  const renderServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield': return <Shield size={24} />;
      case 'Award': return <Award size={24} />;
      case 'Cpu': return <Cpu size={24} />;
      case 'Building': return <Building size={24} />;
      default: return <Clock size={24} />;
    }
  };

  // If loading, show professional loading brand screen
  if (isLoading) {
    return (
      <div className="preloader-overlay" role="progressbar" aria-label="Loading Website">
        <div className="preloader-logo-wrap">
          <LogoSVG />
          <div className="preloader-status">ROTA LAUNDRY</div>
        </div>
        <div className="preloader-spinner"></div>
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          INDUSTRIAL GARMENT CARE EXPERTS
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ==========================================================================
         3. FLOATING GLASSMORPHISM NAV BAR
         ========================================================================== */}
      <header className={`rota-header ${isHeaderSticky ? 'sticky' : ''}`} role="banner">
        <div className="container">
          <a href="#home" className="rota-logo" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
            <LogoSVG />
            <div className="logo-text">
              <span className="logo-text-main">ROTA LAUNDRY</span>
              <span className="logo-text-sub">INDUSTRIAL & DRY CLEANING</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" role="navigation" aria-label="Main Navigation">
            <a href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a>
            <a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About Us</a>
            <a href="#services" className={`nav-link ${activeSection === 'services' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Services</a>
            <a href="#industries" className={`nav-link ${activeSection === 'industries' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('industries'); }}>Industries</a>
            <a href="#equipment" className={`nav-link ${activeSection === 'equipment' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('equipment'); }}>Technology</a>
            <a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a>
          </nav>

          {/* CTA Header Action */}
          <div className="header-action">
            <button type="button" className="btn btn-primary" onClick={() => setIsQuoteModalOpen(true)}>
              <Calendar size={16} /> REQUEST PICKUP
            </button>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button 
            type="button"
            className={`mobile-toggle ${isMobileMenuOpen ? 'open' : ''}`} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Navigation Menu Panel */}
        <div className={`mobile-nav-menu ${isMobileMenuOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Mobile Navigation">
          <a href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a>
          <a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About Us</a>
          <a href="#services" className={`nav-link ${activeSection === 'services' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Services</a>
          <a href="#industries" className={`nav-link ${activeSection === 'industries' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('industries'); }}>Industries We Serve</a>
          <a href="#equipment" className={`nav-link ${activeSection === 'equipment' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('equipment'); }}>Equipment & Tech</a>
          <a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact Us</a>
          <button 
            type="button"
            className="btn btn-primary" 
            style={{ marginTop: '20px', width: '100%' }}
            onClick={() => { setIsMobileMenuOpen(false); setIsQuoteModalOpen(true); }}
          >
            <Calendar size={16} /> REQUEST PICKUP
          </button>
        </div>
      </header>

      {/* ==========================================================================
         4. HERO SECTION
         ========================================================================== */}
      <section 
        id="home" 
        className="rota-hero" 
        ref={sectionRefs.home}
        role="region" 
        aria-label="Hero Section"
      >
        <div className="hero-glow-1"></div>
        <div className="hero-glow-2"></div>
        <div className="container">
          {/* Hero Left Content */}
          <div className="hero-content">
            <div className="badge-trust">
              <Clock size={14} style={{ marginRight: '6px' }} /> SINCE 2001 &bull; 22+ YEARS OF EXCELLENCE
            </div>
            <h1 className="hero-title">
              Industrial Laundry & <br />
              <span>Dry Cleaning Experts</span>
            </h1>
            <p className="hero-desc">
              Providing premium-quality garment care and large-scale industrial laundry solutions across Qatar. Trusted by top factories, hotels, restaurants, and hospitals for over two decades.
            </p>
            
            <div className="hero-bullets">
              <div className="bullet-item">
                <CheckCircle size={16} />
                <span>State-of-the-Art Machinery</span>
              </div>
              <div className="bullet-item">
                <CheckCircle size={16} />
                <span>Free Pick-up & Delivery</span>
              </div>
              <div className="bullet-item">
                <CheckCircle size={16} />
                <span>100+ Skilled Staff</span>
              </div>
            </div>

            <div className="hero-ctas">
              <button type="button" className="btn btn-primary" onClick={() => scrollToSection('contact')}>
                GET A FREE QUOTE <ArrowRight size={16} />
              </button>
              <button type="button" className="btn btn-outline-gold" onClick={() => scrollToSection('services')}>
                OUR SERVICES
              </button>
            </div>
          </div>

          {/* Hero Right Media Collage */}
          <div className="hero-collage">
            <div className="collage-bg-ring"></div>
            {/* Main Image: generated laundry professional */}
            <div className="collage-img-main">
              <img src="/staff.png" alt="Friendly laundry staff holding fresh garments" />
            </div>
            {/* Sub Image: generated industrial washing machines */}
            <div className="collage-img-sub">
              <img src="/facility.png" alt="Row of heavy-duty industrial washing machines" />
            </div>
            {/* Golden Ribbon Badge */}
            <div className="collage-badge">
              <span className="years">22+</span>
              <span className="lbl">Years in Qatar</span>
            </div>
          </div>
        </div>

        {/* Bottom wave curve divider */}
        <div className="hero-wave">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,88.43,26.85,154.06,44.78,227.61,73.83,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* ==========================================================================
         5. TRUST STATS (QUICK STATS SECTION)
         ========================================================================== */}
      <section className="rota-stats" role="region" aria-label="Company Statistics">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">
                <Calendar size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-number">Since 2001</span>
                <span className="stat-label">22+ Years Experience</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <Users size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-number">100+</span>
                <span className="stat-label">Skilled Team Staff</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <MapPin size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-number">4 Branches</span>
                <span className="stat-label">Equipped Across Qatar</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <Truck size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-number">100% Free</span>
                <span className="stat-label">Pickup & Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         6. ABOUT US SECTION
         ========================================================================== */}
      <section 
        id="about" 
        className="rota-about bg-watermark-pattern" 
        ref={sectionRefs.about}
        role="region" 
        aria-label="About Us"
      >
        <div className="container">
          <div className="about-split">
            {/* Left Graphic */}
            <div className="about-graphic-frame">
              <img src="/facility.png" alt="Industrial laundry facility with automated machinery" />
              <div className="about-badge-years">
                <div className="num">2001</div>
                <div className="lbl">Proudly Founded in Doha</div>
              </div>
            </div>

            {/* Right Information */}
            <div className="about-info-text">
              <div className="section-header" style={{ textAlign: 'left', marginBottom: '10px' }}>
                <span className="subtitle">ABOUT ROTA LAUNDRY</span>
                <h2 className="title" style={{ fontSize: '32px' }}>Qatar\'s Leading Industrial Fabric Care Experts</h2>
              </div>
              
              <p className="about-tagline">
                "We provide commercial scale, absolute hygiene, and pristine finishing that reflects our clients' professional reputation."
              </p>

              <p className="about-main-desc">
                For over 22 years, ROTA Industrial Laundry & Dry Cleaning has been a cornerstone of commercial garment care in Qatar. Starting with a single branch, we have expanded to **four state-of-the-art facilities** driven by a dedicated workforce of **100+ trained laundry professionals**.
              </p>
              
              <p className="about-main-desc">
                Our operations combine rigorous biological disinfection processes with energy-efficient European washing and pressing technologies. From corporate hospitality linens to grease-heavy oilfield safety coveralls, we consistently deliver a high-quality finish, fast turnaround times, and seamless door-to-door logistics.
              </p>

              {/* Core Values Bullets */}
              <div className="about-values-grid">
                <div className="value-item-box">
                  <Check size={18} style={{ color: 'var(--color-accent-gold-dark)' }} />
                  <div className="value-item-info">
                    <h4>Premium Hygiene Standards</h4>
                    <p>Thermal disinfection protocols matching strict hospitality and industrial requirements.</p>
                  </div>
                </div>
                <div className="value-item-box">
                  <Check size={18} style={{ color: 'var(--color-accent-gold-dark)' }} />
                  <div className="value-item-info">
                    <h4>Fast & Consistent Turnaround</h4>
                    <p>Optimized logistics and massive plant capacity to guarantee zero business delay.</p>
                  </div>
                </div>
                <div className="value-item-box">
                  <Check size={18} style={{ color: 'var(--color-accent-gold-dark)' }} />
                  <div className="value-item-info">
                    <h4>State-of-the-Art Tech</h4>
                    <p>Danube washers, Speed Queen dryers, and high-efficiency Primus ironers.</p>
                  </div>
                </div>
                <div className="value-item-box">
                  <Check size={18} style={{ color: 'var(--color-accent-gold-dark)' }} />
                  <div className="value-item-info">
                    <h4>Eco-Friendly Solvents</h4>
                    <p>Biodegradable chemicals and closed-loop filtration to protect Qatar\'s environment.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         7. SERVICES SECTION
         ========================================================================== */}
      <section 
        id="services" 
        className="rota-services" 
        ref={sectionRefs.services}
        role="region" 
        aria-label="Services Offered"
      >
        <div className="container">
          <div className="section-header">
            <span className="subtitle">WHAT WE DO</span>
            <h2 className="title">Specialized Commercial Services</h2>
            <p className="description">
              Explore our comprehensive range of commercial laundry and dry cleaning solutions tailored to meet the scale and standards of Qatari enterprises.
            </p>
          </div>

          <div className="services-grid">
            {SERVICES_DATA.map((service) => (
              <div 
                key={service.id} 
                className="service-card"
                onClick={() => setSelectedService(service)}
                role="button"
                tabIndex={0}
                aria-label={`Learn more about ${service.title}`}
                onKeyDown={(e) => { if (e.key === 'Enter') setSelectedService(service); }}
              >
                <div className="icon-wrap">
                  {renderServiceIcon(service.icon)}
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.shortDesc}</p>
                
                <ul className="service-features-list">
                  {service.highlights.slice(0, 2).map((hl, idx) => (
                    <li key={idx}>
                      <CheckCircle size={14} />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>

                <span className="service-more-btn">
                  DETAILS & PROTOCOL <ChevronRight size={14} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
         8. INDUSTRIES WE SERVE
         ========================================================================== */}
      <section 
        id="industries" 
        className="rota-industries" 
        ref={sectionRefs.industries}
        role="region" 
        aria-label="Target Industries"
      >
        <div className="container">
          <div className="section-header">
            <span className="subtitle" style={{ color: 'var(--color-accent-gold)' }}>SECTORS WE SUPPORT</span>
            <h2 className="title">Industries We Serve Across Qatar</h2>
            <p className="description">
              We deliver custom commercial laundry contracts with dedicated delivery schedules matching the operational rhythms of diverse sectors.
            </p>
          </div>

          <div className="industries-grid">
            <div className="industry-card" onClick={() => scrollToSection('contact')}>
              <div className="industry-icon-box">🏭</div>
              <span className="industry-name">Factories</span>
            </div>
            <div className="industry-card" onClick={() => scrollToSection('contact')}>
              <div className="industry-icon-box">🏨</div>
              <span className="industry-name">Hotels</span>
            </div>
            <div className="industry-card" onClick={() => scrollToSection('contact')}>
              <div className="industry-icon-box">🍽️</div>
              <span className="industry-name">Restaurants</span>
            </div>
            <div className="industry-card" onClick={() => scrollToSection('contact')}>
              <div className="industry-icon-box">🏫</div>
              <span className="industry-name">Schools</span>
            </div>
            <div className="industry-card" onClick={() => scrollToSection('contact')}>
              <div className="industry-icon-box">🏥</div>
              <span className="industry-name">Hospitals</span>
            </div>
            <div className="industry-card" onClick={() => scrollToSection('contact')}>
              <div className="industry-icon-box">💇</div>
              <span className="industry-name">Salons</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         9. EQUIPMENT & TECHNOLOGY
         ========================================================================== */}
      <section 
        id="equipment" 
        className="rota-equipment bg-watermark-pattern" 
        ref={sectionRefs.equipment}
        role="region" 
        aria-label="Equipment & Technology"
      >
        <div className="container">
          <div className="equipment-split">
            {/* Left Info */}
            <div className="equipment-info">
              <div className="section-header" style={{ textAlign: 'left', marginBottom: '10px' }}>
                <span className="subtitle">TECHNOLOGY MATTERS</span>
                <h2 className="title" style={{ fontSize: '32px' }}>Industrial Laundry Infrastructure</h2>
              </div>
              <p className="about-main-desc">
                Quality fabric care requires more than just skilled hands—it demands precision engineering. ROTA has invested heavily in world-leading laundry technology that guarantees a deep clean, fast drying, and flawless finish.
              </p>

              <div className="tech-brands">
                <div className="brand-showcase-item">
                  <div className="brand-badge-box">Danube</div>
                  <div className="brand-info-wrap">
                    <h4 className="brand-name-title">Smart Washers & Disinfection</h4>
                    <p className="brand-name-desc">Automatic detergent injection, micro-processor controlled temperatures, and eco-friendly mechanical actions that preserve garment tensile strength.</p>
                  </div>
                </div>

                <div className="brand-showcase-item">
                  <div className="brand-badge-box">Speed Queen</div>
                  <div className="brand-info-wrap">
                    <h4 className="brand-name-title">Fast Protective Dryers</h4>
                    <p className="brand-name-desc">Advanced moisture sensor technology prevents over-drying, preserving elastic waistbands, reflective safety stripes, and synthetic fiber integrity.</p>
                  </div>
                </div>

                <div className="brand-showcase-item">
                  <div className="brand-badge-box">Primus</div>
                  <div className="brand-info-wrap">
                    <h4 className="brand-name-title">Flawless Pressing Systems</h4>
                    <p className="brand-name-desc">Automated steam pressers and roller flatwork ironers that deliver perfectly flat linens and crisp, professionally creased uniforms.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Graphic */}
            <div className="equipment-graphic">
              <div className="equipment-grid-frame">
                {/* Generated image: pressing machine */}
                <div className="equip-img-card span-2">
                  <img src="/pressing.png" alt="Industrial iron and steam pressing setup in operation" />
                  <div className="equip-tag-label">
                    <span className="equip-category">Finishing Tech</span>
                    <h4 className="equip-name">Primus Steam Systems</h4>
                  </div>
                </div>
                {/* Secondary image of facility */}
                <div className="equip-img-card">
                  <img src="/facility.png" alt="Heavy duty industrial washing drums" />
                  <div className="equip-tag-label">
                    <span className="equip-category">Washing Tech</span>
                    <h4 className="equip-name">Danube Smart Washers</h4>
                  </div>
                </div>
                <div className="equip-img-card">
                  <img src="/staff.png" alt="Inspection and sorting facility" />
                  <div className="equip-tag-label">
                    <span className="equip-category">Quality Control</span>
                    <h4 className="equip-name">100% Hand Inspection</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         10. CONTACT US & BRANCHES DIRECTORY
         ========================================================================== */}
      <section 
        id="contact" 
        className="rota-contact" 
        ref={sectionRefs.contact}
        role="region" 
        aria-label="Contact and Locations"
      >
        <div className="container">
          <div className="section-header">
            <span className="subtitle">GET IN TOUCH</span>
            <h2 className="title">Request a Consultation or Pickup</h2>
            <p className="description">
              Contact our sales managers for a custom contract quote or immediately request a driver to pick up your laundry.
            </p>
          </div>

          <div className="contact-split">
            {/* Left: Contact Form Card */}
            <div className="contact-form-card">
              {formStatus === 'success' ? (
                <div className="form-success-alert">
                  <CheckCircle size={48} />
                  <h4>Thank You, Request Submitted!</h4>
                  <p>Our corporate sales manager will contact you at **{formPhone}** within 2 hours to confirm your custom contract quote or pickup schedule.</p>
                  <button type="button" className="btn btn-primary" style={{ marginTop: '16px' }} onClick={() => setFormStatus('idle')}>
                    SUBMIT ANOTHER REQUEST
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit}>
                  <h3>Enterprise Request Form</h3>
                  <p>Submit your commercial cleaning requirements below for an instant callback.</p>
                  
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label" htmlFor="form-name">FULL NAME *</label>
                      <input 
                        type="text" 
                        id="form-name"
                        className="form-control" 
                        placeholder="e.g. Nasser Al-Thani" 
                        required 
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="form-company">COMPANY / INSTITUTION</label>
                      <input 
                        type="text" 
                        id="form-company"
                        className="form-control" 
                        placeholder="e.g. Qatar Petroleum" 
                        value={formCompany}
                        onChange={(e) => setFormCompany(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="form-service">REQUIRED SERVICE *</label>
                      <select 
                        id="form-service"
                        className="form-control"
                        value={formService}
                        onChange={(e) => setFormService(e.target.value)}
                      >
                        <option value="uniforms">Uniform Cleaning</option>
                        <option value="linens">Linens & Towels</option>
                        <option value="specialized">Specialized Fabric Care</option>
                        <option value="industrial">Industrial Coveralls</option>
                        <option value="drycleaning">Executive Dry Cleaning</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="form-phone">QATAR MOBILE PHONE *</label>
                      <input 
                        type="tel" 
                        id="form-phone"
                        className="form-control" 
                        placeholder="e.g. +974 5555 4433" 
                        required 
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                      />
                    </div>
                    <div className="form-group full-width">
                      <label className="form-label" htmlFor="form-message">CLEANING REQUIREMENTS / DETAILS</label>
                      <textarea 
                        id="form-message"
                        className="form-control" 
                        placeholder="Please detail uniform counts, industry type, frequency or pickup location..."
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="form-group full-width form-submit-box">
                      <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={formStatus === 'submitting'}
                      >
                        {formStatus === 'submitting' ? 'TRANSMITTING REQUEST...' : 'SUBMIT SERVICE REQUEST'}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Right: Branch Selector & Directory */}
            <div className="branches-box">
              <h3>Our Four Equipped Branches</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-text-medium)', marginTop: '-15px' }}>
                We operate four large branches across Qatar. Select a branch below to view addresses, phone numbers, and operational roles.
              </p>

              {/* Branch Selector Tabs */}
              <div className="branch-nav-tabs" role="tablist" aria-label="Branch Locations">
                {BRANCHES_DATA.map((branch) => (
                  <button
                    key={branch.id}
                    type="button"
                    role="tab"
                    aria-selected={selectedBranch.id === branch.id}
                    aria-controls={`panel-${branch.id}`}
                    className={`branch-tab-btn ${selectedBranch.id === branch.id ? 'active' : ''}`}
                    onClick={() => setSelectedBranch(branch)}
                  >
                    {branch.name.split(' ')[0]} {branch.name.split(' ')[1] === 'Head' ? 'HQ' : ''}
                  </button>
                ))}
              </div>

              {/* Selected Branch Detail Card */}
              <div 
                id={`panel-${selectedBranch.id}`}
                role="tabpanel"
                className="branch-display-card"
              >
                <div className="branch-header-wrap">
                  <h4 className="branch-name">{selectedBranch.name}</h4>
                  <span className="branch-role-badge">{selectedBranch.role}</span>
                </div>

                <div className="branch-details-list">
                  <div className="branch-detail-item">
                    <MapPin size={20} />
                    <div className="branch-detail-info">
                      <h5>ADDRESS LOCATION</h5>
                      <p>{selectedBranch.address}</p>
                    </div>
                  </div>

                  <div className="branch-detail-item">
                    <Phone size={20} />
                    <div className="branch-detail-info">
                      <h5>TELEPHONE INQUIRIES</h5>
                      <p>{selectedBranch.phone}</p>
                    </div>
                  </div>

                  <div className="branch-detail-item">
                    <Mail size={20} />
                    <div className="branch-detail-info">
                      <h5>DIRECT EMAIL</h5>
                      <p>{selectedBranch.email}</p>
                    </div>
                  </div>

                  <div className="branch-detail-item">
                    <Clock size={20} />
                    <div className="branch-detail-info">
                      <h5>OPERATIONAL HOURS</h5>
                      <p>{selectedBranch.hours}</p>
                    </div>
                  </div>

                  <div className="branch-detail-item">
                    <Users size={20} />
                    <div className="branch-detail-info">
                      <h5>DIRECT MANAGER</h5>
                      <p>{selectedBranch.manager}</p>
                    </div>
                  </div>
                </div>

                {/* Styled Map Graphic */}
                <div className="mock-map-box">
                  <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,50 Q50,20 100,50 T200,50" fill="none" stroke="#cbd5e1" strokeWidth="2" />
                    <path d="M50,0 Q100,50 150,100" fill="none" stroke="#cbd5e1" strokeWidth="1" />
                    <circle cx="110" cy="45" r="4" fill="var(--color-accent-gold)" />
                    <circle cx="110" cy="45" r="8" fill="none" stroke="var(--color-accent-gold)" strokeWidth="1" />
                  </svg>
                  <span>📍 Click to Open Google Maps Location Pin</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         11. CORPORATE FOOTER
         ========================================================================== */}
      <footer className="rota-footer" role="contentinfo">
        <div className="container">
          <div className="footer-grid">
            {/* Footer Column 1: Brand Info */}
            <div className="footer-column">
              <div className="rota-logo" style={{ marginBottom: '10px' }}>
                <LogoSVG />
                <div className="logo-text">
                  <span className="logo-text-main" style={{ color: '#fff' }}>ROTA LAUNDRY</span>
                  <span className="logo-text-sub">ESTABLISHED 2001</span>
                </div>
              </div>
              <p className="footer-about-desc">
                Over 22 years of trusted commercial garment care and high-capacity laundry solutions across the State of Qatar. Powered by 100+ skilled staff.
              </p>
              <div className="footer-socials">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-circle-link" aria-label="Facebook">FB</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-circle-link" aria-label="Twitter">TW</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-circle-link" aria-label="LinkedIn">LN</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-circle-link" aria-label="Instagram">IG</a>
              </div>
            </div>

            {/* Footer Column 2: Navigation Links */}
            <div className="footer-column">
              <h4>QUICK LINKS</h4>
              <ul className="footer-links-list">
                <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home Page</a></li>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About Company</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Cleaning Services</a></li>
                <li><a href="#industries" onClick={(e) => { e.preventDefault(); scrollToSection('industries'); }}>Industries We Serve</a></li>
                <li><a href="#equipment" onClick={(e) => { e.preventDefault(); scrollToSection('equipment'); }}>Technology & Machines</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Get a Quote</a></li>
              </ul>
            </div>

            {/* Footer Column 3: Corporate Services */}
            <div className="footer-column">
              <h4>SERVICES</h4>
              <ul className="footer-links-list">
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Uniform Cleaning</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Linens & Towels Laundry</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Industrial Garments Care</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Executive Dry Cleaning</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Specialized Biological Sanitization</a></li>
              </ul>
            </div>

            {/* Footer Column 4: Contact details */}
            <div className="footer-column">
              <h4>DOHA CONTACTS</h4>
              <ul className="footer-contacts-list">
                <li>
                  <MapPin size={18} />
                  <span>D-Ring Road HQ, Doha, Qatar</span>
                </li>
                <li>
                  <Phone size={18} />
                  <span>+974 4455 1201</span>
                </li>
                <li>
                  <Mail size={18} />
                  <span>info@rota-laundry.com</span>
                </li>
                <li>
                  <Clock size={18} />
                  <span>Logistics Operates 24/7</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom Bar */}
          <div className="footer-bottom-bar">
            <div>
              &copy; {new Date().getFullYear()} ROTA Industrial Laundry & Dry Cleaning. All Rights Reserved.
            </div>
            
            {/* Trust Accreditation Badges */}
            <div className="footer-certifications">
              <span className="cert-badge">Since 2001</span>
              <span className="cert-badge">ISO 9001 Mock</span>
              <span className="cert-badge">Green Wash Certified</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ==========================================================================
         12. FLOATING CALL-TO-ACTION (PICKUP WIDGET)
         ========================================================================== */}
      <button 
        type="button"
        className="btn btn-primary"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: '90',
          boxShadow: '0 8px 30px rgba(212,175,55,0.4)',
          borderRadius: '50px',
          padding: '12px 24px',
          fontSize: '14px'
        }}
        onClick={() => setIsQuoteModalOpen(true)}
      >
        <Truck size={16} /> REQUEST PICKUP
      </button>

      {/* ==========================================================================
         13. DYNAMIC SERVICES DETAIL MODAL
         ========================================================================== */}
      {selectedService && (
        <div className="modal-overlay" onClick={() => setSelectedService(null)} role="dialog" aria-modal="true" aria-labelledby="modal-service-title">
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <button 
              type="button" 
              className="modal-close-btn" 
              onClick={() => setSelectedService(null)}
              aria-label="Close details"
            >
              <X size={16} />
            </button>
            
            <div className="modal-header-wrap">
              <div className="icon-wrap" style={{ backgroundColor: 'var(--color-accent-gold)', color: '#fff' }}>
                {renderServiceIcon(selectedService.icon)}
              </div>
              <h3 id="modal-service-title" className="modal-title">{selectedService.title}</h3>
            </div>

            <div className="modal-body">
              <p>{selectedService.longDesc}</p>

              <div>
                <h4 className="modal-subtitle">FABRIC WASHING PROTOCOL:</h4>
                <p style={{ fontSize: '13px', fontStyle: 'italic', backgroundColor: 'var(--color-bg-light)', padding: '12px', borderRadius: '4px', borderLeft: '3px solid var(--color-accent-gold-dark)' }}>
                  {selectedService.protocol}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <h4 className="modal-subtitle">BEST SUITED FOR:</h4>
                  <p style={{ fontSize: '13px', fontWeight: '600' }}>{selectedService.bestFor}</p>
                </div>
                <div>
                  <h4 className="modal-subtitle">STANDARD TURNAROUND:</h4>
                  <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-accent-gold-dark)' }}>
                    ⏱ {selectedService.turnaround}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="modal-subtitle">KEY SERVICE HIGHLIGHTS:</h4>
                <ul className="modal-list-bullets">
                  {selectedService.highlights.map((hl, idx) => (
                    <li key={idx}>
                      <CheckCircle size={14} />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                type="button" 
                className="btn btn-primary" 
                style={{ width: '100%', marginTop: '10px' }}
                onClick={() => { setSelectedService(null); setIsQuoteModalOpen(true); }}
              >
                BOOK THIS SERVICE NOW
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================================
         14. DYNAMIC PICKUP REQUEST MODAL (CTA OVERLAY)
         ========================================================================== */}
      {isQuoteModalOpen && (
        <div className="modal-overlay" onClick={() => setIsQuoteModalOpen(false)} role="dialog" aria-modal="true" aria-labelledby="modal-quote-title">
          <div className="modal-content-card" style={{ maxWidth: '500px' }} onClick={(e) => e.stopPropagation()}>
            <button 
              type="button" 
              className="modal-close-btn" 
              onClick={() => setIsQuoteModalOpen(false)}
              aria-label="Close form"
            >
              <X size={16} />
            </button>
            
            <h3 id="modal-quote-title" className="modal-title" style={{ marginBottom: '8px' }}>Request Free Pickup & Quote</h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-medium)', marginBottom: '24px' }}>
              Fill in your contact info and our branch driver will contact you to coordinate the collection.
            </p>

            {modalStatus === 'success' ? (
              <div className="form-success-alert" style={{ border: 'none', padding: '0' }}>
                <CheckCircle size={40} style={{ color: 'var(--color-success)' }} />
                <h4 style={{ color: 'var(--color-success)' }}>Request Transmitted!</h4>
                <p style={{ fontSize: '13px' }}>A service agent will call you shortly at **{modalPhone}** to finalize details.</p>
              </div>
            ) : (
              <form onSubmit={handleModalSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label className="form-label" htmlFor="modal-name">FULL NAME *</label>
                    <input 
                      type="text" 
                      id="modal-name"
                      className="form-control" 
                      placeholder="e.g. Eng. Hassan Al-Jaber" 
                      required 
                      value={modalName}
                      onChange={(e) => setModalName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="form-label" htmlFor="modal-company">COMPANY / INDUSTRIAL SECTOR</label>
                    <input 
                      type="text" 
                      id="modal-company"
                      className="form-control" 
                      placeholder="e.g. Doha Grand Hotel" 
                      value={modalCompany}
                      onChange={(e) => setModalCompany(e.target.value)}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label className="form-label" htmlFor="modal-service">SERVICE NEEDED *</label>
                      <select 
                        id="modal-service"
                        className="form-control"
                        value={modalService}
                        onChange={(e) => setModalService(e.target.value)}
                      >
                        <option value="uniforms">Uniform Cleaning</option>
                        <option value="linens">Linens & Towels</option>
                        <option value="specialized">Specialized Fabric Care</option>
                        <option value="industrial">Industrial Coveralls</option>
                        <option value="drycleaning">Executive Dry Cleaning</option>
                      </select>
                    </div>
                    <div>
                      <label className="form-label" htmlFor="modal-phone">PHONE NUMBER *</label>
                      <input 
                        type="tel" 
                        id="modal-phone"
                        className="form-control" 
                        placeholder="e.g. +974 5552 2331" 
                        required 
                        value={modalPhone}
                        onChange={(e) => setModalPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label" htmlFor="modal-message">ADDITIONAL COLLECTION DETAILS</label>
                    <textarea 
                      id="modal-message"
                      className="form-control" 
                      style={{ minHeight: '80px' }}
                      placeholder="Special instructions, pickup times, or bulk counts..."
                      value={modalMessage}
                      onChange={(e) => setModalMessage(e.target.value)}
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ width: '100%', padding: '14px', marginTop: '8px' }}
                    disabled={modalStatus === 'submitting'}
                  >
                    {modalStatus === 'submitting' ? 'TRANSMITTING REQUEST...' : 'BOOK FREE PICKUP NOW'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
