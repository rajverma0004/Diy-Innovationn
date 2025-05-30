'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, 
  Users, 
  PackageSearch, 
  PlusCircle,
  LogOut,
  BarChart3
} from "lucide-react";

export default function AdminDashboard() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const dashboardItems = [
    {
      title: 'Order Management',
      description: 'View and manage customer orders',
      icon: ShoppingBag,
      href: '/admin/orders',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      stats: 'Track order status',
    },
    {
      title: 'Product Management',
      description: 'Manage your product catalog',
      icon: PackageSearch,
      href: '/admin/products',
      color: 'text-violet-500',
      bgColor: 'bg-violet-50',
      stats: 'View all products',
    },
    {
      title: 'User Management',
      description: 'Manage user accounts and roles',
      icon: Users,
      href: '/admin/users',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      stats: 'View all users',
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Welcome Section */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold">Admin Dashboard</CardTitle>
              <CardDescription className="mt-1">
                Manage your DIY Innovation platform
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
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-blue-600">
                <ShoppingBag className="h-5 w-5" />
                <span className="font-medium">Active Orders</span>
              </div>
              <div className="mt-2 text-2xl font-bold">0</div>
            </div>
            <div className="bg-violet-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-violet-600">
                <PackageSearch className="h-5 w-5" />
                <span className="font-medium">Total Products</span>
              </div>
              <div className="mt-2 text-2xl font-bold">0</div>
            </div>
            <div className="bg-emerald-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-emerald-600">
                <Users className="h-5 w-5" />
                <span className="font-medium">Total Users</span>
              </div>
              <div className="mt-2 text-2xl font-bold">0</div>
            </div>
          </div>
        </CardContent>
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
                </div>
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{item.description}</p>
                <div className="flex items-center text-sm text-gray-600">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  {item.stats}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link href="/admin/add-product">
              <Button variant="outline" className="w-full justify-start">
                <PlusCircle className="h-4 w-4 mr-2 text-violet-500" />
                Add New Product
              </Button>
            </Link>
            <Link href="/admin/orders">
              <Button variant="outline" className="w-full justify-start">
                <ShoppingBag className="h-4 w-4 mr-2 text-blue-500" />
                View Recent Orders
              </Button>
            </Link>
            <Link href="/admin/users">
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2 text-emerald-500" />
                Manage Users
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
