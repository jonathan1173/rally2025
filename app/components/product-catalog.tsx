"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Star, ShoppingCart, Leaf, Zap, Shield, Package } from "lucide-react"

interface Product {
  id: string
  name: string
  brand: string
  category: "fertilizer" | "pesticide" | "seed" | "tool"
  price: number
  rating: number
  description: string
  benefits: string[]
  usage: string
  image: string
}

const products: Product[] = [
  {
    id: "1",
    name: "NPK 15-15-15 Premium",
    brand: "AgroTech",
    category: "fertilizer",
    price: 45.99,
    rating: 4.8,
    description: "Fertilizante balanceado ideal para todo tipo de cultivos",
    benefits: ["Crecimiento equilibrado", "Mayor rendimiento", "Fácil aplicación"],
    usage: "50-100 kg por hectárea",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "2",
    name: "BioControl Plus",
    brand: "EcoFarm",
    category: "pesticide",
    price: 32.5,
    rating: 4.6,
    description: "Control biológico de plagas sin residuos tóxicos",
    benefits: ["100% orgánico", "Sin residuos", "Seguro para abejas"],
    usage: "2-3 ml por litro de agua",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "3",
    name: "Semilla Híbrida Maíz H-350",
    brand: "SeedMaster",
    category: "seed",
    price: 89.99,
    rating: 4.9,
    description: "Semilla híbrida de alto rendimiento resistente a sequía",
    benefits: ["Alto rendimiento", "Resistente a sequía", "Ciclo corto"],
    usage: "20-25 kg por hectárea",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "4",
    name: "Urea Granulada 46%",
    brand: "FertilMax",
    category: "fertilizer",
    price: 28.75,
    rating: 4.4,
    description: "Fertilizante nitrogenado de liberación rápida",
    benefits: ["Alto contenido de N", "Rápida absorción", "Económico"],
    usage: "100-150 kg por hectárea",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "5",
    name: "Fungicida Sistémico Pro",
    brand: "CropGuard",
    category: "pesticide",
    price: 67.2,
    description: "Fungicida sistémico para prevención y control",
    rating: 4.7,
    benefits: ["Acción preventiva", "Larga duración", "Amplio espectro"],
    usage: "1-2 ml por litro de agua",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "6",
    name: "Semilla Tomate Cherry",
    brand: "VeggiePro",
    category: "seed",
    price: 15.99,
    rating: 4.5,
    description: "Semilla de tomate cherry de alta productividad",
    benefits: ["Frutos dulces", "Larga cosecha", "Resistente a enfermedades"],
    usage: "200-300 semillas por hectárea",
    image: "/placeholder.svg?height=200&width=200",
  },
]

const categoryIcons = {
  fertilizer: Leaf,
  pesticide: Shield,
  seed: Package,
  tool: Zap,
}

const categoryNames = {
  fertilizer: "Fertilizantes",
  pesticide: "Pesticidas",
  seed: "Semillas",
  tool: "Herramientas",
}

export default function ProductCatalog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const getSelectedProductsData = () => {
    return products.filter((product) => selectedProducts.includes(product.id))
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
<Card>
  <CardHeader>
    <CardTitle className="flex flex-wrap items-center gap-2 text-base md:text-lg">
      <ShoppingCart className="h-5 w-5 text-blue-600 flex-shrink-0" />
      <span className="break-words">Catálogo de Productos Agrícolas</span>
    </CardTitle>
  </CardHeader>

  <CardContent className="h-40 md:h-auto">
    <div className="flex flex-col md:flex-row gap-4 w-full max-w-full">
      {/* Input */}
      <div className="relative w-full md:w-1/2 max-w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar productos"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 w-full"
        />
      </div>

      {/* Tabs */}
      <div className="w-full md:w-auto max-w-full">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="flex flex-wrap gap-2 max-w-full">
            <TabsTrigger className="min-w-0 break-words" value="all">Todos</TabsTrigger>
            <TabsTrigger className="min-w-0 break-words" value="fertilizer">Fertilizantes</TabsTrigger>
            <TabsTrigger className="min-w-0 break-words" value="pesticide">Pesticidas</TabsTrigger>
            <TabsTrigger className="min-w-0 break-words" value="seed">Semillas</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  </CardContent>
</Card>



      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Product Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredProducts.map((product) => {
              const IconComponent = categoryIcons[product.category]
              const isSelected = selectedProducts.includes(product.id)

              return (
                <Card
                  key={product.id}
                  className={`hover:shadow-lg transition-shadow ${isSelected ? "ring-2 ring-blue-500" : ""}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <IconComponent className="h-5 w-5 text-green-600" />
                        <Badge variant="secondary" className="text-xs">
                          {categoryNames[product.category]}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-semibold text-sm">{product.name}</h3>
                      <p className="text-xs text-gray-600">{product.brand}</p>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="h-12 w-12 text-gray-400" />
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-2">{product.description}</p>

                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {product.benefits.slice(0, 2).map((benefit, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>

                      <div className="text-xs text-gray-600">
                        <strong>Uso:</strong> {product.usage}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-lg font-bold text-green-600">${product.price}</span>
                      <Button
                        size="sm"
                        variant={isSelected ? "default" : "outline"}
                        onClick={() => toggleProductSelection(product.id)}
                      >
                        {isSelected ? "Seleccionado" : "Seleccionar"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredProducts.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Search className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No se encontraron productos</h3>
                <p className="text-sm text-gray-500 text-center">Intenta ajustar los filtros o términos de búsqueda</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Selected Products Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Productos Seleccionados</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedProducts.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  Selecciona productos para simular su impacto en el cultivo
                </p>
              ) : (
                <div className="space-y-3">
                  {getSelectedProductsData().map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <p className="text-xs font-medium">{product.name}</p>
                        <p className="text-xs text-gray-600">${product.price}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleProductSelection(product.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        ×
                      </Button>
                    </div>
                  ))}

                  <div className="border-t pt-3">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Total:</span>
                      <span className="text-green-600">
                        $
                        {getSelectedProductsData()
                          .reduce((sum, product) => sum + product.price, 0)
                          .toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Button size="sm" className="w-full">
                    Simular con Productos
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Marcas Colaboradoras</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["AgroTech", "EcoFarm", "SeedMaster", "FertilMax", "CropGuard"].map((brand, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                    <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                      <Leaf className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-sm font-medium">{brand}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
