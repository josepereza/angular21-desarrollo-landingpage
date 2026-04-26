import { Component } from '@angular/core';
import { SiteFooterComponent } from '../components/site-footer.component';
import { SiteHeaderComponent } from '../components/site-header.component';

@Component({
  selector: 'app-cookies-page',
  imports: [SiteHeaderComponent, SiteFooterComponent],
  template: `
    <app-site-header />

    <main class="legal-page">
      <div class="container">
        <div class="content glass-panel p-4 p-lg-5 mx-auto">
          <h1 class="section-title">Cookies</h1>
          <p>
            Diese Website verwendet Cookies und ähnliche Technologien, um die technische
            Funktionsfähigkeit sicherzustellen und die Nutzererfahrung zu verbessern.
          </p>

          <h2>Was sind Cookies?</h2>
          <p>
            Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden. Sie
            enthalten Informationen, die bei einem späteren Besuch wieder ausgelesen werden
            können.
          </p>

          <h2>Welche Cookies verwenden wir?</h2>
          <ul>
            <li>Technisch notwendige Cookies zur Bereitstellung der Website</li>
            <li>Optionale Analyse- oder Marketing-Cookies nur nach Einwilligung</li>
          </ul>

          <h2>Rechtsgrundlage</h2>
          <p>
            Die Verarbeitung technisch notwendiger Cookies erfolgt auf Grundlage von Art. 6 Abs. 1
            lit. f DSGVO. Für optionale Cookies erfolgt die Verarbeitung auf Grundlage Ihrer
            Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO.
          </p>

          <h2>Widerruf</h2>
          <p>
            Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen oder in
            Ihren Browsereinstellungen Cookies löschen bzw. blockieren.
          </p>
        </div>
      </div>
    </main>

    <app-site-footer />
  `,
})
export class CookiesPageComponent {}
