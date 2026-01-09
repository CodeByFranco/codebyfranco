import './App.css'
import DarkVeil from './components/DarkVeil'
import Technologies from './sections/Technologies/Technologies'
import Formation from './sections/Formation/Formation'
import CodeSpace from './sections/codespace/CodeSpace'
import Contact from './sections/Contact/Contact'
import Footer from './components/Footer/Footer'
import { useEffect, useRef, useState } from 'react'
import { useMagicBentoButton } from './hooks/useMagicBentoButton'
import { gsap } from 'gsap'

function App() {
  const technologiesRef = useRef<HTMLDivElement>(null);
  const formationRef = useRef<HTMLDivElement>(null);
  const codeSpaceSectionRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const codeSpaceRef = useMagicBentoButton(true, 170, '59, 130, 246', true, true, true);
  const contatoRef = useMagicBentoButton(true, 170, '59, 130, 246', true, true, true);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && 
          !(event.target as HTMLElement).closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Animação de entrada do header
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const logo = header.querySelector('.logo');
    const menuButton = header.querySelector('.menu-button');

    // Estado inicial - header "fechado"
    gsap.set(header, {
      scaleX: 0,
      transformOrigin: 'center center',
      opacity: 0
    });

    if (logo) {
      gsap.set(logo, {
        opacity: 0,
        x: -50
      });
    }

    if (menuButton) {
      gsap.set(menuButton, {
        opacity: 0,
        x: 50
      });
    }

    // Animação de entrada - "abrindo" o header
    const tl = gsap.timeline({ delay: 0.3 });
    
    tl.to(header, {
      scaleX: 1,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out'
    })
    .to([logo, menuButton], {
      opacity: 1,
      x: 0,
      duration: 0.7,
      ease: 'power1.out',
      stagger: 0.15
    }, '-=0.4');

  }, []);

  // Efeito de scroll - header mais compacto
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let ticking = false;

    const updateHeader = () => {
      const scrollY = window.scrollY;
      const scrollThreshold = 100; // Começa a encolher após 100px
      const isMobile = window.innerWidth <= 768;

      const logo = header.querySelector('.logo') as HTMLElement;
      const menuButton = header.querySelector('.menu-button') as HTMLElement;

      if (scrollY > scrollThreshold) {
        // Header compacto - DIMINUINDO
        if (isMobile) {
          gsap.to(header, {
            padding: '0.5rem 0.75rem',
            top: '0.5rem',
            borderRadius: '16px',
            width: '60%',
            maxWidth: 'calc(100% - 1rem)',
            left: '50%',
            x: '-50%',
            duration: 0.15,
            ease: 'power2.out'
          });
        } else {
          gsap.to(header, {
            padding: '0.5rem 1.2rem',
            top: '1rem',
            borderRadius: '20px',
            width: '70%',
            maxWidth: '900px',
            duration: 0.15,
            ease: 'power2.out'
          });
        }

        if (logo) {
          gsap.to(logo, {
            fontSize: isMobile ? '14px' : '16px',
            duration: 0.15,
            ease: 'power2.out'
          });
        }

        if (menuButton) {
          gsap.to(menuButton, {
            padding: isMobile ? '10px' : '6px',
            scale: 1,
            duration: 0.15,
            ease: 'power2.out'
          });
        }

        header.classList.add('header-compact');
      } else {
        // Header normal - TAMANHO ORIGINAL
        if (isMobile) {
          gsap.to(header, {
            padding: '0.75rem 1rem',
            top: '1rem',
            borderRadius: '20px',
            width: 'calc(100% - 1rem)',
            maxWidth: 'none',
            left: '50%',
            x: '-50%',
            duration: 0.15,
            ease: 'power2.out'
          });
        } else {
          gsap.to(header, {
            padding: '1rem 2rem',
            top: '2.5rem',
            borderRadius: '30px',
            width: '90%',
            maxWidth: '1200px',
            duration: 0.15,
            ease: 'power2.out'
          });
        }

        if (logo) {
          gsap.to(logo, {
            fontSize: isMobile ? '18px' : '20px',
            duration: 0.15,
            ease: 'power2.out'
          });
        }

        if (menuButton) {
          gsap.to(menuButton, {
            padding: isMobile ? '10px' : '8px',
            scale: 1,
            duration: 0.15,
            ease: 'power2.out'
          });
        }

        header.classList.remove('header-compact');
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateHeader, { passive: true });
    updateHeader(); // Estado inicial

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateHeader);
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (technologiesRef.current) {
      observer.observe(technologiesRef.current);
    }
    if (formationRef.current) {
      observer.observe(formationRef.current);
    }
    if (codeSpaceSectionRef.current) {
      observer.observe(codeSpaceSectionRef.current);
    }
    if (contactSectionRef.current) {
      observer.observe(contactSectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
        <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: -1,
        overflow: 'hidden'
      }}>
        <DarkVeil
          hueShift={0}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0}
          resolutionScale={1}
        />
      </div>

      <header ref={headerRef} className="header">
        <div className="logo" onClick={() => scrollToSection(contentWrapperRef)} style={{ cursor: 'pointer' }}>
          <span className="logo-codeby">CodeBy</span>
          <span className="logo-franco">Franco</span>
        </div>
        <div className="header-menu-container" ref={menuRef}>
          <button 
            className={`menu-button ${isMenuOpen ? 'active' : ''}`} 
            aria-label="Menu"
            onClick={handleMenuToggle}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          {isMenuOpen && (
            <>
              <div 
                className="navbar-overlay" 
                onClick={() => setIsMenuOpen(false)}
              />
              <nav className="navbar-dropdown">
              <button 
                className="navbar-item"
                onClick={() => scrollToSection(contentWrapperRef)}
              >
                <span className="navbar-item-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="navbar-item-text">CodeByFranco</span>
              </button>
              <button 
                className="navbar-item"
                onClick={() => scrollToSection(technologiesRef)}
              >
                <span className="navbar-item-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="navbar-item-text">Tecnologias</span>
              </button>
              <button 
                className="navbar-item"
                onClick={() => scrollToSection(formationRef)}
              >
                <span className="navbar-item-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="navbar-item-text">Formação</span>
              </button>
              <button 
                className="navbar-item"
                onClick={() => {
                  if (formationRef.current) {
                    const certificatesSection = formationRef.current.querySelector('.certificates-section-wrapper') as HTMLElement;
                    if (certificatesSection) {
                      certificatesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      setIsMenuOpen(false);
                    }
                  }
                }}
              >
                <span className="navbar-item-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="navbar-item-text">Certificados</span>
              </button>
              <button 
                className="navbar-item"
                onClick={() => scrollToSection(codeSpaceSectionRef)}
              >
                <span className="navbar-item-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="navbar-item-text">Code Space</span>
              </button>
              </nav>
            </>
          )}
        </div>
      </header>
      
      <main className="main-content">
        <div ref={contentWrapperRef} className="content-wrapper">
          <h1 className="name-title fade-in">Helena Franco</h1>
          <div className="divider-line fade-in-delay-1"></div>
          <p className="subtitle fade-in-delay-2">CodeByFranco</p>
          <p className="description fade-in-delay-3">
            Ao longo do meu período acadêmico, busquei constantemente <span className="highlight">conhecimento fora do ambiente da faculdade</span>, investindo em cursos, projetos práticos e estudos autodidatas, com foco em desenvolvimento web e construção de soluções reais.
          </p>
          
          <div className="quick-menu fade-in-delay-3">
            <div className="menu-buttons">
              <button 
                ref={codeSpaceRef as React.RefObject<HTMLButtonElement>} 
                className="menu-item"
                onClick={() => scrollToSection(codeSpaceSectionRef)}
              >
                Code Space
              </button>
              <button 
                ref={contatoRef as React.RefObject<HTMLButtonElement>} 
                className="menu-item"
                onClick={() => window.open('https://wa.me/54991613379', '_blank')}
              >
                Contato
              </button>
            </div>
          </div>
        </div>

        <div ref={technologiesRef} className="scroll-reveal">
          <Technologies />
        </div>

        <div ref={formationRef} className="scroll-reveal">
          <Formation />
        </div>

        <div ref={codeSpaceSectionRef} className="scroll-reveal">
          <CodeSpace />
        </div>

        <div ref={contactSectionRef} className="scroll-reveal">
          <Contact />
        </div>
      </main>

      <Footer />
    </>
  )
}

export default App
