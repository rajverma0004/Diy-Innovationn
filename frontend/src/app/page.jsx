'use client';
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  ArrowRight,
  ChevronRight,
  Gift,
  Package,
  Scissors,
  Star,
  PenToolIcon as Tool,
  Heart,
  Instagram,
  Youtube,
  PinIcon as Pinterest,
  ShoppingBag,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/Navbar"

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [projectOfMonth, setProjectOfMonth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/product/getall');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        
        // Filter featured products
        const featured = data.filter(product => product.featured);
        setFeaturedProducts(featured);

        // Extract unique categories
        const uniqueCategories = Array.from(new Set(data.map(product => product.category)))
          .map(category => {
            const productsInCategory = data.filter(product => product.category === category);
            const firstProduct = productsInCategory[0];
            return {
              name: category,
              image: firstProduct?.images?.[0] || '/placeholder.svg',
              count: productsInCategory.length
            };
          });
        setCategories(uniqueCategories);

        // Find the highest rated product for Project of the Month
        const highestRated = data.reduce((prev, current) => {
          return (prev.rating > current.rating) ? prev : current;
        });
        setProjectOfMonth(highestRated);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#fcf9f2]">
      {/* Decorative header strip */}
      <div className="w-full h-2 bg-gradient-to-r from-[#e57373] via-[#81c784] to-[#64b5f6]"></div>
      <Navbar/>

      <main className="flex-1">
        {/* Hero section with craft paper texture */}
        <section
          className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden"
          style={{
            backgroundImage: `url("")`,
            backgroundColor: "#f5efe6",
          }}
        >
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-[#81c784]/10 -z-10"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-[#64b5f6]/10 -z-10"></div>
          <div className="absolute top-1/4 right-1/4 w-16 h-16 rounded-full bg-[#e57373]/10 -z-10"></div>

          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <Badge className="w-fit bg-[#e57373] hover:bg-[#d05757]">Handmade with Love</Badge>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-serif text-[#4a4a4a]">
                    Unleash Your <span className="text-[#e57373]">Creativity</span> with DIY Craft Kits
                  </h1>
                  <p className="max-w-[600px] text-[#6b6b6b] md:text-xl">
                    Everything you need to create beautiful handmade treasures, delivered in one perfect package. No
                    experience needed!
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="gap-1 bg-[#e57373] hover:bg-[#d05757] rounded-full px-6">
                    Explore Kits <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-[#81c784] text-[#81c784] hover:bg-[#e8f5e9] px-6"
                  >
                    Watch Tutorials
                  </Button>
                </div>
              </div>
              <div className="relative mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last">
                <div className="absolute inset-0 border-4 border-dashed border-[#e5e5e5] rounded-xl -z-10 transform rotate-1"></div>
                <Image
                  src="https://imgs.search.brave.com/8uACdS-hB97nFlstxk5O2N5H5a6j4el7fF8-DGcSRyM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM5/NDM1OTc1MS9waG90/by93b21hbi1wYWlu/dGluZy13b29kZW4t/Ym94LWRvaW5nLXNv/bWUtcmVub3ZhdGlu/Zy1ob3VzZXdvcmst/b3V0ZG9vcnMuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPU15/YzdkWGhGdW9RTFR2/UmFXbnkzTnpPSWNh/RlBMZGRPQ3I3bVFt/YmYwNEE9"
                  width={800}
                  height={550}
                  alt="Crafting supplies and a person working on a DIY project"
                  className="h-full w-full object-cover rounded-lg transform -rotate-1 shadow-lg"
                />
                {/* Decorative elements */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#81c784]/20 rounded-full -z-10"></div>
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#e57373]/20 rounded-full -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories section */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-[#4a4a4a] inline-block relative font-serif">
                <span className="relative z-10">Browse by Category</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-[#ffd54f]/40 -z-10 transform -rotate-1"></span>
              </h2>
            </div>

            {loading ? (
              <div className="text-center py-10">Loading categories...</div>
            ) : error ? (
              <div className="text-center py-10 text-red-500">{error}</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((category) => (
                  <Link 
                    key={category.name} 
                    href={`/browse?category=${encodeURIComponent(category.name)}`}
                    className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/60 to-transparent z-10"></div>
                    <Image
                      src={category.image}
                      width={300}
                      height={300}
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 w-full p-4 z-20">
                      <h3 className="text-white font-medium text-lg">{category.name}</h3>
                      <p className="text-white/80 text-sm">{category.count} projects</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Featured products with craft-inspired design */}

        {/* Project of the month section */}
        <section className="w-full py-12 md:py-24 bg-[#f5efe6] relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#ffd54f]/20 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#e57373]/10 rounded-full translate-y-1/3 -translate-x-1/3"></div>

          <div className="container px-4 md:px-6 relative">
            <div className="text-center mb-12">
              <Badge className="bg-[#ffd54f] text-[#4a4a4a] mb-4">Project of the Month</Badge>
              {loading ? (
                <div>Loading project...</div>
              ) : error ? (
                <div className="text-red-500">{error}</div>
              ) : projectOfMonth ? (
                <>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl font-serif text-[#4a4a4a]">
                    {projectOfMonth.name}
                  </h2>

                  <div className="grid md:grid-cols-2 gap-8 items-center mt-8">
                    <div className="relative">
                      <div className="absolute inset-0 border-4 border-dashed border-[#e5e5e5] rounded-xl -z-10 transform rotate-3"></div>
                      <Image
                        src={projectOfMonth.images?.[0] || '/placeholder.svg'}
                        width={600}
                        height={600}
                        alt={projectOfMonth.name}
                        className="rounded-lg shadow-lg transform -rotate-3"
                      />
                      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#81c784]/20 rounded-full -z-10"></div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                          {[...Array(Math.round(projectOfMonth.rating))].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-[#ffd54f] text-[#ffd54f]" />
                          ))}
                        </div>
                        <span className="text-[#6b6b6b]">({projectOfMonth.rating} rating)</span>
                      </div>

                      <div className="space-y-2">
                        <p className="text-lg text-[#6b6b6b]">{projectOfMonth.detail}</p>

                        <div className="flex flex-wrap gap-2 py-2">
                          <Badge variant="outline" className="bg-white text-[#6b6b6b] border-[#e5e5e5]">
                            {projectOfMonth.difficulty}
                          </Badge>
                          {projectOfMonth.category && (
                            <Badge variant="outline" className="bg-white text-[#6b6b6b] border-[#e5e5e5]">
                              {projectOfMonth.category}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link href={`/project/${projectOfMonth._id}`}>
                          <Button size="lg" className="bg-[#81c784] hover:bg-[#66bb6a] rounded-full">
                            View Project
                          </Button>
                        </Link>
                        {projectOfMonth.video && (
                          <Button
                            size="lg"
                            variant="outline"
                            className="border-[#e57373] text-[#e57373] hover:bg-[#f8e8e8] rounded-full"
                            onClick={() => window.open(projectOfMonth.video, '_blank')}
                          >
                            Watch Tutorial
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div>No projects available</div>
              )}
            </div>
          </div>
        </section>

        {/* How it works section with craft-inspired design */}
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl font-serif text-[#4a4a4a] inline-block relative">
                  <span className="relative z-10">How It Works</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-[#64b5f6]/30 -z-10 transform -rotate-1"></span>
                </h2>
                <p className="max-w-[900px] text-[#6b6b6b] md:text-xl">
                  Creating beautiful DIY projects has never been easier.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3 relative">
              {/* Connecting dotted line */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-[#e5e5e5] -z-10"></div>

              <div className="flex flex-col items-center space-y-4 text-center relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#ffd54f]/30 border-4 border-white shadow-md z-10">
                  <Gift className="h-8 w-8 text-[#4a4a4a]" />
                </div>
                <h3 className="text-xl font-bold text-[#4a4a4a]">1. Choose Your Kit</h3>
                <p className="text-[#6b6b6b]">
                  Browse our collection of DIY kits and select the project that inspires you.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4 text-center relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#81c784]/30 border-4 border-white shadow-md z-10">
                  <Package className="h-8 w-8 text-[#4a4a4a]" />
                </div>
                <h3 className="text-xl font-bold text-[#4a4a4a]">2. Receive Your Kit</h3>
                <p className="text-[#6b6b6b]">
                  Your kit arrives with all materials, tools, and step-by-step instructions.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4 text-center relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#e57373]/30 border-4 border-white shadow-md z-10">
                  <Tool className="h-8 w-8 text-[#4a4a4a]" />
                </div>
                <h3 className="text-xl font-bold text-[#4a4a4a]">3. Create & Enjoy</h3>
                <p className="text-[#6b6b6b]">
                  Follow our easy instructions or video tutorials to complete your project.
                </p>
              </div>
            </div>
          </div>
        </section>



        {/* Newsletter section with craft-inspired design */}
        <section className="w-full py-12 md:py-24 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e5e5e5' fillOpacity='0.4' fillRule='evenodd'%3E%3Cpath d='M5 0h1L0 5v1H5v1H0V5z'/%3E%3C/g%3E%3C/svg%3E')] opacity-30 -z-10"></div>

          <div className="container px-4 md:px-6">
            <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden bg-white shadow-xl">
              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-[#ffd54f]/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#e57373]/20 rounded-full translate-x-1/3 translate-y-1/3"></div>

              <div className="grid gap-6 lg:grid-cols-2 p-6 md:p-10 relative">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tighter font-serif text-[#4a4a4a]">
                      Join Our Creative Community
                    </h2>
                    <p className="text-[#6b6b6b] md:text-lg">
                      Subscribe for DIY inspiration, exclusive offers, and new kit announcements.
                    </p>
                  </div>
                  <div className="flex w-full max-w-sm flex-col gap-2">
                    <form className="flex flex-col gap-2 sm:flex-row">
                      <Input
                        placeholder="Enter your email"
                        type="email"
                        className="max-w-lg flex-1 border-[#e5e5e5] focus:border-[#e57373] focus:ring-[#e57373]"
                      />
                      <Button type="submit" className="bg-[#e57373] hover:bg-[#d05757] rounded-full">
                        Subscribe
                      </Button>
                    </form>
                    <p className="text-xs text-[#6b6b6b]">By subscribing, you agree to our terms and privacy policy.</p>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 bg-[#f5efe6]">
                      <Instagram className="h-5 w-5 text-[#4a4a4a]" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 bg-[#f5efe6]">
                      <Pinterest className="h-5 w-5 text-[#4a4a4a]" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 bg-[#f5efe6]">
                      <Youtube className="h-5 w-5 text-[#4a4a4a]" />
                    </Button>
                  </div>
                </div>

                <div className="relative hidden lg:block">
                  <div className="absolute inset-0 border-4 border-dashed border-[#e5e5e5] rounded-xl -z-10 transform rotate-2"></div>
                  <Image
                    src="https://imgs.search.brave.com/PAfQ_OZvKOyqldrIZkpxTA9rsleQk_rexlNDImAHjJ4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnNo/Z2Nkbi5jb20vMGFm/YjU5NjctNDAzZS00/N2U4LThkYzUtMDM2/MzYzMTUwYjliLy0v/Zm9ybWF0L2F1dG8v/LS9wcmV2aWV3LzMw/MDB4MzAwMC8tL3F1/YWxpdHkvbGlnaHRl/ci8.jpeg"
                    width={500}
                    height={400}
                    alt="DIY community crafting together"
                    className="h-full w-full object-cover rounded-lg transform -rotate-2 shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-8 bg-[#f5efe6]">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4 text-[#4a4a4a]">Shop</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-[#6b6b6b] hover:text-[#e57373] transition-colors">
                    All Kits
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#6b6b6b] hover:text-[#e57373] transition-colors">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#6b6b6b] hover:text-[#e57373] transition-colors">
                    Bestsellers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#6b6b6b] hover:text-[#e57373] transition-colors">
                    Gift Cards
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-[#4a4a4a]">Learn</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-[#6b6b6b] hover:text-[#e57373] transition-colors">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#6b6b6b] hover:text-[#e57373] transition-colors">
                    Workshops
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#6b6b6b] hover:text-[#e57373] transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#6b6b6b] hover:text-[#e57373] transition-colors">
                    Resources
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-[#4a4a4a]">About</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-[#6b6b6b] hover:text-[#e57373] transition-colors">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#6b6b6b] hover:text-[#e57373] transition-colors">
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#6b6b6b] hover:text-[#e57373] transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#6b6b6b] hover:text-[#e57373] transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-[#4a4a4a]">Help</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-[#6b6b6b] hover:text-[#e57373] transition-colors">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#6b6b6b] hover:text-[#e57373] transition-colors">
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#6b6b6b] hover:text-[#e57373] transition-colors">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#6b6b6b] hover:text-[#e57373] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-[#e5e5e5]">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Scissors className="h-6 w-6 text-[#e57373] rotate-[-45deg]" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#81c784] rounded-full"></div>
              </div>
              <span className="font-bold text-[#4a4a4a] font-serif">Craft Haven</span>
            </div>

            <p className="text-sm text-[#6b6b6b]">© 2024 Craft Haven. All rights reserved. Handcrafted with ❤️</p>

            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-[#f5efe6]">
                <Instagram className="h-4 w-4 text-[#4a4a4a]" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-[#f5efe6]">
                <Pinterest className="h-4 w-4 text-[#4a4a4a]" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-[#f5efe6]">
                <Youtube className="h-4 w-4 text-[#4a4a4a]" />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
