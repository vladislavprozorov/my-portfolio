// src/components/Contact/Contact.jsx (Мобильно-оптимизированная версия)

import React, { useEffect, useState } from 'react';
import { useReveal } from '../../hooks/useReveal';
import styles from './Contact.module.css';
import { FaGithub, FaTelegram, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
    const email = "skayterder@vk.com"; // Вынесем email в переменную для удобства
    const [copyMsg, setCopyMsg] = useState("");
    const onCopy = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopyMsg("Скопировано!");
            setTimeout(() => setCopyMsg(""), 1500);
        } catch (_) {
            setCopyMsg("Не удалось скопировать");
            setTimeout(() => setCopyMsg(""), 1500);
        }
    };

    // Авто-скрытие тоста при прокрутке, клике вне или ESC
    useEffect(() => {
        if (!copyMsg) return;
        const dismiss = () => setCopyMsg("");
        const onScroll = () => dismiss();
        const onKeyDown = (e) => { if (e.key === 'Escape') dismiss(); };
        const onPointerDown = () => dismiss();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('pointerdown', onPointerDown);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('pointerdown', onPointerDown);
        };
    }, [copyMsg]);
    
    const reveal = useReveal();
    const gridReveal = useReveal();
    return (
        <section id="contact" className={styles.contact}>
            <div className={`container ${styles.layout}`}>
                {/* Header с halo и чипсами */}
                <header ref={reveal.ref} className={`${styles.header} ${styles.reveal} ${reveal.visible ? styles.revealVisible : ''}`}>
                    <div className={styles.halo} aria-hidden />
                    <div className={styles.eyebrow}>Связаться</div>
                    <h2 className={styles.title}>Давайте обсудим ваш проект</h2>
                    <p className={styles.subtitle}>Открыт к предложениям: MVP, доработка существующего продукта, перф и UX‑улучшения.</p>
                    <div className={styles.chips}>
                        <span className={styles.chip}>Открыт к предложениям</span>
                        <span className={styles.chip}>Обычно отвечаю в течение дня</span>
                    </div>
                    {/* CTA ряд */}
                    <div className={styles.ctaRow}>
                        <a href={`mailto:${email}`} className={`cta-button ${styles.ctaPrimary}`} aria-label="Написать на e-mail">
                            <FaEnvelope aria-hidden className={styles.emailIcon} />
                            {email}
                        </a>
                        <button type="button" onClick={onCopy} className={styles.ctaGhost} aria-label="Скопировать e-mail в буфер обмена">Скопировать e‑mail</button>
                        <a href="https://t.me/mscnever" target="_blank" rel="noopener noreferrer" className={styles.ctaOutline} aria-label="Написать в Telegram">
                            Telegram
                        </a>
                    </div>
                </header>

                {/* Социальные карточки */}
                <div ref={gridReveal.ref} className={`${styles.socialGrid} ${styles.reveal} ${gridReveal.visible ? styles.revealVisible : ''}`}>
                    <a className={styles.socialCard} href="https://github.com/vladislavprozorov" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <span className={styles.socialIcon}><FaGithub /></span>
                        <div className={styles.socialMeta}>
                            <span className={styles.socialTitle}>GitHub</span>
                            <span className={styles.socialHandle}>@vladislavprozorov</span>
                        </div>
                    </a>
                    <a className={styles.socialCard} href="https://t.me/mscnever" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                        <span className={styles.socialIcon}><FaTelegram /></span>
                        <div className={styles.socialMeta}>
                            <span className={styles.socialTitle}>Telegram</span>
                            <span className={styles.socialHandle}>@mscnever</span>
                        </div>
                    </a>
                    <a className={styles.socialCard} href="https://linkedin.com/in/vladislavprozorov" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <span className={styles.socialIcon}><FaLinkedin /></span>
                        <div className={styles.socialMeta}>
                            <span className={styles.socialTitle}>LinkedIn</span>
                            <span className={styles.socialHandle}>/in/vladislavprozorov</span>
                        </div>
                    </a>
                </div>
                                {/* Toast копирования */}
                                                <div className={`${styles.toast} ${copyMsg ? styles.toastShow : ''}`} role="status" aria-live="polite" onClick={() => setCopyMsg("") }>
                                    {copyMsg}
                                </div>
            </div>
        </section>
    );
};

export default Contact;