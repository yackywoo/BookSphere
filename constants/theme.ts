export const colors = {
  primary: '#0a7ea4',
  secondary: '#666',
  background: '#fff',
  backgroundAlt: '#f8f8f8',
  text: '#333',
  textLight: '#666',
  textLighter: '#999',
  border: '#ddd',
  borderLight: '#eee',
  error: '#dc3545',
  success: '#28a745',
  black: '#000',
  white: '#fff',
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(255, 255, 255, 0.3)',
  shadow: '#000',
  placeholder: '#ccc',
  like: '#ff4444',
  avatar: '#eee',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
  },
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 9999,
} as const;

export const shadows = {
  sm: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
} as const; 