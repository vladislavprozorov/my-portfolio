// src/App.jsx (Новая архитектура)
import { useState, useEffect } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax'; 
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

// НОВОЕ: Импортируем фон и 3D-сцену прямо сюда

import Scene3D from './components/Scene3D';

import AOS from 'aos';
import 'aos/dist/aos.css';


function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
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
    <>
    <ParallaxProvider>
      {/* НОВОЕ: Глобальный фон рендерится один раз для всей страницы */}
      <div className="global-background">
        <Scene3D />
        {/* Мы можем поместить 3D-сцену сюда, если хотим, чтобы она была на фоне всех секций,
            но для твоего дизайна лучше оставить ее в Hero, просто сделав фон Hero прозрачным.
            Оставим пока только частицы. */}
      </div>

      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Projects />
        <Contact />
      </main>
      <Footer />
      </ParallaxProvider>
    </>
  );
}

export default App;