import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContactFormComponent } from '../components/contact-form.component';
import { SiteFooterComponent } from '../components/site-footer.component';
import { SiteHeaderComponent } from '../components/site-header.component';
import { ParallaxDirective } from '../directives/parallax.directive';
import { RevealOnScrollDirective } from '../directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-home-page',
  imports: [
    CommonModule,
    SiteHeaderComponent,
    SiteFooterComponent,
    ContactFormComponent,
    RevealOnScrollDirective,
    ParallaxDirective,
  ],
  template: `
    <app-site-header />

    <main>
      <section class="hero-section d-flex align-items-center">
        <div class="hero-orb hero-orb-left" appParallax [parallaxSpeed]="0.08"></div>
        <div class="hero-orb hero-orb-right" appParallax [parallaxSpeed]="-0.05"></div>

        <div class="container position-relative">
          <div class="row align-items-center min-vh-100 py-5">
            <div class="col-lg-7 pt-5">
              <div appRevealOnScroll>
                <span class="eyebrow">Landingpages für ambitionierte Marken</span>
                <h1 class="hero-title mt-4">
                  Moderne Landingpages,
                  <span class="text-gold">die Vertrauen aufbauen und Anfragen erzeugen.</span>
                </h1>
                <p class="hero-copy mt-4">
                  Wir entwickeln elegante, schnelle und verkaufsstarke One-Page-Erlebnisse für
                  Unternehmen ohne Website oder mit einem Auftritt, der nicht mehr zeitgemäß wirkt.
                </p>
                <div class="d-flex flex-wrap gap-3 mt-5">
                  <a class="btn btn-gold" href="#kontakt">Kostenlose Erstberatung</a>
                  <a class="btn btn-outline-gold" href="#portfolio">Beispiele ansehen</a>
                </div>
              </div>
            </div>

            <div class="col-lg-5">
              <div class="hero-card glass-panel p-4 p-lg-5" appRevealOnScroll [revealDelay]="180">
                <span class="small text-uppercase fw-bold text-gold">Strategie + Design + Technik</span>
                <ul class="hero-metrics list-unstyled mb-0 mt-4">
                  <li>
                    <strong>01</strong>
                    <span>Klare Positionierung für neue oder veraltete Webauftritte</span>
                  </li>
                  <li>
                    <strong>02</strong>
                    <span>Premium-Design mit schneller Umsetzung und responsivem Fokus</span>
                  </li>
                  <li>
                    <strong>03</strong>
                    <span>Lead-orientierte Struktur statt austauschbarer Standardseiten</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-5">
        <div class="container py-lg-5">
          <div class="row g-5 align-items-center">
            <div class="col-lg-5" appRevealOnScroll>
              <span class="text-uppercase small fw-bold text-gold">Warum modernisieren?</span>
              <h2 class="section-title mt-3">Warum eine moderne Landingpage entscheidend ist</h2>
              <p class="section-copy">
                Eine Landingpage ist oft der erste Kontaktpunkt mit Ihrer Marke. Wenn Design,
                Struktur oder Vertrauen fehlen, verlieren Sie Anfragen, bevor ein Gespräch
                überhaupt beginnt.
              </p>
            </div>

            <div class="col-lg-7">
              <div class="benefit-list">
                @for (item of benefits; track item.title; let i = $index) {
                  <article class="benefit-item glass-panel p-4" appRevealOnScroll [revealDelay]="i * 120">
                    <h3>{{ item.title }}</h3>
                    <p class="mb-0">{{ item.copy }}</p>
                  </article>
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="leistungen" class="py-5 section-accent">
        <div class="container py-lg-5">
          <div class="text-center mb-5" appRevealOnScroll>
            <span class="text-uppercase small fw-bold text-gold">Unsere Leistungen</span>
            <h2 class="section-title mt-3">Von der Idee bis zur überzeugenden Präsentation</h2>
            <p class="section-copy mx-auto services-copy">
              Wir kombinieren Positionierung, visuelles Design und technische Umsetzung zu einem
              klaren digitalen Vertriebskanal.
            </p>
          </div>

          <div class="row g-4">
            @for (service of services; track service.title; let i = $index) {
              <div class="col-md-6 col-xl-3">
                <article class="service-card glass-panel p-4 h-100" appRevealOnScroll [revealDelay]="i * 100">
                  <div class="service-icon">{{ service.icon }}</div>
                  <h3>{{ service.title }}</h3>
                  <p class="mb-0">{{ service.copy }}</p>
                </article>
              </div>
            }
          </div>
        </div>
      </section>

      <section id="portfolio" class="py-5">
        <div class="container py-lg-5">
          <div class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-end gap-4 mb-5">
            <div appRevealOnScroll>
              <span class="text-uppercase small fw-bold text-gold">Portfolio / Beispiele</span>
              <h2 class="section-title mt-3 mb-0">Beispielprojekte mit klarem Fokus auf Conversion</h2>
            </div>
            <p class="section-copy portfolio-copy mb-0" appRevealOnScroll [revealDelay]="120">
              Diese Beispiele zeigen typische Einsatzbereiche für neue Landingpages oder gezielte
              Modernisierungen bestehender Webauftritte.
            </p>
          </div>

          <div class="row g-4">
            @for (project of projects; track project.title; let i = $index) {
              <div class="col-md-6 col-xl-4">
                <article class="project-card h-100" appRevealOnScroll [revealDelay]="i * 110">
                  <div class="project-visual">
                    <span>{{ project.tag }}</span>
                  </div>
                  <div class="glass-panel p-4 h-100 border-top-0 rounded-top-0">
                    <h3>{{ project.title }}</h3>
                    <p class="mb-3">{{ project.copy }}</p>
                    <small class="text-gold">{{ project.result }}</small>
                  </div>
                </article>
              </div>
            }
          </div>
        </div>
      </section>

      <section class="py-5">
        <div class="container py-lg-4">
          <app-contact-form />
        </div>
      </section>
    </main>

    <app-site-footer />
  `,
  styles: `
    .hero-section {
      position: relative;
      overflow: clip;
      background: var(--hero-gradient);
    }

    .hero-orb {
      position: absolute;
      width: 28rem;
      aspect-ratio: 1;
      border-radius: 50%;
      filter: blur(10px);
      background: radial-gradient(circle, rgba(212, 175, 55, 0.35), transparent 65%);
      pointer-events: none;
    }

    .hero-orb-left {
      top: 8%;
      left: -8rem;
    }

    .hero-orb-right {
      right: -6rem;
      bottom: 8%;
    }

    .eyebrow {
      color: var(--color-gold-soft);
      letter-spacing: 0.12em;
      text-transform: uppercase;
      font-size: 0.75rem;
      font-weight: 700;
    }

    .hero-title {
      font-size: clamp(2rem, 5vw, 4rem);
      line-height: 1.1;
    }

    .hero-copy {
      max-width: 560px;
      color: var(--color-muted);
      font-size: 1rem;
      line-height: 1.7;
    }

    .hero-card {
      position: relative;
    }

    .hero-card::before {
      content: '';
      position: absolute;
      inset: 1rem;
      border-radius: 1rem;
      border: 1px solid rgba(212, 175, 55, 0.12);
      pointer-events: none;
    }

    .hero-metrics li + li {
      margin-top: 1.25rem;
    }

    .hero-metrics strong {
      display: inline-flex;
      width: 3rem;
      color: var(--color-gold);
      font-size: 1.3rem;
      margin-right: 0.8rem;
    }

    .hero-metrics span {
      color: var(--color-muted);
      line-height: 1.7;
    }

    .benefit-list {
      display: grid;
      gap: 1rem;
    }

    .benefit-item h3,
    .service-card h3,
    .project-card h3 {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
    }

    .benefit-item p,
    .service-card p,
    .project-card p {
      color: var(--color-muted);
      line-height: 1.8;
    }

    .section-accent {
      background: var(--section-gradient);
    }

    .services-copy,
    .portfolio-copy {
      max-width: 760px;
    }

    .service-card {
      transition:
        transform 180ms ease,
        border-color 180ms ease;
    }

    .service-card:hover {
      transform: translateY(-6px);
      border-color: rgba(212, 175, 55, 0.34);
    }

    .service-icon {
      width: 3.5rem;
      height: 3.5rem;
      display: grid;
      place-items: center;
      border-radius: 50%;
      margin-bottom: 1rem;
      background: rgba(212, 175, 55, 0.12);
      color: var(--color-gold-soft);
      font-size: 1.35rem;
      font-weight: 800;
    }

    .project-visual {
      min-height: 240px;
      padding: 1.5rem;
      display: flex;
      align-items: flex-end;
      border-radius: 1.5rem 1.5rem 0 0;
      border: 1px solid var(--color-border);
      border-bottom: 0;
      background:
        linear-gradient(145deg, rgba(212, 175, 55, 0.22), rgba(10, 10, 10, 0.9)),
        linear-gradient(180deg, rgba(255, 255, 255, 0.04), transparent);
    }

    .project-visual span {
      padding: 0.45rem 0.8rem;
      border-radius: 999px;
      background: rgba(17, 17, 17, 0.6);
      color: var(--color-gold-soft);
      font-size: 0.85rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    @media (max-width: 991.98px) {
      .hero-title {
        max-width: 100%;
      }
    }
  `
})
export class HomePageComponent {
  protected readonly benefits = [
    {
      title: 'Mehr Vertrauen auf den ersten Blick',
      copy:
        'Ein moderner Auftritt vermittelt Kompetenz, Sorgfalt und Professionalität, noch bevor ein persönliches Gespräch stattfindet.',
    },
    {
      title: 'Klare Botschaft statt digitaler Unschärfe',
      copy:
        'Wir strukturieren Ihr Angebot so, dass Besucher sofort verstehen, was Sie leisten und warum Sie die richtige Wahl sind.',
    },
    {
      title: 'Stärkerer Fokus auf Anfragen',
      copy:
        'Jede Section folgt einem Ziel: Interesse aufbauen, Einwände abbauen und eine konkrete Kontaktaufnahme auslösen.',
    },
  ];

