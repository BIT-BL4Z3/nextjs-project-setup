"use client"

import { useState } from 'react'
import NoticeCard from '@/components/NoticeCard'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface Notice {
  id: string
  title: string
  description: string
  imageUrl?: string
  timestamp: string
}

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
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

  const [alertMessage, setAlertMessage] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  const handleSendAlert = () => {
    if (alertMessage.trim()) {
      // In a real app, this would trigger the emergency alert system
      alert(`Emergency Alert Sent: ${alertMessage}`)
      setAlertMessage('')
      setIsDialogOpen(false)
    }
  }

  const handleDeleteNotice = (id: string) => {
    if (confirm('Are you sure you want to delete this notice?')) {
      setNotices(notices.filter(notice => notice.id !== id))
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
        <p className="text-gray-600">Manage notices and emergency alerts</p>
      </div>

      {/* Emergency Alert Section */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Emergency Alert System</h2>
        <p className="text-gray-600 mb-4">Send urgent notifications to all users</p>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Send Emergency Alert
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
        </div>
        <Button 
          variant="outline" 
              <DialogTitle>Send Emergency Alert</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="alert-message">Alert Message</Label>
                <Textarea
                  id="alert-message"
                  placeholder="Enter emergency alert message..."
                  value={alertMessage}
                  onChange={(e) => setAlertMessage(e.target.value)}
                  className="mt-1"
                  rows={4}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSendAlert}
                  className="bg-red-600 hover:bg-red-700 text-white"
                  disabled={!alertMessage.trim()}
                >
                  Send Alert
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Notice Management Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Notice Management</h2>
        <p className="text-gray-600 mb-6">Current notices on the board ({notices.length} total)</p>
        
        {notices.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md border border-gray-200">
            <div className="text-gray-400 text-lg mb-2">No notices available</div>
            <p className="text-gray-500 text-sm">Notices will appear here once created</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notices.map((notice) => (
              <div key={notice.id} className="relative">
                <NoticeCard
                  title={notice.title}
                  description={notice.description}
                  imageUrl={notice.imageUrl}
                  timestamp={notice.timestamp}
                />
                <Button
                  onClick={() => handleDeleteNotice(notice.id)}
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Statistics Section */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{notices.length}</div>
            <div className="text-sm text-gray-600">Total Notices</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">0</div>
            <div className="text-sm text-gray-600">Active Alerts</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">Today</div>
            <div className="text-sm text-gray-600">Last Updated</div>
          </div>
        </div>
      </div>
    </div>
  )
}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
