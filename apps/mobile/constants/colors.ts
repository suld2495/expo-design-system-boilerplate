export const COLORS = {
  light: {
    // Primary
    primary: '#1f6feb',
    primaryHover: '#1a5cd7',
    primaryText: '#ffffff', // primary 버튼 텍스트

    // Background
    background: '#ffffff',
    backgroundSecondary: '#f6f8fa',

    // Border
    border: '#d0d7de',
    borderHover: '#afb8c1',

    // Text
    text: '#1f2937',
    textSecondary: '#6b7280',
    textTertiary: '#9ca3af',
    textInverse: '#ffffff', // dark background 위의 텍스트

    // Status
    success: '#16a34a',
    successText: '#ffffff',
    error: '#dc2626',
    errorText: '#ffffff',
    warning: '#f59e0b',
    warningText: '#ffffff',
    info: '#3b82f6',
    infoText: '#ffffff',
  },
  dark: {
    // Primary
    primary: '#4493f8',
    primaryHover: '#5aa5f9',
    primaryText: '#0d1117', // primary 버튼 텍스트

    // Background
    background: '#0d1117',
    backgroundSecondary: '#161b22',

    // Border
    border: '#30363d',
    borderHover: '#484f58',

    // Text
    text: '#e6edf3',
    textSecondary: '#9198a1',
    textTertiary: '#6e7681',
    textInverse: '#0d1117', // light background 위의 텍스트

    // Status
    success: '#3fb950',
    successText: '#0d1117',
    error: '#f85149',
    errorText: '#0d1117',
    warning: '#d29922',
    warningText: '#0d1117',
    info: '#58a6ff',
    infoText: '#0d1117',
  },
} as const;

export type ColorScheme = keyof typeof COLORS;
export type ColorToken = keyof typeof COLORS.light;
