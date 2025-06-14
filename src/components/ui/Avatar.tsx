'use client'

import Image from 'next/image'
import clsx from 'clsx'

interface AvatarProps {
  src?: string
  alt: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isOnline?: boolean
  emoji?: string
  className?: string
}

export default function Avatar({
  src,
  alt,
  size = 'md',
  isOnline,
  emoji,
  className
}: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const statusSizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4'
  }

  return (
    <div className={clsx('relative flex-shrink-0', className)}>
      <div className={clsx(
        sizes[size],
        'rounded-full overflow-hidden bg-gradient-to-br from-primary to-secondary flex items-center justify-center'
      )}>
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={size === 'xl' ? 64 : size === 'lg' ? 48 : size === 'md' ? 40 : 32}
            height={size === 'xl' ? 64 : size === 'lg' ? 48 : size === 'md' ? 40 : 32}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-white font-semibold">
            {emoji || alt.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      
      {isOnline !== undefined && (
        <div className={clsx(
          statusSizes[size],
          'absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-white dark:border-gray-800',
          isOnline ? 'bg-green-500' : 'bg-gray-400'
        )} />
      )}
    </div>
  )
}
