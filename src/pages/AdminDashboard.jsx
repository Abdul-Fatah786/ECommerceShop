// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Package,
    Settings,
    PlusCircle,
    Edit,
    Trash,
    Loader,
    LogOut
} from 'lucide-react';
import axios from 'axios';
import UserModal from '../components/UserModal';
import ProductModal from '../components/ProductModal';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showUserModal, setShowUserModal] = useState(false);
    const [showProductModal, setShowProductModal] = useState(false);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [loading, setLoading] = useState({ users: true, products: true });
    const [error, setError] = useState({ users: null, products: null });
    const navigate = useNavigate();

    // Authentication check
    // useEffect(() => {
    //     if (!localStorage.getItem('token')) {
    //         navigate('/login');
    //     }
    // }, [navigate]);

    // Fetch users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/users', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUsers(response.data);
                setError(prev => ({ ...prev, users: null }));
            } catch (err) {
                setError(prev => ({ ...prev, users: err.response?.data?.message || 'Failed to fetch users' }));
            } finally {
                setLoading(prev => ({ ...prev, users: false }));
            }
        };

        fetchUsers();
    }, []);

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/products');
                setProducts(response.data);
                setError(prev => ({ ...prev, products: null }));
            } catch (err) {
                setError(prev => ({ ...prev, products: err.response?.data?.message || 'Failed to fetch products' }));
            } finally {
                setLoading(prev => ({ ...prev, products: false }));
            }
        };

        fetchProducts();
    }, []);

    // User CRUD Operations
    const handleUserDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:3001/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUsers(users.filter(user => user._id !== userId));
        } catch (err) {
            console.error('Error deleting user:', err);
        }
    };

    const handleUserSubmit = async (userData) => {
        try {
            if (editingItem) {
                const response = await axios.put(
                    `http://localhost:3001/users/${editingItem._id}`,
                    userData,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                setUsers(users.map(user =>
                    user._id === response.data._id ? response.data : user
                ));
            } else {
                const response = await axios.post(
                    'http://localhost:3001/users',
                    userData,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                setUsers([...users, response.data]);
            }
            setShowUserModal(false);
            setEditingItem(null);
        } catch (err) {
            console.error('Error saving user:', err);
        }
    };

    // Product CRUD Operations
    const handleProductDelete = async (productId) => {
        try {
            await axios.delete(`http://localhost:3001/products/${productId}`);
            setProducts(products.filter(product => product._id !== productId));
        } catch (err) {
            console.error('Error deleting product:', err);
        }
    };

    const handleProductSubmit = async (productData) => {
        try {
            if (editingItem) {
                const response = await axios.put(
                    `http://localhost:3001/products/${editingItem._id}`,
                    productData
                );
                setProducts(products.map(product =>
                    product._id === response.data._id ? response.data : product
                ));
            } else {
                const response = await axios.post(
                    'http://localhost:3001/products',
                    productData
                );
                setProducts([...products, response.data]);
            }
            setShowProductModal(false);
            setEditingItem(null);
        } catch (err) {
            console.error('Error saving product:', err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
            {/* Sidebar */}
            <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-orange-600 to-amber-600 text-white p-4 shadow-xl">
                <div className="p-4 mb-8">
                    <h1 className="text-2xl font-bold">Admin Panel</h1>
                </div>

                <nav className="space-y-2">
                    {['dashboard', 'users', 'products', 'settings'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`w-full flex items-center space-x-2 p-3 rounded-xl transition-all ${activeTab === tab
                                    ? 'bg-white/10 backdrop-blur-sm shadow-lg'
                                    : 'hover:bg-white/5'
                                }`}
                        >
                            {tab === 'dashboard' && <LayoutDashboard size={20} />}
                            {tab === 'users' && <Users size={20} />}
                            {tab === 'products' && <Package size={20} />}
                            {tab === 'settings' && <Settings size={20} />}
                            <span className="capitalize">{tab}</span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="ml-64 p-8 min-h-screen">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold capitalize bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                        {activeTab}
                    </h2>
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all"
                    >
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>

                {/* Users Section */}
                {activeTab === 'users' && (
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold">User Management</h3>
                            <button
                                onClick={() => {
                                    setEditingItem(null);
                                    setShowUserModal(true);
                                }}
                                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-xl flex items-center hover:from-orange-600 hover:to-amber-600 transition-all"
                            >
                                <PlusCircle size={18} className="mr-2" />
                                Add New User
                            </button>
                        </div>

                        {loading.users ? (
                            <div className="text-center py-8">
                                <Loader className="w-8 h-8 animate-spin text-orange-500 mx-auto" />
                            </div>
                        ) : error.users ? (
                            <div className="text-red-500 text-center py-8">{error.users}</div>
                        ) : (
                            <div className="overflow-x-auto rounded-xl border">
                                <table className="w-full">
                                    <thead className="bg-gradient-to-r from-orange-50 to-amber-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left">Name</th>
                                            <th className="px-6 py-4 text-left">Email</th>
                                            <th className="px-6 py-4 text-left">Role</th>
                                            <th className="px-6 py-4 text-left">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(user => (
                                            <tr key={user._id} className="border-t hover:bg-orange-50 transition-colors">
                                                <td className="px-6 py-4">{user.name}</td>
                                                <td className="px-6 py-4">{user.email}</td>
                                                <td className="px-6 py-4 capitalize">{user.role}</td>
                                                <td className="px-6 py-4 flex space-x-2">
                                                    <button
                                                        onClick={() => {
                                                            setEditingItem(user);
                                                            setShowUserModal(true);
                                                        }}
                                                        className="text-orange-600 hover:text-orange-800"
                                                    >
                                                        <Edit size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleUserDelete(user._id)}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        <Trash size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* Products Section */}
                {activeTab === 'products' && (
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold">Product Management</h3>
                            <button
                                onClick={() => {
                                    setEditingItem(null);
                                    setShowProductModal(true);
                                }}
                                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-xl flex items-center hover:from-orange-600 hover:to-amber-600 transition-all"
                            >
                                <PlusCircle size={18} className="mr-2" />
                                Add New Product
                            </button>
                        </div>

                        {loading.products ? (
                            <div className="text-center py-8">
                                <Loader className="w-8 h-8 animate-spin text-orange-500 mx-auto" />
                            </div>
                        ) : error.products ? (
                            <div className="text-red-500 text-center py-8">{error.products}</div>
                        ) : (
                            <div className="overflow-x-auto rounded-xl border">
                                <table className="w-full">
                                    <thead className="bg-gradient-to-r from-orange-50 to-amber-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left">Product</th>
                                            <th className="px-6 py-4 text-left">Price</th>
                                            <th className="px-6 py-4 text-left">Category</th>
                                            <th className="px-6 py-4 text-left">Stock</th>
                                            <th className="px-6 py-4 text-left">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(product => (
                                            <tr key={product._id} className="border-t hover:bg-orange-50 transition-colors">
                                                <td className="px-6 py-4">{product.name}</td>
                                                <td className="px-6 py-4">${product.price}</td>
                                                <td className="px-6 py-4 capitalize">{product.category}</td>
                                                <td className="px-6 py-4">{product.stock}</td>
                                                <td className="px-6 py-4 flex space-x-2">
                                                    <button
                                                        onClick={() => {
                                                            setEditingItem(product);
                                                            setShowProductModal(true);
                                                        }}
                                                        className="text-orange-600 hover:text-orange-800"
                                                    >
                                                        <Edit size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleProductDelete(product._id)}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        <Trash size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* Modals */}
                {showUserModal && (
                    <UserModal
                        initialData={editingItem}
                        onClose={() => {
                            setShowUserModal(false);
                            setEditingItem(null);
                        }}
                        onSubmit={handleUserSubmit}
                    />
                )}

                {showProductModal && (
                    <ProductModal
                        initialData={editingItem}
                        onClose={() => {
                            setShowProductModal(false);
                            setEditingItem(null);
                        }}
                        onSubmit={handleProductSubmit}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;