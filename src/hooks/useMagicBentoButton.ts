import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const DEFAULT_GLOW_COLOR = '59, 130, 246';
const DEFAULT_SPOTLIGHT_RADIUS = 170;

export const useMagicBentoButton = (
  enabled: boolean = true,
  spotlightRadius: number = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor: string = DEFAULT_GLOW_COLOR,
  enableTilt: boolean = true,
  enableMagnetism: boolean = true,
  clickEffect: boolean = true
) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled || !buttonRef.current) return;

    const button = buttonRef.current as HTMLElement;
    let isHovered = false;

    // Criar spotlight global se não existir
    if (!spotlightRef.current) {
      const spotlight = document.createElement('div');
      spotlight.className = 'magic-button-spotlight';
      spotlight.style.cssText = `
        position: fixed;
        width: ${spotlightRadius * 2}px;
        height: ${spotlightRadius * 2}px;
        border-radius: 50%;
        pointer-events: none;
        background: radial-gradient(circle,
          rgba(${glowColor}, 0.15) 0%,
          rgba(${glowColor}, 0.08) 15%,
          rgba(${glowColor}, 0.04) 25%,
          rgba(${glowColor}, 0.02) 40%,
          transparent 70%
        );
        z-index: 200;
        opacity: 0;
        transform: translate(-50%, -50%);
        mix-blend-mode: screen;
      `;
      document.body.appendChild(spotlight);
      spotlightRef.current = spotlight;
    }

    const spotlight = spotlightRef.current;

    const handleMouseEnter = () => {
      isHovered = true;
      if (enableTilt) {
        gsap.to(button, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }
    };

    const handleMouseLeave = () => {
      isHovered = false;
      if (enableTilt) {
        gsap.to(button, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
      if (enableMagnetism) {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
      gsap.to(spotlight, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
      button.style.setProperty('--glow-intensity', '0');
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;

      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Spotlight follow
      gsap.to(spotlight, {
        left: e.clientX,
        top: e.clientY,
        opacity: 0.8,
        duration: 0.1,
        ease: 'power2.out'
      });

      // Border glow
      const relativeX = (x / rect.width) * 100;
      const relativeY = (y / rect.height) * 100;
      const distance = Math.hypot(x - centerX, y - centerY);
      const maxDistance = Math.hypot(centerX, centerY);
      const glowIntensity = Math.max(0, 1 - distance / (maxDistance * 0.5));

      button.style.setProperty('--glow-x', `${relativeX}%`);
      button.style.setProperty('--glow-y', `${relativeY}%`);
      button.style.setProperty('--glow-intensity', glowIntensity.toString());
      button.style.setProperty('--glow-radius', `${spotlightRadius}px`);

      // Tilt effect
      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        gsap.to(button, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }

      // Magnetism effect
      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05;
        const magnetY = (y - centerY) * 0.05;
        gsap.to(button, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;

      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      button.appendChild(ripple);

      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => ripple.remove()
        }
      );
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('click', handleClick);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('click', handleClick);
      if (spotlightRef.current && spotlightRef.current.parentNode) {
        spotlightRef.current.parentNode.removeChild(spotlightRef.current);
        spotlightRef.current = null;
      }
    };
  }, [enabled, spotlightRadius, glowColor, enableTilt, enableMagnetism, clickEffect]);

  return buttonRef;
};

