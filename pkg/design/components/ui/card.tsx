import { ReactNode } from 'react'
import { cn } from '../../lib/utils'

export interface CardProps {
  children: ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  border?: boolean
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  background?: 'white' | 'gray' | 'transparent'
  hover?: boolean
}

export default function Card({
  children,
  className = '',
  padding = 'md',
  shadow = 'md',
  border = true,
  rounded = 'lg',
  background = 'white',
  hover = false
}: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg'
  }

  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl'
  }

  const backgroundClasses = {
    white: 'bg-card',
    gray: 'bg-muted',
    transparent: 'bg-transparent'
  }

  return (
    <div
      className={cn(
        'relative',
        paddingClasses[padding],
        shadowClasses[shadow],
        border && 'border border-border',
        roundedClasses[rounded],
        backgroundClasses[background],
        hover && 'transition-all duration-200 hover:shadow-lg hover:-translate-y-1',
        className
      )}
    >
      {children}
    </div>
  )
}

export function DashboardCard({ children, className, ...props }: Omit<CardProps, 'padding' | 'shadow' | 'border' | 'rounded'>) {
  return (
    <Card padding="lg" shadow="md" border rounded="lg" background="white" className={className} {...props}>
      {children}
    </Card>
  )
}

export function StatCard({ children, className, ...props }: Omit<CardProps, 'padding' | 'shadow' | 'border' | 'rounded'>) {
  return (
    <Card padding="md" shadow="sm" border rounded="md" background="white" className={className} {...props}>
      {children}
    </Card>
  )
}

export function SimpleCard({ children, className, ...props }: Omit<CardProps, 'padding' | 'shadow' | 'border' | 'rounded'>) {
  return (
    <Card padding="md" shadow="none" border={false} rounded="none" background="transparent" className={className} {...props}>
      {children}
    </Card>
  )
}

export function CardHeader({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={cn('mb-4', className)}>{children}</div>
}

export function CardTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <h3 className={cn('text-lg font-semibold text-foreground', className)}>{children}</h3>
}

export function CardDescription({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={cn('text-sm text-muted-foreground mt-1', className)}>{children}</p>
}

export function CardContent({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>
}

export function CardFooter({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={cn('mt-4 pt-4 border-t border-border', className)}>{children}</div>
}
