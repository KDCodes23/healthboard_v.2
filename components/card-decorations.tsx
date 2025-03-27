interface CardDecorationsProps {
  variant?: "minimal" | "lines"
}

export function CardDecorations({ variant }: CardDecorationsProps) {
  if (variant === "minimal") {
    return <div className="absolute inset-0 shape-blob opacity-50" />
  }

  if (variant === "lines") {
    return <div className="absolute inset-0 shape-lines opacity-50" />
  }

  return (
    <>
      <div className="shape-blob shape-blob-3" />
      <div className="shape-blob shape-blob-4" />
    </>
  )
}

