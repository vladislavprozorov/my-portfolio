// src/components/ProjectCard.jsx (Мобильно-оптимизированная версия)

import { useState, useEffect } from 'react';
import { useReveal } from '../hooks/useReveal';
import styles from './Projects/Projects.module.css';
import { FaGithub, FaArrowRight } from 'react-icons/fa';

const ProjectCard = ({ title, description, tags, liveLink, githubLink, image, delay }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const reveal = useReveal();
    const styleDelay = isMobile ? undefined : { transitionDelay: `${delay || 0}ms` };
    return (
        <div 
            ref={reveal.ref}
            className={`${styles.projectCard} ${styles.reveal} ${reveal.visible ? styles.revealVisible : ''}`} 
            style={styleDelay}
            onMouseEnter={undefined}
            onMouseLeave={undefined}
        >
            {/* Изображение */}
            <div className={styles.imageContainer}>
                <img src={image} alt={title} className={styles.projectImage} />
                <div className={styles.imageOverlay}></div>
            </div>
            
            {/* Контент */}
            <div className={styles.projectContent}>
                <h3 className={styles.projectTitle}>{title}</h3>
                <p className={styles.projectDescription}>{description}</p>
                
                {/* Теги */}
                <div className={styles.projectTags}>
                    {tags.map((tag, index) => (
                        <span key={index} className={styles.tag}>{tag}</span>
                    ))}
                </div>
                
                {/* Ссылки */}
                <div className={styles.projectLinks}>
                    <a href={liveLink} className={styles.primaryLink}>
                        <span>View Project</span>
                        <FaArrowRight className={styles.arrow} />
                    </a>
                    <a href={githubLink} className={styles.secondaryLink}>
                        <FaGithub />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;