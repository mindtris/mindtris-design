import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

// Number formatting utilities
export const formatValue = (value: number): string => Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumSignificantDigits: 3,
  notation: 'compact',
}).format(value)

export const formatThousands = (value: number): string => Intl.NumberFormat('en-US', {
  maximumSignificantDigits: 3,
  notation: 'compact',
}).format(value)

// CSS utilities
export const getCssVariable = (variable: string): string => {
  if (typeof window === 'undefined') {
    return '';
  }  
  return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
};

// Color utilities
const adjustHexOpacity = (hexColor: string, opacity: number): string => {
  hexColor = hexColor.replace('#', '');
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const adjustHSLOpacity = (hslColor: string, opacity: number): string => {
  return hslColor.replace('hsl(', 'hsla(').replace(')', `, ${opacity})`);
};

const adjustOKLCHOpacity = (oklchColor: string, opacity: number): string => {
  return oklchColor.replace(/oklch\((.*?)\)/, (match, p1) => `oklch(${p1} / ${opacity})`);
};

export const adjustColorOpacity = (color: string, opacity: number): string => {
  if (color.startsWith('#')) {
    return adjustHexOpacity(color, opacity);
  } else if (color.startsWith('hsl')) {
    return adjustHSLOpacity(color, opacity);
  } else if (color.startsWith('oklch')) {
    return adjustOKLCHOpacity(color, opacity);
  } else {
    return "";    
  }
};

export const oklchToRGBA = (oklchColor: string): string => {
  if (typeof window === 'undefined') return '';
  
  const tempDiv = document.createElement('div');
  tempDiv.style.color = oklchColor;
  document.body.appendChild(tempDiv);
  
  const computedColor = window.getComputedStyle(tempDiv).color;
  document.body.removeChild(tempDiv);
  
  return computedColor;
};