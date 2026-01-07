import { useState } from 'react'
import './CodeSpace.css'
import Particles from '../../components/Particles/Particles'
import { useMagicBentoButton } from '../../hooks/useMagicBentoButton'

interface Project {
  id: number
  title: string
  subtitle: string
  status: 'completed' | 'development'
  statusText: string
  description: string
  problemSolved: string
  technologies: string[]
  link?: string
}

function CodeSpace() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const moreProjectsButtonRef = useMagicBentoButton(true, 170, '59, 130, 246', true, true, true)

  const projects: Project[] = [
    {
      id: 1,
      title: 'Auto Preenchimento de Documentos',
      subtitle: 'Aplicação Desktop',
      status: 'completed',
      statusText: 'Concluído',
      description: 'Software que automatiza o preenchimento de documentos, gerando quatro arquivos distintos a partir de uma tabela de dados. Elimina tarefas manuais repetitivas.',
      problemSolved: 'Sistema transformado em executável usando PyInstaller, testado em computadores sem Python instalado. Aumenta produtividade ao eliminar trabalho manual repetitivo.',
      technologies: ['Python', 'Automação', 'PyInstaller', 'UX'],
      link: 'https://github.com/Fr4nc021/Software-AutoPreencher-DCXs'
    },
    {
      id: 2,
      title: 'App Clube de Tiro',
      subtitle: 'Aplicativo Mobile',
      status: 'development',
      statusText: 'Em desenvolvimento',
      description: 'Aplicativo mobile para sócios de clube de tiro, com acesso a dados cadastrais, documentos oficiais fornecidos pelo clube, avisos e alertas. Alem disso tem uma aba de gestão de vencimento dos documento das Armas dos socios.',
      problemSolved: 'Todos os dias os socios precisavam solicitar declaraçãos de Filiação e participações no clube na secretaria, o que tornava a vida dos sócios mais complicada. Desta forma a informações esta na palma da sua mão.',
      technologies: ['React Native', 'Expo', 'Figma', 'UX/UI', 'Backend', 'API']
    },

    {
        id: 3,
        title: 'Pesca sem limites - Page',
        subtitle: 'Link Page / Apresentação',
        status: 'completed',
        statusText: 'Concluído',
        description: 'Página de links e apresentação de conteúdos para prestador de serviços.',
        problemSolved: 'Interface moderna e profissional para centralizar links e apresentar serviços de forma organizada. Acesso ao site da instituição, whatsapp, instagram, etc.',
        technologies: ['HTML5', 'CSS3', 'Typescript'],
        link: 'https://pagepescasemlimites.vercel.app/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnTxzqMrC5GtgFAh4ui1NSCbNVOBGn6gtls7ZKrCMtgtyFsX2MhqhVTb0bzlQ_aem_qJFddH4lJSy1OpP23-kOyw'
      },

    {
      id: 4,
      title: 'O Homem da Casa',
      subtitle: 'Link Page / Apresentação',
      status: 'completed',
      statusText: 'Concluído',
      description: 'Página de links e apresentação de conteúdos para prestador de serviços.',
      problemSolved: 'Interface moderna e profissional para centralizar links e apresentar serviços de forma organizada.',
      technologies: ['HTML5', 'CSS3', 'Typescript'],
      link: 'https://ohomemdacasa-site.vercel.app/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn5On9B_kcsSa9YjNf1MHgKtkf6bFN6t0wMLuAhGxQTnbOnkAaTwDOrwDkuxk_aem_xeXvtIjVTb86gVpnsDpP2w'
    }
  ]

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
  }

  const closeModal = () => {
    setSelectedProject(null)
  }

  return (
    <div className="codespace-section">
      <div className="codespace-background">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      
      <div className="codespace-content">
        <h2 className="codespace-title">
          <span className="codespace-text">Code</span>
          <span className="space-text"> Space</span>
        </h2>
        <div className="divider-line-formation"></div>

        <div className="codespace-workspace">
          {/* Barra de navegação */}
          <div className="codespace-navbar">
            <div className="codespace-window-controls">
              <span className="window-dot red"></span>
              <span className="window-dot yellow"></span>
              <span className="window-dot green"></span>
            </div>
            <div className="codespace-addressbar">
              <span>~/helena/code-space/</span>
            </div>
            <div className="codespace-nav-icons">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div className="codespace-layout">
            {/* Área de conteúdo */}
            <div className="codespace-main">
              <div className="projects-grid">
                {projects.map((project) => (
                  <div 
                    key={project.id} 
                    className="project-card"
                    onClick={() => handleProjectClick(project)}
                  >
                    <div className="project-card-particles">
                      <Particles
                        particleColors={['#ffffff', '#60a5fa']}
                        particleCount={50}
                        particleSpread={8}
                        speed={0.08}
                        particleBaseSize={60}
                        moveParticlesOnHover={true}
                        alphaParticles={false}
                        disableRotation={false}
                      />
                    </div>
                    <div className="project-card-content-wrapper">
                      <div className="project-card-header">
                        <span className="project-folder-icon">📁</span>
                        <span className={`project-status status-${project.status}`}>
                          {project.statusText}
                        </span>
                      </div>
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-subtitle">{project.subtitle}</p>
                      <p className="project-description">
                        {project.description}
                      </p>
                      <div className="project-tags">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <span key={index} className="tag">{tech}</span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="tag">+{project.technologies.length - 3}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Botão Mais Projetos */}
              <div className="more-projects-container">
                <button 
                  ref={moreProjectsButtonRef as React.RefObject<HTMLButtonElement>} 
                  className="menu-item more-projects-button"
                  disabled
                >
                  Mais em desenvolvimento. Divulgação em breve...
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de detalhes do projeto */}
      {selectedProject && (
        <div className="project-modal-overlay" onClick={closeModal}>
          <div className="project-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="project-modal-particles">
              <Particles
                particleColors={['#ffffff', '#60a5fa']}
                particleCount={100}
                particleSpread={10}
                speed={0.1}
                particleBaseSize={80}
                moveParticlesOnHover={true}
                alphaParticles={false}
                disableRotation={false}
              />
            </div>
            
            <button className="project-modal-close" onClick={closeModal}>×</button>
            
            <div className="project-modal-content">
              <div className="project-modal-header">
                <div className="project-modal-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="project-modal-title-section">
                  <h2 className="project-modal-title">{selectedProject.title}</h2>
                  <p className="project-modal-subtitle">{selectedProject.subtitle}</p>
                </div>
              </div>

              <div className={`project-modal-status-bar ${selectedProject.status === 'development' ? 'status-development' : ''}`}>
                <span className={`project-modal-status-icon ${selectedProject.status === 'development' ? 'status-development-icon' : ''}`}>✓</span>
                <span className="project-modal-status-text">{selectedProject.statusText}</span>
              </div>

              <div className="project-modal-sections">
                <div className="project-modal-section">
                  <h3 className="project-modal-section-title">// Descrição</h3>
                  <p className="project-modal-section-text">{selectedProject.description}</p>
                </div>

                <div className="project-modal-section">
                  <h3 className="project-modal-section-title">// Problema resolvido</h3>
                  <p className="project-modal-section-text">{selectedProject.problemSolved}</p>
                </div>

                <div className="project-modal-section">
                  <h3 className="project-modal-section-title">// Tecnologias</h3>
                  <div className="project-modal-technologies">
                    {selectedProject.technologies.map((tech, index) => (
                      <span key={index} className="project-modal-tag">{tech}</span>
                    ))}
                  </div>
                </div>

                {selectedProject.link && (
                  <div className="project-modal-section">
                    <a 
                      href={selectedProject.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-modal-link-button"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points="15 3 21 3 21 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Ver Projeto
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CodeSpace

