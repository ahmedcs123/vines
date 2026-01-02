import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function About() {
    const { t } = useTranslation();

    return (
        <div>
            {/* Page Hero */}
            <section className="bg-gradient-to-r from-primary via-primary-light to-primary text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeInUp">
                        {t('aboutUs')}
                    </h1>
                    <p className="text-xl md:text-2xl text-secondary opacity-90 animate-fadeInUp animate-delay-100">
                        {t('aboutSubtitle')}
                    </p>
                </div>
            </section>

            {/* Welcome Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1 animate-fadeInUp">
                            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                                {t('welcomeTitle')}
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                {t('welcomeText')}
                            </p>
                        </div>
                        <div className="order-1 md:order-2 animate-fadeInUp animate-delay-100">
                            <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-8 shadow-2xl">
                                <div className="text-9xl text-center">🍫</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Products Section */}
            <section className="bg-gradient-to-b from-secondary to-white py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="animate-fadeInUp">
                            <div className="bg-gradient-to-br from-accent to-primary-light rounded-2xl p-8 shadow-2xl">
                                <div className="text-9xl text-center">🍰</div>
                            </div>
                        </div>
                        <div className="animate-fadeInUp animate-delay-100">
                            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                                {t('ourProductsTitle')}
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                {t('ourProductsText')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="relative py-20 bg-gradient-to-r from-primary via-primary-light to-primary text-white overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-10 right-10 text-[150px] opacity-10">⭐</div>
                <div className="absolute bottom-10 left-10 text-[120px] opacity-5">🏆</div>

                <div className="container mx-auto px-4 relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-fadeInUp">
                        {t('coreValuesTitle')}
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Value 1 */}
                        <div className="glass-strong rounded-xl p-8 text-center hover:scale-105 transition-transform duration-300 animate-fadeInUp">
                            <div className="text-7xl mb-4">🏆</div>
                            <h3 className="text-2xl font-bold mb-3">{t('qualityValue')}</h3>
                            <p className="text-secondary opacity-90">{t('qualityValueDesc')}</p>
                        </div>

                        {/* Value 2 */}
                        <div className="glass-strong rounded-xl p-8 text-center hover:scale-105 transition-transform duration-300 animate-fadeInUp animate-delay-100">
                            <div className="text-7xl mb-4">❤️</div>
                            <h3 className="text-2xl font-bold mb-3">{t('satisfactionValue')}</h3>
                            <p className="text-secondary opacity-90">{t('satisfactionValueDesc')}</p>
                        </div>

                        {/* Value 3 */}
                        <div className="glass-strong rounded-xl p-8 text-center hover:scale-105 transition-transform duration-300 animate-fadeInUp animate-delay-200">
                            <div className="text-7xl mb-4">✨</div>
                            <h3 className="text-2xl font-bold mb-3">{t('authenticityValue')}</h3>
                            <p className="text-secondary opacity-90">{t('authenticityValueDesc')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 animate-fadeInUp">
                        {t('readyToServe')}
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 animate-fadeInUp animate-delay-100">
                        {t('readyToServeSubtitle')}
                    </p>
                    <Link
                        to="/products"
                        className="inline-block bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white px-12 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fadeInUp animate-delay-200"
                    >
                        {t('browseProducts')}
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default About;
