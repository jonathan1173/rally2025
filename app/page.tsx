"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MessageCircle,
  MapPin,
  Sprout,
  TrendingUp,
  Wifi,
  WifiOff,
  Calculator,
  ShoppingCart,
  BookOpen,
  Sun,
} from "lucide-react"
import ChatBot from "./components/chat-bot"
import CropSimulator from "./components/crop-simulator"
import ProductCatalog from "./components/product-catalog"
import LocationSetup from "./components/location-setup"
import VoiceAssistant from "./components/voice-assistant"


export default function AgroAdvisorApp() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isOnline, setIsOnline] = useState(true)
  const [currentLocation, setCurrentLocation] = useState("No configurada")
  const [voiceEnabled, setVoiceEnabled] = useState(false)

  const toggleConnection = () => {
    setIsOnline(!isOnline)
  }

  const quickStats = [
    { label: "Cultivos Simulados", value: 12, icon: Sprout, color: "text-green-600" },
    { label: "Consultas Realizadas", value: 48, icon: MessageCircle, color: "text-blue-600" },
    { label: "Productos Consultados", value: 23, icon: ShoppingCart, color: "text-purple-600" },
    { label: "Rentabilidad Promedio", value: 85, icon: TrendingUp, color: "text-orange-600", suffix: "%" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">

              <div className="bg-green-200 p-2 rounded-full ">
                {/* <Sprout className="h-6 w-6 text-white" /> */}
                <img src="/logo.png" className="h-[40px] w-[50px]" alt="Logo" />
              </div>

              <div>
                <h1 className="text-xl font-bold text-gray-900">Agro+</h1>
                <p className="text-sm text-gray-500">Cultiva mas</p>
              </div>
            </div>

            {/* aqui murio un navbar que quiso alcanzar las estrellas 

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{currentLocation}</span>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={toggleConnection}
                className={`flex items-center space-x-2 ${
                  isOnline ? "text-green-600 border-green-200" : "text-red-600 border-red-200"
                }`}
              >
                {isOnline ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
                <span>{isOnline ? "Online" : "Offline"}</span>
              </Button>

              <VoiceAssistant enabled={voiceEnabled} onToggle={setVoiceEnabled} />
            </div> */}


          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Consultas</span>
            </TabsTrigger>
            <TabsTrigger value="simulator" className="flex items-center space-x-2">
              <Calculator className="h-4 w-4" />
              <span className="hidden sm:inline">Simulador</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center space-x-2">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Productos</span>
            </TabsTrigger>
            <TabsTrigger value="location" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Ubicación</span>
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Tutoriales</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickStats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                        <div className="flex items-center space-x-1">
                          <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                          {stat.suffix && <span className={`text-lg font-semibold ${stat.color}`}>{stat.suffix}</span>}
                        </div>
                      </div>
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Weather & Conditions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Sun className="h-5 w-5 text-yellow-500" />
                    <span>Condiciones Actuales</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Temperatura</span>
                      <span className="font-semibold">24°C</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Humedad</span>
                      <span className="font-semibold">68%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Precipitación</span>
                      <span className="font-semibold">2mm</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recomendaciones del Día</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Badge variant="secondary" className="mt-1">
                        Riego
                      </Badge>
                      <p className="text-sm text-gray-600">Condiciones ideales para riego matutino</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Badge variant="secondary" className="mt-1">
                        Siembra
                      </Badge>
                      <p className="text-sm text-gray-600">Época favorable para cultivos de temporada</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Próximas Tareas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Fertilización - Lote A</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">Control de plagas - Lote B</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Cosecha - Lote C</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="chat">
            <ChatBot isOnline={isOnline} />
          </TabsContent>

          <TabsContent value="simulator">
            <CropSimulator />
          </TabsContent>

          <TabsContent value="products">
            <ProductCatalog />
          </TabsContent>

          <TabsContent value="location">
            <LocationSetup onLocationChange={setCurrentLocation} />
          </TabsContent>

          <TabsContent value="tutorials">
            <Card>
              <CardHeader>
                <CardTitle>Tutoriales y Guías</CardTitle>
                <CardDescription>Aprende a usar todas las funciones de AgroAdvisor</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto p-4 justify-start text-left max-w-full">
                    <div className="overflow-hidden whitespace-normal break-words w-full">
                      <h3 className="font-semibold">Primeros Pasos</h3>
                      <p className="text-sm text-gray-600">Configuración inicial y navegación básica</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 justify-start text-left max-w-full">
                    <div className="overflow-hidden whitespace-normal break-words w-full">
                      <h3 className="font-semibold">Usar el Simulador</h3>
                      <p className="text-sm text-gray-600">Cómo simular cultivos y interpretar resultados</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 justify-start text-left max-w-full">
                    <div className="overflow-hidden whitespace-normal break-words w-full">
                      <h3 className="font-semibold">Chatbot Inteligente</h3>
                      <p className="text-sm text-gray-600">Hacer consultas efectivas al asistente</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 justify-start text-left max-w-full">
                    <div className="overflow-hidden whitespace-normal break-words w-full">
                      <h3 className="font-semibold">Modo Offline</h3>
                      <p className="text-sm text-gray-600">Usar la app sin conexión a internet</p>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
        </Tabs>
      </div>
    </div>
  )
}
