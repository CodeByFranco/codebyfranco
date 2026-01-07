import { useState } from 'react'
import './Technologies.css'
import TechItemGrid from '../../components/TechItemGrid'
import reactIcon from '../../assets/icons tecnologias/react.svg'
import javascriptIcon from '../../assets/icons tecnologias/javascript.svg'
import nodejsIcon from '../../assets/icons tecnologias/nodejs.svg'
import html5Icon from '../../assets/icons tecnologias/html5.svg'
import css3Icon from '../../assets/icons tecnologias/css3.svg'
import gitIcon from '../../assets/icons tecnologias/git.svg'
import nextjsIcon from '../../assets/icons tecnologias/nextjs.svg'

interface TechInfo {
  name: string
  icon: string
  message: string
}

function Technologies() {
  const [selectedTech, setSelectedTech] = useState<TechInfo | null>(null)

  const technologies: TechInfo[] = [
    { 
      name: 'HTML5', 
      icon: html5Icon,
      message: 'Uma das primeiras linguagens que aprendi, junto com CSS e JavaScript.\n\nUsei HTML para entender a estrutura das páginas, organização de conteúdo e semântica.\n\nMeu primeiro projeto foi uma página de links simples, onde aprendi como os elementos se comportam e se relacionam entre si.'
    },
    { 
      name: 'CSS3', 
      icon: css3Icon,
      message: 'Aprendi CSS junto com HTML e JavaScript, focando principalmente em estilização e layout.\n\nUsei em projetos como páginas de links, sites institucionais e landing pages.\n\nCom CSS aprendi sobre posicionamento, responsividade, animações e identidade visual dos projetos.'
    },
    { 
      name: 'JavaScript', 
      icon: javascriptIcon,
      message: 'JavaScript foi essencial para dar vida aos meus projetos.\n\nAprendi a manipular o DOM, criar interações, validar formulários e controlar eventos na página.\n\nUsei JavaScript em projetos pessoais, páginas interativas e pequenas automações para a web.'
    },
    { 
      name: 'React', 
      icon: reactIcon,
      message: 'Comecei a estudar React para criar interfaces mais organizadas e reutilizáveis.\n\nAprendi conceitos como componentes, props, estados e hooks.\n\nUtilizei React em projetos pessoais e estudos voltados para aplicações modernas e escaláveis.'
    },
    { 
      name: 'Node.js', 
      icon: nodejsIcon,
      message: 'Comecei a usar Node.js para entender o funcionamento do back-end com JavaScript.\n\nAprendi a criar scripts, trabalhar com lógica de servidor e integração com sistemas.\n\nUtilizei Node em projetos de estudo e automações, focando no aprendizado da base do back-end.'
    },
    { 
      name: 'Next.js', 
      icon: nextjsIcon,
      message: 'Estudei Next.js para aprofundar meus conhecimentos em React e aplicações modernas.\n\nAprendi sobre rotas, renderização do lado do servidor (SSR) e organização de projetos.\n\nUsei Next.js em projetos de estudo e aplicações web com foco em performance e estrutura.'
    },
    { 
      name: 'Git & GitHub', 
      icon: gitIcon,
      message: 'Aprendi Git e GitHub para versionar meus projetos e organizar meu código.\n\nUtilizo diariamente para controle de versões, criação de repositórios e publicação de projetos.\n\nGitHub é onde concentro meus projetos pessoais e minha evolução como desenvolvedora.'
    }
  ]

  const handleTechClick = (tech: TechInfo) => {
    setSelectedTech(tech)
  }

  const closeModal = () => {
    setSelectedTech(null)
  }

  return (
    <>
      <div className="section-content tecnologias-section fade-in-delay-4">
        <h2 className="section-title">
          <span className="tecnologias-text">Tecnologias</span>
          <span className="que-conheco-text"> que conheço</span>
        </h2>
        <div className="divider-line"></div>
        <TechItemGrid 
          technologies={technologies} 
          onTechClick={handleTechClick}
        />
      </div>

      {selectedTech && (
        <div className="tech-modal-overlay" onClick={closeModal}>
          <div className="tech-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="tech-modal-close" onClick={closeModal}>×</button>
            <div className="tech-modal-header">
              <div className="tech-modal-icon">
                <img src={selectedTech.icon} alt={selectedTech.name} className="tech-modal-svg-icon" />
              </div>
              <h3 className="tech-modal-title">{selectedTech.name}</h3>
            </div>
            <div className="tech-modal-body">
              <div className="tech-modal-message">
                {selectedTech.message.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Technologies

