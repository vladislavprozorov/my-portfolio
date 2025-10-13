// src/components/About/About.js

import React from 'react';
import styles from './About.module.css';

// Импортируем иконки для стека
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiRedux, SiCss3 } from 'react-icons/si';

import me from '/okme.jpg'; // Убедитесь, что путь правильный

// Создаем массив с навыками для удобного рендеринга
const skills = [
{ name: 'React', icon: <FaReact size={30} /> },
{ name: 'TypeScript', icon: <SiTypescript size={30} /> },
{ name: 'Next.js', icon: <SiNextdotjs size={30} /> },
{ name: 'Redux', icon: <SiRedux size={30} /> },
{ name: 'Node.js', icon: <FaNodeJs size={30} /> },
{ name: 'CSS-in-JS', icon: <SiCss3 size={30} /> },
];

const About = () => {
return (
  <section id="about" className={styles.aboutSection} aria-labelledby="about-title">
    <div className="container">
      <h2 id="about-title" className="section-title">Обо мне</h2>
      <div className={styles.aboutContent}>
        <div className={styles.imageWrapper} data-aos="zoom-in" data-aos-delay="100">
          <div className={styles.glowWrapper}>
            <img 
              src={me} 
              alt="Фотография Владислав Прозоров" 
              className={styles.profileImage} 
              loading="lazy"
              decoding="async"
              width={280}
              height={280}
            />
          </div>
        </div>
        <div className={styles.textWrapper} data-aos="fade-up" data-aos-delay="150">
          <p className={styles.bio}>
            Я не просто пишу код. Я создаю опыт. Беру сложные концепции и делаю их <strong className={styles.highlight}>невероятно простыми</strong>. Интуитивными. Элегантными. Потому что технология должна быть невидимой, а результат — восхищать.
          </p>
          <h3 className={styles.skillsTitle}>Ключевые навыки:</h3>
          <div className={styles.skillsGrid} role="list">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className={styles.skillCard}
                role="listitem"
                tabIndex={0}
                aria-label={`Навык: ${skill.name}`}
              >
                <span aria-hidden="true">{skill.icon}</span>
                <span className={styles.skillLabel}>{skill.name}</span>
              </div>
            ))}
          </div>

          <div className={styles.ctaRow}>
            <a
              href="/my-portfolio/CV.pdf"
              className="cta-button"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Скачать резюме PDF"
            >
              Скачать резюме
            </a>
            <a href="#contact" className={styles.ctaGhost} aria-label="Перейти к контактам">
              Связаться
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);
};

export default About;