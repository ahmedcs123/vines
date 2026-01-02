import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import CategorySidebar from '../components/CategorySidebar';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { getCategories, getProducts } from '../services/api';

function Products() {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(
        searchParams.get('category') || null
    );
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory, searchQuery]);

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = {};
            if (selectedCategory) params.category = selectedCategory;
            if (searchQuery) params.search = searchQuery;

            const response = await getProducts(params);
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    const handleCategorySelect = (categorySlug) => {
        setSelectedCategory(categorySlug);
        if (categorySlug) {
            setSearchParams({ category: categorySlug });
        } else {
            setSearchParams({});
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container mx-auto px-4">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-primary mb-4">
                        {t('products')}
                    </h1>

                    {/* Search Bar */}
                    <div className="relative max-w-2xl">
                        <Search
                            className="absolute top-1/2 transform -translate-y-1/2 ltr:left-4 rtl:right-4 text-gray-400"
                            size={20}
                        />
                        <input
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            value={searchQuery}
                            onChange={handleSearch}
                            className="input-field ltr:pl-12 rtl:pr-12 w-full"
                        />
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <CategorySidebar
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onSelectCategory={handleCategorySelect}
                        />
                    </aside>

                    {/* Products Grid */}
                    <main className="lg:col-span-3">
                        {loading ? (
                            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {[...Array(9)].map((_, i) => (
                                    <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                                        <div className="h-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
                                        <div className="p-4 space-y-3">
                                            <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%] animate-shimmer w-3/4"></div>
                                            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%] animate-shimmer w-1/2"></div>
                                            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%] animate-shimmer"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : products.length > 0 ? (
                            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <ProductCard 
                                        key={product.id} 
                                        product={product} 
                                        onClick={handleProductClick}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-white rounded-xl shadow-lg">
                                <div className="text-6xl mb-4">🔍</div>
                                <p className="text-2xl text-gray-500 font-semibold">{t('noProducts')}</p>
                            </div>
                        )}
                    </main>
                </div>

                {/* ProductModal */}
                <ProductModal 
                    product={selectedProduct}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            </div>
        </div>
    );
}

export default Products;
