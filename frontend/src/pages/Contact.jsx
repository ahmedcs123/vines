import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MessageCircle, MapPin, Send } from 'lucide-react';

function Contact() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Show success message
        setShowSuccess(true);
        // Reset form
        setFormData({ name: '', email: '', phone: '', message: '' });
        // Hide success message after 3 seconds
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            {/* Page Header */}
            <section className="bg-gradient-to-r from-primary via-primary-light to-primary text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeInUp">
                        {t('contactTitle')}
                    </h1>
                    <p className="text-xl md:text-2xl text-secondary opacity-90 animate-fadeInUp animate-delay-100">
                        {t('contactSubtitle')}
                    </p>
                </div>
            </section>

            {/* Quick Contact Cards */}
            <section className="py-12 bg-secondary">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Email Card */}
                        <a
                            href="mailto:info@thevines.com"
                            className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fadeInUp group"
                        >
                            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">📧</div>
                            <h3 className="text-xl font-bold text-primary mb-2">{t('email')}</h3>
                            <p className="text-accent text-lg">info@thevines.com</p>
                        </a>

                        {/* Phone Card */}
                        <a
                            href="tel:+971567822828"
                            className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fadeInUp animate-delay-100 group"
                        >
                            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">📞</div>
                            <h3 className="text-xl font-bold text-primary mb-2">{t('phone')}</h3>
                            <p className="text-accent text-lg">+971 56 782 2828</p>
                        </a>

                        {/* WhatsApp Card */}
                        <a
                            href="https://wa.me/971566414722"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fadeInUp animate-delay-200 group"
                        >
                            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">💬</div>
                            <h3 className="text-xl font-bold text-primary mb-2">{t('whatsapp')}</h3>
                            <p className="text-accent text-lg">+971 56 641 4722</p>
                        </a>
                    </div>
                </div>
            </section>

            {/* Contact Form & Address */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="animate-fadeInUp">
                            <h2 className="text-3xl font-bold text-primary mb-6">{t('sendMessage')}</h2>

                            {showSuccess && (
                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex items-center animate-slideDown">
                                    <span className="mr-2">✓</span> {t('messageSent')}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('name')} *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('emailAddress')} *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('phoneNumber')}
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('message')} *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white px-8 py-4 rounded-lg font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 rtl:space-x-reverse"
                                >
                                    <span>{t('sendButton')}</span>
                                    <Send size={20} />
                                </button>
                            </form>
                        </div>

                        {/* Address Card */}
                        <div className="animate-fadeInUp animate-delay-100">
                            <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
                                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                                    <div className="text-5xl">📍</div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-primary mb-4">{t('ourLocation')}</h3>
                                        <div className="space-y-2 text-gray-700 text-lg">
                                            <p>{t('lootahBuilding')}</p>
                                            <p>{t('ummRamool')}</p>
                                            <p className="font-semibold">{t('dubaiUAE')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Google Map */}
                            <div className="rounded-xl overflow-hidden shadow-xl border-4 border-primary">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.4658076729924!2d55.37203631500869!3d25.235731583858804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d4f2f0f0f0f%3A0x1f0f0f0f0f0f0f0f!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                                    width="100%"
                                    height="320"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Google Maps Location"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA Section */}
            <section className="bg-gradient-to-r from-primary via-primary-light to-primary text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fadeInUp">
                        {t('weAreHereToHelp')}
                    </h2>
                    <p className="text-xl md:text-2xl mb-8 text-secondary opacity-90 max-w-2xl mx-auto animate-fadeInUp animate-delay-100">
                        {t('inquiriesSubtitle')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp animate-delay-200">
                        <a
                            href="https://wa.me/971566414722"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center space-x-2 rtl:space-x-reverse bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
                        >
                            <MessageCircle size={20} />
                            <span>{t('whatsappButton')}</span>
                        </a>
                        <a
                            href="tel:+971567822828"
                            className="inline-flex items-center justify-center space-x-2 rtl:space-x-reverse bg-secondary hover:bg-secondary-dark text-primary px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
                        >
                            <Phone size={20} />
                            <span>{t('callButton')}</span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Contact;
