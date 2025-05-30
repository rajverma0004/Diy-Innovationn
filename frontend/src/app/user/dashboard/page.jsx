'use client';

import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, User, Package, LogOut } from "lucide-react";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const dashboardItems = [
    {
      title: 'My Profile',
      description: 'View and edit your personal information',
      icon: User,
      href: '/user/profile',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'My Orders',
      description: 'Track and manage your orders',
      icon: Package,
      href: '/user/myorders',
      color: 'text-violet-500',
      bgColor: 'bg-violet-50',
      count: 0, // You can update this with actual order count
    },
    {
      title: 'Shopping Cart',
      description: 'View items in your cart',
      icon: ShoppingBag,
      href: '/cart',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      count: cart.length,
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Welcome Section */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold">Welcome, {user?.name}!</CardTitle>
              <CardDescription className="mt-1">
                Manage your DIY Innovation account and orders
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardItems.map((item) => (
          <Link key={item.title} href={item.href}>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${item.bgColor} p-3 rounded-lg`}>
                    <item.icon className={`h-6 w-6 ${item.color}`} />
                  </div>
                  {typeof item.count !== 'undefined' && (
                    <div className="bg-gray-100 text-gray-600 text-sm font-medium px-2.5 py-0.5 rounded-full">
                      {item.count}
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Activity Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link href="/browse">
              <Button variant="outline" className="w-full justify-start">
                <Package className="h-4 w-4 mr-2 text-violet-500" />
                Browse DIY Projects
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="outline" className="w-full justify-start">
                <ShoppingBag className="h-4 w-4 mr-2 text-emerald-500" />
                View Cart ({cart.length})
              </Button>
            </Link>
            <Link href="/user/myorders">
              <Button variant="outline" className="w-full justify-start">
                <Package className="h-4 w-4 mr-2 text-blue-500" />
                Track Orders
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
