"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Thermometer, Droplets, Wind, Sun } from "lucide-react"

interface LocationData {
  coordinates: {
    lat: number
    lng: number
  }
  address: string
  climate: {
    temperature: number
    humidity: number
    rainfall: number
    windSpeed: number
    uvIndex: number
  }
  soilType: string
  elevation: number
  timezone: string
}

interface LocationSetupProps {
  onLocationChange: (location: string) => void
}

export default function LocationSetup({ onLocationChange }: LocationSetupProps) {
  const [manualLocation, setManualLocation] = useState("")
  const [locationData, setLocationData] = useState<LocationData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const getCurrentLocation = () => {
    setIsLoading(true)
    setError("")

    if (!navigator.geolocation) {
      setError("La geolocalización no está soportada en este navegador")
      setIsLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords

        // Simulate API call to get location details
        setTimeout(() => {
          const mockLocationData: LocationData = {
            coordinates: { lat: latitude, lng: longitude },
            address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            climate: {
              temperature: Math.round(Math.random() * 15 + 15), // 15-30°C
              humidity: Math.round(Math.random() * 30 + 50), // 50-80%
              rainfall: Math.round(Math.random() * 100 + 50), // 50-150mm
              windSpeed: Math.round(Math.random() * 10 + 5), // 5-15 km/h
              uvIndex: Math.round(Math.random() * 5 + 3), // 3-8
            },
            soilType: ["Arcilloso", "Franco", "Arenoso", "Limoso"][Math.floor(Math.random() * 4)],
            elevation: Math.round(Math.random() * 1000 + 500), // 500-1500m
            timezone: "GMT-5",
          }

          setLocationData(mockLocationData)
          onLocationChange(mockLocationData.address)
          setIsLoading(false)
        }, 2000)
      },
      (error) => {
        setError("No se pudo obtener la ubicación. Verifica los permisos.")
        setIsLoading(false)
      },
    )
  }

  const searchLocation = () => {
    if (!manualLocation.trim()) return

    setIsLoading(true)
    setError("")

    // Simulate geocoding API call
    setTimeout(() => {
      const mockLocationData: LocationData = {
        coordinates: {
          lat: Math.random() * 180 - 90,
          lng: Math.random() * 360 - 180,
        },
        address: manualLocation,
        climate: {
          temperature: Math.round(Math.random() * 15 + 15),
          humidity: Math.round(Math.random() * 30 + 50),
          rainfall: Math.round(Math.random() * 100 + 50),
          windSpeed: Math.round(Math.random() * 10 + 5),
          uvIndex: Math.round(Math.random() * 5 + 3),
        },
        soilType: ["Arcilloso", "Franco", "Arenoso", "Limoso"][Math.floor(Math.random() * 4)],
        elevation: Math.round(Math.random() * 1000 + 500),
        timezone: "GMT-5",
      }

      setLocationData(mockLocationData)
      onLocationChange(mockLocationData.address)
      setIsLoading(false)
    }, 2000)
  }

  const getClimateRecommendations = () => {
    if (!locationData) return []

    const recommendations = []
    const { climate } = locationData

    if (climate.temperature > 25) {
      recommendations.push("Considera cultivos resistentes al calor")
    }
    if (climate.humidity > 70) {
      recommendations.push("Monitorea enfermedades fúngicas")
    }
    if (climate.rainfall < 80) {
      recommendations.push("Planifica sistema de riego")
    }

    return recommendations
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Location Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            <span>Configuración de Ubicación</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <Button onClick={getCurrentLocation} disabled={isLoading} className="w-full" variant="outline">
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                  Obteniendo ubicación...
                </>
              ) : (
                <>
                  <Navigation className="h-4 w-4 mr-2" />
                  Usar Ubicación Actual
                </>
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">O</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="manual-location">Buscar Ubicación</Label>
              <div className="flex space-x-2">
                <Input
                  id="manual-location"
                  value={manualLocation}
                  onChange={(e) => setManualLocation(e.target.value)}
                  placeholder="Ciudad, región o coordenadas"
                  onKeyPress={(e) => e.key === "Enter" && searchLocation()}
                />
                <Button onClick={searchLocation} disabled={isLoading}>
                  Buscar
                </Button>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Location Details */}
      {locationData ? (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Información de Ubicación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Coordenadas:</span>
                  <p className="font-medium">
                    {locationData.coordinates.lat.toFixed(4)}, {locationData.coordinates.lng.toFixed(4)}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Elevación:</span>
                  <p className="font-medium">{locationData.elevation}m</p>
                </div>
                <div>
                  <span className="text-gray-600">Tipo de Suelo:</span>
                  <p className="font-medium">{locationData.soilType}</p>
                </div>
                <div>
                  <span className="text-gray-600">Zona Horaria:</span>
                  <p className="font-medium">{locationData.timezone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-sm">
                <Sun className="h-4 w-4 text-yellow-500" />
                <span>Condiciones Climáticas</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Thermometer className="h-4 w-4 text-red-500" />
                  <div>
                    <p className="text-xs text-gray-600">Temperatura</p>
                    <p className="font-semibold">{locationData.climate.temperature}°C</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-600">Humedad</p>
                    <p className="font-semibold">{locationData.climate.humidity}%</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Droplets className="h-4 w-4 text-cyan-500" />
                  <div>
                    <p className="text-xs text-gray-600">Precipitación</p>
                    <p className="font-semibold">{locationData.climate.rainfall}mm</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Wind className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-600">Viento</p>
                    <p className="font-semibold">{locationData.climate.windSpeed} km/h</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Recomendaciones Climáticas</CardTitle>
            </CardHeader>
            <CardContent>
              {getClimateRecommendations().length > 0 ? (
                <div className="space-y-2">
                  {getClimateRecommendations().map((recommendation, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Badge variant="outline" className="mt-0.5">
                        {index + 1}
                      </Badge>
                      <p className="text-sm text-gray-600">{recommendation}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Las condiciones climáticas son favorables para la mayoría de cultivos.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MapPin className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Configura tu Ubicación</h3>
            <p className="text-sm text-gray-500 text-center max-w-md">
              Configura tu ubicación para obtener recomendaciones personalizadas basadas en las condiciones climáticas y
              del suelo de tu zona.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
