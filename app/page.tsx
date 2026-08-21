"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

const navItems = [
  { label: "About", menu: ["Overview", "Executive Leadership", "Our Services", "Meet a Partner"] },
  { label: "Who We Serve" },
  { label: "Family Office Services", menu: ["Overview", "Family Engagement", "Personal CFO", "Private Aviation", "Family Office Structuring", "Tax Services", "Global Art Management", "Philanthropy Planning"] },
  { label: "Wealth Strategy", menu: ["Overview", "Wealth Planning", "Wealth Transfer", "Global Fiduciary Services", "Family Governance & Succession"] },
  { label: "Investment Management", menu: ["Overview", "Alternative Investments"] },
  { label: "Insights" },
  { label: "Global News" },
];

const regions = ["Canada (English)", "France (Français)", "Guernsey (English)", "Israel (English)", "Jersey (English)", "Liechtenstein (English)", "Malta (English)", "Mauritius (English)", "Monaco (Français)", "South Africa (English)", "Switzerland (English)", "United Kingdom (English)", "United States (English)"];

const journeyCards = [
  { label: "ACCESS YOUR ACCOUNT", title: "Client Portal", action: "Log in now", glyph: "↗" },
  { label: "CONTINUE YOUR JOURNEY", title: "Contact Us", action: "Start a conversation", glyph: "→" },
  { label: "CONTINUE READING", title: "Insights", action: "Discover more", glyph: "↗" },
];

function Wordmark({ dark = false }: { dark?: boolean }) {
  return <a className={`wordmark ${dark ? "dark" : ""}`} href="#top" aria-label="Corient home">CORIENT<span className="wordmark-dot">•</span></a>;
}

function ArrowLink({ children, href = "#", light = false }: { children: ReactNode; href?: string; light?: boolean }) {
  return <a className={`text-link ${light ? "light" : ""}`} href={href}>{children}<span aria-hidden="true">↗</span></a>;
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { node.classList.add("is-visible"); observer.disconnect(); }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function MegaMenu({ item }: { item: (typeof navItems)[number] }) {
  if (!item.menu) return null;
  return (
    <div className="mega-menu" role="group" aria-label={`${item.label} submenu`}>
      <div className="mega-inner">
        <div className="mega-title"><span>EXPLORE</span><h3>{item.label}</h3></div>
        <div className="mega-links">
          {item.menu.map((link) => <a href="#" key={link}>{link}<span>↗</span></a>)}
        </div>
        <div className="mega-feature"><div className="mega-feature-image" /><p>Ideas, expertise and a partnership built around you.</p></div>
      </div>
    </div>
  );
}

function Header({ onRegion }: { onRegion: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  useEffect(() => { document.body.style.overflow = menuOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [menuOpen]);
  return (
    <header className="site-header" onMouseLeave={() => setActiveMenu(null)}>
      <div className="utility-bar">
        <button onClick={onRegion}>South Africa (English) <span>⌄</span></button>
        <div><a href="#contact">Contact Us</a><a href="#footer">Our Locations</a></div>
      </div>
      <div className="header-inner">
        <Wordmark />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a href={item.menu ? "#" : `#${item.label.toLowerCase().replaceAll(" ", "-")}`} key={item.label} onMouseEnter={() => setActiveMenu(item.menu ? item.label : null)} onFocus={() => setActiveMenu(item.menu ? item.label : null)}>
              {item.label}{item.menu && <span className="nav-chevron">⌄</span>}
            </a>
          ))}
        </nav>
        <div className="header-actions"><a href="#journey">Client Portal</a><a className="header-cta" href="#partner">Meet a Partner</a></div>
        <button className={`menu-toggle ${menuOpen ? "open" : ""}`} type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      </div>
      {navItems.map((item) => activeMenu === item.label && <MegaMenu item={item} key={item.label} />)}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-top"><Wordmark /><button onClick={() => setMenuOpen(false)} aria-label="Close menu">×</button></div>
        <nav>{navItems.map((item) => <a key={item.label} href="#" onClick={() => setMenuOpen(false)}><span>{item.label}</span><b>{item.menu ? "+" : "↗"}</b></a>)}</nav>
        <div className="mobile-menu-footer"><a href="#journey">Client Portal</a><a href="#partner">Meet a Partner</a><button onClick={onRegion}>South Africa (English) <span>⌄</span></button></div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <Image src="/images/hero-architecture.jpg" alt="Sculptural modern architecture" fill priority sizes="100vw" className="hero-image" />
      <div className="hero-shade" />
      <div className="hero-content page-shell">
        <div className="hero-copy">
          <p className="eyebrow light">WEALTH. WITH PURPOSE.</p>
          <h1>Redefining<br />Wealth Management</h1>
          <p className="hero-intro">At Corient, our partnership model is designed to foster true collaboration and deliver excellence. We work as one unified team with one shared goal—to bring the best of our firm to every client.</p>
          <ArrowLink href="#solutions" light>Discover Our Services</ArrowLink>
        </div>
        <div className="hero-index" aria-label="Slide 1 of 3"><span className="active">01</span><span>02</span><span>03</span></div>
      </div>
      <div className="hero-scroll">SCROLL TO DISCOVER <span>↓</span></div>
    </section>
  );
}

