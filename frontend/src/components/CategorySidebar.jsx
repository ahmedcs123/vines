import { useTranslation } from 'react-i18next';
import { Layers, Package, Coffee, Candy, IceCream, Cake, Sparkles } from 'lucide-react';

// Icon mapping for categories
const categoryIcons = {
    'raw-materials': Package,
    'chocolates': Candy,
    'creams-fillings': Sparkles,
    'cake-decoration': Cake,
    'ice-cream-gelato': IceCream,
    'beverages-syrups': Coffee,
};

function CategorySidebar({ categories, selectedCategory, onSelectCategory }) {
    const { t, i18n } = useTranslation();

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
            {/* Header */}
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
                <div className="bg-gradient-to-br from-primary to-accent p-3 rounded-xl shadow-lg">
                    <Layers className="text-white" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-primary">
                    {t('filterByCategory')}
                </h2>
            </div>

            {/* Categories */}
            <div className="space-y-2">
                {/* All Products */}
                <button
                    onClick={() => onSelectCategory(null)}
                    className={`w-full text-left px-5 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-3 rtl:space-x-reverse group ${!selectedCategory
                            ? 'bg-gradient-to-r from-accent to-primary text-white shadow-lg scale-105'
                            : 'bg-gray-50 text-gray-700 hover:bg-gradient-to-r hover:from-accent hover:to-primary hover:text-white hover:shadow-md hover:scale-102'
                        }`}
                >
                    <div className={`p-2 rounded-lg transition-colors ${!selectedCategory
                            ? 'bg-white bg-opacity-20'
                            : 'bg-white group-hover:bg-white group-hover:bg-opacity-20'
                        }`}>
                        <Layers size={20} className={!selectedCategory ? 'text-white' : 'text-accent group-hover:text-white'} />
                    </div>
                    <span className="flex-1">{t('allProducts')}</span>
                    {!selectedCategory && <span className="text-sm opacity-90">✓</span>}
                </button>

                {/* Category Items */}
                {categories.map((category) => {
                    const Icon = categoryIcons[category.slug] || Package;
                    const categoryName = i18n.language === 'ar' ? category.name_ar : category.name_en;
                    const isSelected = selectedCategory === category.slug;

                    return (
                        <button
                            key={category.id}
                            onClick={() => onSelectCategory(category.slug)}
                            className={`w-full text-left px-5 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-3 rtl:space-x-reverse group ${isSelected
                                    ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-lg scale-105'
                                    : 'bg-gray-50 text-gray-700 hover:bg-gradient-to-r hover:from-primary hover:to-primary-light hover:text-white hover:shadow-md hover:scale-102'
                                }`}
                        >
                            <div className={`p-2 rounded-lg transition-colors ${isSelected
                                    ? 'bg-white bg-opacity-20'
                                    : 'bg-white group-hover:bg-white group-hover:bg-opacity-20'
                                }`}>
                                <Icon size={20} className={isSelected ? 'text-white' : 'text-primary group-hover:text-white'} />
                            </div>
                            <span className="flex-1">{categoryName}</span>
                            {isSelected && <span className="text-sm opacity-90">✓</span>}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default CategorySidebar;
