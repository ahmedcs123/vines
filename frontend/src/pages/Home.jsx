import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';
import ProductCard from '../components/ProductCard';
import Testimonials from '../components/Testimonials';
import { getProducts } from '../services/api';

function Home() {
    const { t, i18n } = useTranslation();
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const productsRes = await getProducts({ limit: 3 });
            setFeaturedProducts(productsRes.data.slice(0, 3));
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Hero Slider */}
            <HeroSlider />

            {/* Stats Section - Overlapping Hero */}
            <section className="-mt-20 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="bg-gradient-to-r from-primary via-primary-light to-primary rounded-2xl shadow-2xl p-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {/* Stat 1 */}
                            <div className="text-center text-white animate-fadeInUp">
                                <div className="text-5xl md:text-6xl mb-2">😊</div>
                                <div className="text-3xl md:text-4xl font-bold mb-1">500+</div>
                                <div className="text-sm md:text-base opacity-90">{t('happyClients')}</div>
                            </div>
                            {/* Stat 2 */}
                            <div className="text-center text-white animate-fadeInUp animate-delay-100">
                                <div className="text-5xl md:text-6xl mb-2">⭐</div>
                                <div className="text-3xl md:text-4xl font-bold mb-1">1000+</div>
                                <div className="text-sm md:text-base opacity-90">{t('premiumProducts')}</div>
                            </div>
                            {/* Stat 3 */}
                            <div className="text-center text-white animate-fadeInUp animate-delay-200">
                                <div className="text-5xl md:text-6xl mb-2">📅</div>
                                <div className="text-3xl md:text-4xl font-bold mb-1">10+</div>
                                <div className="text-sm md:text-base opacity-90">{t('yearsExperience')}</div>
                            </div>
                            {/* Stat 4 */}
                            <div className="text-center text-white animate-fadeInUp animate-delay-300">
                                <div className="text-5xl md:text-6xl mb-2">💬</div>
                                <div className="text-3xl md:text-4xl font-bold mb-1">24/7</div>
                                <div className="text-sm md:text-base opacity-90">{t('customerSupport')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 animate-fadeInUp">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                            {t('whyChooseTitle')}
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            {t('whyChooseSubtitle')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fadeInUp">
                            <div className="text-7xl mb-4 transform hover:scale-110 transition-transform duration-300">
                                🏆
                            </div>
                            <h3 className="text-2xl font-bold text-primary mb-3">
                                {t('exceptionalQuality')}
                            </h3>
                            <p className="text-gray-600">
                                {t('exceptionalQualityDesc')}
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fadeInUp animate-delay-100">
                            <div className="text-7xl mb-4 transform hover:scale-110 transition-transform duration-300">
                                🤝
                            </div>
                            <h3 className="text-2xl font-bold text-primary mb-3">
                                {t('trustedPartner')}
                            </h3>
                            <p className="text-gray-600">
                                {t('trustedPartnerDesc')}
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fadeInUp animate-delay-200">
                            <div className="text-7xl mb-4 transform hover:scale-110 transition-transform duration-300">
                                🚚
                            </div>
                            <h3 className="text-2xl font-bold text-primary mb-3">
                                {t('fastDelivery')}
                            </h3>
                            <p className="text-gray-600">
                                {t('fastDeliveryDesc')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="bg-gradient-to-b from-secondary to-white py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 animate-fadeInUp">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                            {t('featuredProducts')}
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            {t('featuredProductsSubtitle')}
                        </p>
                    </div>

                    {loading ? (
                        <div className="grid md:grid-cols-3 gap-6">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="bg-gray-200 h-96 rounded-lg animate-pulse"></div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className="grid md:grid-cols-3 gap-8 mb-8">
                                {featuredProducts.map((product, index) => (
                                    <div
                                        key={product.id}
                                        className={`animate-fadeInUp ${index === 0 ? '' : index === 1 ? 'animate-delay-100' : 'animate-delay-200'
                                            }`}
                                    >
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>

                            <div className="text-center">
                                <Link
                                    to="/products"
                                    className="inline-block bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white px-12 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                                >
                                    {t('browseAllProducts')}
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Testimonials Section */}
            <Testimonials />

            {/* CTA Section */}
            <section className="relative bg-gradient-to-r from-primary via-primary-light to-primary text-white py-20 overflow-hidden">
                {/* Decorative Emojis */}
                <div className="absolute top-10 right-10 text-[150px] opacity-10 pointer-events-none">🍫</div>
                <div className="absolute bottom-10 left-10 text-[120px] opacity-5 pointer-events-none">☕</div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] opacity-5 pointer-events-none">🍰</div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 animate-fadeInUp">
                        {t('readyToStart')}
                    </h2>
                    <p className="text-xl md:text-2xl mb-8 text-secondary opacity-90 max-w-2xl mx-auto animate-fadeInUp animate-delay-100">
                        {t('readyToStartSubtitle')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp animate-delay-200">
                        <Link
                            to="/products"
                            className="inline-block bg-secondary hover:bg-secondary-dark text-primary px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
                        >
                            {t('browseProducts')}
                        </Link>
                        <Link
                            to="/contact"
                            className="inline-block bg-transparent border-2 border-secondary hover:bg-secondary hover:text-primary text-secondary px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105"
                        >
                            {t('contact')}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
