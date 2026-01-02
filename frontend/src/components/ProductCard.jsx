import { useTranslation } from 'react-i18next';
import { Package, Weight } from 'lucide-react';

function ProductCard({ product, onClick }) {
    const { i18n } = useTranslation();

    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const imageUrl = product.image && product.image !== 'placeholder.jpg'
        ? `${API_BASE_URL.replace('/api', '')}${product.image}`
        : 'https://via.placeholder.com/300x300?text=Product';

    const productName = i18n.language === 'ar' ? product.name_ar : product.name_en;

    return (
        <div
            className="card group cursor-pointer transform hover:scale-105 transition-all duration-300"
            onClick={() => onClick && onClick(product)}
        >
            {/* Product Image */}
            <div className="relative h-64 bg-gray-200 overflow-hidden">
                <img
                    src={imageUrl}
                    alt={productName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300?text=Product';
                    }}
                />
                {/* Code Badge */}
                <div className="absolute top-4 ltr:right-4 rtl:left-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {product.code}
                </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
                <h3 className="text-lg font-semibold text-primary mb-2 line-clamp-2">
                    {productName}
                </h3>

                <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600 mb-2">
                    <Weight size={18} />
                    <span>{product.weight}</span>
                </div>

                {product.description_en || product.description_ar ? (
                    <p className="text-sm text-gray-500 line-clamp-2">
                        {i18n.language === 'ar' ? product.description_ar : product.description_en}
                    </p>
                ) : null}
            </div>
        </div>
    );
}

export default ProductCard;
