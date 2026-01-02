import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, Home, Package, Info, Phone, Mail, MapPin, ChevronDown, Sparkles } from 'lucide-react';

function Navbar() {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showContactInfo, setShowContactInfo] = useState(true);

    // Track scroll position
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            setShowContactInfo(window.scrollY < 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang);
    };

    const navLinks = [
        { path: '/', label: t('home'), icon: Home },
        { path: '/products', label: t('products'), icon: Package },
        { path: '/about', label: t('about'), icon: Info },
        { path: '/contact', label: t('contact'), icon: Phone },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* Top Bar with Contact Info */}
            <div className={`bg-gradient-to-r from-primary via-primary-light to-accent text-white overflow-hidden transition-all duration-500 ${showContactInfo ? 'h-10' : 'h-0'
                }`}>
                <div className="container mx-auto px-4 h-10 flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                        <a href="tel:+971567822828" className="flex items-center space-x-2 rtl:space-x-reverse hover:text-accent transition-colors">
                            <Phone size={14} />
                            <span className="font-medium">+971 56 782 2828</span>
                        </a>
                        <a href="mailto:info@thevinestrading.com" className="hidden md:flex items-center space-x-2 rtl:space-x-reverse hover:text-accent transition-colors">
                            <Mail size={14} />
                            <span className="font-medium">info@thevinestrading.com</span>
                        </a>
                    </div>
                    <div className="hidden md:flex items-center space-x-2 rtl:space-x-reverse">
                        <MapPin size={14} />
                        <span className="text-xs font-medium">{t('dubaiBased')}</span>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-white shadow-2xl border-b-2 border-primary/10'
                : 'bg-white/98 backdrop-blur-xl shadow-lg'
                }`}>
                {/* Animated Progress Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-accent opacity-80 animate-shimmer bg-[length:200%_100%]"></div>

                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo Section - Enhanced */}
                        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse group relative">
                            <div className="relative">
                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-all duration-500 animate-pulse"></div>
                                {/* Logo Container */}
                                <div className="relative bg-white rounded-2xl p-3 shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110 border border-gray-100">
                                    <img
                                        src="/logo.png"
                                        alt="The Vines Trading Company Logo"
                                        className="h-11 w-auto object-contain"
                                    />
                                </div>
                            </div>
                            <div className="hidden lg:block">
                                <h1 className="font-bold text-xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent group-hover:from-accent group-hover:via-primary group-hover:to-accent transition-all duration-500 bg-[length:200%_100%]">
                                    The Vines Trading
                                </h1>
                                <p className="text-xs text-gray-600 font-semibold flex items-center space-x-1 rtl:space-x-reverse">
                                    <Sparkles size={12} className="text-accent" />
                                    <span>{t('tagline')}</span>
                                </p>
                            </div>
                        </Link>

                        {/* Desktop Navigation - Enhanced */}
                        <div className="hidden md:flex items-center space-x-2 rtl:space-x-reverse">
                            {navLinks.map((link) => {
                                const Icon = link.icon;
                                const active = isActive(link.path);
                                return (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={`relative px-5 py-2.5 rounded-xl font-bold transition-all duration-300 flex items-center space-x-2 rtl:space-x-reverse group overflow-hidden ${active
                                            ? 'text-white shadow-xl scale-105'
                                            : 'text-gray-700 hover:text-primary hover:bg-gradient-to-r hover:from-gray-50 hover:to-secondary/20 hover:scale-105'
                                            }`}
                                    >
                                        {/* Background Gradient for Active */}
                                        {active && (
                                            <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-shimmer"></span>
                                        )}
                                        <Icon size={18} className={`relative z-10 ${active ? 'text-white' : 'text-primary group-hover:scale-110 transition-transform'}`} />
                                        <span className="relative z-10">{link.label}</span>
                                        {/* Bottom Indicator */}
                                        {active && (
                                            <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-white rounded-full shadow-lg"></span>
                                        )}
                                    </Link>
                                );
                            })}

                            {/* Language Switcher - Premium */}
                            <button
                                onClick={toggleLanguage}
                                className="flex items-center space-x-2 rtl:space-x-reverse px-5 py-2.5 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 font-bold ml-1 rtl:mr-1 group"
                            >
                                <Globe size={19} className="group-hover:rotate-180 transition-all duration-500" />
                                <span>{i18n.language === 'en' ? 'عربي' : 'EN'}</span>
                            </button>
                        </div>

                        {/* Mobile Menu Button - Enhanced */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg transition-all duration-300 hover:scale-110"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu - Ultra Premium */}
            {isMobileMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-gradient-to-b from-black/70 to-black/90 backdrop-blur-md md:hidden animate-fadeIn z-40"
                        onClick={() => setIsMobileMenuOpen(false)}
                    ></div>

                    {/* Menu Panel */}
                    <div className="fixed top-20 left-0 right-0 bg-white shadow-2xl md:hidden animate-slideDown border-t-4 border-primary max-h-[calc(100vh-5rem)] overflow-y-auto z-50">
                        <div className="container mx-auto px-4 py-6 space-y-3">
                            {navLinks.map((link) => {
                                const Icon = link.icon;
                                const active = isActive(link.path);
                                return (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center space-x-3 rtl:space-x-reverse px-5 py-4 rounded-xl font-bold transition-all duration-300 ${active
                                            ? 'bg-gradient-to-r from-primary via-accent to-primary text-white shadow-xl'
                                            : 'text-gray-700 bg-gradient-to-r from-gray-50 to-secondary/10 hover:from-secondary/30 hover:to-primary/10 hover:text-primary'
                                            }`}
                                    >
                                        <Icon size={22} className={active ? 'text-white' : 'text-primary'} />
                                        <span>{link.label}</span>
                                    </Link>
                                );
                            })}

                            {/* Mobile Language Switcher */}
                            <button
                                onClick={() => {
                                    toggleLanguage();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full flex items-center justify-center space-x-3 rtl:space-x-reverse px-5 py-4 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all duration-300"
                            >
                                <Globe size={20} />
                                <span>{i18n.language === 'en' ? 'العربية' : 'English'}</span>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Navbar;