function SolutionsSection() {
  return (
    <section className="solutions" id="solutions">
      <Image src="/images/canyon.jpg" alt="Layered canyon landscape" fill sizes="100vw" className="solutions-image" />
      <div className="solutions-overlay" />
      <Reveal className="solutions-copy page-shell"><p className="eyebrow light">AN INTEGRATED APPROACH</p><h2>Real wealth<br />requires real<br />solutions</h2><div className="solutions-lower"><p>We break down the barriers that stand in the way of true collaboration—connecting every aspect of your financial life.</p><ArrowLink href="#partner" light>Explore Our Solutions</ArrowLink></div></Reveal>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="stats-section">
      <div className="page-shell"><p className="section-label">THE SCALE TO SERVE. THE FOCUS TO CARE.</p><div className="stats-grid">
        <Reveal className="stat"><p className="stat-number"><span>US$</span>535<span>+</span></p><p className="stat-unit">BILLION</p><p className="stat-label">IN CLIENT ASSETS</p></Reveal>
        <Reveal className="stat"><p className="stat-number">300<span>+</span></p><p className="stat-unit ghost">&nbsp;</p><p className="stat-label">PARTNERS</p></Reveal>
      </div><p className="stats-note">As of 06/30/2026. Figures reflect aggregate Corient firm data.</p></div>
    </section>
  );
}

function PartnerSection() {
  return (
    <section className="partner-section" id="partner">
      <div className="partner-backdrop"><Image src="/images/partner.jpg" alt="Contemporary private office" fill sizes="100vw" className="partner-backdrop-image" /></div>
      <div className="page-shell partner-layout">
        <Reveal className="partner-heading"><p className="eyebrow">A BETTER WAY TO WORK TOGETHER</p><h2>Meet a<br /><em>Partner</em></h2></Reveal>
        <div className="partner-photo"><Image src="/images/conversation.jpg" alt="Corient partner in conversation" fill sizes="(max-width: 768px) 90vw, 42vw" /></div>
        <Reveal className="partner-copy"><p>Our Partners are empowered to bring the best of the firm to every interaction. It means advice that is deeply personal, yet informed by the collective strength of a global team.</p><ArrowLink href="#contact">Meet a Partner</ArrowLink></Reveal>
      </div>
    </section>
  );
}

function JourneySection() {
  return (
    <section className="journey" id="journey"><div className="page-shell">
      <Reveal className="journey-header"><p className="eyebrow">CONTINUE YOUR JOURNEY</p><h2>Let’s pick up where<br />we left off</h2><p>Back for more? Explore these useful destinations and continue right where you left off.</p></Reveal>
      <div className="journey-grid">{journeyCards.map((card, i) => <a className="journey-card" href="#" key={card.title}><span className="card-index">0{i + 1}</span><span className="card-label">{card.label}</span><h3>{card.title}</h3><div><span>{card.action}</span><b>{card.glyph}</b></div></a>)}</div>
    </div></section>
  );
}

function ContactCTA() {
  return (
    <section className="contact-cta" id="contact"><div className="page-shell contact-grid"><Reveal><p className="eyebrow light">LET’S TALK</p><h2>Speak to a<br />Partner</h2></Reveal><Reveal className="contact-copy"><p>There is no substitution for a personal conversation. If you are interested in hearing more about how we can help, please get in touch and one of our experts will contact you.</p><a className="button-light" href="mailto:hello@example.com">Contact Us <span>↗</span></a></Reveal></div></section>
  );
}

function Footer({ onRegion }: { onRegion: () => void }) {
  const columns = [["About Us", "Wealth Strategy", "Family Office Services"], ["Who We Serve", "Insights", "Global News"], ["Client Portal", "Contact Us", "Our Locations"]];
  return (
    <footer className="footer" id="footer"><div className="page-shell"><div className="footer-top"><div><Wordmark /><p>We put our clients’ interests first. We focus on exceeding expectations, simplifying lives and helping establish lasting legacies.</p></div><div className="footer-links">{columns.map((column, i) => <div key={i}>{column.map((link) => <a href="#" key={link}>{link}<span>↗</span></a>)}</div>)}</div></div>
      <div className="footer-mid"><button onClick={onRegion}><span className="globe">◎</span> South Africa (English) <span>⌄</span></button><a className="back-top" href="#top">Back to top ↑</a></div>
      <div className="footer-legal"><div>{["Disclosure", "Terms of Use", "Privacy", "Accessibility", "Site Map", "Legal & Regulatory Information"].map((link) => <a href="#" key={link}>{link}</a>)}</div><p>© 2026 Corient Holdings Inc. All rights reserved</p></div>
    </div></footer>
  );
}

function RegionSelector({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div className={`region-modal ${open ? "open" : ""}`} aria-hidden={!open} role="dialog" aria-modal="true" aria-label="Select your region">
      <button className="region-backdrop" onClick={onClose} aria-label="Close region selector" />
      <div className="region-panel"><div className="region-head"><Wordmark dark /><button onClick={onClose} aria-label="Close">×</button></div><p className="eyebrow">GLOBAL PERSPECTIVE. LOCAL EXPERTISE.</p><h2>Select your region</h2><p className="region-intro">Choose your region and language to see the information most relevant to you.</p><div className="region-list">{regions.map((region) => <button className={region.startsWith("South Africa") ? "active" : ""} onClick={onClose} key={region}><span>{region}</span><b>↗</b></button>)}</div></div>
    </div>
  );
}

export default function Home() {
  const [regionOpen, setRegionOpen] = useState(false);
  useEffect(() => { if (regionOpen) document.body.style.overflow = "hidden"; else document.body.style.overflow = ""; return () => { document.body.style.overflow = ""; }; }, [regionOpen]);
  return <><Header onRegion={() => setRegionOpen(true)} /><main><Hero /><SolutionsSection /><StatsSection /><PartnerSection /><JourneySection /><ContactCTA /></main><Footer onRegion={() => setRegionOpen(true)} /><RegionSelector open={regionOpen} onClose={() => setRegionOpen(false)} /></>;
}
