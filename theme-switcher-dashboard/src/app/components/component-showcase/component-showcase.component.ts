import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NgbDropdownModule,
  NgbNavModule,
  NgbProgressbarModule,
  NgbTooltipModule,
  NgbPopoverModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-component-showcase',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbProgressbarModule,
    NgbTooltipModule,
    NgbPopoverModule,
    NgbPaginationModule,
  ],
  template: `
    <div class="component-showcase">
      <h2 class="showcase-title">Component Showcase</h2>
      <p class="showcase-description">
        Explore how Bootstrap components adapt to different themes.
      </p>

      <!-- Buttons Section -->
      <div class="showcase-section">
        <h3>Buttons</h3>
        <div class="showcase-grid">
          <div class="showcase-item">
            <h4>Button Variants</h4>
            <div class="button-group">
              <button class="btn btn-primary">Primary</button>
              <button class="btn btn-secondary">Secondary</button>
              <button class="btn btn-success">Success</button>
              <button class="btn btn-danger">Danger</button>
              <button class="btn btn-warning">Warning</button>
              <button class="btn btn-info">Info</button>
              <button class="btn btn-light">Light</button>
              <button class="btn btn-dark">Dark</button>
            </div>
          </div>

          <div class="showcase-item">
            <h4>Button Styles</h4>
            <div class="button-group">
              <button class="btn btn-primary">Filled</button>
              <button class="btn btn-outline-primary">Outline</button>
              <button class="btn btn-primary" disabled>Disabled</button>
              <button class="btn btn-primary btn-sm">Small</button>
              <button class="btn btn-primary btn-lg">Large</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Cards Section -->
      <div class="showcase-section">
        <h3>Cards</h3>
        <div class="showcase-grid">
          <div class="showcase-item">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title mb-0">Card Header</h5>
              </div>
              <div class="card-body">
                <h5 class="card-title">Card Title</h5>
                <p class="card-text">
                  This is a sample card with some content to demonstrate
                  theming.
                </p>
                <button class="btn btn-primary">Action</button>
              </div>
              <div class="card-footer text-muted">Card Footer</div>
            </div>
          </div>

          <div class="showcase-item">
            <div class="card">
              <div class="card-img-placeholder">
                <div class="placeholder-content">
                  <span class="placeholder-icon">🖼️</span>
                  <span class="placeholder-text">Image Placeholder</span>
                </div>
              </div>
              <div class="card-body">
                <h5 class="card-title">Image Card</h5>
                <p class="card-text">
                  Card with a placeholder image and some sample content.
                </p>
                <div class="d-flex gap-2">
                  <button class="btn btn-primary">Primary</button>
                  <button class="btn btn-outline-secondary">Secondary</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Forms Section -->
      <div class="showcase-section">
        <h3>Forms</h3>
        <div class="showcase-grid">
          <div class="showcase-item">
            <h4>Form Controls</h4>
            <form>
              <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="name@example.com"
                />
                <div class="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" />
              </div>
              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="remember" />
                <label class="form-check-label" for="remember">
                  Remember me
                </label>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>

          <div class="showcase-item">
            <h4>Select & Textarea</h4>
            <form>
              <div class="mb-3">
                <label for="select" class="form-label">Select Option</label>
                <select class="form-select" id="select">
                  <option selected>Choose...</option>
                  <option value="1">Option 1</option>
                  <option value="2">Option 2</option>
                  <option value="3">Option 3</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="textarea" class="form-label">Textarea</label>
                <textarea
                  class="form-control"
                  id="textarea"
                  rows="3"
                  placeholder="Enter your message..."
                ></textarea>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Navigation Section -->
      <div class="showcase-section">
        <h3>Navigation</h3>
        <div class="showcase-grid">
          <div class="showcase-item">
            <h4>Nav Tabs</h4>
            <ul ngbNav #nav="ngbNav" class="nav-tabs">
              <li [ngbNavItem]="1">
                <a ngbNavLink>Active</a>
                <ng-template ngbNavContent>
                  <p>This is the active tab content.</p>
                </ng-template>
              </li>
              <li [ngbNavItem]="2">
                <a ngbNavLink>Link</a>
                <ng-template ngbNavContent>
                  <p>This is the second tab content.</p>
                </ng-template>
              </li>
              <li [ngbNavItem]="3">
                <a ngbNavLink>Link</a>
                <ng-template ngbNavContent>
                  <p>This is the third tab content.</p>
                </ng-template>
              </li>
            </ul>
            <div [ngbNavOutlet]="nav" class="mt-3"></div>
          </div>

          <div class="showcase-item">
            <h4>Dropdown</h4>
            <div ngbDropdown class="d-inline-block">
              <button
                class="btn btn-outline-primary"
                id="dropdownMenu1"
                ngbDropdownToggle
              >
                Dropdown
              </button>
              <div ngbDropdownMenu aria-labelledby="dropdownMenu1">
                <button ngbDropdownItem>Action</button>
                <button ngbDropdownItem>Another action</button>
                <button ngbDropdownItem>Something else here</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Feedback Section -->
      <div class="showcase-section">
        <h3>Feedback</h3>
        <div class="showcase-grid">
          <div class="showcase-item">
            <h4>Alerts</h4>
            <div class="alert alert-primary" role="alert">
              This is a primary alert—check it out!
            </div>
            <div class="alert alert-success" role="alert">
              This is a success alert—check it out!
            </div>
            <div class="alert alert-warning" role="alert">
              This is a warning alert—check it out!
            </div>
            <div class="alert alert-danger" role="alert">
              This is a danger alert—check it out!
            </div>
          </div>

          <div class="showcase-item">
            <h4>Progress Bars</h4>
            <div class="mb-3">
              <label class="form-label">Default Progress</label>
              <ngb-progressbar [value]="25"></ngb-progressbar>
            </div>
            <div class="mb-3">
              <label class="form-label">Success Progress</label>
              <ngb-progressbar [value]="50" type="success"></ngb-progressbar>
            </div>
            <div class="mb-3">
              <label class="form-label">Warning Progress</label>
              <ngb-progressbar [value]="75" type="warning"></ngb-progressbar>
            </div>
            <div class="mb-3">
              <label class="form-label">Danger Progress</label>
              <ngb-progressbar [value]="100" type="danger"></ngb-progressbar>
            </div>
          </div>
        </div>
      </div>

      <!-- Data Display Section -->
      <div class="showcase-section">
        <h3>Data Display</h3>
        <div class="showcase-grid">
          <div class="showcase-item">
            <h4>Table</h4>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>Bird</td>
                  <td>twitter</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="showcase-item">
            <h4>Pagination</h4>
            <ngb-pagination
              [collectionSize]="70"
              [(page)]="page"
              [boundaryLinks]="true"
            ></ngb-pagination>
          </div>
        </div>
      </div>

      <!-- Interactive Components -->
      <div class="showcase-section">
        <h3>Interactive Components</h3>
        <div class="showcase-grid">
          <div class="showcase-item">
            <h4>Tooltips & Popovers</h4>
            <div class="d-flex gap-2 flex-wrap">
              <button
                class="btn btn-secondary"
                ngbTooltip="Tooltip on top"
                placement="top"
              >
                Tooltip on top
              </button>
              <button
                class="btn btn-secondary"
                ngbTooltip="Tooltip on bottom"
                placement="bottom"
              >
                Tooltip on bottom
              </button>
              <button
                class="btn btn-secondary"
                ngbPopover="Popover content"
                popoverTitle="Popover title"
              >
                Popover
              </button>
            </div>
          </div>

          <div class="showcase-item">
            <h4>Collapsible Content</h4>
            <div class="collapse-content">
              <p>
                This is a simple collapsible content area to demonstrate
                theming.
              </p>
              <button class="btn btn-primary">Action Button</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .component-showcase {
        padding: var(--spacing-6);
      }

      .showcase-title {
        color: var(--text-color);
        font-size: var(--font-size-3xl);
        font-weight: 700;
        margin-bottom: var(--spacing-2);
      }

      .showcase-description {
        color: var(--text-muted);
        font-size: var(--font-size-lg);
        margin-bottom: var(--spacing-8);
      }

      .showcase-section {
        margin-bottom: var(--spacing-12);
      }

      .showcase-section h3 {
        color: var(--text-color);
        font-size: var(--font-size-2xl);
        font-weight: 600;
        margin-bottom: var(--spacing-6);
        padding-bottom: var(--spacing-3);
        border-bottom: var(--border-width) solid var(--border-color);
      }

      .showcase-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: var(--spacing-6);
      }

      .showcase-item {
        background-color: var(--card-bg);
        border: var(--border-width) solid var(--card-border);
        border-radius: var(--border-radius-lg);
        padding: var(--spacing-6);
        box-shadow: var(--shadow);
        transition: var(--transition-base);
      }

      .showcase-item:hover {
        box-shadow: var(--shadow-md);
      }

      .showcase-item h4 {
        color: var(--text-color);
        font-size: var(--font-size-lg);
        font-weight: 600;
        margin-bottom: var(--spacing-4);
      }

      .button-group {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-2);
      }

      .card {
        background-color: var(--card-bg);
        border: var(--border-width) solid var(--card-border);
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow);
      }

      .card-header {
        background-color: var(--bg-secondary);
        border-bottom: var(--border-width) solid var(--border-color);
        padding: var(--spacing-4);
      }

      .card-body {
        padding: var(--spacing-4);
      }

      .card-footer {
        background-color: var(--bg-secondary);
        border-top: var(--border-width) solid var(--border-color);
        padding: var(--spacing-4);
      }

      .card-img-placeholder {
        height: 200px;
        background-color: var(--bg-secondary);
        border-bottom: var(--border-width) solid var(--border-color);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
      }

      .placeholder-content {
        text-align: center;
        color: var(--text-muted);
      }

      .placeholder-icon {
        font-size: var(--font-size-3xl);
        display: block;
        margin-bottom: var(--spacing-2);
      }

      .placeholder-text {
        font-size: var(--font-size-sm);
        font-weight: 500;
      }

      .form-control,
      .form-select,
      .form-check-input {
        background-color: var(--input-bg);
        border-color: var(--input-border);
        color: var(--text-color);
      }

      .form-control:focus,
      .form-select:focus {
        border-color: var(--input-focus-border);
        box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.25);
      }

      .form-label {
        color: var(--text-color);
        font-weight: 500;
      }

      .form-text {
        color: var(--text-muted);
      }

      .table {
        color: var(--text-color);
      }

      .table th {
        background-color: var(--bg-secondary);
        border-color: var(--border-color);
      }

      .table td {
        border-color: var(--border-color);
      }

      .alert {
        border: var(--border-width) solid transparent;
        border-radius: var(--border-radius);
      }

      .nav-tabs .nav-link {
        color: var(--text-muted);
        border-color: var(--border-color);
      }

      .nav-tabs .nav-link.active {
        color: var(--primary-color);
        background-color: var(--card-bg);
        border-color: var(--border-color) var(--border-color) var(--card-bg);
      }

      .collapse-content {
        padding: var(--spacing-4);
        background-color: var(--bg-secondary);
        border-radius: var(--border-radius);
        border: var(--border-width) solid var(--border-color);
      }

      @media (max-width: 768px) {
        .showcase-grid {
          grid-template-columns: 1fr;
        }

        .button-group {
          flex-direction: column;
        }
      }
    `,
  ],
})
export class ComponentShowcaseComponent {
  page = 1;

  constructor(private themeService: ThemeService) {}
}
