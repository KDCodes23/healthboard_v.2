"use client"

import { Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardSpotlight } from "@/components/ui/card-spotlight"
import { LinkPreview } from "@/components/ui/link-preview"
import { cn } from "@/lib/utils"

interface MedicalRecordProps {
  title: string
  date: string
  doctor?: string
  patient?: string
  status?: string
  type?: string
  viewUrl: string
  downloadUrl: string
  className?: string
}

export function MedicalRecordCard({
  title,
  date,
  doctor,
  patient,
  status,
  type = "General",
  viewUrl,
  downloadUrl,
  className,
}: MedicalRecordProps) {
  return (
    <CardSpotlight
      className={cn(
        "p-6 h-auto w-full bg-black/10 dark:bg-black/20 backdrop-blur-sm border-primary/20 dashboard-card",
        className,
      )}
      color="#1a2b34"
    >
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-primary shimmer">
              <LinkPreview
                url={viewUrl}
                width={300}
                height={200}
                isStatic={true}
                imageSrc="/placeholder.svg?height=300&width=200"
              >
                {title}
              </LinkPreview>
            </h3>
            <p className="text-sm text-muted-foreground">
              {date} • {type}
            </p>
          </div>
          {status && (
            <div
              className={`rounded-full px-2 py-1 text-xs ${
                status === "Complete"
                  ? "bg-primary/20 text-primary"
                  : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
              }`}
            >
              {status}
            </div>
          )}
        </div>

        {(doctor || patient) && (
          <div className="mb-4 text-sm">
            {doctor && <p className="text-muted-foreground">Doctor: {doctor}</p>}
            {patient && <p className="text-muted-foreground">Patient: {patient}</p>}
          </div>
        )}

        <div className="mt-auto flex gap-2 pt-4">
          <Button variant="outline" size="sm" className="dashboard-button hover-glow flex-1" asChild>
            <a href={viewUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              View
            </a>
          </Button>
          <Button variant="outline" size="sm" className="dashboard-button hover-glow flex-1" asChild>
            <a href={downloadUrl} download>
              <Download className="mr-2 h-4 w-4" />
              Download
            </a>
          </Button>
        </div>
      </div>
    </CardSpotlight>
  )
}

