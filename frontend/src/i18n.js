import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            // Navigation
            home: 'Home',
            products: 'Products',
            about: 'About',
            contact: 'Contact',
            tagline: 'Premium B2B Food Supplies',
            getQuote: 'Get Quote',
            dubaiBased: 'Dubai, UAE',
            admin: 'Admin',

            // Hero Section
            heroTitle: 'The Vines Trading Company',
            heroSubtitle: 'Premium B2B Supplier for Chocolate, Bakery & Ice Cream Ingredients',
            heroButton: 'Explore Products',

            // Hero Slider
            heroSlide1Title: 'Premium Raw Materials',
            heroSlide1Subtitle: 'High-quality cocoa, chocolate, and bakery ingredients',
            heroSlide2Title: 'B2B Excellence',
            heroSlide2Subtitle: 'Your trusted partner for wholesale food supplies',
            heroSlide3Title: 'Quality Guaranteed',
            heroSlide3Subtitle: 'Premium products for professional bakers and confectioners',
            heroSlide4Title: 'Professional Bakery Solutions',
            heroSlide4Subtitle: 'Complete range of bakery ingredients and supplies',
            heroSlide5Title: 'Gourmet Desserts',
            heroSlide5Subtitle: 'Premium ingredients for creating unforgettable desserts',
            heroSlide6Title: 'Coffee & More',
            heroSlide6Subtitle: 'Premium coffee, nuts, and specialty ingredients',
            heroSlide7Title: 'Sweet Delights',
            heroSlide7Subtitle: 'Colorful candies and confectionery for every occasion',
            heroSlide8Title: 'Crispy Cookies',
            heroSlide8Subtitle: 'Premium cookie ingredients for perfect baking results',
            heroSlide9Title: 'Fresh Pastries',
            heroSlide9Subtitle: 'Quality ingredients for artisan pastry creations',

            // Stats
            happyClients: 'Happy Clients',
            premiumProducts: 'Premium Products',
            yearsExperience: 'Years Experience',
            customerSupport: 'Customer Support',

            // Why Choose Us
            whyChooseTitle: 'Why The Vines Trading?',
            whyChooseSubtitle: 'We offer an exceptional trading experience with full commitment to quality and customer satisfaction',
            exceptionalQuality: 'Exceptional Quality',
            exceptionalQualityDesc: 'Carefully selected products from trusted global suppliers',
            trustedPartner: 'Trusted Partner',
            trustedPartnerDesc: 'Building long-term relationships with our clients',
            fastDelivery: 'Fast Delivery',
            fastDeliveryDesc: 'Professional delivery service on time',

            // Featured Products
            featuredProducts: 'Featured Products',
            featuredProductsSubtitle: 'Discover a curated selection of our finest premium products',
            browseAllProducts: 'Browse All Products',

            // CTA
            readyToStart: 'Ready to Start with Us?',
            readyToStartSubtitle: 'Join hundreds of satisfied clients and discover an exceptional trading experience',
            browseProducts: 'Browse Products',

            // Products
            allProducts: 'All Products',
            searchPlaceholder: 'Search by product name or code...',
            categoryFilter: 'Filter by Category',
            productCode: 'Code',
            weight: 'Weight',
            noProducts: 'No products found',

            // Categories
            categories: 'Categories',
            'raw-materials': 'Raw Materials',
            'chocolates': 'Chocolates',
            'creams-fillings': 'Creams & Fillings',
            'cake-decoration': 'Cake Decoration',
            'ice-cream-gelato': 'Ice Cream & Gelato',
            'beverages-syrups': 'Beverages & Syrups',

            // Contact
            contactTitle: 'Contact Us',
            contactSubtitle: 'We\'re here to answer your questions and help you',
            management: 'Management',
            sales: 'Sales',
            info: 'Information',
            email: 'Email',
            phone: 'Phone',
            address: 'Address',
            whatsapp: 'WhatsApp',
            sendMessage: 'Send Us a Message',
            name: 'Name',
            emailAddress: 'Email',
            phoneNumber: 'Phone',
            message: 'Message',
            sendButton: 'Send Message',
            messageSent: 'Message sent successfully!',
            ourLocation: 'Our Location',
            lootahBuilding: 'Lootah Building, Office 206',
            ummRamool: 'Umm Ramool',
            dubaiUAE: 'Dubai, United Arab Emirates',
            weAreHereToHelp: 'We\'re Here to Help',
            inquiriesSubtitle: 'For inquiries or wholesale orders, reach out to us now',
            whatsappButton: 'WhatsApp',
            callButton: 'Call',
            productCode: 'Product Code',
            weight: 'Weight',
            description: 'Description',
            close: 'Close',
            filterByCategory: 'Filter by Category',
            allProducts: 'All Products',

            // Testimonials
            testimonialsTitle: 'What Our Clients Say',
            testimonialsSubtitle: 'Trusted by professionals across the industry',
            testimonial1Name: 'Ahmed Al-Mansoori',
            testimonial1Text: 'Excellent quality products and outstanding service. The Vines has been our trusted partner for over 5 years!',
            testimonial2Name: 'Sarah Johnson',
            testimonial2Text: 'Premium ingredients that make a real difference in our bakery. Highly recommend for any professional kitchen.',
            testimonial3Name: 'Mohammed Hassan',
            testimonial3Text: 'Fast delivery and consistent quality. The perfect B2B supplier for our confectionery business.',
            verifiedCustomer: 'Verified Customer',

            // Filters and Sorting
            filtersAndSort: 'Filters & Sort',
            productsFound: 'products found',
            clearFilters: 'Clear All',
            sortBy: 'Sort By',
            filterByWeight: 'Filter by Weight',
            sortNameAsc: 'Name (A-Z)',
            sortNameDesc: 'Name (Z-A)',
            sortCodeAsc: 'Code (Low-High)',
            sortNewest: 'Newest First',
            allWeights: 'All Weights',
            tryDifferentSearch: 'Try a different search or adjust filters',

            // About Page
            aboutUs: 'About Us',
            aboutSubtitle: 'A great trade experience that elevates your business',
            welcomeTitle: 'Welcome to The Vines',
            welcomeText: 'Welcome to The Vines, your reality source for a great trade experience that elevates your business. At Vines, we take pride in offering a diverse range of premium coffee, nuts, chocolate, and sweets, meticulously curated for discerning palates. Our commitment revolves around two core principles: quality and customer satisfaction. We strive to deliver products that not only meet but exceed your expectations, ensuring each indulgence is a moment of pure delight. Driven by a passion for aesthetics and an appreciation for authentic flavors, we are pleased to show you our best products in this field.',
            ourProductsTitle: 'Our Premium Products',
            ourProductsText: 'Our products embody a perfect blend of craftsmanship, innovation, and culinary finesse. We understand that every sip and bite should be a journey, and we invite you to embark on this flavorful adventure with us. Embrace the artistry of taste with Vines, where each product tells a story of dedication, quality, and the pursuit of unparalleled deliciousness. From the rich aroma of our coffee to the satisfying crunch of our nuts and the decadence of our chocolates and sweets, Vines promises an unforgettable experience that transcends the ordinary. Indulge your senses, savor the moment, and let Vines be the companion to your culinary desires.',
            coreValuesTitle: 'Our Core Values',
            qualityValue: 'Quality',
            qualityValueDesc: 'Meticulously curated premium products',
            satisfactionValue: 'Customer Satisfaction',
            satisfactionValueDesc: 'Exceeding expectations every time',
            authenticityValue: 'Authenticity',
            authenticityValueDesc: 'Authentic flavors and craftsmanship',
            readyToServe: 'Ready to Serve You',
            readyToServeSubtitle: 'Discover our wide range of premium products',

            // Footer
            footerText: '© 2024 The Vines Trading Company. All rights reserved.',

            // Admin
            adminLogin: 'Admin Login',
            username: 'Username',
            password: 'Password',
            login: 'Login',
            logout: 'Logout',
            dashboard: 'Dashboard',
            addProduct: 'Add Product',
            editProduct: 'Edit Product',
            deleteProduct: 'Delete Product',
            addCategory: 'Add Category',
            editCategory: 'Edit Category',
            deleteCategory: 'Delete Category',
            save: 'Save',
            cancel: 'Cancel',
        },
    },
    ar: {
        translation: {
            // Navigation
            home: 'الرئيسية',
            products: 'المنتجات',
            about: 'من نحن',
            contact: 'اتصل بنا',
            tagline: 'مورد مواد غذائية فاخرة للشركات',
            getQuote: 'احصل على عرض سعر',
            dubaiBased: 'دبي، الإمارات',
            admin: 'لوحة التحكم',

            // Hero Section
            heroTitle: 'شركة الكروم للتجارة',
            heroSubtitle: 'مورد محترف لمكونات الشوكولاتة والمخبوزات والآيس كريم',
            heroButton: 'استكشف المنتجات',

            // Hero Slider
            heroSlide1Title: 'مواد خام فاخرة',
            heroSlide1Subtitle: 'كاكاو وشوكولاتة ومكونات حلويات عالية الجودة',
            heroSlide2Title: 'تميز في خدمات الشركات',
            heroSlide2Subtitle: 'شريكك الموثوق في توريد المواد الغذائية بالجملة',
            heroSlide3Title: 'جودة مضمونة',
            heroSlide3Subtitle: 'منتجات فاخرة للخبازين ومحترفي الحلويات',
            heroSlide4Title: 'حلول مخابز احترافية',
            heroSlide4Subtitle: 'مجموعة شاملة من مكونات ومستلزمات المخابز',
            heroSlide5Title: 'حلويات فاخرة',
            heroSlide5Subtitle: 'مكونات ممتازة لإبداع حلويات لا تُنسى',
            heroSlide6Title: 'قهوة وأكثر',
            heroSlide6Subtitle: 'قهوة ومكسرات ومكونات متخصصة فاخرة',
            heroSlide7Title: 'حلويات شهية',
            heroSlide7Subtitle: 'حلوى ملونة ومخبوزات لكل مناسبة',
            heroSlide8Title: 'كوكيز مقرمش',
            heroSlide8Subtitle: 'مكونات كوكيز فاخرة لنتائج خبز مثالية',
            heroSlide9Title: 'معجنات طازجة',
            heroSlide9Subtitle: 'مكونات عالية الجودة لإبداعات المعجنات الفنية',

            // Stats
            happyClients: 'عميل راضٍ',
            premiumProducts: 'منتج فاخر',
            yearsExperience: 'سنوات خبرة',
            customerSupport: 'دعم العملاء',

            // Why Choose Us
            whyChooseTitle: 'لماذا The Vines Trading؟',
            whyChooseSubtitle: 'نقدم تجربة تجارية متميزة مع التزام كامل بالجودة ورضا العملاء',
            exceptionalQuality: 'جودة استثنائية',
            exceptionalQualityDesc: 'نختار أفضل المنتجات من موردين موثوقين عالمياً',
            trustedPartner: 'شريك موثوق',
            trustedPartnerDesc: 'نبني علاقات طويلة الأمد مع عملائنا',
            fastDelivery: 'توصيل سريع',
            fastDeliveryDesc: 'خدمة توصيل احترافية في الوقت المحدد',

            // Featured Products
            featuredProducts: 'منتجات مميزة',
            featuredProductsSubtitle: 'اكتشف مجموعة مختارة من أفضل منتجاتنا الفاخرة',
            browseAllProducts: 'تصفح جميع المنتجات',

            // CTA
            readyToStart: 'جاهز للبدء معنا؟',
            readyToStartSubtitle: 'انضم إلى مئات العملاء الراضين واكتشف تجربة تجارية استثنائية',
            browseProducts: 'تصفح المنتجات',

            // Products
            allProducts: 'جميع المنتجات',
            searchPlaceholder: 'ابحث باسم المنتج أو الكود...',
            categoryFilter: 'تصفية حسب الفئة',
            productCode: 'الكود',
            weight: 'الوزن',
            noProducts: 'لا توجد منتجات',

            // Categories
            categories: 'الفئات',
            'raw-materials': 'المواد الخام',
            'chocolates': 'الشوكولاتة',
            'creams-fillings': 'الكريمات والحشوات',
            'cake-decoration': 'مستلزمات تزيين الكيك',
            'ice-cream-gelato': 'الآيس كريم والجيلاتو',
            'beverages-syrups': 'المشروبات والسيروب',

            // Contact
            contactTitle: 'تواصل معنا',
            contactSubtitle: 'نحن هنا للإجابة على استفساراتكم ومساعدتكم',
            management: 'الإدارة',
            sales: 'المبيعات',
            info: 'معلومات',
            email: 'البريد الإلكتروني',
            phone: 'الهاتف',
            address: 'العنوان',
            whatsapp: 'واتساب',
            sendMessage: 'أرسل لنا رسالة',
            name: 'الاسم',
            emailAddress: 'البريد الإلكتروني',
            phoneNumber: 'رقم الهاتف',
            message: 'الرسالة',
            sendButton: 'إرسال الرسالة',
            messageSent: 'تم إرسال رسالتك بنجاح!',
            ourLocation: 'موقعنا',
            lootahBuilding: 'مبنى لوتاه، مكتب 206',
            ummRamool: 'أم رمول',
            dubaiUAE: 'دبي، الإمارات العربية المتحدة',
            weAreHereToHelp: 'نحن هنا للمساعدة',
            inquiriesSubtitle: 'للاستفسارات أو طلبات الجملة، تواصل معنا الآن',
            whatsappButton: 'واتساب',
            callButton: 'اتصل',
            productCode: 'رمز المنتج',
            weight: 'الوزن',
            description: 'الوصف',
            close: 'إغلاق',
            filterByCategory: 'تصفية حسب الفئة',
            allProducts: 'جميع المنتجات',

            // Testimonials
            testimonialsTitle: 'آراء عملائنا',
            testimonialsSubtitle: 'موثوق به من قبل المحترفين في جميع أنحاء الصناعة',
            testimonial1Name: 'أحمد المنصوري',
            testimonial1Text: 'منتجات ذات جودة ممتازة وخدمة متميزة. ذا فاينز شريكنا الموثوق منذ أكثر من 5 سنوات!',
            testimonial2Name: 'سارة جونسون',
            testimonial2Text: 'مكونات فاخرة تصنع فرقاً حقيقياً في مخبزنا. أوصي بها بشدة لأي مطبخ احترافي.',
            testimonial3Name: 'محمد حسن',
            testimonial3Text: 'توصيل سريع وجودة ثابتة. المورد المثالي لأعمال الحلويات لدينا.',
            verifiedCustomer: 'عميل موثق',

            // Filters and Sorting
            filtersAndSort: 'الفلاتر والترتيب',
            productsFound: 'منتج',
            clearFilters: 'مسح الكل',
            sortBy: 'رتب حسب',
            filterByWeight: 'فلتر حسب الوزن',
            sortNameAsc: 'الاسم (أ-ي)',
            sortNameDesc: 'الاسم (ي-أ)',
            sortCodeAsc: 'الكود (الأقل-الأعلى)',
            sortNewest: 'الأحدث أولاً',
            allWeights: 'جميع الأوزان',
            tryDifferentSearch: 'جرب بحثاً مختلفاً أو عدل الفلاتر',

            // About Page
            aboutUs: 'معلومات عنا',
            aboutSubtitle: 'تجربة تجارية مميزة ترتقي بأعمالكم',
            welcomeTitle: 'مرحباً بكم في ذا فاينز',
            welcomeText: 'مرحباً بكم في ذا فاينز، مصدركم الأمثل لتجربة تجارية مميزة ترتقي بأعمالكم. في ذا فاينز، نفخر بتقديم تشكيلة واسعة من أجود أنواع القهوة والمكسرات والشوكولاتة والحلويات، المختارة بعناية فائقة لتناسب أذواقكم الرفيعة. يرتكز التزامنا على مبدأين أساسيين: الجودة ورضا العملاء. نسعى جاهدين لتقديم منتجات لا تلبي توقعاتكم فحسب، بل تتجاوزها أيضاً، مما يضمن أن تكون كل تجربة لحظة من المتعة الخالصة. انطلاقاً من شغفنا بالجمال وتقديرنا للنكهات الأصيلة، يسعدنا أن نعرض لكم أفضل منتجاتنا في هذا المجال.',
            ourProductsTitle: 'منتجاتنا المميزة',
            ourProductsText: 'تجسد منتجاتنا مزيجاً مثالياً من الحرفية والابتكار والبراعة في فن الطهي. ندرك أن كل رشفة ولقمة هي رحلة، وندعوكم للانضمام إلينا في هذه المغامرة الممتعة. استمتعوا بفن التذوق مع فاينز، حيث يحكي كل منتج قصة نقاء وجودة وسعي دؤوب نحو لذة لا مثيل لها. من عبق قهوتنا الغني إلى قرمشة مكسراتنا الشهية وفخامة شوكولاتتنا وحلوياتنا، تعدكم فاينز بتجربة لا تُنسى تتجاوز المألوف. دللوا حواسكم، وتذوقوا اللحظة، ودعوا فاينز ترافقكم في رحلة تذوقكم.',
            coreValuesTitle: 'قيمنا الأساسية',
            qualityValue: 'الجودة',
            qualityValueDesc: 'نختار أفضل المنتجات بعناية فائقة',
            satisfactionValue: 'رضا العملاء',
            satisfactionValueDesc: 'نتجاوز توقعاتكم في كل مرة',
            authenticityValue: 'الأصالة',
            authenticityValueDesc: 'نكهات أصيلة وحرفية متقنة',
            readyToServe: 'جاهزون لخدمتكم',
            readyToServeSubtitle: 'اكتشفوا تشكيلتنا الواسعة من المنتجات الفاخرة',

            // Footer
            footerText: '© 2024 شركة الكروم للتجارة. جميع الحقوق محفوظة.',

            // Admin
            adminLogin: 'تسجيل دخول المشرف',
            username: 'اسم المستخدم',
            password: 'كلمة المرور',
            login: 'تسجيل الدخول',
            logout: 'تسجيل الخروج',
            dashboard: 'لوحة التحكم',
            addProduct: 'إضافة منتج',
            editProduct: 'تعديل منتج',
            deleteProduct: 'حذف منتج',
            addCategory: 'إضافة فئة',
            editCategory: 'تعديل فئة',
            deleteCategory: 'حذف فئة',
            save: 'حفظ',
            cancel: 'إلغاء',
        },
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
