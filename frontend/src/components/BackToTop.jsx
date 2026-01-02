import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-24 ltr:right-6 rtl:left-6 bg-primary hover:bg-primary-dark text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-40 animate-fadeIn"
                    aria-label="Back to top"
                >
                    <ArrowUp size={24} />
                </button>
            )}
        </>
    );
}

export default BackToTop;
