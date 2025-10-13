// src/components/AdvancedCursor/AdvancedCursor.jsx

import React, { useEffect, useRef } from 'react';
// Убедитесь, что импортируете правильный файл стилей
import styles from './CustomCursor.module.css'; 

const CustomCursor = () => {
    const dotRef = useRef(null);
    const outlineRef = useRef(null);
    
    useEffect(() => {
        // --- Обработчик движения ---
        // Теперь он просто перемещает курсор. Никакой сложной физики.
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            if (dotRef.current && outlineRef.current) {
                dotRef.current.style.left = `${clientX}px`;
                dotRef.current.style.top = `${clientY}px`;
                outlineRef.current.style.left = `${clientX}px`;
                outlineRef.current.style.top = `${clientY}px`;
            }
        };

        // --- Обработчики состояний ---
        const handleMouseDown = () => {
            if (outlineRef.current) {
                // Добавляем класс для анимации "волны"
                outlineRef.current.classList.add(styles.click);
                // Убираем класс после завершения анимации (500ms)
                setTimeout(() => {
                    outlineRef.current?.classList.remove(styles.click);
                }, 500);
            }
        };

        const handleMouseEnter = () => {
            outlineRef.current?.classList.add(styles.hover);
        };
        const handleMouseLeave = () => {
            outlineRef.current?.classList.remove(styles.hover);
        };

        // --- Установка и очистка слушателей ---
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        
        const interactiveElements = document.querySelectorAll('a, button, .cta-button, [data-interactive]');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <>
            {/* Обводка теперь первая, чтобы точка была поверх */}
            <div ref={outlineRef} className={styles.cursorOutline}></div>
            <div ref={dotRef} className={styles.cursorDot}></div>
        </>
    );
};

export default CustomCursor;