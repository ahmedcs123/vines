import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function HeroSlider() {
    const { t, i18n } = useTranslation();
    const [currentSlide, setCurrentSlide] = useState(0);
    const isRTL = i18n.language === 'ar';

    const slides = [
        {
            id: 1,
            titleKey: 'heroSlide1Title',
            subtitleKey: 'heroSlide1Subtitle',
            image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=1920&q=80', // Chocolate
        },
        {
            id: 2,
            titleKey: 'heroSlide2Title',
            subtitleKey: 'heroSlide2Subtitle',
            image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1920&q=80', // Cakes
        },
        {
            id: 3,
            titleKey: 'heroSlide3Title',
            subtitleKey: 'heroSlide3Subtitle',
            image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1920&q=80', // Ice Cream
        },
        {
            id: 4,
            titleKey: 'heroSlide4Title',
            subtitleKey: 'heroSlide4Subtitle',
            image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1920&q=80', // Bakery
        },
        {
            id: 5,
            titleKey: 'heroSlide5Title',
            subtitleKey: 'heroSlide5Subtitle',
            image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1920&q=80', // Desserts
        },
        {
            id: 6,
            titleKey: 'heroSlide6Title',
            subtitleKey: 'heroSlide6Subtitle',
            image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&q=80', // Coffee & Nuts
        },
        {
            id: 7,
            titleKey: 'heroSlide7Title',
            subtitleKey: 'heroSlide7Subtitle',
            image: 'https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=1920&q=80', // Candy & Sweets
        },
        {
            id: 8,
            titleKey: 'heroSlide8Title',
            subtitleKey: 'heroSlide8Subtitle',
            image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=1920&q=80', // Cookies
        },
        {
            id: 9,
            titleKey: 'heroSlide9Title',
            subtitleKey: 'heroSlide9Subtitle',
            image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1920&q=80', // Pastries
        },
    ];

    // Auto-rotation every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="relative h-[600px] md:h-[700px] overflow-hidden">
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slide.image})` }}
                    >
                        {/* Dark overlay for better text readability */}
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    </div>

                    {/* Content - Centered */}
                    <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
                        <div className="max-w-4xl text-white animate-fadeInUp text-center">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                                {t(slide.titleKey)}
                            </h1>
                            <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-secondary opacity-90">
                                {t(slide.subtitleKey)}
                            </p>
                            <Link
                                to="/products"
                                className="inline-block bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                            >
                                {t('heroButton')}
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            <button
                onClick={isRTL ? nextSlide : prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 group"
                aria-label="Previous slide"
            >
                <ChevronLeft size={28} className="group-hover:scale-110 transition-transform" />
            </button>
            <button
                onClick={isRTL ? prevSlide : nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 group"
                aria-label="Next slide"
            >
                <ChevronRight size={28} className="group-hover:scale-110 transition-transform" />
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 rtl:space-x-reverse">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                            ? 'bg-white w-8'
                            : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default HeroSlider;
