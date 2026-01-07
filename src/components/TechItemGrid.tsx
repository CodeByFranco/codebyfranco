import { useMagicBentoButton } from '../hooks/useMagicBentoButton'

interface TechInfo {
  name: string
  icon: string
  message: string
}

interface TechItemGridProps {
  technologies: TechInfo[]
  onTechClick: (tech: TechInfo) => void
}

function TechItem({ tech, onTechClick }: { tech: TechInfo; onTechClick: () => void }) {
  const ref = useMagicBentoButton(true, 150, '96, 165, 250', true, true, true)
  
  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className="tech-item" 
      onClick={onTechClick}
    >
      <div className="tech-icon">
        <img src={tech.icon} alt={tech.name} className="tech-svg-icon" />
      </div>
      <span className="tech-name">{tech.name}</span>
    </div>
  )
}

function TechItemGrid({ technologies, onTechClick }: TechItemGridProps) {
  return (
    <div className="technologies-grid">
      {technologies.map((tech, index) => (
        <TechItem 
          key={index}
          tech={tech} 
          onTechClick={() => onTechClick(tech)}
        />
      ))}
    </div>
  )
}

export default TechItemGrid


