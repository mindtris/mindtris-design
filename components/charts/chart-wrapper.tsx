'use client'

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { Line, Bar, Doughnut, Pie, PolarArea } from 'react-chartjs-2'
// Chart.js configuration will be set globally

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export type ChartType = 'line' | 'bar' | 'doughnut' | 'pie' | 'polar'

export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string | string[]
    borderWidth?: number
    fill?: boolean
    tension?: number
    [key: string]: any
  }[]
}

export interface ChartWrapperProps {
  type: ChartType
  data: ChartData
  title?: string
  className?: string
  options?: any
  height?: number
  width?: number
}

export default function ChartWrapper({
  type,
  data,
  title,
  className = '',
  options,
  height = 300,
  width
}: ChartWrapperProps) {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        borderWidth: 1,
        displayColors: false,
        mode: 'nearest',
        intersect: false,
        position: 'nearest',
        caretSize: 0,
        caretPadding: 20,
        cornerRadius: 8,
        padding: 8
      },
      title: title ? {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold' as const
        }
      } : false
    }
  }

  const mergedOptions = { ...defaultOptions, ...options }

  const renderChart = () => {
    const commonProps = {
      data,
      options: mergedOptions,
      width,
      height
    }

    switch (type) {
      case 'line':
        return <Line {...commonProps} />
      case 'bar':
        return <Bar {...commonProps} />
      case 'doughnut':
        return <Doughnut {...commonProps} />
      case 'pie':
        return <Pie {...commonProps} />
      case 'polar':
        return <PolarArea {...commonProps} />
      default:
        return <Line {...commonProps} />
    }
  }

  return (
    <div className={`relative ${className}`} style={{ height: `${height}px`, width: width ? `${width}px` : '100%' }}>
      {renderChart()}
    </div>
  )
}

// Pre-configured chart components for common use cases
export function LineChart({ data, title, className, options, ...props }: Omit<ChartWrapperProps, 'type'>) {
  return <ChartWrapper type="line" data={data} title={title} className={className} options={options} {...props} />
}

export function BarChart({ data, title, className, options, ...props }: Omit<ChartWrapperProps, 'type'>) {
  return <ChartWrapper type="bar" data={data} title={title} className={className} options={options} {...props} />
}

export function DoughnutChart({ data, title, className, options, ...props }: Omit<ChartWrapperProps, 'type'>) {
  return <ChartWrapper type="doughnut" data={data} title={title} className={className} options={options} {...props} />
}

export function PieChart({ data, title, className, options, ...props }: Omit<ChartWrapperProps, 'type'>) {
  return <ChartWrapper type="pie" data={data} title={title} className={className} options={options} {...props} />
}

export function PolarChart({ data, title, className, options, ...props }: Omit<ChartWrapperProps, 'type'>) {
  return <ChartWrapper type="polar" data={data} title={title} className={className} options={options} {...props} />
}
