"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX } from "lucide-react"

interface VoiceAssistantProps {
  enabled: boolean
  onToggle: (enabled: boolean) => void
}

export default function VoiceAssistant({ enabled, onToggle }: VoiceAssistantProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const toggleVoice = () => {
    onToggle(!enabled)
    if (!enabled) {
      // Simulate voice greeting
      setIsPlaying(true)
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(
          "Asistente de voz activado. Ahora puedes escuchar las respuestas del chatbot y los tutoriales.",
        )
        utterance.lang = "es-ES"
        utterance.onend = () => setIsPlaying(false)
        speechSynthesis.speak(utterance)
      } else {
        setTimeout(() => setIsPlaying(false), 2000)
      }
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleVoice}
      className={`flex items-center space-x-2 ${enabled ? "bg-green-50 border-green-200 text-green-700" : ""}`}
    >
      {enabled ? (
        <Volume2 className={`h-4 w-4 ${isPlaying ? "animate-pulse" : ""}`} />
      ) : (
        <VolumeX className="h-4 w-4" />
      )}
      <span className="hidden sm:inline">{enabled ? "Voz On" : "Voz Off"}</span>
    </Button>
  )
}
