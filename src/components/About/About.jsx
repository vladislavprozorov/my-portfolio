// src/components/About/About.js

import React from 'react';
import { useReveal } from '../../hooks/useReveal';
import styles from './About.module.css';

// Импортируем иконки для стека
import { FaReact, FaNodeJs, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiRedux, SiCss3 } from 'react-icons/si';

// Используем BASE_URL, чтобы пути корректно работали на GitHub Pages

// Создаем массив с навыками для удобного рендеринга
const skills = [
  { name: 'React', icon: <FaReact size={30} />, level: 90 },
  { name: 'TypeScript', icon: <SiTypescript size={30} />, level: 85 },
  { name: 'Next.js', icon: <SiNextdotjs size={30} />, level: 75 },
  { name: 'Redux', icon: <SiRedux size={30} />, level: 78 },
  { name: 'Node.js', icon: <FaNodeJs size={30} />, level: 82 },
  { name: 'CSS-in-JS', icon: <SiCss3 size={30} />, level: 74 },
];

const About = () => {
const base = import.meta.env.BASE_URL;
const isAvailable = true; // переключите на false, если занятость изменится
const avail = useReveal();
const photo = useReveal();
const text = useReveal();
const timeline = useReveal();
const skillsReveal = useReveal();
return (
  <section id="about" className={styles.aboutSection} aria-labelledby="about-title">
    <div className="container">
      <h2 id="about-title" className="section-title">Обо мне</h2>
  <div ref={avail.ref} className={`${styles.availabilityRow} ${styles.reveal} ${avail.visible ? styles.revealVisible : ''}`}> 
        {isAvailable ? (
          <span className={styles.availabilityBadge} aria-label="Открыт к предложениям">
            <span className={styles.dot} aria-hidden="true" />
            <FaCheckCircle className={styles.checkIcon} aria-hidden="true" />
            Открыт к предложениям
          </span>
        ) : null}
      </div>

      <div className={styles.aboutGrid}>
        <div ref={photo.ref} className={`${styles.photoCol} ${styles.reveal} ${photo.visible ? styles.revealVisible : ''}`}>
          <div className={styles.glowWrapper}>
            <picture>
              <source 
                srcSet={`${base}okme.webp 1x, ${base}okme@2x.webp 2x`} 
                type="image/webp" 
                sizes="(max-width: 480px) 200px, (max-width: 900px) 240px, 280px" 
              />
              <img 
                src={`${base}okme.jpg`} 
                alt="Фотография Владислав Прозоров" 
                className={styles.profileImage} 
                loading="lazy"
                decoding="async"
                width={280}
                height={280}
                srcSet={`${base}okme.jpg 1x, ${base}okme@2x.jpg 2x`}
                sizes="(max-width: 480px) 200px, (max-width: 900px) 240px, 280px"
              />
            </picture>
          </div>
        </div>
  <div ref={text.ref} className={`${styles.textCol} ${styles.reveal} ${text.visible ? styles.revealVisible : ''}`}>
          <p className={styles.bio}>
            Я не просто пишу код. Я создаю опыт. Беру сложные концепции и делаю их <strong className={styles.highlight}>невероятно простыми</strong>. Интуитивными. Элегантными. Потому что технология должна быть невидимой, а результат — восхищать.
          </p>
          <div className={styles.statsRow} role="list" aria-label="Ключевые факты">
            <span role="listitem" className={styles.chip}>3+ года опыта</span>
            <span role="listitem" className={styles.chip}>15+ проектов</span>
            <span role="listitem" className={styles.chip}>React / TS / Node</span>
          </div>
          <div className={styles.ctaRow}>
            <a
              href={`${base}CV.pdf`}
              className="cta-button"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Скачать резюме PDF"
            >
              Скачать резюме
            </a>
            <a href="#contact" className={styles.ctaGhost} aria-label="Перейти к контактам">
              Связаться <FaArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

  <div ref={timeline.ref} className={`${styles.timelineFull} ${styles.reveal} ${timeline.visible ? styles.revealVisible : ''}`} aria-label="Краткая шкала опыта">
        <div className={styles.timelineItem}>
          <span className={styles.timelineDot} aria-hidden="true" />
          <div>
            <div className={styles.timelineTitle}>Frontend Engineer</div>
            <div className={styles.timelineMeta}>2022—2025 • React, TS, Next</div>
          </div>
        </div>
        <div className={styles.timelineItem}>
          <span className={styles.timelineDot} aria-hidden="true" />
          <div>
            <div className={styles.timelineTitle}>Full‑stack проекты</div>
            <div className={styles.timelineMeta}>Node.js, API, PostgreSQL</div>
          </div>
        </div>
        <div className={styles.timelineItem}>
          <span className={styles.timelineDot} aria-hidden="true" />
          <div>
            <div className={styles.timelineTitle}>Оптимизация производительности</div>
            <div className={styles.timelineMeta}>LCP/INP, бандлы, анимации</div>
          </div>
        </div>
      </div>

  <div ref={skillsReveal.ref} className={`${styles.skillsBar} ${styles.reveal} ${skillsReveal.visible ? styles.revealVisible : ''}`}>
        <h3 className={styles.skillsTitle}>Ключевые навыки</h3>
        <div className={styles.skillsRow} role="list">
          {skills.map((skill) => (
            <span key={skill.name} role="listitem" className={styles.skillPill} aria-label={`Навык: ${skill.name}`}>
              <span aria-hidden="true">{skill.icon}</span>
              <span>{skill.name}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);
};

export default About;