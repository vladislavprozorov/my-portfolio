import ProjectCard from '../ProjectCard';
import styles from './Projects.module.css';

// В реальном приложении эти данные могут приходить с API или из отдельного файла
const projectsData = [
    {
        title: "Централизованная панель мониторинга криптовалют",
        description: "Веб-приложение с функциональностью мониторинга и анализа криптовалют в реальном времени.",
        tags: ["React", "TypeScript", "REST API", "MetaMask SDK"],
        liveLink: "https://github.com/vladislavprozorov/crypto_dashboard",
        githubLink: "https://github.com/vladislavprozorov/crypto_dashboard",
        image: "https://lifespeaker.ru/wp-content/uploads/2021/12/kripta.jpg"
    },
    {
        title: "Платформа для обучения техническому английскому языку",
        description: "Сайт с каталогом товаров, корзиной и интеграцией с платежной системой.",
        tags: ["React", "TypeScript", "Node.js", "Express"],
        liveLink: "https://github.com/vladislavprozorov/tech-english-platform",
        githubLink: "https://github.com/vladislavprozorov/tech-english-platform",
        image: "https://sun9-8.userapi.com/impg/kNWTbR98YfBs9c-ybRaFMzP2UBpe9sa3zzcvUw/4jPPl_-8N4U.jpg?size=807x536&quality=95&sign=d20588c3bf1c938979d29b27cd7b7df7&c_uniq_tag=EY8qM6FcMXyAXDQb72v_1279adPOwzuDWObgt8dyoFE&type=album"
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