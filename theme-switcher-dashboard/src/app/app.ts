import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';
import { ColorPaletteComponent } from './components/color-palette/color-palette.component';
import { ComponentShowcaseComponent } from './components/component-showcase/component-showcase.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ThemeSwitcherComponent,
    ColorPaletteComponent,
    ComponentShowcaseComponent,
  ],
  template: `
    <div class="app-container">
      <!-- Header -->
      <header class="app-header">
        <div class="container">
          <div class="header-content">
            <div class="header-left">
              <h1 class="app-title">🎨 Theme Switcher Dashboard</h1>
              <p class="app-subtitle">
                Theming with Angular, Bootstrap, and ng-bootstrap
              </p>
            </div>
            <div class="header-right">
              <app-theme-switcher></app-theme-switcher>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="app-main">
        <div class="container">
          <div class="content-grid">
            <!-- Color Palette Section -->
            <section class="content-section">
              <app-color-palette></app-color-palette>
            </section>

            <!-- Component Showcase Section -->
            <section class="content-section">
              <app-component-showcase></app-component-showcase>
            </section>
          </div>
        </div>
      </main>

      <!-- Footer -->
      <footer class="app-footer">
        <div class="container">
          <div class="footer-content">
            <p class="footer-text">Theme Switcher Dashboard</p>
            <div class="footer-links">
              <a href="https://angular.dev/" target="_blank" class="footer-link"
                >Angular</a
              >
              <a
                href="https://getbootstrap.com/"
                target="_blank"
                class="footer-link"
                >Bootstrap</a
              >
              <a
                href="https://ng-bootstrap.github.io/"
                target="_blank"
                class="footer-link"
                >ng-bootstrap</a
              >
            </div>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [
    `
      .app-container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background-color: var(--bg-color);
        color: var(--text-color);
      }

      .app-header {
        background-color: var(--card-bg);
        border-bottom: var(--border-width) solid var(--card-border);
        padding: var(--spacing-6) 0;
        box-shadow: var(--shadow-sm);
      }

      .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--spacing-6);
      }

      .header-left {
        flex: 1;
      }

      .app-title {
        color: var(--text-color);
        font-size: var(--font-size-3xl);
        font-weight: 700;
        margin: 0 0 var(--spacing-2) 0;
      }

      .app-subtitle {
        color: var(--text-muted);
        font-size: var(--font-size-lg);
        margin: 0;
      }

      .header-right {
        flex-shrink: 0;
      }

      .app-main {
        flex: 1;
        padding: var(--spacing-8) 0;
      }

      .content-grid {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-8);
      }

      .content-section {
        width: 100%;
      }

      .app-footer {
        background-color: var(--card-bg);
        border-top: var(--border-width) solid var(--card-border);
        padding: var(--spacing-6) 0;
        margin-top: auto;
      }

      .footer-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--spacing-4);
      }

      .footer-text {
        color: var(--text-muted);
        font-size: var(--font-size-sm);
        margin: 0;
      }

      .footer-links {
        display: flex;
        gap: var(--spacing-4);
      }

      .footer-link {
        color: var(--primary-color);
        text-decoration: none;
        font-size: var(--font-size-sm);
        font-weight: 500;
        transition: var(--transition-base);
      }

      .footer-link:hover {
        color: var(--text-color);
        text-decoration: underline;
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 var(--spacing-4);
      }

      @media (max-width: 768px) {
        .header-content {
          flex-direction: column;
          align-items: stretch;
          gap: var(--spacing-4);
        }

        .footer-content {
          flex-direction: column;
          text-align: center;
          gap: var(--spacing-3);
        }

        .app-title {
          font-size: var(--font-size-2xl);
        }

        .app-subtitle {
          font-size: var(--font-size-base);
        }
      }
    `,
  ],
})
export class AppComponent {
  title = 'theme-switcher-dashboard';
}
