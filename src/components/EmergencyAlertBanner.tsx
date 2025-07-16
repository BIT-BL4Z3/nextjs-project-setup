"use client"

import { useState } from 'react'

interface EmergencyAlertBannerProps {
  message: string
  onDismiss?: () => void
}

export default function EmergencyAlertBanner({ message, onDismiss }: EmergencyAlertBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleDismiss = () => {
    setIsVisible(false)
    if (onDismiss) {
      onDismiss()
    }
  }

  if (!isVisible) return null

  return (
    <div className="bg-red-600 text-white px-4 py-3 relative" role="alert">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <span className="font-bold text-sm uppercase tracking-wide mr-3">Emergency Alert</span>
          <span className="text-sm">{message}</span>
        </div>
        <button
          onClick={handleDismiss}
          className="text-white hover:text-gray-200 font-bold text-lg leading-none"
          aria-label="Dismiss alert"
        >
          ×
        </button>
      </div>
    </div>
  )
}
