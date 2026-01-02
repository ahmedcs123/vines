import { useTranslation } from 'react-i18next';
import { X, Package, Tag, Weight } from 'lucide-react';

function ProductModal({ product, isOpen, onClose }) {
    const { t, i18n } = useTranslation();

    if (!isOpen || !product) return null;

    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const imageUrl = product.image && product.image !== 'placeholder.jpg'
        ? `${API_BASE_URL.replace('/api', '')}${product.image}`
        : null;

    const productName = i18n.language === 'ar' ? product.name_ar : product.name_en;
    const productDescription = i18n.language === 'ar' ? product.description_ar : product.description_en;
    const categoryName = product.category ? (i18n.language === 'ar' ? product.category.name_ar : product.category.name_en) : '';

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-50 animate-fadeIn"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                    className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-fadeInUp"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 ltr:right-4 rtl:left-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors z-10"
                        aria-label="Close"
                    >
                        <X size={24} className="text-gray-600" />
                    </button>

                    {/* Product Image */}
                    <div className="w-full h-64 bg-gradient-to-br from-secondary to-gray-100 flex items-center justify-center rounded-t-2xl relative overflow-hidden">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={productName}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'block';
                                }}
                            />
                        ) : null}
                        <div className={`text-9xl ${imageUrl ? 'hidden' : 'block'}`}>📦</div>

                        {/* Product Code Badge */}
                        <div className="absolute top-4 ltr:left-4 rtl:right-4 bg-primary text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                            {product.code}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        {/* Product Name */}
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                            {productName}
                        </h2>

                        {/* Category */}
                        {categoryName && (
                            <div className="flex items-center space-x-2 rtl:space-x-reverse text-accent mb-6">
                                <Tag size={20} />
                                <span className="text-lg font-semibold">{categoryName}</span>
                            </div>
                        )}

                        {/* Details Grid */}
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            {/* Product Code */}
                            <div className="bg-gradient-to-br from-secondary to-white p-6 rounded-xl shadow-md">
                                <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                                    <div className="bg-primary p-2 rounded-lg">
                                        <Package size={24} className="text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-primary">{t('productCode')}</h3>
                                </div>
                                <p className="text-2xl font-bold text-gray-800">{product.code}</p>
                            </div>

                            {/* Weight */}
                            <div className="bg-gradient-to-br from-secondary to-white p-6 rounded-xl shadow-md">
                                <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                                    <div className="bg-accent p-2 rounded-lg">
                                        <Weight size={24} className="text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-primary">{t('weight')}</h3>
                                </div>
                                <p className="text-2xl font-bold text-gray-800">{product.weight}</p>
                            </div>
                        </div>

                        {/* Description */}
                        {productDescription && (
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-primary mb-3 flex items-center space-x-2 rtl:space-x-reverse">
                                    <span>📋</span>
                                    <span>{t('description')}</span>
                                </h3>
                                <p className="text-gray-700 text-lg leading-relaxed bg-gray-50 p-4 rounded-lg">
                                    {productDescription}
                                </p>
                            </div>
                        )}

                        {/* Close Button */}
                        <div className="mt-8">
                            <button
                                onClick={onClose}
                                className="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-lg"
                            >
                                {t('close')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductModal;
