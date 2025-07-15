import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeService } from '../../services/theme.service';
import { ColorPalette } from '../../models/theme.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-color-palette',
  standalone: true,
  imports: [CommonModule, NgbTooltipModule],
  template: `
    <div class="color-palette-container">
      <h3 class="palette-title">Color Palette</h3>
      <p class="palette-description">
        Current theme colors and their usage in the application.
      </p>

      <div class="color-categories">
        <!-- Primary Colors -->
        <div class="color-category">
          <h4 class="category-title">Primary Colors</h4>
          <div class="color-grid">
            <div
              *ngFor="let color of primaryColors"
              class="color-item"
              [ngbTooltip]="color.description || color.name"
            >
              <div
                class="color-swatch"
                [style.background-color]="color.value"
                [style.color]="getContrastColor(color.value)"
              >
                <span class="color-name">{{ color.name }}</span>
              </div>
              <div class="color-details">
                <div class="color-name">{{ color.name }}</div>
                <div class="color-value">{{ color.value }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Semantic Colors -->
        <div class="color-category">
          <h4 class="category-title">Semantic Colors</h4>
          <div class="color-grid">
            <div
              *ngFor="let color of semanticColors"
              class="color-item"
              [ngbTooltip]="color.description || color.name"
            >
              <div
                class="color-swatch"
                [style.background-color]="color.value"
                [style.color]="getContrastColor(color.value)"
              >
                <span class="color-name">{{ color.name }}</span>
              </div>
              <div class="color-details">
                <div class="color-name">{{ color.name }}</div>
                <div class="color-value">{{ color.value }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Neutral Colors -->
        <div class="color-category">
          <h4 class="category-title">Neutral Colors</h4>
          <div class="color-grid">
            <div
              *ngFor="let color of neutralColors"
              class="color-item"
              [ngbTooltip]="color.description || color.name"
            >
              <div
                class="color-swatch"
                [style.background-color]="color.value"
                [style.color]="getContrastColor(color.value)"
              >
                <span class="color-name">{{ color.name }}</span>
              </div>
              <div class="color-details">
                <div class="color-name">{{ color.name }}</div>
                <div class="color-value">{{ color.value }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Color Usage Examples -->
      <div class="color-usage">
        <h4 class="usage-title">Color Usage Examples</h4>
        <div class="usage-examples">
          <div class="usage-example">
            <div class="example-label">Text Colors</div>
            <div class="example-content">
              <span class="text-primary">Primary text</span>
              <span class="text-muted">Muted text</span>
              <span class="text-success">Success text</span>
              <span class="text-danger">Danger text</span>
            </div>
          </div>

          <div class="usage-example">
            <div class="example-label">Background Colors</div>
            <div class="example-content">
              <span class="bg-primary text-white">Primary background</span>
              <span class="bg-secondary text-white">Secondary background</span>
              <span class="bg-light text-dark">Light background</span>
            </div>
          </div>

          <div class="usage-example">
            <div class="example-label">Border Colors</div>
            <div class="example-content">
              <span class="border border-primary">Primary border</span>
              <span class="border border-secondary">Secondary border</span>
              <span class="border border-success">Success border</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .color-palette-container {
        padding: var(--spacing-6);
        background-color: var(--card-bg);
        border: var(--border-width) solid var(--card-border);
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow);
      }

      .palette-title {
        color: var(--text-color);
        font-size: var(--font-size-2xl);
        font-weight: 600;
        margin-bottom: var(--spacing-2);
      }

      .palette-description {
        color: var(--text-muted);
        font-size: var(--font-size-sm);
        margin-bottom: var(--spacing-6);
      }

      .color-categories {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-8);
      }

      .color-category {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-4);
      }

      .category-title {
        color: var(--text-color);
        font-size: var(--font-size-lg);
        font-weight: 600;
        margin-bottom: var(--spacing-3);
        padding-bottom: var(--spacing-2);
        border-bottom: var(--border-width) solid var(--border-color);
      }

      .color-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: var(--spacing-4);
      }

      .color-item {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-2);
      }

      .color-swatch {
        width: 100%;
        height: 80px;
        border-radius: var(--border-radius);
        border: var(--border-width) solid var(--border-color);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--font-size-sm);
        font-weight: 600;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        transition: var(--transition-base);

        &:hover {
          transform: scale(1.05);
          box-shadow: var(--shadow-md);
        }
      }

      .color-details {
        text-align: center;
      }

      .color-name {
        font-size: var(--font-size-sm);
        font-weight: 500;
        color: var(--text-color);
        margin-bottom: var(--spacing-1);
      }

      .color-value {
        font-size: var(--font-size-xs);
        color: var(--text-muted);
        font-family: var(--font-family-monospace);
      }

      .color-usage {
        margin-top: var(--spacing-8);
        padding-top: var(--spacing-6);
        border-top: var(--border-width) solid var(--border-color);
      }

      .usage-title {
        color: var(--text-color);
        font-size: var(--font-size-lg);
        font-weight: 600;
        margin-bottom: var(--spacing-4);
      }

      .usage-examples {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-4);
      }

      .usage-example {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-2);
      }

      .example-label {
        font-size: var(--font-size-sm);
        font-weight: 500;
        color: var(--text-color);
      }

      .example-content {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-3);
        padding: var(--spacing-3);
        background-color: var(--bg-secondary);
        border-radius: var(--border-radius);
        border: var(--border-width) solid var(--border-color);
      }

      .example-content span {
        padding: var(--spacing-2) var(--spacing-3);
        border-radius: var(--border-radius);
        font-size: var(--font-size-sm);
        font-weight: 500;
      }

      @media (max-width: 768px) {
        .color-grid {
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        }

        .example-content {
          flex-direction: column;
        }
      }
    `,
  ],
})
export class ColorPaletteComponent implements OnInit, OnDestroy {
  primaryColors: ColorPalette[] = [];
  semanticColors: ColorPalette[] = [];
  neutralColors: ColorPalette[] = [];

