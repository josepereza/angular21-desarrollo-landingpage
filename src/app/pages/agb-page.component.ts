import { Component } from '@angular/core';
import { SiteFooterComponent } from '../components/site-footer.component';
import { SiteHeaderComponent } from '../components/site-header.component';

@Component({
  selector: 'app-agb-page',
  imports: [SiteHeaderComponent, SiteFooterComponent],
  template: `
    <app-site-header />

    <main class="legal-page">
      <div class="container">
        <div class="content glass-panel p-4 p-lg-5 mx-auto">
          <h1 class="section-title">Allgemeine Geschäftsbedingungen</h1>
          <p>
            Die folgenden AGB dienen als grundlegende Musterinhalte und sollten rechtlich geprüft
            sowie an Ihr Unternehmen angepasst werden.
          </p>

          <h2>1. Geltungsbereich</h2>
          <p>
            Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen Goldwert
            Landingpages GmbH und ihren Kunden über die Konzeption, Gestaltung und Entwicklung von
            Landingpages und Webprojekten.
          </p>

          <h2>2. Leistungen</h2>
          <p>
            Der konkrete Leistungsumfang ergibt sich aus dem jeweiligen Angebot, Projektvertrag oder
            der individuellen Leistungsbeschreibung.
          </p>

          <h2>3. Mitwirkungspflichten des Kunden</h2>
          <p>
            Der Kunde stellt alle zur Leistungserbringung erforderlichen Informationen, Inhalte,
            Freigaben und Materialien rechtzeitig zur Verfügung.
          </p>

          <h2>4. Vergütung</h2>
          <p>
            Alle Preise verstehen sich netto zuzüglich gesetzlicher Umsatzsteuer, sofern nicht
            ausdrücklich etwas anderes vereinbart wurde.
          </p>

          <h2>5. Abnahme</h2>
          <p>
            Nach Fertigstellung der vereinbarten Leistungen erfolgt die Abnahme durch den Kunden.
            Kleinere Mängel, die die Nutzung nicht wesentlich beeinträchtigen, berechtigen nicht zur
            Verweigerung der Abnahme.
          </p>

          <h2>6. Haftung</h2>
          <p>
            Die Haftung richtet sich nach den gesetzlichen Vorschriften. Für leichte Fahrlässigkeit
            haftet der Anbieter nur bei Verletzung wesentlicher Vertragspflichten.
          </p>

          <h2>7. Schlussbestimmungen</h2>
          <p>
            Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist, soweit gesetzlich
            zulässig, der Sitz des Anbieters.
          </p>
        </div>
      </div>
    </main>

    <app-site-footer />
  `,
})
export class AgbPageComponent {}