  protected readonly services = [
    {
      icon: '01',
      title: 'Strategische Positionierung',
      copy:
        'Wir definieren Nutzenversprechen, Zielgruppenansprache und die Struktur Ihrer Seite mit klarem Fokus auf Conversion.',
    },
    {
      icon: '02',
      title: 'Modernes UI-Design',
      copy:
        'Elegante Layouts, hochwertige Typografie und eine visuelle Sprache, die Ihre Marke seriös und wertig wirken lässt.',
    },
    {
      icon: '03',
      title: 'Technische Umsetzung',
      copy:
        'Performante Entwicklung mit SSR, responsivem Verhalten und sauberer Codebasis für zukünftige Erweiterungen.',
    },
    {
      icon: '04',
      title: 'Relaunch bestehender Websites',
      copy:
        'Wir prüfen, ob Ihre aktuelle Website modernisiert werden kann oder ob eine fokussierte Landingpage die bessere Lösung ist.',
    },
  ];

  protected readonly projects = [
    {
      tag: 'Immobilienberatung',
      title: 'Aurelia Invest',
      copy:
        'Landingpage für ein Beratungsunternehmen mit klarem Vertrauensaufbau, Referenzblöcken und Termin-CTA.',
      result: 'Ziel: hochwertige Erstgespräche mit Investoren',
    },
    {
      tag: 'Medizin & Ästhetik',
      title: 'Klinik am Park',
      copy:
        'Premium-Auftritt mit reduzierter Bildsprache, klaren Leistungen und einer mobilen Kontaktstrecke.',
      result: 'Ziel: mehr Direktanfragen ohne Streuverlust',
    },
    {
      tag: 'Handwerk & Sanierung',
      title: 'Nordbau Konzept',
      copy:
        'Relaunch einer veralteten Website in eine fokussierte Angebotsseite für regionale Sichtbarkeit und Anfragen.',
      result: 'Ziel: Modernisierung und bessere lokale Conversion',
    },
  ];
}
