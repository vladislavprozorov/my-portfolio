import { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { BsMoonStarsFill, BsSunFill } from 'react-icons/bs';

const Header = ({ theme, toggleTheme }) => {
    const [isMenuOpen, setIsMenuОpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    // Упрощенный эффект для отслеживания скролла.
    // Теперь он только проверяет, прокручена ли страница, для добавления тени.
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    // Эффект для подсветки активной секции (остается без изменений)
    useEffect(() => {
        const sections = document.querySelectorAll('section[id]');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-30% 0px -70% 0px' }
        );
        sections.forEach((section) => observer.observe(section));
        return () => sections.forEach((section) => observer.unobserve(section));
    }, []);

    const toggleMenu = () => setIsMenuОpen(!isMenuOpen);
    const closeMenu = () => setIsMenuОpen(false);

    // Убираем логику для isHeaderVisible из классов
    const headerClasses = `${styles.header} ${isScrolled ? styles.scrolled : ''}`;
    const isLinkActive = (hash) => activeSection === hash;

    return (
        <header className={headerClasses}>
            <div className={`container ${styles.navigation}`}>
                <a href="#hero" className={styles.logo} onClick={closeMenu}>
                    vladislavprozorov
                </a>

                <div className={`${styles.navContainer} ${isMenuOpen ? styles.open : ''}`}>
                    <nav>
                        <ul className={styles.navList}>
                            {[
                                { href: 'projects', text: 'Проекты' },
                                { href: 'about', text: 'Обо мне' },
                                { href: 'contact', text: 'Контакты' },
                            ].map(link => (
                                <li key={link.href}>
                                    <a 
                                        href={`#${link.href}`}
                                        className={isLinkActive(link.href) ? styles.active : ''}
                                        onClick={closeMenu}
                                    >
                                        {link.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <button className={styles.themeToggle} onClick={toggleTheme} title="Переключить тему">
                        {theme === 'light' ? <BsMoonStarsFill /> : <BsSunFill />}
                    </button>
                </div>
                
                <button className={`${styles.burger} ${isMenuOpen ? styles.open : ''}`} onClick={toggleMenu} aria-label="Открыть меню">
                    <span className={styles.burgerLine}></span>
                    <span className={styles.burgerLine}></span>
                    <span className={styles.burgerLine}></span>
                </button>
            </div>
        </header>
    );
};

export default Header;