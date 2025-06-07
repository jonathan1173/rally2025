"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Mic, MicOff, Volume2 } from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  suggestions?: string[]
}

interface ChatBotProps {
  isOnline: boolean
}

export default function ChatBot({ isOnline }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "¡Hola! Soy tu asistente agrícola. Puedo ayudarte con consultas sobre cultivos, plagas, fertilización y más. ¿En qué puedo ayudarte hoy?",
      timestamp: new Date(),
      suggestions: [
        "¿Cuándo sembrar maíz?",
        "¿Cómo controlar plagas?",
        "Fertilizantes para tomate",
        "Calendario de siembra",
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const predefinedResponses = {
    maíz: "Para el cultivo de maíz, la mejor época de siembra es entre marzo y mayo. Necesita suelos bien drenados y temperaturas entre 20-30°C. Te recomiendo usar fertilizante NPK 15-15-15 al momento de la siembra.",
    tomate:
      "El tomate requiere temperaturas entre 18-25°C. Siembra en almácigos primero, trasplanta a los 30-40 días. Usa fertilizante rico en fósforo para floración. Riega regularmente pero evita mojar las hojas.",
    plagas:
      "Para control de plagas, identifica primero el tipo de plaga. Para pulgones usa jabón potásico, para gusanos usa Bacillus thuringiensis. Siempre lee las etiquetas y respeta los tiempos de carencia.",
    fertilizante:
      "Los fertilizantes básicos son NPK (Nitrógeno-Fósforo-Potasio). Para crecimiento usa más N, para floración más P, para frutos más K. Aplica según análisis de suelo cuando sea posible.",
  }

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate bot response
    setTimeout(() => {
      const lowerContent = content.toLowerCase()
      let botResponse = "Entiendo tu consulta. "

      // Find matching response
      const matchedKey = Object.keys(predefinedResponses).find((key) => lowerContent.includes(key))

      if (matchedKey) {
        botResponse = predefinedResponses[matchedKey as keyof typeof predefinedResponses]
      } else {
        botResponse += isOnline
          ? "Déjame consultar la información más actualizada para darte la mejor recomendación."
          : "Basándome en mi conocimiento local, te sugiero consultar con un agrónomo local para casos específicos."
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: botResponse,
        timestamp: new Date(),
        suggestions: ["Más información", "¿Qué productos usar?", "Simular cultivo", "Otra consulta"],
      }

      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  const toggleListening = () => {
    setIsListening(!isListening)
    // Here you would implement speech recognition
  }

  const speakMessage = (content: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(content)
      utterance.lang = "es-ES"
      speechSynthesis.speak(utterance)
    }
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3">
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="flex-shrink-0">
            <CardTitle className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-green-600" />
              <span>Asistente Agrícola</span>
              <Badge variant={isOnline ? "default" : "secondary"}>{isOnline ? "Online" : "Offline"}</Badge>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}>
                      <div
                        className={`flex items-start space-x-2 ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                      >
                        <div className={`p-2 rounded-full ${message.type === "user" ? "bg-blue-600" : "bg-green-600"}`}>
                          {message.type === "user" ? (
                            <User className="h-4 w-4 text-white" />
                          ) : (
                            <Bot className="h-4 w-4 text-white" />
                          )}
                        </div>
                        <div
                          className={`p-3 rounded-lg ${
                            message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          {message.type === "bot" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-2 h-6 px-2 text-xs"
                              onClick={() => speakMessage(message.content)}
                            >
                              <Volume2 className="h-3 w-3 mr-1" />
                              Escuchar
                            </Button>
                          )}
                        </div>
                      </div>

                      {message.suggestions && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="text-xs"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 rounded-full bg-green-600">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleListening}
                  className={isListening ? "bg-red-50 border-red-200 text-red-600" : ""}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Escribe tu consulta agrícola..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                  className="flex-1"
                />
                <Button onClick={() => handleSendMessage(inputValue)}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Consultas Frecuentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              "¿Cuándo sembrar?",
              "Control de plagas",
              "Tipos de fertilizantes",
              "Riego adecuado",
              "Cosecha óptima",
            ].map((question, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="w-full justify-start text-xs"
                onClick={() => handleSendMessage(question)}
              >
                {question}
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Consejos del Día</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-xs text-gray-600">
                <strong>Riego:</strong> Las primeras horas de la mañana son ideales para regar.
              </div>
              <div className="text-xs text-gray-600">
                <strong>Observación:</strong> Revisa tus plantas diariamente para detectar problemas temprano.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
