"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calculator, Sprout, TrendingUp, DollarSign, AlertTriangle } from "lucide-react"
import NumberFlow from "@number-flow/react"

interface SimulationData {
  crop: string
  area: number
  location: string
  season: string
  fertilizer: string
  pesticide: string
  seeds: string
}

interface SimulationResult {
  viability: number
  expectedYield: number
  profitability: number
  investment: number
  revenue: number
  profit: number
  risks: string[]
  recommendations: string[]
}

export default function CropSimulator() {
  const [simulationData, setSimulationData] = useState<SimulationData>({
    crop: "",
    area: 0,
    location: "",
    season: "",
    fertilizer: "",
    pesticide: "",
    seeds: "",
  })

  const [result, setResult] = useState<SimulationResult | null>(null)
  const [isSimulating, setIsSimulating] = useState(false)

  const crops = [
    { value: "maiz", label: "Maíz" },
    { value: "tomate", label: "Tomate" },
    { value: "frijol", label: "Frijol" },
    { value: "papa", label: "Papa" },
    { value: "arroz", label: "Arroz" },
    { value: "cafe", label: "Café" },
  ]

  const seasons = [
    { value: "primavera", label: "Primavera" },
    { value: "verano", label: "Verano" },
    { value: "otono", label: "Otoño" },
    { value: "invierno", label: "Invierno" },
  ]

  const fertilizers = [
    { value: "npk-15-15-15", label: "NPK 15-15-15 (Balanceado)" },
    { value: "urea", label: "Urea (Alto Nitrógeno)" },
    { value: "superfosfato", label: "Superfosfato (Alto Fósforo)" },
    { value: "organico", label: "Fertilizante Orgánico" },
  ]

  const pesticides = [
    { value: "biologico", label: "Control Biológico" },
    { value: "sistemico", label: "Pesticida Sistémico" },
    { value: "contacto", label: "Pesticida de Contacto" },
    { value: "preventivo", label: "Tratamiento Preventivo" },
  ]

  const seedTypes = [
    { value: "hibrida", label: "Semilla Híbrida" },
    { value: "certificada", label: "Semilla Certificada" },
    { value: "criolla", label: "Semilla Criolla" },
    { value: "transgenica", label: "Semilla Transgénica" },
  ]

  const runSimulation = () => {
    setIsSimulating(true)

    // Simulate API call delay
    setTimeout(() => {
      // Mock simulation logic
      const baseViability = Math.random() * 30 + 60 // 60-90%
      const baseYield = simulationData.area * (Math.random() * 5 + 8) // 8-13 tons per hectare
      const baseProfitability = Math.random() * 40 + 40 // 40-80%

      const investment = simulationData.area * (Math.random() * 2000 + 3000) // $3000-5000 per hectare
      const revenue = baseYield * (Math.random() * 200 + 300) // $300-500 per ton
      const profit = revenue - investment

      const mockResult: SimulationResult = {
        viability: Math.round(baseViability),
        expectedYield: Math.round(baseYield * 100) / 100,
        profitability: Math.round(baseProfitability),
        investment: Math.round(investment),
        revenue: Math.round(revenue),
        profit: Math.round(profit),
        risks: ["Riesgo climático moderado", "Fluctuación de precios", "Disponibilidad de agua"],
        recommendations: [
          "Considerar sistema de riego por goteo",
          "Implementar rotación de cultivos",
          "Monitoreo constante de plagas",
        ],
      }

      setResult(mockResult)
      setIsSimulating(false)
    }, 2000)
  }

  const getViabilityColor = (viability: number) => {
    if (viability >= 80) return "text-green-600"
    if (viability >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getViabilityBadge = (viability: number) => {
    if (viability >= 80) return { variant: "default" as const, text: "Excelente" }
    if (viability >= 60) return { variant: "secondary" as const, text: "Buena" }
    return { variant: "destructive" as const, text: "Riesgosa" }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Simulation Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-blue-600" />
            <span>Simulador de Cultivos</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="crop">Tipo de Cultivo</Label>
              <Select
                value={simulationData.crop}
                onValueChange={(value) => setSimulationData((prev) => ({ ...prev, crop: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar cultivo" />
                </SelectTrigger>
                <SelectContent>
                  {crops.map((crop) => (
                    <SelectItem key={crop.value} value={crop.value}>
                      {crop.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">Área (Hectáreas)</Label>
              <Input
                id="area"
                type="number"
                value={simulationData.area}
                onChange={(e) =>
                  setSimulationData((prev) => ({
                    ...prev,
                    area: Number.parseFloat(e.target.value) || 0,
                  }))
                }
                placeholder="0.0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Ubicación</Label>
              <Input
                id="location"
                value={simulationData.location}
                onChange={(e) =>
                  setSimulationData((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
                placeholder="Ciudad, Región"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="season">Época de Siembra</Label>
              <Select
                value={simulationData.season}
                onValueChange={(value) => setSimulationData((prev) => ({ ...prev, season: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar época" />
                </SelectTrigger>
                <SelectContent>
                  {seasons.map((season) => (
                    <SelectItem key={season.value} value={season.value}>
                      {season.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fertilizer">Fertilizante</Label>
              <Select
                value={simulationData.fertilizer}
                onValueChange={(value) => setSimulationData((prev) => ({ ...prev, fertilizer: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar fertilizante" />
                </SelectTrigger>
                <SelectContent>
                  {fertilizers.map((fertilizer) => (
                    <SelectItem key={fertilizer.value} value={fertilizer.value}>
                      {fertilizer.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pesticide">Control de Plagas</Label>
              <Select
                value={simulationData.pesticide}
                onValueChange={(value) => setSimulationData((prev) => ({ ...prev, pesticide: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar control" />
                </SelectTrigger>
                <SelectContent>
                  {pesticides.map((pesticide) => (
                    <SelectItem key={pesticide.value} value={pesticide.value}>
                      {pesticide.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="seeds">Tipo de Semilla</Label>
              <Select
                value={simulationData.seeds}
                onValueChange={(value) => setSimulationData((prev) => ({ ...prev, seeds: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar semilla" />
                </SelectTrigger>
                <SelectContent>
                  {seedTypes.map((seed) => (
                    <SelectItem key={seed.value} value={seed.value}>
                      {seed.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={runSimulation}
            className="w-full"
            disabled={isSimulating || !simulationData.crop || !simulationData.area}
          >
            {isSimulating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Simulando...
              </>
            ) : (
              <>
                <Calculator className="h-4 w-4 mr-2" />
                Ejecutar Simulación
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-6">
        {result ? (
          <>
            {/* Main Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span>Resultados de Simulación</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">Viabilidad</p>
                      <div className={`text-2xl font-bold ${getViabilityColor(result.viability)}`}>
                        <NumberFlow value={result.viability} suffix="%" />
                      </div>
                      <Badge {...getViabilityBadge(result.viability)}>{getViabilityBadge(result.viability).text}</Badge>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">Rendimiento Esperado</p>
                      <div className="text-2xl font-bold text-blue-600">
                        <NumberFlow value={result.expectedYield} suffix=" ton" />
                      </div>
                      <p className="text-xs text-gray-500">Total estimado</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">Rentabilidad</p>
                      <div className="text-2xl font-bold text-purple-600">
                        <NumberFlow value={result.profitability} suffix="%" />
                      </div>
                      <p className="text-xs text-gray-500">ROI estimado</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progreso de viabilidad</span>
                    <span>{result.viability}%</span>
                  </div>
                  <Progress value={result.viability} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Financial Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span>Análisis Financiero</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Inversión Total</span>
                    <span className="font-semibold text-red-600">
                      $<NumberFlow value={result.investment} />
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Ingresos Estimados</span>
                    <span className="font-semibold text-blue-600">
                      $<NumberFlow value={result.revenue} />
                    </span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Ganancia Neta</span>
                      <span className={`font-bold text-lg ${result.profit > 0 ? "text-green-600" : "text-red-600"}`}>
                        $<NumberFlow value={result.profit} />
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risks and Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-sm">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span>Riesgos Identificados</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.risks.map((risk, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-sm">
                    <Sprout className="h-4 w-4 text-green-600" />
                    <span>Recomendaciones</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.recommendations.map((recommendation, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Calculator className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Simulación de Cultivos</h3>
              <p className="text-sm text-gray-500 text-center max-w-md">
                Completa los datos del formulario y ejecuta la simulación para obtener estimaciones de viabilidad,
                rendimiento y rentabilidad de tu cultivo.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
