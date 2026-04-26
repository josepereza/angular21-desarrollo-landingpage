import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-site-header',
  imports: [CommonModule, RouterLink],
  template: `
    <header class="site-header" [class.is-solid]="isSolid()">
      <div class="container">
        <nav class="navbar navbar-expand-lg px-0 py-3">
          <a class="navbar-brand brand-mark" routerLink="/">Goldwert</a>

          <button
            class="navbar-toggler border-0 shadow-none text-light"
            type="button"
            aria-controls="mainNav"
            [attr.aria-expanded]="menuOpen()"
            aria-label="Navigation umschalten"
            (click)="toggleMenu()"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div
            id="mainNav"
            class="navbar-collapse justify-content-end"
            [class.d-none]="!menuOpen()"
            [class.d-lg-flex]="true"
          >
            <div class="navbar-nav align-items-lg-center gap-lg-3">
              <a class="nav-link" href="/#leistungen" (click)="closeMenu()">Leistungen</a>
              <a class="nav-link" href="/#portfolio" (click)="closeMenu()">Portfolio</a>
              <a class="nav-link" href="/#kontakt" (click)="closeMenu()">Kontakt</a>
              <a class="btn btn-sm btn-gold ms-lg-2" href="/#kontakt" (click)="closeMenu()">
                Projekt anfragen
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  `,
  styles: `
    .site-header {
      position: fixed;
      inset: 0 0 auto;
      z-index: 1050;
      transition:
        background-color 240ms ease,
        backdrop-filter 240ms ease,
        border-color 240ms ease;
      border-bottom: 1px solid transparent;
    }

    .site-header.is-solid {
      background: rgba(10, 10, 10, 0.9);
      backdrop-filter: blur(14px);
      border-color: rgba(212, 175, 55, 0.15);
    }

    .brand-mark {
      color: var(--color-ivory);
      font-family: 'Cormorant Garamond', serif;
      font-size: 2rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .nav-link {
      color: rgba(245, 240, 225, 0.86);
      font-weight: 600;
    }

    .nav-link:hover {
      color: var(--color-gold-soft);
    }

    .navbar-toggler-icon {
      filter: invert(1);
    }
  `
})
export class SiteHeaderComponent {
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  readonly isSolid = signal(false);
  readonly menuOpen = signal(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', this.syncWithScroll, { passive: true });
      this.syncWithScroll();
    } else {
      this.isSolid.set(true);
    }

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        if (!isPlatformBrowser(this.platformId)) {
          return;
        }

        this.closeMenu();
        this.syncWithScroll();
      });
  }

  toggleMenu(): void {
    this.menuOpen.update((value) => !value);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  private readonly syncWithScroll = () => {
    const pathName = this.document.location?.pathname ?? '/';
    const isHome = pathName === '/';
    const isScrolled = window.scrollY > 30;
    this.isSolid.set(!isHome || isScrolled);
  };
}
