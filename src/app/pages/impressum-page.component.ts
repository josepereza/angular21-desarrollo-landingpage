import { Component } from '@angular/core';
import { SiteFooterComponent } from '../components/site-footer.component';
import { SiteHeaderComponent } from '../components/site-header.component';

@Component({
  selector: 'app-impressum-page',
  imports: [SiteHeaderComponent, SiteFooterComponent],
  template: `
    <app-site-header />

    <main class="legal-page">
      <div class="container">
        <div class="content glass-panel p-4 p-lg-5 mx-auto">
          <h1 class="section-title">Impressum</h1>
          <p>
            Angaben gemäß § 5 TMG. Bitte ersetzen Sie die folgenden Platzhalter durch Ihre
            tatsächlichen Unternehmensdaten.
          </p>

          <h2>Unternehmen</h2>
          <p>
            Goldwert Landingpages GmbH<br>
            Musterstraße 12<br>
            10115 Berlin<br>
            Deutschland
          </p>

          <h2>Vertreten durch</h2>
          <p>Maximilian Berger, Geschäftsführer</p>

          <h2>Kontakt</h2>
          <p>
            Telefon: +49 30 12345678<br>
            E-Mail: kontakt@goldwert-landingpages.de
          </p>

          <h2>Registereintrag</h2>
          <p>
            Eintragung im Handelsregister.<br>
            Registergericht: Amtsgericht Berlin-Charlottenburg<br>
            Registernummer: HRB 000000
          </p>

          <h2>Umsatzsteuer-ID</h2>
          <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE000000000</p>

          <h2>Verantwortlich für den Inhalt</h2>
          <p>Maximilian Berger, Anschrift wie oben.</p>
        </div>
      </div>
    </main>

    <app-site-footer />
  `,
})
export class ImpressumPageComponent {}
