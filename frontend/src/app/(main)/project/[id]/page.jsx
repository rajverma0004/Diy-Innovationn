'use client';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useCart } from '@/context/CartContext';

const ProductDetail = () => {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/product/getbyid/${params.id}`);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                toast.error('Failed to load product details');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [params.id]);

    const calculateTotalPrice = () => {
        if (!product.kits || product.kits.length === 0) return 0;
        return product.kits.reduce((sum, kit) => sum + kit.kitPrice, 0);
    };

    const handleAddToCart = () => {
        if (!product.kits || product.kits.length === 0) return;
        
        const cartItem = {
            _id: product._id,
            name: product.name,
            price: calculateTotalPrice(),
            images: product.images,
            kits: product.kits
        };
        addToCart(cartItem);
        toast.success('Project added to cart!');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-700">Product not found</h2>
                    <p className="text-gray-500 mt-2">The product you're looking for doesn't exist or has been removed.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="md:flex">
                        {/* Image Gallery Section */}
                        <div className="md:w-1/2 p-6">
                            <div className="relative aspect-square mb-4">
                                <img
                                    src={product.images[selectedImage]}
                                    alt={product.name}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`aspect-square rounded-md overflow-hidden border-2 ${
                                            selectedImage === index ? 'border-violet-500' : 'border-transparent'
                                        }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Details Section */}
                        <div className="md:w-1/2 p-6">
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                            <p className="text-gray-600 mb-6">{product.detail}</p>

                            {/* Creator Info */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Creator</h3>
                                <p className="text-gray-600">{product.creator}</p>
                            </div>

                            {/* Project Price and Add to Cart */}
                            {product.kits && product.kits.length > 0 && (
                                <div className="mb-6">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">Complete Project Kit</h3>
                                            <p className="text-sm text-gray-600">Includes all necessary components</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-violet-600 mb-2">
                                                ${calculateTotalPrice()}
                                            </div>
                                            <button 
                                                onClick={handleAddToCart}
                                                className="bg-violet-500 text-white py-2 px-6 rounded-md hover:bg-violet-600 transition-colors duration-200"
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <h4 className="font-medium text-gray-800 mb-2">Included Components:</h4>
                                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                                            {product.kits.map((kit, index) => (
                                                <li key={index}>{kit.kitName}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* Project Requirements */}
                            {product.requirements && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Project Requirements</h3>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-gray-600 whitespace-pre-line">{product.requirements}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;