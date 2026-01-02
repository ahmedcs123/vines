import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LogOut, Plus, Edit, Trash2, Upload, X } from 'lucide-react';
import { login, getProducts, getCategories, createProduct, updateProduct, deleteProduct, createCategory, updateCategory, deleteCategory, uploadImage } from '../services/api';

function Admin() {
    const { t, i18n } = useTranslation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Tab state
    const [activeTab, setActiveTab] = useState('products'); // 'products' or 'categories'

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editingCategory, setEditingCategory] = useState(null);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        category_id: '',
        name_en: '',
        name_ar: '',
        code: '',
        weight: '',
        description_en: '',
        description_ar: '',
        image: '',
    });

    const [categoryFormData, setCategoryFormData] = useState({
        name_en: '',
        name_ar: '',
        slug: '',
        image: '',
    });

    useEffect(() => {
        if (isLoggedIn) {
            fetchData();
        }
    }, [isLoggedIn]);

    const fetchData = async () => {
        try {
            const [productsRes, categoriesRes] = await Promise.all([
                getProducts(),
                getCategories(),
            ]);
            setProducts(productsRes.data);
            setCategories(categoriesRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ username, password });
            if (response.data.success) {
                setIsLoggedIn(true);
                setError('');
            }
        } catch (error) {
            setError('Invalid credentials');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        setPassword('');
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const response = await uploadImage(file);
            if (activeTab === 'products') {
                setFormData({ ...formData, image: response.data.url });
            } else {
                setCategoryFormData({ ...categoryFormData, image: response.data.url });
            }
            setUploading(false);
        } catch (error) {
            console.error('Error uploading image:', error);
            setUploading(false);
            alert('Failed to upload image');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                await updateProduct(editingProduct.id, formData);
            } else {
                await createProduct(formData);
            }
            setShowModal(false);
            resetForm();
            fetchData();
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Failed to save product');
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            category_id: product.category_id,
            name_en: product.name_en,
            name_ar: product.name_ar,
            code: product.code,
            weight: product.weight,
            description_en: product.description_en || '',
            description_ar: product.description_ar || '',
            image: product.image,
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            await deleteProduct(id);
            fetchData();
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product');
        }
    };

    const resetForm = () => {
        setFormData({
            category_id: '',
            name_en: '',
            name_ar: '',
            code: '',
            weight: '',
            description_en: '',
            description_ar: '',
            image: '',
        });
        setEditingProduct(null);
    };

    // Category management functions
    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCategory) {
                await updateCategory(editingCategory.id, categoryFormData);
            } else {
                await createCategory(categoryFormData);
            }
            setShowModal(false);
            resetCategoryForm();
            fetchData();
        } catch (error) {
            console.error('Error saving category:', error);
            alert('Failed to save category');
        }
    };

    const handleCategoryEdit = (category) => {
        setEditingCategory(category);
        setCategoryFormData({
            name_en: category.name_en,
            name_ar: category.name_ar,
            slug: category.slug,
            image: category.image || '',
        });
        setShowModal(true);
    };

    const handleCategoryDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this category? This will also delete all products in this category.')) return;

        try {
            await deleteCategory(id);
            fetchData();
        } catch (error) {
            console.error('Error deleting category:', error);
            alert('Failed to delete category');
        }
    };

    const resetCategoryForm = () => {
        setCategoryFormData({
            name_en: '',
            name_ar: '',
            slug: '',
            image: '',
        });
        setEditingCategory(null);
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-primary mb-6 text-center">
                        {t('adminLogin')}
                    </h2>
                    {error && (
                        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t('username')}
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="input-field"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t('password')}
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field"
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary w-full">
                            {t('login')}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-primary">{t('dashboard')}</h1>
                    <div className="flex space-x-4 rtl:space-x-reverse">
                        <button
                            onClick={() => {
                                if (activeTab === 'products') {
                                    resetForm();
                                } else {
                                    resetCategoryForm();
                                }
                                setShowModal(true);
                            }}
                            className="btn-secondary flex items-center space-x-2 rtl:space-x-reverse"
                        >
                            <Plus size={20} />
                            <span>{activeTab === 'products' ? t('addProduct') : t('addCategory')}</span>
                        </button>
                        <button
                            onClick={handleLogout}
                            className="btn-primary flex items-center space-x-2 rtl:space-x-reverse"
                        >
                            <LogOut size={20} />
                            <span>{t('logout')}</span>
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-6 border-b border-gray-200">
                    <div className="flex space-x-8 rtl:space-x-reverse">
                        <button
                            onClick={() => setActiveTab('products')}
                            className={`pb-4 px-2 font-medium transition-colors ${activeTab === 'products'
                                ? 'border-b-2 border-primary text-primary'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {t('products')}
                        </button>
                        <button
                            onClick={() => setActiveTab('categories')}
                            className={`pb-4 px-2 font-medium transition-colors ${activeTab === 'categories'
                                ? 'border-b-2 border-primary text-primary'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {t('categories')}
                        </button>
                    </div>
                </div>


                {/* Products Table */}
                {activeTab === 'products' && (
                    <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-primary text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left">Code</th>
                                    <th className="px-6 py-3 text-left">Name (EN)</th>
                                    <th className="px-6 py-3 text-left">Name (AR)</th>
                                    <th className="px-6 py-3 text-left">Category</th>
                                    <th className="px-6 py-3 text-left">Weight</th>
                                    <th className="px-6 py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={product.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                        <td className="px-6 py-4 font-semibold">{product.code}</td>
                                        <td className="px-6 py-4">{product.name_en}</td>
                                        <td className="px-6 py-4">{product.name_ar}</td>
                                        <td className="px-6 py-4">{product.category_name_en}</td>
                                        <td className="px-6 py-4">{product.weight}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-2 rtl:space-x-reverse">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Categories Table */}
                {activeTab === 'categories' && (
                    <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-primary text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left">Name (EN)</th>
                                    <th className="px-6 py-3 text-left">Name (AR)</th>
                                    <th className="px-6 py-3 text-left">Slug</th>
                                    <th className="px-6 py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category, index) => (
                                    <tr key={category.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                        <td className="px-6 py-4 font-semibold">{category.name_en}</td>
                                        <td className="px-6 py-4">{category.name_ar}</td>
                                        <td className="px-6 py-4">
                                            <code className="bg-gray-100 px-2 py-1 rounded text-sm">{category.slug}</code>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-2 rtl:space-x-reverse">
                                                <button
                                                    onClick={() => handleCategoryEdit(category)}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleCategoryDelete(category.id)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-primary">
                                    {activeTab === 'products'
                                        ? (editingProduct ? t('editProduct') : t('addProduct'))
                                        : (editingCategory ? t('editCategory') : t('addCategory'))
                                    }
                                </h2>
                                <button onClick={() => setShowModal(false)}>
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Product Form */}
                            {activeTab === 'products' && (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Category *
                                            </label>
                                            <select
                                                value={formData.category_id}
                                                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                                                className="input-field"
                                                required
                                            >
                                                <option value="">Select Category</option>
                                                {categories.map((cat) => (
                                                    <option key={cat.id} value={cat.id}>
                                                        {cat.name_en} ({cat.name_ar})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Product Code *
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.code}
                                                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                                className="input-field"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Name (English) *
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.name_en}
                                                onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                                                className="input-field"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Name (Arabic) *
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.name_ar}
                                                onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                                                className="input-field"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Weight *
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.weight}
                                                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                                className="input-field"
                                                placeholder="e.g., 25 KG"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Image
                                            </label>
                                            <input
                                                type="file"
                                                onChange={handleImageUpload}
                                                accept="image/*"
                                                className="input-field"
                                                disabled={uploading}
                                            />
                                            {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Description (English)
                                        </label>
                                        <textarea
                                            value={formData.description_en}
                                            onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                                            className="input-field"
                                            rows="3"
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Description (Arabic)
                                        </label>
                                        <textarea
                                            value={formData.description_ar}
                                            onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                                            className="input-field"
                                            rows="3"
                                        ></textarea>
                                    </div>

                                    <div className="flex space-x-4 rtl:space-x-reverse pt-4">
                                        <button type="submit" className="btn-primary flex-1">
                                            {t('save')}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                            className="btn-secondary flex-1"
                                        >
                                            {t('cancel')}
                                        </button>
                                    </div>
                                </form>
                            )}

                            {/* Category Form */}
                            {activeTab === 'categories' && (
                                <form onSubmit={handleCategorySubmit} className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Name (English) *
                                            </label>
                                            <input
                                                type="text"
                                                value={categoryFormData.name_en}
                                                onChange={(e) => setCategoryFormData({ ...categoryFormData, name_en: e.target.value })}
                                                className="input-field"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Name (Arabic) *
                                            </label>
                                            <input
                                                type="text"
                                                value={categoryFormData.name_ar}
                                                onChange={(e) => setCategoryFormData({ ...categoryFormData, name_ar: e.target.value })}
                                                className="input-field"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Slug *
                                            </label>
                                            <input
                                                type="text"
                                                value={categoryFormData.slug}
                                                onChange={(e) => setCategoryFormData({ ...categoryFormData, slug: e.target.value })}
                                                className="input-field"
                                                placeholder="e.g., grains-pulses"
                                                required
                                            />
                                            <p className="text-xs text-gray-500 mt-1">URL-friendly identifier (lowercase, use hyphens)</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Image
                                            </label>
                                            <input
                                                type="file"
                                                onChange={handleImageUpload}
                                                accept="image/*"
                                                className="input-field"
                                                disabled={uploading}
                                            />
                                            {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
                                        </div>
                                    </div>

                                    <div className="flex space-x-4 rtl:space-x-reverse pt-4">
                                        <button type="submit" className="btn-primary flex-1">
                                            {t('save')}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                            className="btn-secondary flex-1"
                                        >
                                            {t('cancel')}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Admin;
