import Image from "next/image"
import Link from "next/link"
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

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fcf9f2]">
      {/* Decorative header strip */}
      <div className="w-full h-2 bg-gradient-to-r from-[#e57373] via-[#81c784] to-[#64b5f6]"></div>

      <header className="sticky top-0 z-50 w-full border-b bg-[#fcf9f2]/95 backdrop-blur supports-[backdrop-filter]:bg-[#fcf9f2]/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative">
                <Scissors className="h-6 w-6 text-[#e57373] rotate-[-45deg]" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#81c784] rounded-full"></div>
              </div>
              <span className="inline-block font-bold text-[#4a4a4a] font-serif">Craft Haven</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link
                href="#"
                className="flex items-center text-sm font-medium text-[#4a4a4a] transition-colors hover:text-[#e57373]"
              >
                Shop Kits
              </Link>
              <Link
                href="#"
                className="flex items-center text-sm font-medium text-[#4a4a4a] transition-colors hover:text-[#e57373]"
              >
                Tutorials
              </Link>
              <Link
                href="#"
                className="flex items-center text-sm font-medium text-[#4a4a4a] transition-colors hover:text-[#e57373]"
              >
                Inspiration
              </Link>
              <Link
                href="#"
                className="flex items-center text-sm font-medium text-[#4a4a4a] transition-colors hover:text-[#e57373]"
              >
                Community
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="text-[#4a4a4a] hover:text-[#e57373] hover:bg-[#f8e8e8]"
                asChild
              >
                <Link href="#">
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Wishlist</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-[#4a4a4a] hover:text-[#e57373] hover:bg-[#f8e8e8]"
                asChild
              >
                <Link href="#">
                  <ShoppingBag className="h-5 w-5" />
                  <span className="sr-only">Cart</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:inline-flex border-[#e57373] text-[#e57373] hover:bg-[#f8e8e8]"
                asChild
              >
                <Link href="#">Sign In</Link>
              </Button>
              <Button size="sm" className="hidden sm:inline-flex bg-[#e57373] hover:bg-[#d05757]">
                Sign Up
              </Button>
            </nav>
          </div>
        </div>
      </header>

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
                  src="/placeholder.svg?height=550&width=800"
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

        {/* Categories section with paper cut-out style */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-[#4a4a4a] inline-block relative font-serif">
                <span className="relative z-10">Find Your Perfect Project</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-[#ffd54f]/40 -z-10 transform -rotate-1"></span>
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/60 to-transparent z-10"></div>
                <Image
                  src=""
                  width={300}
                  height={300}
                  alt="Home Decor"
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-full p-4 z-20">
                  <h3 className="text-white font-medium text-lg">Home Decor</h3>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/60 to-transparent z-10"></div>
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  width={300}
                  height={300}
                  alt="Jewelry"
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-full p-4 z-20">
                  <h3 className="text-white font-medium text-lg">Jewelry</h3>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/60 to-transparent z-10"></div>
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  width={300}
                  height={300}
                  alt="Paper Crafts"
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-full p-4 z-20">
                  <h3 className="text-white font-medium text-lg">Paper Crafts</h3>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/60 to-transparent z-10"></div>
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  width={300}
                  height={300}
                  alt="Kids Projects"
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-full p-4 z-20">
                  <h3 className="text-white font-medium text-lg">Kids Projects</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured products with craft-inspired design */}
        <section className="w-full py-12 md:py-24 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23e5e5e5' fillOpacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30 -z-10"></div>

          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <div className="inline-block rounded-full bg-[#ffd54f]/30 px-3 py-1 text-sm text-[#4a4a4a] font-medium">
                  Bestsellers
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl font-serif text-[#4a4a4a]">
                  Handpicked DIY Kits for You
                </h2>
                <p className="text-[#6b6b6b] md:text-lg">
                  Complete kits with premium materials and step-by-step instructions to create something beautiful.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
              {/* Product card 1 with craft-inspired design */}
              <Card className="group overflow-hidden border-none bg-white shadow-md hover:shadow-xl transition-all">
                <div className="relative">
                  <div className="absolute top-2 right-2 z-10">
                    <Badge className="bg-[#e57373]">Bestseller</Badge>
                  </div>
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=400&width=400"
                      width={400}
                      height={400}
                      alt="Macrame Wall Hanging Kit"
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#4a4a4a] group-hover:text-[#e57373] transition-colors">
                    Macrame Wall Hanging
                  </CardTitle>
                  <CardDescription className="text-[#6b6b6b]">Complete beginner-friendly kit</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-[#4a4a4a]">$39.99</div>
                    <div className="flex items-center gap-0.5">
                      <Star className="h-4 w-4 fill-[#ffd54f] text-[#ffd54f]" />
                      <Star className="h-4 w-4 fill-[#ffd54f] text-[#ffd54f]" />
                      <Star className="h-4 w-4 fill-[#ffd54f] text-[#ffd54f]" />
                      <Star className="h-4 w-4 fill-[#ffd54f] text-[#ffd54f]" />
                      <Star className="h-4 w-4 fill-[#e5e5e5] text-[#e5e5e5]" />
                      <span className="ml-1 text-sm text-[#6b6b6b]">(42)</span>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    <Badge variant="outline" className="bg-[#f5efe6] text-[#6b6b6b] border-[#e5e5e5]">
                      2-3 hours
                    </Badge>
                    <Badge variant="outline" className="bg-[#f5efe6] text-[#6b6b6b] border-[#e5e5e5]">
                      Beginner
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-[#81c784] hover:bg-[#66bb6a] rounded-full">Add to Cart</Button>
                </CardFooter>
              </Card>

              {/* Product card 2 */}
              <Card className="group overflow-hidden border-none bg-white shadow-md hover:shadow-xl transition-all">
                <div className="relative">
                  <div className="absolute top-2 right-2 z-10">
                    <Badge className="bg-[#64b5f6]">New</Badge>
                  </div>
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=400&width=400"
                      width={400}
                      height={400}
                      alt="Ceramic Mug Painting Kit"
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#4a4a4a] group-hover:text-[#e57373] transition-colors">
                    Ceramic Mug Painting
                  </CardTitle>
                  <CardDescription className="text-[#6b6b6b]">Paint your own unique mugs</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-[#4a4a4a]">$29.99</div>
                    <div className="flex items-center gap-0.5">
                      <Star className="h-4 w-4 fill-[#ffd54f] text-[#ffd54f]" />
                      <Star className="h-4 w-4 fill-[#ffd54f] text-[#ffd54f]" />
                      <Star className="h-4 w-4 fill-[#ffd54f] text-[#ffd54f]" />
                      <Star className="h-4 w-4 fill-[#ffd54f] text-[#ffd54f]" />
                      <Star className="h-4 w-4 fill-[#ffd54f] text-[#ffd54f]" />
                      <span className="ml-1 text-sm text-[#6b6b6b]">(78)</span>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    <Badge variant="outline" className="bg-[#f5efe6] text-[#6b6b6b] border-[#e5e5e5]">
                      1-2 hours
                    </Badge>
                    <Badge variant="outline" className="bg-[#f5efe6] text-[#6b6b6b] border-[#e5e5e5]">
                      All levels
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-[#81c784] hover:bg-[#66bb6a] rounded-full">Add to Cart</Button>
                </CardFooter>
              </Card>

              {/* Product card 3 */}
              <Card className="group overflow-hidden border-none bg-white shadow-md hover:shadow-xl transition-all">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    width={400}
                    height={400}
                    alt="Wooden Birdhouse Kit"
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#4a4a4a] group-hover:text-[#e57373] transition-colors">
                    Wooden Birdhouse
                  </CardTitle>
                  <CardDescription className="text-[#6b6b6b]">Build a home for your feathered friends</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-[#4a4a4a]">$34.99</div>
                    <div className="flex items-center gap-0.5">
                      <Star className="h-4 w-4 fill-[#ffd54f] text-[#ffd54f]" />
                      <Star className="h-4 w-4 fill-[#ffd54f] text-[#ffd54f]" />
                      <Star className="h-4 w-4 fill-[#ffd54f] text-[#ffd54f]" />
                      <Star className="h-4 w-4 fill-[#ffd54f] text-[#ffd54f]" />
                      <Star className="h-4 w-4 fill-[#e5e5e5] text-[#e5e5e5]" />
                      <span className="ml-1 text-sm text-[#6b6b6b]">(56)</span>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    <Badge variant="outline" className="bg-[#f5efe6] text-[#6b6b6b] border-[#e5e5e5]">
                      3-4 hours
                    </Badge>
                    <Badge variant="outline" className="bg-[#f5efe6] text-[#6b6b6b] border-[#e5e5e5]">
                      Intermediate
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-[#81c784] hover:bg-[#66bb6a] rounded-full">Add to Cart</Button>
                </CardFooter>
              </Card>
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="lg"
                className="gap-1 rounded-full border-[#e57373] text-[#e57373] hover:bg-[#f8e8e8]"
              >
                View All Kits <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Project of the month section */}
        <section className="w-full py-12 md:py-24 bg-[#f5efe6] relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#ffd54f]/20 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#e57373]/10 rounded-full translate-y-1/3 -translate-x-1/3"></div>

          <div className="container px-4 md:px-6 relative">
            <div className="text-center mb-12">
              <Badge className="bg-[#ffd54f] text-[#4a4a4a] mb-4">Project of the Month</Badge>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl font-serif text-[#4a4a4a]">
                Botanical Resin Coasters
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative">
                <div className="absolute inset-0 border-4 border-dashed border-[#e5e5e5] rounded-xl -z-10 transform rotate-3"></div>
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  width={600}
                  height={600}
                  alt="Botanical Resin Coasters"
                  className="rounded-lg shadow-lg transform -rotate-3"
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#81c784]/20 rounded-full -z-10"></div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    <Star className="h-5 w-5 fill-[#ffd54f] text-[#ffd54f]" />
                    <Star className="h-5 w-5 fill-[#ffd54f] text-[#ffd54f]" />
                    <Star className="h-5 w-5 fill-[#ffd54f] text-[#ffd54f]" />
                    <Star className="h-5 w-5 fill-[#ffd54f] text-[#ffd54f]" />
                    <Star className="h-5 w-5 fill-[#ffd54f] text-[#ffd54f]" />
                  </div>
                  <span className="text-[#6b6b6b]">(124 reviews)</span>
                </div>

                <div className="space-y-2">
                  <p className="text-lg text-[#6b6b6b]">
                    Preserve the beauty of nature in stunning resin coasters. This kit includes everything you need to
                    create four unique coasters with real pressed flowers and leaves.
                  </p>

                  <div className="flex flex-wrap gap-2 py-2">
                    <Badge variant="outline" className="bg-white text-[#6b6b6b] border-[#e5e5e5]">
                      2-3 hours
                    </Badge>
                    <Badge variant="outline" className="bg-white text-[#6b6b6b] border-[#e5e5e5]">
                      Beginner friendly
                    </Badge>
                    <Badge variant="outline" className="bg-white text-[#6b6b6b] border-[#e5e5e5]">
                      Includes all materials
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold text-[#4a4a4a]">$42.99</div>
                  <Badge className="bg-[#e57373]">15% OFF</Badge>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" className="bg-[#81c784] hover:bg-[#66bb6a] rounded-full">
                    Add to Cart
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-[#e57373] text-[#e57373] hover:bg-[#f8e8e8] rounded-full"
                  >
                    Watch Tutorial
                  </Button>
                </div>
              </div>
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

        {/* Community showcase section */}
        <section className="w-full py-12 md:py-24 bg-[#f5efe6]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl font-serif text-[#4a4a4a] inline-block relative">
                  <span className="relative z-10">Community Creations</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-[#e57373]/30 -z-10 transform -rotate-1"></span>
                </h2>
                <p className="max-w-[900px] text-[#6b6b6b] md:text-lg">
                  See what our crafty community has been making with our DIY kits.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="relative group overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  width={300}
                  height={300}
                  alt="Community creation"
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <div className="text-white text-sm">
                    <p className="font-medium">@craftlover</p>
                    <p>Macrame wall hanging</p>
                  </div>
                </div>
              </div>

              <div className="relative group overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  width={300}
                  height={300}
                  alt="Community creation"
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <div className="text-white text-sm">
                    <p className="font-medium">@diycreator</p>
                    <p>Painted ceramic mugs</p>
                  </div>
                </div>
              </div>

              <div className="relative group overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  width={300}
                  height={300}
                  alt="Community creation"
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <div className="text-white text-sm">
                    <p className="font-medium">@craftymom</p>
                    <p>Wooden birdhouse</p>
                  </div>
                </div>
              </div>

              <div className="relative group overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  width={300}
                  height={300}
                  alt="Community creation"
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <div className="text-white text-sm">
                    <p className="font-medium">@artisancrafter</p>
                    <p>Resin coasters</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <Button
                variant="outline"
                className="gap-1 rounded-full border-[#4a4a4a] text-[#4a4a4a] hover:bg-[#e5e5e5]/50"
              >
                Follow Us on Instagram <Instagram className="h-4 w-4 ml-1" />
              </Button>
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
                    src="/placeholder.svg?height=400&width=500"
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
