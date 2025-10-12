import ProjectCard from '../ProjectCard';
import styles from './Projects.module.css';

// В реальном приложении эти данные могут приходить с API или из отдельного файла
const projectsData = [
    {
        title: "CRM-система для бизнеса",
        description: "Платформа для управления клиентами, задачами и аналитикой. Разработан REST API и адаптивный UI.",
        tags: ["React", "Node.js", "PostgreSQL"],
        liveLink: "#",
        githubLink: "#",
        image: "https://via.placeholder.com/400x250/E8E9EB/2E3440?text=Project+1"
    },
    {
        title: "Интернет-магазин 'Кофемания'",
        description: "Сайт с каталогом товаров, корзиной и интеграцией с платежной системой.",
        tags: ["Next.js", "TypeScript", "Stripe"],
        liveLink: "#",
        githubLink: "#",
        image: "https://via.placeholder.com/400x250/E8E9EB/2E3440?text=Project+2"
    }
];

const Projects = () => {
    return (
        <section id="projects" className={styles.projects}>
            <div className="container">
                <h2 className="section-title" data-aos="fade-up">Мои работы</h2>
                <div className={styles.projectsGrid}>
                    {projectsData.map((project, index) => (
                        <ProjectCard 
                            key={index}
                            title={project.title}
                            description={project.description}
                            tags={project.tags}
                            liveLink={project.liveLink}
                            githubLink={project.githubLink}
                            image={project.image}
                            delay={index * 100} // Для каскадной анимации
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;