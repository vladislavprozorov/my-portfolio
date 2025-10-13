// Showcase (новый) — в стилистике Hero
import { useState, useEffect, useMemo, useRef } from 'react';
import styles from './Showcase.module.css'
import { useParallax } from 'react-scroll-parallax';
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, FaDocker, FaArrowDown } from 'react-icons/fa';
import { SiTypescript, SiPostgresql } from 'react-icons/si';
import { useReveal } from '../../hooks/useReveal';

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
  const [isEffectsReady, setIsEffectsReady] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(motionQuery.matches);
    const motionHandler = () => setReduceMotion(motionQuery.matches);
    if (motionQuery.addEventListener) motionQuery.addEventListener('change', motionHandler);
    else motionQuery.addListener(motionHandler);

    // Отложенное включение интенсивных эффектов (tilt/parallax)
    let idleTimer;
    const enableEffects = () => setIsEffectsReady(true);
    if (!reduceMotion) {
      // после первой тишины в 600мс включаем эффекты
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

  const headerParallax = useParallax({ speed: isMobile || reduceMotion || !isEffectsReady ? 0 : -10 });
  const haloParallax = useParallax({ speed: isMobile || reduceMotion || !isEffectsReady ? 0 : -6 });

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

        {/* Featured Project — кейс‑стади с глубиной */}
        <FeaturedCase reduceMotion={reduceMotion} />

  {/* Декоративные параллакс-иконки */}
  {!reduceMotion && isEffectsReady && (
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
              effectsReady={isEffectsReady}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Card = ({ proj, index, reduceMotion, effectsReady }) => {
  const cardRef = useRef(null);
  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);

  const onMouseMove = (e) => {
    if (reduceMotion || !effectsReady) return;
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
        transform: reduceMotion || !effectsReady
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
          className={`${styles.ctaBase} ${styles.ctaPrimary}`}
          aria-label={`Открыть GitHub проекта ${proj.title}`}
        >
          <FaGithub />
          <span>Код</span>
        </a>
        <a
          href={proj.links.live}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.ctaBase} ${styles.ctaOutline}`}
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

// --- FeaturedCase компонент ---
const FeaturedCase = ({ reduceMotion }) => {
  const caseReveal = useReveal({ disabled: reduceMotion });
  const metricsReveal = useReveal({ disabled: reduceMotion });

  // Пример реального кейса (можно заменить на ваш): Crypto Dashboard
  const liveUrl = 'https://vladislavprozorov.github.io/crypto_dashboard/';
  const caseData = {
    title: 'Кейс: Crypto Dashboard',
    problem: 'Нужно обеспечить стабильную работу real‑time дашбордов и плавный UX при обновлении данных.',
    solution: 'Оптимизировал рендер и загрузку: вынес тяжёлые виджеты под lazy/Suspense, настроил code‑splitting, оптимизировал изображения и кэширование, добавил preconnect/preload.',
    contribution: 'Спроектировал архитектуру компонентов, улучшил DX, внедрил базовые перф‑практики и подготовил проект к дальнейшим измерениям.',
    links: {
      live: liveUrl,
      github: 'https://github.com/vladislavprozorov/crypto_dashboard',
    },
    // Метрики ещё не измерялись — оставим пустым, ниже покажем "Замерить сейчас"
    results: [],
    measureLinks: {
      psi: `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(liveUrl)}`,
      wpt: `https://www.webpagetest.org/?url=${encodeURIComponent(liveUrl)}`,
      crux: `https://chromeuxreport.google/tools/compare?url=${encodeURIComponent(liveUrl)}`,
    }
  };

  const improvePct = (b, a) => Math.round(((b - a) / b) * 100);
  const sparkPoints = (before, after) => {
    const max = Math.max(before, after);
    const h = 28; // высота SVG
    const pad = 4;
    const scaleY = (v) => pad + (h - 2 * pad) * (1 - v / max); // меньше — выше
    return {
      x1: 4,
      y1: scaleY(before),
      x2: 116,
      y2: scaleY(after)
    };
  };

  return (
    <section className={styles.featuredWrap} aria-label="Featured case: подробности кейса">
      <div ref={caseReveal.ref} className={`${styles.featuredGrid} ${styles.reveal} ${caseReveal.visible ? styles.revealVisible : ''}`}>
        <div className={styles.caseText}>
          <div className={styles.caseEyebrow}>Featured Project</div>
          <h3 className={styles.caseTitle}>{caseData.title}</h3>
          <div className={styles.deltaChips}>
            {caseData.results.map((m) => (
              <span key={m.key} className={styles.deltaChip} aria-label={`Улучшение ${m.key} на ${improvePct(m.before, m.after)}%`}>
                <FaArrowDown aria-hidden /> <b>{m.key}</b> −{improvePct(m.before, m.after)}%
              </span>
            ))}
          </div>
          <dl className={styles.caseList}>
            <div>
              <dt>Проблема</dt>
              <dd>{caseData.problem}</dd>
            </div>
            <div>
              <dt>Решение</dt>
              <dd>{caseData.solution}</dd>
            </div>
            <div>
              <dt>Личный вклад</dt>
              <dd>{caseData.contribution}</dd>
            </div>
          </dl>
          <div className={styles.caseActions}>
            <a href={caseData.links.live} target="_blank" rel="noopener noreferrer" className={`${styles.ctaBase} ${styles.ctaPrimary}`} aria-label="Открыть демо кейса">
              <FaExternalLinkAlt /> <span>Демо / Репозиторий</span>
            </a>
            <a href={caseData.links.github} target="_blank" rel="noopener noreferrer" className={`${styles.ctaBase} ${styles.ctaOutline}`} aria-label="Открыть GitHub кейса">
              <FaGithub /> <span>Код</span>
            </a>
          </div>
        </div>

        <div ref={metricsReveal.ref} className={`${styles.caseMetrics} ${styles.reveal} ${metricsReveal.visible ? styles.revealVisible : ''}`} aria-label="Результаты: метрики до/после">
          {caseData.results.length > 0 ? caseData.results.map((m, idx) => {
            const max = m.before; // масштабируем относительно 'до'
            const beforeW = 100;
            const afterW = Math.max(5, (m.after / max) * 100);
            const pct = improvePct(m.before, m.after);
            const S = sparkPoints(m.before, m.after);
            return (
              <div key={m.key} className={styles.metricCard} style={{ transitionDelay: metricsReveal.visible ? `calc(var(--reveal-stagger-step) * ${idx})` : undefined }}>
                <div className={styles.metricHeader}>
                  <span className={styles.metricKey}>{m.key}</span>
                  <span className={styles.metricDelta}>↓{pct}%</span>
                </div>
                <div className={styles.metricBars}>
                  <div className={styles.barRow}>
                    <span className={styles.barLabel}>До</span>
                    <div className={styles.barTrack}>
                      <div className={`${styles.barFill} ${styles.barBefore}`} style={{ width: `${beforeW}%` }} />
                    </div>
                    <span className={styles.barValue}>{m.before}{m.unit}</span>
                  </div>
                  <div className={styles.barRow}>
                    <span className={styles.barLabel}>После</span>
                    <div className={styles.barTrack}>
                      <div className={`${styles.barFill} ${styles.barAfter}`} style={{ width: `${afterW}%` }} />
                    </div>
                    <span className={styles.barValue}>{m.after}{m.unit}</span>
                  </div>
                </div>
                <div className={styles.sparkWrap} aria-hidden>
                  <svg width="120" height="28" viewBox="0 0 120 28" className={styles.sparkline}>
                    <defs>
                      <linearGradient id="gradLine" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ef4444"/>
                        <stop offset="100%" stopColor="#22c55e"/>
                      </linearGradient>
                    </defs>
                    <path d={`M ${S.x1} ${S.y1} L ${S.x2} ${S.y2}`} stroke="url(#gradLine)" strokeWidth="2" fill="none" />
                    <circle cx={S.x1} cy={S.y1} r="3" fill="#ef4444" />
                    <circle cx={S.x2} cy={S.y2} r="3" fill="#22c55e" />
                  </svg>
                </div>
                <div className={styles.metricNote}>цель: ниже — лучше</div>
              </div>
            );
          }) : (
            <div className={styles.measurePanel}>
              <div className={styles.measureTitle}>Метрики ещё не замерялись</div>
              <p className={styles.measureText}>Открой для страницы живые отчёты и сохрани результаты в репозитории как часть кейса.</p>
              <div className={styles.measureLinks}>
                <a href={caseData.measureLinks.psi} target="_blank" rel="noopener noreferrer" className={styles.measureLink}>Lighthouse / PSI</a>
                <a href={caseData.measureLinks.wpt} target="_blank" rel="noopener noreferrer" className={styles.measureLink}>WebPageTest</a>
                <a href={caseData.measureLinks.crux} target="_blank" rel="noopener noreferrer" className={styles.measureLink}>CrUX</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
