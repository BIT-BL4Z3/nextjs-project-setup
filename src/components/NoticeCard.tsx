interface NoticeCardProps {
  title: string
  description: string
  imageUrl?: string
  timestamp?: string
}

export default function NoticeCard({ title, description, imageUrl, timestamp }: NoticeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {imageUrl && (
        <div className="w-full h-48 bg-gray-100">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>
        {timestamp && (
          <div className="flex justify-end">
            <span className="text-xs text-gray-400">{timestamp}</span>
          </div>
        )}
      </div>
    </div>
  )
}
