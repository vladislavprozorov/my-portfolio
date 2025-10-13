// Hero.jsx
import { useState, useEffect, useRef } from 'react';
import styles from './Hero.module.css';
import { TypeAnimation } from 'react-type-animation';
import { useParallax } from 'react-scroll-parallax';
import { FaGithub, FaLinkedin, FaReact, FaNodeJs, FaDocker } from 'react-icons/fa';
import { SiPostgresql, SiJavascript } from 'react-icons/si';

const ParallaxIcon = ({ children, className, speed }) => {
  const parallax = useParallax({ speed });
  return <div ref={parallax.ref} className={className}>{children}</div>;
};

const Hero = ({ forwardedRef }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isEffectsReady, setIsEffectsReady] = useState(false);
  const base = import.meta.env.BASE_URL;
  const cvpRef = useRef(null);
  const [cvpVisible, setCvpVisible] = useState(false);
  const kpiRef = useRef(null);
  const [kpiVisible, setKpiVisible] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(motionQuery.matches);
    const motionHandler = () => setReduceMotion(motionQuery.matches);
    if (motionQuery.addEventListener) motionQuery.addEventListener('change', motionHandler);
    else motionQuery.addListener(motionHandler);

    // Отложенное включение интенсивных эффектов (parallax/float)
    let idleTimer;
    const enableEffects = () => setIsEffectsReady(true);
    if (!reduceMotion) {
      if ('requestIdleCallback' in window) {
        // @ts-ignore
        requestIdleCallback(enableEffects, { timeout: 1200 });
      } else {
        idleTimer = setTimeout(enableEffects, 600);
      }
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (motionQuery.removeEventListener) motionQuery.removeEventListener('change', motionHandler);
      else motionQuery.removeListener(motionHandler);
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, []);

  const textParallax = useParallax({ speed: isMobile || reduceMotion || !isEffectsReady ? 0 : -12 });
  const haloParallax = useParallax({ speed: isMobile || reduceMotion || !isEffectsReady ? 0 : -8 });

  // Нативная анимация появления для CVP и KPI (без AOS)
  useEffect(() => {
    if (reduceMotion) {
      setCvpVisible(true);
      setKpiVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === cvpRef.current) setCvpVisible(true);
            if (entry.target === kpiRef.current) setKpiVisible(true);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );
    if (cvpRef.current) observer.observe(cvpRef.current);
    if (kpiRef.current) observer.observe(kpiRef.current);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <section ref={forwardedRef} className={styles.hero} id="hero" aria-label="Hero — краткое представление">
      <div className={`container ${styles.heroLayout}`}>
  <div ref={textParallax.ref} className={styles.heroContent}>
          {/* Halo parallax */}
          <div ref={haloParallax.ref} className={styles.halo}></div>

          <h1 className={styles.heroTitle}>
            Владислав Прозоров
            <br />
            <span>Software &amp; Engineer</span>
          </h1>

        

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

          {/* CVP: краткое ценностное предложение (native reveal) */}
          <div ref={cvpRef} className={`${styles.cvp} ${styles.reveal} ${cvpVisible ? styles.revealVisible : ''}`}>
            <p>
              Снижаю LCP до <span className={styles.kpiStrong}>&lt; 2s</span>. Ускоряю вывод фич в <span className={styles.kpiStrong}>2–3 раза</span>. <span className={styles.kpiStrong}>100% on‑time</span>.
            </p>
          </div>

          {/* KPI чипсы (native reveal + stagger) */}
          <div ref={kpiRef} className={styles.kpiRow} role="list" aria-label="Ключевые KPI">
            <span className={`${styles.kpiChip} ${styles.reveal} ${kpiVisible ? styles.revealVisible : ''}`} style={{ transitionDelay: kpiVisible ? '0ms' : '0ms' }} role="listitem">LCP &lt; 2s</span>
            <span className={`${styles.kpiChip} ${styles.reveal} ${kpiVisible ? styles.revealVisible : ''}`} style={{ transitionDelay: kpiVisible ? '90ms' : '0ms' }} role="listitem">Фичи ×2–3 быстрее</span>
            <span className={`${styles.kpiChip} ${styles.reveal} ${kpiVisible ? styles.revealVisible : ''}`} style={{ transitionDelay: kpiVisible ? '180ms' : '0ms' }} role="listitem">100% on‑time delivery</span>
          </div>

          <div className={styles.actionButtons}>
            <a
              href={`${base}CV.pdf`}
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

  <div className={styles.heroVisual} aria-hidden={isMobile}>
          <div className={styles.techCube} aria-hidden={isMobile}>
            <ParallaxIcon speed={15} className={`${styles.techIcon} ${styles.iconReact}`} isMobile={isMobile}><FaReact /></ParallaxIcon>
            <ParallaxIcon speed={5} className={`${styles.techIcon} ${styles.iconNode}`} isMobile={isMobile}><FaNodeJs /></ParallaxIcon>
            <ParallaxIcon speed={-5} className={`${styles.techIcon} ${styles.iconJs}`} isMobile={isMobile}><SiJavascript /></ParallaxIcon>
            <ParallaxIcon speed={-10} className={`${styles.techIcon} ${styles.iconPostgres}`} isMobile={isMobile}><SiPostgresql /></ParallaxIcon>
            <ParallaxIcon speed={10} className={`${styles.techIcon} ${styles.iconDocker}`} isMobile={isMobile}><FaDocker /></ParallaxIcon>
          </div>
        </div>
      </div>

      {!isMobile && !reduceMotion && isEffectsReady && (
        <a href="#projects" className={styles.scrollDown} aria-hidden="false" aria-label="Прокрутить к проектам">
          <div className={styles.mouse}><span /></div>
        </a>
      )}
    </section>
  );
};

export default Hero;
