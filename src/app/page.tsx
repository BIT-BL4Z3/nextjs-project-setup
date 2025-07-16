"use client"

import { useState } from 'react'
import NoticeCard from '@/components/NoticeCard'
import EmergencyAlertBanner from '@/components/EmergencyAlertBanner'

interface Notice {
  id: string
  title: string
  description: string
  imageUrl?: string
  timestamp: string
}

export default function HomePage() {
  const [emergencyAlert, setEmergencyAlert] = useState<string | null>(null)
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: '1',
      title: 'Welcome to Smart Notice Board',
      description: 'This is your AI-enabled notice board system. Administrators can manage notices and send emergency alerts, while editors can upload new content.',
      timestamp: new Date().toLocaleDateString()
    },
    {
      id: '2',
      title: 'System Features',
      description: 'Our notice board includes emergency alert capabilities, file upload support, and a modern responsive design. Navigate to the Admin Panel or Editor Space using the menu above.',
      timestamp: new Date().toLocaleDateString()
    }
  ])

  const handleDismissAlert = () => {
    setEmergencyAlert(null)
  }

  return (
    <div className="min-h-screen">
      {emergencyAlert && (
        <EmergencyAlertBanner 
          message={emergencyAlert} 
          onDismiss={handleDismissAlert}
        />
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notice Board</h1>
          <p className="text-gray-600">Stay updated with the latest announcements and notices</p>
        </div>

        {notices.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No notices available</div>
            <p className="text-gray-500 text-sm">Check back later for updates</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notices.map((notice) => (
              <NoticeCard
                key={notice.id}
                title={notice.title}
                description={notice.description}
                imageUrl={notice.imageUrl}
                timestamp={notice.timestamp}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
