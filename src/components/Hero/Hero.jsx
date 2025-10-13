// src/components/Hero/Hero.jsx (Мобильно-оптимизированная версия)

import { useState, useEffect } from 'react';
import styles from './Hero.module.css';
import { TypeAnimation } from 'react-type-animation';
import { useParallax } from 'react-scroll-parallax';
import { FaGithub, FaLinkedin, FaReact, FaNodeJs, FaDocker } from 'react-icons/fa';
import { SiPostgresql, SiJavascript } from 'react-icons/si';

// Переиспользуемый компонент для параллакс-иконок
const ParallaxIcon = ({ children, className, speed, isMobile }) => {
    // На мобилках отключаем параллакс для производительности
    const parallax = useParallax({ speed: isMobile ? 0 : speed });
    return (
        <div ref={parallax.ref} className={className}>
            {children}
        </div>
    );
};

const Hero = ({ forwardedRef }) => {
    const [isMobile, setIsMobile] = useState(false);
    
    // Определяем, мобилка ли это
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    // Параллакс для текста (отключаем на мобилках)
    const textParallax = useParallax({ speed: isMobile ? 0 : -15 });
    
    return (
        <section ref={forwardedRef} className={styles.hero} id="hero">
            <div className={`container ${styles.heroLayout}`}>
                
                {/* Левая колонка с текстом */}
                <div ref={textParallax.ref} className={styles.heroContent} data-aos="fade-right">
                    <h1 className={styles.heroTitle}>
                        Привет, я <span>Влад</span> 👋
                    </h1>
                    <TypeAnimation
                        sequence={[
                            'Full-Stack разработчик', 2000,
                            'Создаю веб-приложения', 2000,
                            'Оптимизирую бэкенд', 2000,
                            'Люблю красивый код :)', 2000,
                        ]}
                        wrapper="h2"
                        speed={50}
                        className={styles.heroSubtitleAnimated}
                        repeat={Infinity}
                    />
                    <p className={styles.heroSubtitle}>
                        Создаю элегантные и производительные веб-решения от фронтенда до бэкенда.
                    </p>
                    <div className={styles.actionButtons}>
                        <a href="#projects" className={`cta-button ${styles.ctaButton}`}>
                            Мои проекты
                        </a>
                        <div className={styles.socialLinks}>
                            <a href="https://github.com/vladislavprozorov" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                <FaGithub />
                            </a>
                            <a href="https://linkedin.com/in/your-username" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>
                </div>
                
                {/* Правая колонка с иконками (упрощенная для мобилок) */}
                <div className={styles.heroVisual} data-aos="fade-left" data-aos-delay="200">
                    <div className={styles.techCube}>
                        <ParallaxIcon speed={15} className={`${styles.techIcon} ${styles.iconReact}`} isMobile={isMobile}>
                            <FaReact />
                        </ParallaxIcon>
                        <ParallaxIcon speed={5} className={`${styles.techIcon} ${styles.iconNode}`} isMobile={isMobile}>
                            <FaNodeJs />
                        </ParallaxIcon>
                        <ParallaxIcon speed={-5} className={`${styles.techIcon} ${styles.iconJs}`} isMobile={isMobile}>
                            <SiJavascript />
                        </ParallaxIcon>
                        <ParallaxIcon speed={-10} className={`${styles.techIcon} ${styles.iconPostgres}`} isMobile={isMobile}>
                            <SiPostgresql />
                        </ParallaxIcon>
                        <ParallaxIcon speed={10} className={`${styles.techIcon} ${styles.iconDocker}`} isMobile={isMobile}>
                            <FaDocker />
                        </ParallaxIcon>
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