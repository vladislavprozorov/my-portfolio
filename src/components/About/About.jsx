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
  <section id="about" className={styles.aboutSection}>
    <div className="container">
      <h2 className="section-title">Обо мне</h2>
      <div className={styles.aboutContent}>
        <div className={styles.imageWrapper}>
          <div className={styles.glowWrapper}>
            <img 
              src={me} 
              alt="Фотография Владислав Прозоров" 
              className={styles.profileImage} 
            />
          </div>
        </div>
        <div className={styles.textWrapper}>
          <p className={styles.bio}>
            Я не просто пишу код. Я создаю опыт. Беру сложные концепции и делаю их <strong className={styles.highlight}>невероятно простыми</strong>. Интуитивными. Элегантными. Потому что технология должна быть невидимой, а результат — восхищать.
          </p>
          <h3 className={styles.skillsTitle}>Ключевые навыки:</h3>
          <div className={styles.skillsGrid}>
            {skills.map((skill) => (
              <div key={skill.name} className={styles.skillCard}>
                {skill.icon}
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
};

export default About;