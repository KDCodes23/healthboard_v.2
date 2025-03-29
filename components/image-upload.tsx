"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Camera, Trash2, Upload } from "lucide-react"

interface ImageUploadProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  initials?: string
}

export function ImageUpload({ value, onChange, disabled, initials = "U" }: ImageUploadProps) {
  // State to track whether we're in edit mode
  const [isEditing, setIsEditing] = useState(false)
  // State to preview the image before upload
  const [preview, setPreview] = useState<string | null>(null)
  // Reference to the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handler for when a file is selected
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      // Create a URL for the selected image for preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)

      // In a real implementation, you would upload the file to a server here
      // For now, we'll just use the preview URL
      // onChange would typically be called after successful upload with the uploaded image URL
    }
  }

  // For demo purposes: "save" the preview as the actual value
  const handleSaveImage = () => {
    if (preview) {
      onChange(preview)
      setPreview(null)
      setIsEditing(false)
    }
  }

  // Clear the selected image
  const handleClearImage = () => {
    setPreview(null)
    if (!value) {
      setIsEditing(false)
    }
  }

  // Open the file dialog when clicking the avatar
  const handleEditClick = () => {
    setIsEditing(true)
    // Wait a bit to ensure the button is shown before focusing on it
    setTimeout(() => fileInputRef.current?.click(), 100)
  }

  return (
    <div className="relative">
      {/* The avatar displays either the preview, the value, or the initials */}
      <Avatar className="h-24 w-24 hover-glow cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-primary/50">
        <AvatarImage src={preview || value || undefined} alt="Profile picture" />
        <AvatarFallback className="text-xl">{initials}</AvatarFallback>
      </Avatar>

      {/* Edit button to start the upload process */}
      <Button
        size="icon"
        variant="outline"
        className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-background hover-glow transition-all duration-300 hover:bg-primary/10"
        onClick={handleEditClick}
        disabled={disabled}
      >
        <Camera className="h-4 w-4" />
        <span className="sr-only">Change avatar</span>
      </Button>

     

      {/* Controls shown when editing */}
      {isEditing && (
        <div className="absolute -bottom-12 right-0 flex items-center gap-2">
          {preview && (
            <Button size="sm" onClick={handleSaveImage} className="dashboard-button hover-glow">
              <Upload className="mr-1 h-3 w-3" />
              Save
            </Button>
          )}
          <Button size="sm" variant="outline" onClick={handleClearImage} className="dashboard-button hover-glow">
            <Trash2 className="mr-1 h-3 w-3" />
            Cancel
          </Button>
        </div>
      )}
    </div>
  )
}

