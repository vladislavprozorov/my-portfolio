// src/components/Hero/Hero.jsx (Финальная версия)

import styles from './Hero.module.css';
import { TypeAnimation } from 'react-type-animation';
import { useParallax } from 'react-scroll-parallax';

// Иконки
import { FaGithub, FaLinkedin, FaReact, FaNodeJs, FaDocker } from 'react-icons/fa';
import { SiPostgresql, SiJavascript } from 'react-icons/si';

const Hero = () => {
    // Параллакс для левого блока с текстом
    const textParallax = useParallax({ speed: -15 });
    // НОВОЕ: Отдельный параллакс для правого визуального блока.
    // Положительное значение заставит его двигаться в другую сторону, усиливая эффект!
    const visualParallax = useParallax({ speed: 5 });

    return (
        <section className={styles.hero} id="hero">
            <div className={`container ${styles.heroLayout}`}>
                
                {/* Левая колонка с текстом */}
                <div ref={textParallax.ref} className={styles.heroContent} data-aos="fade-right">
                    <h1 className={styles.heroTitle}>
                        Привет, я <span>Влад</span> 👋
                    </h1>
                    <TypeAnimation
                        sequence={[ 'Fullstack Developer']}
                        wrapper="h2" speed={50}
                        className={styles.heroSubtitleAnimated}
                        repeat={Infinity}
                    />
                    <p className={styles.heroSubtitle}>
                        Создаю элегантные и производительные веб-решения от фронтенда до бэкенда.
                    </p>
                    <div className={styles.actionButtons}>
                        {/* ... твои кнопки и ссылки ... */}
                    </div>
                </div>
                
                {/* НОВОЕ: Правая колонка с визуальным блоком */}
                <div ref={visualParallax.ref} className={styles.heroVisual} data-aos="fade-left" data-aos-delay="200">
                    <div className={styles.techCube}>
                        {/* Здесь мы "разбрасываем" иконки технологий */}
                        <div className={`${styles.techIcon} ${styles.iconReact}`}> <FaReact /> </div>
                        <div className={`${styles.techIcon} ${styles.iconNode}`}> <FaNodeJs /> </div>
                        <div className={`${styles.techIcon} ${styles.iconJs}`}> <SiJavascript /> </div>
                        <div className={`${styles.techIcon} ${styles.iconPostgres}`}> <SiPostgresql /> </div>
                        <div className={`${styles.techIcon} ${styles.iconDocker}`}> <FaDocker /> </div>
                    </div>
                </div>

            </div>

            <a href="#projects" className={styles.scrollDown}>
                <div className={styles.mouse}><span></span></div>
            </a>
        </section>
    );
}

export default Hero;