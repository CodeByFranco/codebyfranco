import './Certificates.css'
import certificadoDesbloqueando from '../../assets/certificados/Certificado_Desbloqueando a programação.pdf'
import certificadoDiscover from '../../assets/certificados/Certificado_Discover.pdf'
import certificadoNextjs from '../../assets/certificados/Certificado_Next.js App Router e Testes.pdf'
import { useMagicBentoButton } from '../../hooks/useMagicBentoButton'

interface Certificate {
  name: string
  file: string
  description: string
  date?: string
}

function CertificateCard({ certificate }: { certificate: Certificate }) {
  const ref = useMagicBentoButton(true, 150, '59, 130, 246', true, true, true)
  
  const handleCertificateClick = () => {
    window.open(certificate.file, '_blank')
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="certificate-card"
      onClick={handleCertificateClick}
    >
      <div className="certificate-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h3 className="certificate-title">{certificate.name}</h3>
      <p className="certificate-description">{certificate.description}</p>
      {certificate.date && (
        <span className="certificate-date">{certificate.date}</span>
      )}
      <div className="certificate-arrow">→</div>
    </div>
  )
}

function Certificates() {
  const certificates: Certificate[] = [
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

  return (
    <div className="section-content certificates-section fade-in-delay-4">
      <h2 className="section-title">
        <span className="certificados-text">Certificados</span>
      </h2>
      <div className="divider-line"></div>
      
      <div className="certificates-grid">
        {certificates.map((certificate, index) => (
          <CertificateCard 
            key={index}
            certificate={certificate}
          />
        ))}
      </div>
    </div>
  )
}

export default Certificates

