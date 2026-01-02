import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ArrowLeft } from 'lucide-react';

function Hero() {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    return (
        <div className="relative bg-gradient-to-r from-primary via-primary-dark to-accent text-white">
            <div className="container mx-auto px-4 py-20 md:py-32">
                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        {t('heroTitle')}
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-secondary-light">
                        {t('heroSubtitle')}
                    </p>
                    <Link
                        to="/products"
                        className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-accent hover:bg-accent-dark px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
                    >
                        <span>{t('heroButton')}</span>
                        {isRTL ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
                    </Link>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary opacity-5 rounded-full -ml-48 -mb-48"></div>
        </div>
    );
}

export default Hero;
