"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Notice {
  id: string
  title: string
  description: string
  imageUrl?: string
  timestamp: string
}

export default function EditorSpace() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
      if (!allowedTypes.includes(file.type)) {
        setErrors({...errors, file: 'Please select a valid image file (JPEG, PNG, GIF, or WebP)'})
        return
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({...errors, file: 'File size must be less than 5MB'})
        return
      }

      setSelectedFile(file)
      setErrors({...errors, file: ''})

      // Create preview URL
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters'
    }

    if (description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // In a real app, this would upload the file and create the notice
      const newNotice: Notice = {
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        imageUrl: previewUrl || undefined,
        timestamp: new Date().toLocaleDateString()
      }

      // Reset form
      setTitle('')
      setDescription('')
      setSelectedFile(null)
      setPreviewUrl(null)
      setErrors({})

      alert('Notice created successfully!')
    } catch (error) {
      alert('Error creating notice. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Editor Space</h1>
        <p className="text-gray-600">Create and upload new notices and posters</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <Card>
          <CardHeader>
            <CardTitle>Create New Notice</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">Notice Title *</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter notice title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`mt-1 ${errors.title ? 'border-red-500' : ''}`}
                  maxLength={100}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
                <p className="text-gray-500 text-xs mt-1">{title.length}/100 characters</p>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Enter detailed description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`mt-1 ${errors.description ? 'border-red-500' : ''}`}
                  rows={4}
                  maxLength={500}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
                <p className="text-gray-500 text-xs mt-1">{description.length}/500 characters</p>
              </div>

              <div>
                <Label htmlFor="file">Upload Image (Optional)</Label>
                <Input
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={`mt-1 ${errors.file ? 'border-red-500' : ''}`}
                />
                {errors.file && (
                  <p className="text-red-500 text-sm mt-1">{errors.file}</p>
                )}
                <p className="text-gray-500 text-xs mt-1">
                  Supported formats: JPEG, PNG, GIF, WebP (Max 5MB)
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Notice...' : 'Create Notice'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            {title || description || previewUrl ? (
              <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                {previewUrl && (
                  <div className="w-full h-48 bg-gray-100">
                    <img 
                      src={previewUrl} 
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {title || 'Notice Title'}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {description || 'Notice description will appear here...'}
                  </p>
                  <div className="flex justify-end">
                    <span className="text-xs text-gray-400">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <p className="text-lg mb-2">Preview will appear here</p>
                <p className="text-sm">Start filling out the form to see a preview</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Guidelines Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Content Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Best Practices</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Keep titles clear and concise</li>
                <li>• Use descriptive language in descriptions</li>
                <li>• Include relevant dates and times</li>
                <li>• Use high-quality images when possible</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Technical Requirements</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Title: Maximum 100 characters</li>
                <li>• Description: Maximum 500 characters</li>
                <li>• Images: JPEG, PNG, GIF, WebP formats</li>
                <li>• File size: Maximum 5MB</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
