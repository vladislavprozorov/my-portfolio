// src/components/MatrixBackground/MatrixBackground.jsx
import React, { useRef, useEffect } from 'react';
import styles from './MatrixBackground.module.css';

const MatrixBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Символы для "дождя"
        const characters = '01';
        const fontSize = 16;
        const columns = Math.floor(canvas.width / fontSize);
        
        // Массив для отслеживания Y-позиции каждого столбца
        const drops = Array(columns).fill(1);

        const draw = () => {
            // Рисуем полупрозрачный черный прямоугольник. Это создает эффект "хвоста" у символов
            ctx.fillStyle = 'rgba(13, 17, 23, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Цвет и шрифт символов
            ctx.fillStyle = '#32cd32'; // Ярко-зеленый (Lime Green)
            ctx.font = `${fontSize}px Fira Code, monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters[Math.floor(Math.random() * characters.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Сбрасываем "каплю" наверх, если она ушла за экран
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
            animationFrameId = requestAnimationFrame(draw);
        };
        
        draw();

        // Очистка при размонтировании компонента
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return <canvas ref={canvasRef} className={styles.matrixCanvas} />;
};

export default MatrixBackground;