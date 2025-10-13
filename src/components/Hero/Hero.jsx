// Hero.jsx
import { useState, useEffect } from 'react';
import styles from './Hero.module.css';
import { TypeAnimation } from 'react-type-animation';
import { useParallax } from 'react-scroll-parallax';
import { FaGithub, FaLinkedin, FaReact, FaNodeJs, FaDocker } from 'react-icons/fa';
import { SiPostgresql, SiJavascript } from 'react-icons/si';

const ParallaxIcon = ({ children, className, speed, isMobile }) => {
  const parallax = useParallax({ speed: isMobile ? 0 : speed });
  return <div ref={parallax.ref} className={className}>{children}</div>;
};

const Hero = ({ forwardedRef }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(motionQuery.matches);
    const motionHandler = () => setReduceMotion(motionQuery.matches);
    if (motionQuery.addEventListener) motionQuery.addEventListener('change', motionHandler);
    else motionQuery.addListener(motionHandler);

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (motionQuery.removeEventListener) motionQuery.removeEventListener('change', motionHandler);
      else motionQuery.removeListener(motionHandler);
    };
  }, []);

  const textParallax = useParallax({ speed: isMobile || reduceMotion ? 0 : -12 });
  const haloParallax = useParallax({ speed: isMobile || reduceMotion ? 0 : -8 });

  return (
    <section ref={forwardedRef} className={styles.hero} id="hero" aria-label="Hero — краткое представление">
      <div className={`container ${styles.heroLayout}`}>
        <div ref={textParallax.ref} className={styles.heroContent} data-aos="fade-right">
          {/* Halo parallax */}
          <div ref={haloParallax.ref} className={styles.halo}></div>

          <h1 className={styles.heroTitle}>
            Владислав Прозоров
            <br />
            <span>Software &amp; Engineer</span>
          </h1>

          <p className={styles.heroUSP}>Реализую идеи в стабильный и масштабируемый код</p>

          {(!reduceMotion) && (
            <TypeAnimation
  sequence={
    isMobile
      ? ['React & TypeScript', 2000, 'Server-side rendering', 2000] // коротко и ёмко
      : [
          'React, TypeScript, Performance tuning', 2000,
          'Component architecture & accessibility', 2000,
          'Server-side rendering & SEO', 2000,
        ]
  }
  wrapper="h2"
  speed={35} // чуть быстрее, чтобы не занимало много времени
  className={styles.heroSubtitleAnimated}
  repeat={Infinity}
/>
            )}

          <p className={styles.heroSubtitle}>
           Оптимизация загрузки, аккуратная архитектура и вкусный UX.
          </p>

          <div className={styles.actionButtons}>
            <a
              href="/resume.pdf"
              className={`cta-button ${styles.ctaButton}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Скачать резюме"
            >
              Скачать резюме
            </a>
            <a
              href="#projects"
              className={`cta-button ${styles.ctaButtonOutline}`}
              aria-label="Посмотреть проекты"
            >
              Мои проекты
            </a>
            <div className={styles.socialLinks} role="list" aria-label="Социальные сети">
              <a role="listitem" href="https://github.com/vladislavprozorov" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
                <FaGithub />
              </a>
              <a role="listitem" href="https://linkedin.com/in/your-username" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.heroVisual} data-aos="fade-left" data-aos-delay="200" aria-hidden={isMobile}>
          <div className={styles.techCube} aria-hidden={isMobile}>
            <ParallaxIcon speed={15} className={`${styles.techIcon} ${styles.iconReact}`} isMobile={isMobile}><FaReact /></ParallaxIcon>
            <ParallaxIcon speed={5} className={`${styles.techIcon} ${styles.iconNode}`} isMobile={isMobile}><FaNodeJs /></ParallaxIcon>
            <ParallaxIcon speed={-5} className={`${styles.techIcon} ${styles.iconJs}`} isMobile={isMobile}><SiJavascript /></ParallaxIcon>
            <ParallaxIcon speed={-10} className={`${styles.techIcon} ${styles.iconPostgres}`} isMobile={isMobile}><SiPostgresql /></ParallaxIcon>
            <ParallaxIcon speed={10} className={`${styles.techIcon} ${styles.iconDocker}`} isMobile={isMobile}><FaDocker /></ParallaxIcon>
          </div>
        </div>
      </div>

      {!isMobile && !reduceMotion && (
        <a href="#projects" className={styles.scrollDown} aria-hidden="false" aria-label="Прокрутить к проектам">
          <div className={styles.mouse}><span /></div>
        </a>
      )}
    </section>
  );
};

export default Hero;
