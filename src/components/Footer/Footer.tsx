import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-logo-codeby">CodeBy</span>
            <span className="footer-logo-franco">Franco</span>
          </div>
          <p className="footer-tagline">Desenvolvido com dedicação e código</p>
        </div>
        
        <div className="footer-info">
          <p className="footer-copyright">
            © {currentYear} Helena Franco. Todos os direitos reservados.
          </p>
          <div className="footer-links">
            <a 
              href="https://github.com/Fr4nc021" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-link"
              aria-label="GitHub"
            >
              GitHub
            </a>
            <span className="footer-separator">•</span>
            <a 
              href="https://www.linkedin.com/in/fr4nco021/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-link"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <span className="footer-separator">•</span>
            <a 
              href="https://www.instagram.com/h.franco__/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-link"
              aria-label="Instagram"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

