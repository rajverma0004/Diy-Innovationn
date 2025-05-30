"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { Search, Loader2, Tag, ArrowRight } from "lucide-react"
import Link from "next/link"

const Browse = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Electronics", "Home", "Garden", "Crafts", "Robotics"]

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/product/getall")
      .then((response) => {
        setProducts(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching products:", error)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "All" || product.category === selectedCategory)
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="bg-violet-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Browse DIY Projects</h1>
            <p className="text-lg md:text-xl text-violet-100 max-w-2xl mx-auto">
              Discover amazing DIY innovations from our community and bring your ideas to life
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-md p-6 mb-10 -mt-12">
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search projects by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-violet-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {!loading && (
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? "project" : "projects"}
              {searchQuery && ` for "${searchQuery}"`}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-10 w-10 text-violet-500 animate-spin" />
              <p className="text-gray-600">Loading amazing projects...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl group"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {product.featured && (
                      <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h2 className="text-xl font-bold text-gray-800 group-hover:text-violet-600 transition-colors duration-200">
                        {product.name}
                      </h2>
                      <div className="flex items-center text-yellow-500">
                        <span className="text-sm font-medium">{product.rating || "4.5"}★</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">{product.detail}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-flex items-center text-xs bg-violet-100 text-violet-800 px-2 py-1 rounded-full">
                        <Tag className="h-3 w-3 mr-1" />
                        {product.category || "DIY"}
                      </span>
                      <span className="inline-flex items-center text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {product.difficulty || "Intermediate"}
                      </span>
                    </div>

                    {product.kits && product.kits.length > 0 && (
                      <div className="mb-5 bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Available Kits:</p>
                        <div className="space-y-2">
                          {product.kits.map((kit, index) => (
                            <div key={index} className="flex justify-between items-center text-sm">
                              <span className="font-medium text-gray-800">{kit.kitName}</span>
                              <span className="text-violet-600 font-bold">${kit.kitPrice}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <Link
                      href={`/project/${product._id}`}
                      className="flex items-center justify-center w-full bg-violet-600 text-white py-3 px-4 rounded-lg hover:bg-violet-700 transition-colors duration-300 font-medium"
                    >
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                <div className="max-w-md mx-auto">
                  <svg
                    className="mx-auto h-16 w-16 text-gray-400 mb-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                  <p className="text-gray-600 mb-6">
                    {searchQuery
                      ? `We couldn't find any projects matching "${searchQuery}"`
                      : "There are no projects available at the moment"}
                    {selectedCategory !== "All" && ` in the ${selectedCategory} category`}
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategory("All")
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-violet-600 hover:bg-violet-700"
                  >
                    Clear filters
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Browse
