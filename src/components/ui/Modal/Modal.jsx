import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.css';

export const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'medium',
    closeOnOverlayClick = true,
    closeOnEscape = true,
    className = '',
}) => {
    const titleId = useId();

    const modalRef = useRef(null);
    const previouslyFocusedElementRef = useRef(null);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        previouslyFocusedElementRef.current = document.activeElement;

        const originalOverflow = document.body.style.overflow;

        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = originalOverflow;

            previouslyFocusedElementRef.current?.focus();
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handleKeyDown = (event) => {
            if (
                event.key === 'Escape' &&
                closeOnEscape
            ) {
                onClose();
            }
        };

        document.addEventListener(
            'keydown',
            handleKeyDown
        );

        return () => {
            document.removeEventListener(
                'keydown',
                handleKeyDown
            );
        };
    }, [isOpen, closeOnEscape, onClose]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        modalRef.current?.focus();
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleOverlayMouseDown = (event) => {
        if (
            closeOnOverlayClick &&
            event.target === event.currentTarget
        ) {
            onClose();
        }
    };

    return createPortal(
        <div
            className={styles.overlay}
            onMouseDown={handleOverlayMouseDown}
        >
            <div
                ref={modalRef}
                className={`${styles.modal} ${styles[size]} ${className || ''}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? titleId : undefined}
                tabIndex={-1}
            >
                {title && (
                    <h2
                        id={titleId}
                        className={styles.title}
                    >
                        {title}
                    </h2>
                )}

                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};