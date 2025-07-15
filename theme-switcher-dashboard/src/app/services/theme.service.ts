import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ThemeName, Theme, ThemeConfig } from '../models/theme.model';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme$ = new BehaviorSubject<ThemeName>('light');
  private themeConfig$ = new BehaviorSubject<ThemeConfig>({
    currentTheme: 'light',
    availableThemes: this.getAvailableThemes(),
    autoSwitch: false,
    rememberPreference: true,
  });

  constructor() {
    this.initializeTheme();
  }

  // Get current theme as observable
  getCurrentTheme(): Observable<ThemeName> {
    return this.currentTheme$.asObservable();
  }

  // Get theme config as observable
  getThemeConfig(): Observable<ThemeConfig> {
    return this.themeConfig$.asObservable();
  }

  // Set theme
  setTheme(themeName: ThemeName): void {
    this.currentTheme$.next(themeName);
    this.applyTheme(themeName);
    this.saveThemePreference(themeName);
  }

  // Get current theme value
  getCurrentThemeValue(): ThemeName {
    return this.currentTheme$.value;
  }

  // Update theme config
  updateThemeConfig(config: Partial<ThemeConfig>): void {
    const currentConfig = this.themeConfig$.value;
    const updatedConfig = { ...currentConfig, ...config };
    this.themeConfig$.next(updatedConfig);

    if (config.currentTheme) {
      this.setTheme(config.currentTheme);
    }
  }

  // Toggle between light and dark themes
  toggleTheme(): void {
    const currentTheme = this.currentTheme$.value;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  // Initialize theme from localStorage or system preference
  private initializeTheme(): void {
    const savedTheme = this.getSavedThemePreference();
    const systemPreference = this.getSystemThemePreference();
    const initialTheme = savedTheme || systemPreference || 'light';

    this.setTheme(initialTheme);
  }

  // Apply theme to document
  private applyTheme(themeName: ThemeName): void {
    const htmlElement = document.documentElement;

    // Remove all existing theme classes
    htmlElement.classList.remove(
      'light',
      'dark',
      'high-contrast',
      'ocean',
      'sunset',
      'forest'
    );

    // Add new theme class
    htmlElement.setAttribute('data-theme', themeName);

    // Update meta theme-color for mobile browsers
    this.updateMetaThemeColor(themeName);
  }

  // Update meta theme-color
  private updateMetaThemeColor(themeName: ThemeName): void {
    let themeColor = '#ffffff'; // default light

    switch (themeName) {
      case 'dark':
        themeColor = '#111827';
        break;
      case 'high-contrast':
        themeColor = '#ffffff';
        break;
      case 'ocean':
        themeColor = '#f8fafc';
        break;
      case 'sunset':
        themeColor = '#fef7ed';
        break;
      case 'forest':
        themeColor = '#f0fdf4';
        break;
    }

    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.setAttribute('content', themeColor);
  }

  // Save theme preference to localStorage
  private saveThemePreference(themeName: ThemeName): void {
    if (this.themeConfig$.value.rememberPreference) {
      localStorage.setItem('theme-preference', themeName);
    }
  }

  // Get saved theme preference from localStorage
  private getSavedThemePreference(): ThemeName | null {
    const saved = localStorage.getItem('theme-preference');
    return (saved as ThemeName) || null;
  }

  // Get system theme preference
  private getSystemThemePreference(): ThemeName | null {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return 'dark';
    }
    return null;
  }

  // Get available themes
  private getAvailableThemes(): Theme[] {
    return [
      {
        name: 'light',
        displayName: 'Light',
        description: 'Clean and bright theme for daytime use',
        icon: '☀️',
        colors: {
          primary: '#3b82f6',
          secondary: '#6b7280',
          background: '#ffffff',
          surface: '#f9fafb',
          text: '#1a1a1a',
          textMuted: '#6b7280',
          border: '#e5e7eb',
        },
      },
      {
        name: 'dark',
        displayName: 'Dark',
        description: 'Easy on the eyes for low-light environments',
        icon: '🌙',
        colors: {
          primary: '#3b82f6',
          secondary: '#6b7280',
          background: '#111827',
          surface: '#1f2937',
          text: '#f9fafb',
          textMuted: '#9ca3af',
          border: '#374151',
        },
      },
      {
        name: 'high-contrast',
        displayName: 'High Contrast',
        description: 'Maximum contrast for accessibility',
        icon: '⚫',
        colors: {
          primary: '#000000',
          secondary: '#ffffff',
          background: '#ffffff',
          surface: '#f0f0f0',
          text: '#000000',
          textMuted: '#333333',
          border: '#000000',
        },
      },
      {
        name: 'ocean',
        displayName: 'Ocean',
        description: 'Calming blue tones inspired by the sea',
        icon: '🌊',
        colors: {
          primary: '#0ea5e9',
          secondary: '#64748b',
          background: '#f8fafc',
          surface: '#f1f5f9',
          text: '#0f172a',
          textMuted: '#475569',
          border: '#e2e8f0',
        },
      },
      {
        name: 'sunset',
        displayName: 'Sunset',
        description: 'Warm orange and purple gradients',
        icon: '🌅',
        colors: {
          primary: '#f97316',
          secondary: '#8b5cf6',
          background: '#fef7ed',
          surface: '#fed7aa',
          text: '#1e293b',
          textMuted: '#64748b',
          border: '#fdba74',
        },
      },
      {
        name: 'forest',
        displayName: 'Forest',
        description: 'Natural green tones for a fresh feel',
        icon: '🌲',
        colors: {
          primary: '#059669',
          secondary: '#6b7280',
          background: '#f0fdf4',
          surface: '#dcfce7',
          text: '#064e3b',
          textMuted: '#374151',
          border: '#bbf7d0',
        },
      },
    ];
  }

  // Get theme by name
  getThemeByName(name: ThemeName): Theme | undefined {
    return this.getAvailableThemes().find((theme) => theme.name === name);
  }

  // Check if theme is currently active
  isThemeActive(themeName: ThemeName): boolean {
    return this.currentTheme$.value === themeName;
  }

  // Get theme colors for current theme
  getCurrentThemeColors(): Theme['colors'] | undefined {
    const currentTheme = this.currentTheme$.value;
    return this.getThemeByName(currentTheme)?.colors;
  }
}
