import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-site-footer',
  imports: [RouterLink],
  template: `
    <footer class="site-footer">
      <div class="container py-5">
        <div class="d-flex flex-column flex-lg-row justify-content-between gap-4 align-items-lg-center">
          <div>
            <div class="footer-brand">Goldwert Landingpages</div>
            <p class="footer-copy mb-0">
              Digitale Auftritte für Unternehmen, die sichtbar, glaubwürdig und verkaufsstark
              auftreten wollen.
            </p>
          </div>

          <div class="d-flex flex-wrap gap-3 legal-links">
            <a routerLink="/impressum">Impressum</a>
            <a routerLink="/cookies">Cookies</a>
            <a routerLink="/agb">AGB</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: `
    .site-footer {
      border-top: 1px solid rgba(212, 175, 55, 0.12);
      background: rgba(7, 7, 7, 0.95);
    }

    .footer-brand {
      font-family: Georgia, 'Times New Roman', Times, serif;
      font-size: 1.8rem;
      color: var(--color-gold-soft);
      margin-bottom: 0.5rem;
    }

    .footer-copy {
      max-width: 520px;
      color: var(--color-muted);
    }

    .legal-links a {
      color: var(--color-ivory);
      font-weight: 600;
    }

    .legal-links a:hover {
      color: var(--color-gold-soft);
    }
  `
})
export class SiteFooterComponent {}
