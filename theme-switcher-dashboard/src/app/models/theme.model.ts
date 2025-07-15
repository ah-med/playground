export type ThemeName =
  | 'light'
  | 'dark'
  | 'high-contrast'
  | 'ocean'
  | 'sunset'
  | 'forest';

export interface Theme {
  name: ThemeName;
  displayName: string;
  description: string;
  icon: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
  };
}

export interface ThemeConfig {
  currentTheme: ThemeName;
  availableThemes: Theme[];
  autoSwitch: boolean;
  rememberPreference: boolean;
}

export interface ColorPalette {
  name: string;
  value: string;
  category: 'primary' | 'secondary' | 'semantic' | 'neutral';
  description?: string;
}

export interface ComponentShowcase {
  name: string;
  description: string;
  category: 'buttons' | 'forms' | 'cards' | 'navigation' | 'feedback' | 'data';
  examples: ComponentExample[];
}

export interface ComponentExample {
  name: string;
  description: string;
  code: string;
  preview: string;
}
