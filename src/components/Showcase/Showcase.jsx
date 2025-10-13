// Showcase (новый) — в стилистике Hero
import { useState, useEffect, useMemo, useRef } from 'react';
import styles from './Showcase.module.css'
import { useParallax } from 'react-scroll-parallax';
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, FaDocker } from 'react-icons/fa';
import { SiTypescript, SiPostgresql } from 'react-icons/si';

// Отображение иконок технологий на уровне модуля, чтобы использовать в Card
const techIcon = (name) => {
  switch (name) {
    case 'React':
      return <FaReact />;
    case 'TypeScript':
    case 'TS':
      return <SiTypescript />;
    case 'Node.js':
      return <FaNodeJs />;
    case 'PostgreSQL':
      return <SiPostgresql />;
    case 'Docker':
      return <FaDocker />;
    default:
      return null;
  }
};

const ParallaxIcon = ({ children, className, speed }) => {
  const parallax = useParallax({ speed });
  return (
    <div ref={parallax.ref} className={className} aria-hidden>
      {children}
    </div>
  );
};

const projects = [
  {
    title: '3D Портфолио',
    description:
      'Интерактивные сцены на React Three Fiber, плавные анимации и оптимизация загрузки.',
    tech: ['React', 'TypeScript', 'R3F', 'Vite'],
    links: {
      github: 'https://github.com/vladislavprozorov',
      live: '#',
    },
    icon: <FaReact />,
  },
  {
    title: 'Система аналитики',
    description:
      'Дашборды, кастомные графики и интеграции с API. Фокус на UX и доступности.',
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    links: {
      github: 'https://github.com/vladislavprozorov',
      live: '#',
    },
    icon: <FaNodeJs />,
  },
  {
    title: 'CI/CD и контейнеры',
    description:
      'Сборка, тесты, деплой. Контейнеризация и мульти-стейдж образы.',
    tech: ['Docker', 'CI/CD', 'TS'],
    links: {
      github: 'https://github.com/vladislavprozorov',
      live: '#',
    },
    icon: <FaDocker />,
  },
];

const Showcase = ({ forwardedRef }) => {
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

  const headerParallax = useParallax({ speed: isMobile || reduceMotion ? 0 : -10 });
  const haloParallax = useParallax({ speed: isMobile || reduceMotion ? 0 : -6 });

  const cards = useMemo(() => projects, []);

  return (
    <section ref={forwardedRef} id="showcase" className={styles.showcase} aria-label="Проекты и демонстрации">
      <div className={`container ${styles.layout}`}>
        <header ref={headerParallax.ref} className={styles.header}>
          <div ref={haloParallax.ref} className={styles.halo} />
          <h2 className={styles.title}>Showcase</h2>
          <p className={styles.subtitle}>
            Подборка проектов с фокусом на производительность, DX и чистую архитектуру.
          </p>
        </header>

        {/* Декоративные параллакс-иконки */}
        {!reduceMotion && (
          <>
            <ParallaxIcon speed={8} className={styles.decorationOne}>
              <FaReact />
            </ParallaxIcon>
            <ParallaxIcon speed={-6} className={styles.decorationTwo}>
              <SiTypescript />
            </ParallaxIcon>
          </>
        )}

        <div className={styles.grid} role="list">
          {cards.map((proj, i) => (
            <Card
              key={proj.title}
              proj={proj}
              index={i}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Card = ({ proj, index, reduceMotion }) => {
  const cardRef = useRef(null);
  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);

  const onMouseMove = (e) => {
    if (reduceMotion) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMx(x);
    setMy(y);
  };

  const onMouseLeave = () => {
    setMx(0);
    setMy(0);
  };

  return (
    <article
      ref={cardRef}
      role="listitem"
      className={`${styles.card} ${styles.animated}`}
      style={{
        animationDelay: `${0.08 + index * 0.12}s`,
        transform: reduceMotion
          ? undefined
          : `perspective(1000px) rotateX(${-my * 6}deg) rotateY(${mx * 6}deg) translateZ(${Math.abs(mx) * 6}px)`,
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.cardHeader}>
        <span className={styles.cardIcon} aria-hidden>
          {proj.icon}
        </span>
        <h3 className={styles.cardTitle}>{proj.title}</h3>
      </div>
      <p className={styles.cardDesc}>{proj.description}</p>
      <ul className={styles.badges} aria-label="Технологии">
        {proj.tech.map((t) => (
          <li key={t} className={styles.badge} aria-label={t} title={t}>
            <span className={styles.badgeIcon}>{techIcon(t)}</span>
            {t}
          </li>
        ))}
      </ul>
      <div className={styles.cardActions}>
        <a
          href={proj.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`cta-button ${styles.ctaPrimary}`}
          aria-label={`Открыть GitHub проекта ${proj.title}`}
        >
          <FaGithub />
          <span>Код</span>
        </a>
        <a
          href={proj.links.live}
          target="_blank"
          rel="noopener noreferrer"
          className={`cta-button ${styles.ctaOutline}`}
          aria-label={`Посмотреть демо проекта ${proj.title}`}
        >
          <FaExternalLinkAlt />
          <span>Демо</span>
        </a>
      </div>
      <div className={styles.cardGlow} aria-hidden />
    </article>
  );
};

export default Showcase;
