// src/App.jsx

import { useState, useEffect, lazy, Suspense } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { useInView } from 'react-intersection-observer';
import AOS from 'aos';
import 'aos/dist/aos.css';

// --- КОД ПАСХАЛКИ ---
import Confetti from 'react-confetti';
import { useKonamiCode } from './hooks/useKonamiCode'; 
import MatrixBackground from './components/MatrixBackground/MatrixBackground';
import Showcase from './components/Showcase/Showcase';
// --------------------

// Компоненты
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer';
import CustomCursor from './CustomCursor/CustomCursor';

// Ленивая загрузка
const About = lazy(() => import('./components/About/About'));
const Projects = lazy(() => import('./components/Projects/Projects'));
const Contact = lazy(() => import('./components/Contact/Contact'));

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  
  // --- КОД ПАСХАЛКИ ---
  const [hackerMode, setHackerMode] = useState(false);
  
  const activateHackerMode = () => {
    if (!hackerMode) {
      console.log("EASTER EGG ACTIVATED!");
      setHackerMode(true);
    }
  };
  useKonamiCode(activateHackerMode);

  // --- НОВАЯ ФУНКЦИЯ ДЛЯ ПЕРЕКЛЮЧЕНИЯ ПО КЛИКУ ---
  const toggleHackerMode = () => {
    setHackerMode(prevMode => !prevMode);
  };
  // --------------------

  const { ref: heroRef, inView: isHeroVisible } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    const styles = [
      'font-size: 14px', 'font-family: monospace', 'background: #0d1117',
      'display: inline-block', 'color: #58a6ff', 'padding: 8px 12px',
      'border: 1px solid #30363d', 'border-radius: 4px',
    ].join(';');
    console.log('%cПссс... На этом сайте есть пасхалка)', styles);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 50 });
  }, []);

  useEffect(() => {
    if (hackerMode) {
      document.documentElement.setAttribute('data-theme', 'hacker');
      return; 
    }
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme, hackerMode]);

  const toggleTheme = () => {
    if (hackerMode) {
      setHackerMode(false);
    }
    setTheme((prevTheme) => (prevTheme === 'light' ? 'blue' : 'light'));
  };

  return (
    <ParallaxProvider>
      <CustomCursor />
      {hackerMode && (
        <>
        <MatrixBackground />
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={400}
          gravity={0.1}
          colors={['#32cd32', '#228B22', '#000000']}
        />
        </>
      )}

      <div className="content-wrapper">
        <Header theme={hackerMode ? 'hacker' : theme} toggleTheme={toggleTheme} />
        <main>
          <Hero forwardedRef={heroRef} />

          <Suspense fallback={<section id="about" aria-busy="true" style={{minHeight: 480}} />}> 
            <About />
          </Suspense>

          <Suspense fallback={<section id="showcase" aria-busy="true" style={{minHeight: 480}} />}> 
            <Showcase />
          </Suspense>

          <Suspense fallback={<section id="projects" aria-busy="true" style={{minHeight: 480}} />}> 
            <Projects />
          </Suspense>

          <Suspense fallback={<section id="contact" aria-busy="true" style={{minHeight: 480}} />}> 
            <Contact />
          </Suspense>
        </main>
        {/* --- ПЕРЕДАЕМ ПРОПСЫ В ФУТЕР --- */}
        <Footer 
          onHintClick={toggleHackerMode} 
          isHackerModeActive={hackerMode} 
        />
      </div>
    </ParallaxProvider>
  );
}

export default App;