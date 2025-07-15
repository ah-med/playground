import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NgbDropdownModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ThemeService } from '../../services/theme.service';
import { Theme, ThemeName } from '../../models/theme.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDropdownModule, NgbTooltipModule],
  template: `
    <div class="theme-switcher-container">
      <!-- Theme Switcher Dropdown -->
      <div class="theme-switcher-dropdown">
        <div
          class="current-theme-display"
          ngbDropdown
          #themeDropdown="ngbDropdown"
          placement="bottom-end"
        >
          <button
            class="btn btn-outline-secondary dropdown-toggle"
            ngbDropdownToggle
            [ngbTooltip]="'Switch theme'"
          >
            <span class="theme-icon">{{ currentTheme?.icon }}</span>
            <span class="theme-name">{{ currentTheme?.displayName }}</span>
          </button>

          <div ngbDropdownMenu class="theme-dropdown-menu">
            <div class="theme-options">
              <button
                *ngFor="let theme of availableThemes"
                class="theme-option"
                [class.active]="isThemeActive(theme.name)"
                (click)="setTheme(theme.name); themeDropdown.close()"
              >
                <div
                  class="theme-preview"
                  [style.background]="theme.colors.background"
                  [style.border-color]="theme.colors.border"
                >
                  <span class="theme-icon">{{ theme.icon }}</span>
                </div>
                <div class="theme-info">
                  <div class="theme-display-name">{{ theme.displayName }}</div>
                  <div class="theme-description">{{ theme.description }}</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Theme Configuration -->
      <div class="theme-config">
        <div class="config-item">
          <label class="form-check-label">
            <input
              type="checkbox"
              class="form-check-input"
              [(ngModel)]="autoSwitch"
              (change)="updateAutoSwitch()"
            />
            Auto-switch based on system preference
          </label>
        </div>

        <div class="config-item">
          <label class="form-check-label">
            <input
              type="checkbox"
              class="form-check-input"
              [(ngModel)]="rememberPreference"
              (change)="updateRememberPreference()"
            />
            Remember my preference
          </label>
        </div>
      </div>

      <!-- Quick Theme Toggle -->
      <div class="quick-toggle">
        <button
          class="btn btn-sm btn-outline-primary"
          (click)="toggleTheme()"
          [ngbTooltip]="'Toggle light/dark'"
        >
          <span class="toggle-icon">{{ getToggleIcon() }}</span>
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .theme-switcher-container {
        display: flex;
        align-items: center;
        gap: var(--spacing-4);
        padding: var(--spacing-4);
        background-color: var(--card-bg);
        border: var(--border-width) solid var(--card-border);
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow);
      }

      .theme-switcher-dropdown {
        flex: 1;
      }

      .current-theme-display {
        display: flex;
        align-items: center;
      }

      .theme-icon {
        font-size: var(--font-size-lg);
        margin-right: var(--spacing-2);
      }

      .theme-name {
        font-weight: 500;
        color: var(--text-color);
      }

      .theme-dropdown-menu {
        min-width: 280px;
        padding: var(--spacing-2);
      }

      .theme-options {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-2);
      }

      .theme-option {
        display: flex;
        align-items: center;
        gap: var(--spacing-3);
        padding: var(--spacing-3);
        border-radius: var(--border-radius);
        border: var(--border-width) solid transparent;
        background: transparent;
        cursor: pointer;
        transition: var(--transition-base);
        text-align: left;
        width: 100%;

        &:hover {
          background-color: var(--bg-secondary);
          border-color: var(--border-color);
        }

        &.active {
          background-color: var(--primary-color);
          color: white;
          border-color: var(--primary-color);
        }
      }

      .theme-preview {
        width: 40px;
        height: 40px;
        border-radius: var(--border-radius);
        border: var(--border-width) solid;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--font-size-lg);
      }

      .theme-info {
        flex: 1;
      }

      .theme-display-name {
        font-weight: 600;
        font-size: var(--font-size-sm);
        margin-bottom: var(--spacing-1);
      }

      .theme-description {
        font-size: var(--font-size-sm);
        color: var(--text-muted);
        line-height: var(--line-height-sm);
      }

      .theme-config {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-3);
        padding: var(--spacing-4);
        background-color: var(--bg-secondary);
        border-radius: var(--border-radius);
        border: var(--border-width) solid var(--border-color);
      }

      .config-item {
        display: flex;
        align-items: center;
        gap: var(--spacing-2);
      }

      .form-check-input {
        margin: 0;
      }

      .form-check-label {
        font-size: var(--font-size-sm);
        color: var(--text-color);
        cursor: pointer;
      }

      .quick-toggle {
        display: flex;
        align-items: center;
      }

      .toggle-icon {
        font-size: var(--font-size-lg);
      }

      @media (max-width: 768px) {
        .theme-switcher-container {
          flex-direction: column;
          align-items: stretch;
        }

        .theme-config {
          order: 2;
        }

        .quick-toggle {
          order: 3;
          justify-content: center;
        }
      }
    `,
  ],
})
export class ThemeSwitcherComponent implements OnInit, OnDestroy {
  currentTheme: Theme | undefined;
  availableThemes: Theme[] = [];
  autoSwitch = false;
  rememberPreference = true;

  private destroy$ = new Subject<void>();

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // Subscribe to theme changes
    this.themeService
      .getCurrentTheme()
      .pipe(takeUntil(this.destroy$))
      .subscribe((themeName) => {
        this.currentTheme = this.themeService.getThemeByName(themeName);
      });

    // Subscribe to theme config
    this.themeService
      .getThemeConfig()
      .pipe(takeUntil(this.destroy$))
      .subscribe((config) => {
        this.availableThemes = config.availableThemes;
        this.autoSwitch = config.autoSwitch;
        this.rememberPreference = config.rememberPreference;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setTheme(themeName: ThemeName): void {
    this.themeService.setTheme(themeName);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  isThemeActive(themeName: ThemeName): boolean {
    return this.themeService.isThemeActive(themeName);
  }

  updateAutoSwitch(): void {
    this.themeService.updateThemeConfig({ autoSwitch: this.autoSwitch });
  }

  updateRememberPreference(): void {
    this.themeService.updateThemeConfig({
      rememberPreference: this.rememberPreference,
    });
  }

  getToggleIcon(): string {
    const currentTheme = this.themeService.getCurrentThemeValue();
    return currentTheme === 'light' ? '🌙' : '☀️';
  }
}
