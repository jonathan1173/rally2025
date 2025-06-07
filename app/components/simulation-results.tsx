"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, DollarSign, AlertTriangle, CheckCircle } from "lucide-react"
import NumberFlow from "@number-flow/react"

interface SimulationResultsProps {
  results: {
    viability: number
    expectedYield: number
    profitability: number
    investment: number
    revenue: number
    profit: number
    risks: string[]
    recommendations: string[]
  }
}

export default function SimulationResults({ results }: SimulationResultsProps) {
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
    <div className="space-y-6">
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
                <div className={`text-2xl font-bold ${getViabilityColor(results.viability)}`}>
                  <NumberFlow value={results.viability} suffix="%" />
                </div>
                <Badge {...getViabilityBadge(results.viability)}>{getViabilityBadge(results.viability).text}</Badge>
              </div>
            </div>

            <div className="text-center">
              <div className="space-y-1">
                <p className="text-sm text-gray-600">Rendimiento Esperado</p>
                <div className="text-2xl font-bold text-blue-600">
                  <NumberFlow value={results.expectedYield} suffix=" ton" />
                </div>
                <p className="text-xs text-gray-500">Total estimado</p>
              </div>
            </div>

            <div className="text-center">
              <div className="space-y-1">
                <p className="text-sm text-gray-600">Rentabilidad</p>
                <div className="text-2xl font-bold text-purple-600">
                  <NumberFlow value={results.profitability} suffix="%" />
                </div>
                <p className="text-xs text-gray-500">ROI estimado</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progreso de viabilidad</span>
              <span>{results.viability}%</span>
            </div>
            <Progress value={results.viability} className="h-2" />
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
                $<NumberFlow value={results.investment} />
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Ingresos Estimados</span>
              <span className="font-semibold text-blue-600">
                $<NumberFlow value={results.revenue} />
              </span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Ganancia Neta</span>
                <span className={`font-bold text-lg ${results.profit > 0 ? "text-green-600" : "text-red-600"}`}>
                  $<NumberFlow value={results.profit} />
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
              {results.risks.map((risk, index) => (
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
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Recomendaciones</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {results.recommendations.map((recommendation, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
