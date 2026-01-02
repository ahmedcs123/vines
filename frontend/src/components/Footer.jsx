import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

function Footer() {
    const { t, i18n } = useTranslation();

    const productCategories = [
        'raw-materials',
        'chocolates',
        'creams-fillings',
        'cake-decoration',
        'ice-cream-gelato',
        'beverages-syrups'
    ];

    return (
        <footer className="bg-gradient-to-r from-primary via-primary-dark to-primary text-white mt-auto">
            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Column 1 - Company Info */}
                    <div>
                        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                            <img
                                src="/logo.png"
                                alt="The Vines Trading Company Logo"
                                className="h-20 w-auto object-contain bg-white rounded-xl p-3 shadow-xl"
                            />
                        </div>
                        <p className="text-secondary text-sm leading-relaxed">
                            {t('heroSubtitle')}
                        </p>
                    </div>

                    {/* Column 2 - Address */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 flex items-center space-x-2 rtl:space-x-reverse">
                            <MapPin size={20} className="text-accent" />
                            <span>{t('address')}</span>
                        </h3>
                        <div className="space-y-2 text-secondary text-sm">
                            <p>Dubai, UAE</p>
                            <p>Umm Ramool</p>
                            <p>Lootah Building</p>
                            <p>Office 206</p>
                        </div>
                    </div>

                    {/* Column 3 - Contact */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">{t('contact')}</h3>
                        <div className="space-y-3">
                            <a
                                href="tel:+971567822828"
                                className="flex items-center space-x-2 rtl:space-x-reverse hover:text-accent transition-colors text-sm group"
                            >
                                <Phone size={18} className="text-accent group-hover:scale-110 transition-transform" />
                                <span>+971 56 782 2828</span>
                            </a>
                            <a
                                href="mailto:info@thevines.com"
                                className="flex items-center space-x-2 rtl:space-x-reverse hover:text-accent transition-colors text-sm group"
                            >
                                <Mail size={18} className="text-accent group-hover:scale-110 transition-transform" />
                                <span>info@thevines.com</span>
                            </a>
                        </div>
                    </div>

                    {/* Column 4 - Products */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">{t('products')}</h3>
                        <ul className="space-y-2 text-sm">
                            {productCategories.map((category) => (
                                <li key={category}>
                                    <Link
                                        to={`/products?category=${category}`}
                                        className="text-secondary hover:text-accent transition-colors hover:translate-x-1 rtl:hover:-translate-x-1 inline-block"
                                    >
                                        {t(category)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-white border-opacity-20 mt-8 pt-6 text-center">
                    <p className="text-secondary text-sm">
                        © 2025 The Vines Trading Company. All Rights Reserved
                    </p>
                </div>
            </div>

            {/* Floating Action Buttons */}
            <div className="fixed bottom-6 ltr:right-6 rtl:left-6 flex flex-col space-y-3 z-50">
                {/* WhatsApp Button */}
                <a
                    href="https://wa.me/971566414722"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 p-4 rounded-full shadow-2xl transition-all hover:scale-110 group relative"
                    aria-label="Contact us on WhatsApp"
                >
                    <svg
                        className="w-7 h-7 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    <span className="absolute ltr:right-full rtl:left-full ltr:mr-3 rtl:ml-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {t('whatsapp')}
                    </span>
                </a>

                {/* Phone Button */}
                <a
                    href="tel:+971567822828"
                    className="bg-blue-600 hover:bg-blue-700 p-4 rounded-full shadow-2xl transition-all hover:scale-110 group relative"
                    aria-label="Call us"
                >
                    <Phone size={28} className="text-white" />
                    <span className="absolute ltr:right-full rtl:left-full ltr:mr-3 rtl:ml-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {t('phone')}
                    </span>
                </a>

                {/* Facebook Button */}
                <a
                    href="https://www.facebook.com/share/1C9XL8oPyb/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 hover:bg-blue-600 p-4 rounded-full shadow-2xl transition-all hover:scale-110 group relative"
                    aria-label="Visit our Facebook page"
                >
                    <svg
                        className="w-7 h-7 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span className="absolute ltr:right-full rtl:left-full ltr:mr-3 rtl:ml-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Facebook
                    </span>
                </a>
            </div>
        </footer>
    );
}

export default Footer;
