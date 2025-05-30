'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PackageSearch, Plus, Pencil, Trash2, Star } from "lucide-react";
import toast from 'react-hot-toast';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/product/getall');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/product/delete/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        toast.success('Product deleted successfully');
        fetchProducts(); // Refresh products list
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const toggleFeatured = async (productId, currentFeatured) => {
    try {
      const response = await fetch(`http://localhost:5000/product/update/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ featured: !currentFeatured })
      });
      
      if (response.ok) {
        toast.success(currentFeatured ? 'Product unfeatured' : 'Product featured');
        fetchProducts(); // Refresh products list
      } else {
        throw new Error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <PackageSearch className="h-6 w-6 text-violet-500" />
          Products
        </h1>
        <Link href="/admin/add-product">
          <Button className="bg-violet-600 hover:bg-violet-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {products.map((product) => (
              <div key={product._id} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden">
                      <img
                        src={product.images[0] || '/placeholder.svg'}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {product.detail}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Category & Difficulty</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <Badge className="bg-violet-100 text-violet-800">
                        {product.category}
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800">
                        {product.difficulty}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Kits</h4>
                    <div className="space-y-1 mt-1">
                      {product.kits?.map((kit, idx) => (
                        <div key={idx} className="text-sm flex justify-between">
                          <span>{kit.kitName}</span>
                          <span className="text-violet-600">${kit.kitPrice}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className={`${
                        product.featured
                          ? 'text-yellow-500 hover:text-yellow-600'
                          : 'text-gray-400 hover:text-gray-500'
                      }`}
                      onClick={() => toggleFeatured(product._id, product.featured)}
                    >
                      <Star className="h-4 w-4" />
                    </Button>
                    <Link href={`/admin/edit-product/${product._id}`}>
                      <Button size="icon" variant="ghost" className="text-blue-500 hover:text-blue-600">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => deleteProduct(product._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {products.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                <p className="mt-1 text-gray-500">Get started by adding a new product</p>
                <Link href="/admin/add-product" className="mt-4 inline-block">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
