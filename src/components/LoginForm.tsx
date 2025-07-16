"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface LoginFormProps {
  title: string
  onLogin: () => void
}

export default function LoginForm({ title, onLogin }: LoginFormProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (username === 'ADMIN999' && password === 'ADMIN999') {
      onLogin()
    } else {
      setError('Invalid credentials. Please use ADMIN999 for both username and password.')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Smart Notice Board</h2>
          <p className="text-gray-600">Sign in to access {title}</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-center">{title} Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="mt-1"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm text-blue-800 font-medium mb-1">Demo Credentials:</p>
              <p className="text-sm text-blue-700">Username: ADMIN999</p>
              <p className="text-sm text-blue-700">Password: ADMIN999</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