  private destroy$ = new Subject<void>();

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService
      .getCurrentTheme()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateColorPalette();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateColorPalette(): void {
    const currentTheme = this.themeService.getCurrentThemeValue();
    const theme = this.themeService.getThemeByName(currentTheme);

    if (theme) {
      this.primaryColors = [
        {
          name: 'Primary',
          value: theme.colors.primary,
          category: 'primary',
          description: 'Main brand color used for buttons and links',
        },
        {
          name: 'Secondary',
          value: theme.colors.secondary,
          category: 'primary',
          description: 'Secondary brand color for less prominent elements',
        },
      ];

      this.semanticColors = [
        {
          name: 'Success',
          value: '#10b981',
          category: 'semantic',
          description: 'Used for success states and positive actions',
        },
        {
          name: 'Danger',
          value: '#ef4444',
          category: 'semantic',
          description: 'Used for error states and destructive actions',
        },
        {
          name: 'Warning',
          value: '#f59e0b',
          category: 'semantic',
          description: 'Used for warning states and caution messages',
        },
        {
          name: 'Info',
          value: '#06b6d4',
          category: 'semantic',
          description: 'Used for informational messages and neutral states',
        },
      ];

      this.neutralColors = [
        {
          name: 'Background',
          value: theme.colors.background,
          category: 'neutral',
          description: 'Main background color',
        },
        {
          name: 'Surface',
          value: theme.colors.surface,
          category: 'neutral',
          description: 'Surface color for cards and panels',
        },
        {
          name: 'Text',
          value: theme.colors.text,
          category: 'neutral',
          description: 'Primary text color',
        },
        {
          name: 'Text Muted',
          value: theme.colors.textMuted,
          category: 'neutral',
          description: 'Secondary text color for less important content',
        },
        {
          name: 'Border',
          value: theme.colors.border,
          category: 'neutral',
          description: 'Border color for dividers and outlines',
        },
      ];
    }
  }

  getContrastColor(backgroundColor: string): string {
    // Simple contrast calculation
    const hex = backgroundColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#ffffff';
  }
}
