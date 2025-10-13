// src/App.jsx (Супер-оптимизированная версия)
import { useState, useEffect, lazy, Suspense } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { useInView } from 'react-intersection-observer'; // <-- ИМПОРТИРУЕМ ХУК

// Компоненты, нужные сразу
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer';


// НОВОЕ: Ленивая загрузка "тяжелых" компонентов
const Projects = lazy(() => import('./components/Projects/Projects'));
const Contact = lazy(() => import('./components/Contact/Contact'));
const Scene3D = lazy(() => import('./components/Scene3D')); // 3D-сцену тоже делаем ленивой!

import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  // НОВОЕ: Хук для отслеживания видимости Hero
  // `threshold: 0.1` означает, что событие сработает, когда хотя бы 10% Hero будет видно
  const { ref: heroRef, inView: isHeroVisible } = useInView({
    threshold: 0.1,
    triggerOnce: false, // Важно! Чтобы сцена снова включалась при возврате
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 50 });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'blue' : 'light'));
  };

  return (
    <ParallaxProvider>
      {/* НОВОЕ: Контейнер для фона теперь не нужен, мы управляем рендером напрямую */}
      {/* <div className="global-background"> ... </div> */}

      <div className="content-wrapper">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <main>
          {/* НОВОЕ: Передаем ref в Hero, чтобы отслеживать его появление */}
          <Hero forwardedRef={heroRef} />

          {/* НОВОЕ: Оборачиваем ленивые компоненты в Suspense */}
          <Suspense fallback={""}>
            <Projects />
            <Contact />
          </Suspense>
        </main>
        <Footer />
      </div>


    </ParallaxProvider>
  );
}

export default App;