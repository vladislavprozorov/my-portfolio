import styles from './Projects/Projects.module.css'; // Используем тот же файл стилей
import { FaGithub } from 'react-icons/fa';
import { CgWebsite } from 'react-icons/cg';

const ProjectCard = ({ title, description, tags, liveLink, githubLink, image, delay }) => {
    return (
        <div className={styles.projectCard} data-aos="fade-up" data-aos-delay={delay}>
            <img src={image} alt={`Превью проекта ${title}`} className={styles.projectImage} />
            <div className={styles.projectInfo}>
                <h3 className={styles.projectTitle}>{title}</h3>
                <p className={styles.projectDescription}>{description}</p>
                <div className={styles.projectTags}>
                    {tags.map((tag, index) => <span key={index}>{tag}</span>)}
                </div>
                <div className={styles.projectLinks}>
                    <a href={liveLink} target="_blank" rel="noopener noreferrer">
                        Live Demo <CgWebsite />
                    </a>
                    <a href={githubLink} target="_blank" rel="noopener noreferrer">
                        GitHub <FaGithub />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;