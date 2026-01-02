import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';

function Testimonials() {
    const { t } = useTranslation();

    const testimonials = [
        {
            id: 1,
            nameKey: 'testimonial1Name',
            textKey: 'testimonial1Text',
            rating: 5,
            emoji: '👨‍💼'
        },
        {
            id: 2,
            nameKey: 'testimonial2Name',
            textKey: 'testimonial2Text',
            rating: 5,
            emoji: '👩‍🍳'
        },
        {
            id: 3,
            nameKey: 'testimonial3Name',
            textKey: 'testimonial3Text',
            rating: 5,
            emoji: '👨‍🍳'
        },
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-white to-secondary">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16 animate-fadeInUp">
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                        {t('testimonialsTitle')}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {t('testimonialsSubtitle')}
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.id}
                            className={`bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fadeInUp animate-delay-${index * 100}`}
                        >
                            {/* Quote Icon */}
                            <div className="text-6xl text-accent opacity-20 mb-4">"</div>

                            {/* Rating Stars */}
                            <div className="flex space-x-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-gray-700 mb-6 text-lg leading-relaxed italic">
                                {t(testimonial.textKey)}
                            </p>

                            {/* Customer Info */}
                            <div className="flex items-center space-x-4 rtl:space-x-reverse border-t border-gray-200 pt-6">
                                <div className="text-5xl">{testimonial.emoji}</div>
                                <div>
                                    <h4 className="font-bold text-primary text-lg">
                                        {t(testimonial.nameKey)}
                                    </h4>
                                    <p className="text-gray-500 text-sm">{t('verifiedCustomer')}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
