"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Trash2, Upload, Plus, Package, ImagePlus, Video, Tag, Star } from "lucide-react"

export default function AddProduct() {
  const { toast } = useToast()
  const [errors, setErrors] = useState({})
  const [product, setProduct] = useState({
    name: "",
    detail: "",
    images: [],
    video: "",
    category: "",
    difficulty: "Intermediate",
    featured: false,
    kits: [],
  })

  const [kitInput, setKitInput] = useState({
    kitName: "",
    kitDescription: "",
    kitPrice: "",
  })

  const [imagePreview, setImagePreview] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!product.name.trim()) {
      newErrors.name = "Product name is required"
    }

    if (!product.detail.trim()) {
      newErrors.detail = "Product description is required"
    }

    if (!product.category) {
      newErrors.category = "Category is required"
    }

    if (product.video && !isValidUrl(product.video)) {
      newErrors.video = "Please enter a valid URL"
    }

    if (product.images.length === 0) {
      newErrors.images = "At least one image is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (string) => {
    if (!string) return true // Optional field
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    setProduct({ ...product, images: [...files] })

    // Create preview URLs
    const previews = files.map((file) => URL.createObjectURL(file))
    setImagePreview(previews)
  }

  const handleAddKit = () => {
    if (!kitInput.kitName) return
    setProduct({
      ...product,
      kits: [
        ...product.kits,
        {
          kitName: kitInput.kitName,
          kitDescription: kitInput.kitDescription,
          kitPrice: Number(kitInput.kitPrice) || 0,
        },
      ],
    })
    setKitInput({
      kitName: "",
      kitDescription: "",
      kitPrice: "",
    })
  }

  const removeKit = (index) => {
    const updatedKits = [...product.kits]
    updatedKits.splice(index, 1)
    setProduct({ ...product, kits: updatedKits })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!validateForm()) {
      setIsSubmitting(false)
      return
    }

    try {
      const formData = new FormData()
      formData.append("name", product.name)
      formData.append("detail", product.detail)
      formData.append("video", product.video)
      formData.append("category", product.category)
      formData.append("difficulty", product.difficulty)
      formData.append("featured", product.featured)

      // Append each image file
      product.images.forEach((img) => {
        formData.append("images", img)
      })

      // Append kits data with all required fields
      formData.append("kits", JSON.stringify(product.kits))

      const response = await fetch("http://localhost:5000/product/add", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.details || "Failed to add product")
      }

      // Reset form
      setProduct({
        name: "",
        detail: "",
        images: [],
        video: "",
        category: "",
        difficulty: "Intermediate",
        featured: false,
        kits: [],
      })
      setKitInput({
        kitName: "",
        kitDescription: "",
        kitPrice: "",
      })
      setImagePreview([])
      alert("Product added successfully!")
    } catch (error) {
      console.error("Error adding product:", error)
      alert(error.message || "Failed to add product")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
          <CardTitle className="text-2xl font-bold">Add New Product</CardTitle>
          <CardDescription className="text-emerald-50">
            Fill in the details to add a new product to your inventory
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 pt-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Package className="h-5 w-5 text-emerald-500" />
                Basic Information
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-medium">
                    Product Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter product name"
                    value={product.name}
                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                    required
                    className="border-emerald-200 focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="font-medium">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={product.category}
                    onValueChange={(value) => setProduct({ ...product, category: value })}
                    required
                  >
                    <SelectTrigger id="category" className="border-emerald-200">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Robotics">Robotics</SelectItem>
                      <SelectItem value="IoT">IoT</SelectItem>
                      <SelectItem value="Home Automation">Home Automation</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="difficulty" className="font-medium">
                    Difficulty Level
                  </Label>
                  <Select
                    value={product.difficulty}
                    onValueChange={(value) => setProduct({ ...product, difficulty: value })}
                  >
                    <SelectTrigger id="difficulty" className="border-emerald-200">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <div className="flex items-center space-x-2 h-10 px-3">
                    <Checkbox
                      id="featured"
                      checked={product.featured}
                      onCheckedChange={(checked) => setProduct({ ...product, featured: checked === true })}
                      className="border-emerald-500 data-[state=checked]:bg-emerald-500"
                    />
                    <Label htmlFor="featured" className="font-medium flex items-center gap-1.5">
                      <Star className="h-4 w-4 text-amber-500" />
                      Featured Product
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="detail" className="font-medium">
                  Product Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="detail"
                  placeholder="Enter detailed description of the product"
                  value={product.detail}
                  onChange={(e) => setProduct({ ...product, detail: e.target.value })}
                  required
                  className="min-h-[120px] border-emerald-200 focus:border-emerald-500"
                />
              </div>
            </div>

            <Separator />

            {/* Media Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <ImagePlus className="h-5 w-5 text-emerald-500" />
                Media
              </h3>

              <div className="space-y-2">
                <Label htmlFor="images" className="font-medium">
                  Product Images
                </Label>
                <div className="border-2 border-dashed border-emerald-200 rounded-lg p-6 text-center hover:bg-emerald-50 transition-colors">
                  <Input
                    id="images"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Label htmlFor="images" className="cursor-pointer flex flex-col items-center justify-center gap-2">
                    <Upload className="h-8 w-8 text-emerald-500" />
                    <span className="font-medium text-emerald-700">Click to upload images</span>
                    <span className="text-sm text-muted-foreground">PNG, JPG, GIF up to 10MB</span>
                  </Label>
                </div>

                {imagePreview.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                    {imagePreview.map((src, index) => (
                      <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                        <img
                          src={src || "/placeholder.svg"}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="video" className="font-medium flex items-center gap-2">
                  <Video className="h-4 w-4 text-emerald-500" />
                  Video URL
                </Label>
                <Input
                  id="video"
                  type="url"
                  placeholder="YouTube link or video URL"
                  value={product.video}
                  onChange={(e) => setProduct({ ...product, video: e.target.value })}
                  className="border-emerald-200 focus:border-emerald-500"
                />
              </div>
            </div>

            <Separator />

            {/* Kits Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Tag className="h-5 w-5 text-emerald-500" />
                Product Kits
              </h3>

              <Card className="border-emerald-200">
                <CardContent className="pt-6 space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="kitName" className="font-medium">
                        Kit Name
                      </Label>
                      <Input
                        id="kitName"
                        placeholder="Enter kit name"
                        value={kitInput.kitName}
                        onChange={(e) => setKitInput({ ...kitInput, kitName: e.target.value })}
                        className="border-emerald-200 focus:border-emerald-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="kitDescription" className="font-medium">
                        Kit Description
                      </Label>
                      <Input
                        id="kitDescription"
                        placeholder="Enter kit description"
                        value={kitInput.kitDescription}
                        onChange={(e) => setKitInput({ ...kitInput, kitDescription: e.target.value })}
                        className="border-emerald-200 focus:border-emerald-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="kitPrice" className="font-medium">
                        Kit Price ($)
                      </Label>
                      <Input
                        id="kitPrice"
                        type="number"
                        placeholder="0.00"
                        value={kitInput.kitPrice}
                        onChange={(e) => setKitInput({ ...kitInput, kitPrice: e.target.value })}
                        className="border-emerald-200 focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <Button
                    type="button"
                    onClick={handleAddKit}
                    disabled={!kitInput.kitName}
                    className="w-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Kit
                  </Button>
                </CardContent>
              </Card>

              {product.kits.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Added Kits</h4>
                  <div className="space-y-2">
                    {product.kits.map((kit, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-lg border border-emerald-200 bg-emerald-50"
                      >
                        <div className="flex-1">
                          <div className="font-medium">{kit.kitName}</div>
                          <div className="text-sm text-muted-foreground">{kit.kitDescription}</div>
                          <Badge variant="outline" className="mt-1 bg-white">
                            ${kit.kitPrice.toFixed(2)}
                          </Badge>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeKit(i)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-4 border-t p-6 bg-slate-50">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (confirm("Are you sure you want to reset the form?")) {
                  setProduct({
                    name: "",
                    detail: "",
                    images: [],
                    video: "",
                    category: "",
                    difficulty: "Intermediate",
                    featured: false,
                    kits: [],
                  })
                  setKitInput({
                    kitName: "",
                    kitDescription: "",
                    kitPrice: "",
                  })
                  setImagePreview([])
                }
              }}
            >
              Reset
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Product"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
