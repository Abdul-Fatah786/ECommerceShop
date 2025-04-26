// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Mail, Lock, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // eslint-disable-next-line no-unused-vars
    const [passwordError, setPasswordError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setPasswordError("Both fields are required");
            return;
        }

        setIsSubmitting(true);

        const loginData = {
            email: formData.email,
            password: formData.password,
        };

        try {
            const response = await axios.post('http://localhost:3001/users/login', loginData);

            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            navigate('/');
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed';
            if (error.response?.status === 401) {
                if (message.includes('verify')) {
                    navigate('/verify-otp');
                } else {
                    setPasswordError(message);
                }
            } else {
                setPasswordError(message);
            }
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 lg:p-12">
                <div className="mb-8 text-center">
                    <ShoppingCart className="mx-auto h-12 w-12 text-orange-600 mb-4 animate-bounce" />
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
                        Welcome Back!
                    </h1>
                    <p className="text-gray-600">Continue your shopping journey with us</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-700">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="email"
                                placeholder="john@example.com"
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-gray-700">Password</label>
                            <Link
                                to="/forgot-password"
                                className="text-sm text-orange-600 hover:text-orange-700 transition-colors"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-300 transform hover:scale-[1.01] shadow-lg hover:shadow-orange-200 disabled:opacity-80"
                    >
                        {isSubmitting ? 'Signing In...' : 'Continue Shopping →'}
                    </button>

                    <div className="relative mt-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <button
                            type="button"
                            className="flex items-center justify-center gap-2 w-full py-3 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 48 48">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                            </svg>
                            <span>Google</span>
                        </button>
                        <button
                            type="button"
                            className="flex items-center justify-center gap-2 w-full py-3 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            <span>Facebook</span>
                        </button>
                    </div>

                    <p className="text-center text-sm text-gray-600 mt-8">
                        New to our store?{' '}
                        <Link
                            to="/signup"
                            className="font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                        >
                            Start your journey here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;