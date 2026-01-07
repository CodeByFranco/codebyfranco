import { useState } from 'react'
import './Formation.css'
import certificadoDesbloqueando from '../../assets/certificados/Certificado_Desbloqueando a programação.pdf'
import certificadoDiscover from '../../assets/certificados/Certificado_Discover.pdf'
import certificadoNextjs from '../../assets/certificados/Certificado_Next.js App Router e Testes.pdf'

function Formation() {
  const [currentCertIndex, setCurrentCertIndex] = useState(0)
  const certificates = [
    {
      name: 'Desbloqueando a Programação',
      file: certificadoDesbloqueando,
      description: 'Especialização/Formação em Desbloqueando a programação - Rocketseat',
      date: '15/10/2025'
    },
    {
      name: 'Discover',
      file: certificadoDiscover,
      description: 'Formação Discover - Rocketseat',
    },
    {
      name: 'Next.js App Router e Testes',
      file: certificadoNextjs,
      description: 'Next.js App Router e Testes - Rocketseat',
    }
  ]

  const handleCertificateClick = (file: string) => {
    window.open(file, '_blank')
  }

  const handleNext = () => {
    setCurrentCertIndex((prev) => (prev + 1) % certificates.length)
  }

  const handlePrevious = () => {
    setCurrentCertIndex((prev) => (prev - 1 + certificates.length) % certificates.length)
  }
  const courses = [
    'Analise e Desenvolvimento de Sistemas (UCS - RS) -- Cursando',
    'Desenvolvimento Web (HTML, CSS, JavaScript)',
    'Node.js e criação de APIs',
    'Next.js App Router e Testes',
    'Git & GitHub',
    'Arquitetura frontend/backend'
  ]

  return (
    <div className="formation-section fade-in-delay-5">
      <h2 className="formation-title">
        <span className="formacao-text">Formação</span>
        <span className="cursos-text"> & Cursos</span>
      </h2>
      <div className="divider-line-formation"></div>
      
      <div className="formation-content">
        <div className="formation-column">
          <div className="formation-card">
            <h3 className="card-title">Cursos Realizados</h3>
            <ul className="courses-list">
              {courses.map((course, index) => (
                <li key={index} className="course-item">
                  <span className="check-icon">✓</span>
                  <span className="course-text">{course}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="formation-column">
          <div className="formation-card">
            <span className="status-comment">// status</span>
            <h3 className="card-title">Sempre em evolução</h3>
            <p className="card-text">
              Buscando novos desafios e conhecimentos constantemente com projetos reais, organizados e bem feitos. Livros e fontes de conhecimento para aprimorar meus estudos.
            </p>
          </div>
        </div>
      </div>

      <div className="certificates-section-wrapper">
        <h3 className="certificates-section-title">
          <span className="certificados-text">Certificados</span>
        </h3>
        <div className="divider-line-formation"></div>
        <div className="certificates-carousel-wrapper">
          <button 
            className="certificate-nav-button certificate-nav-prev"
            onClick={handlePrevious}
            aria-label="Certificado anterior"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <div className="certificates-stack">
            {certificates.map((cert, index) => {
              const isActive = index === currentCertIndex
              const offset = index - currentCertIndex
              return (
                <div
                  key={index}
                  className={`certificate-card-simple ${isActive ? 'active' : ''}`}
                  onClick={() => handleCertificateClick(cert.file)}
                  title={cert.name}
                  style={{
                    zIndex: certificates.length - Math.abs(offset),
                    transform: `translateX(${offset * 30}px) translateY(${Math.abs(offset) * 15}px) scale(${1 - Math.abs(offset) * 0.1}) skewY(-3deg)`,
                    opacity: Math.abs(offset) > 2 ? 0 : Math.max(0.8, 1 - Math.abs(offset) * 0.05)
                  }}
                >
                  <div className="certificate-card-content">
                    <div className="certificate-icon-small">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h4 className="certificate-title-small">{cert.name}</h4>
                    {cert.date && (
                      <span className="certificate-date-small">{cert.date}</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <button 
            className="certificate-nav-button certificate-nav-next"
            onClick={handleNext}
            aria-label="Próximo certificado"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Formation


