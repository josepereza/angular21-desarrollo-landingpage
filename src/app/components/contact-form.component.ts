import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { finalize } from 'rxjs';
import { ContactApiService } from '../services/contact-api.service';

@Component({
  selector: 'app-contact-form',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section id="kontakt" class="contact-section py-5">
      <div class="glass-panel p-4 p-lg-5">
        <div class="row g-4 align-items-start">
          <div class="col-lg-5">
            <span class="text-uppercase small fw-bold text-gold">Kontakt</span>
            <h2 class="section-title mt-3">Ihr Projekt beginnt mit einer klaren Anfrage.</h2>
            <p class="section-copy mb-0">
              Erzählen Sie uns, ob Sie ganz neu starten oder eine bestehende Website modernisieren
              möchten. Wir melden uns mit einer fundierten Einschätzung.
            </p>
          </div>

          <div class="col-lg-7">
            <form
              class="row g-3 needs-validation"
              novalidate
              [formGroup]="form"
              [class.was-validated]="submitted()"
              (ngSubmit)="submit()"
            >
              <div class="col-md-6">
                <label class="form-label" for="name">Name *</label>
                <input id="name" type="text" class="form-control form-control-lg" formControlName="name">
                <div class="invalid-feedback">Bitte geben Sie Ihren Namen ein.</div>
              </div>

              <div class="col-md-6">
                <label class="form-label" for="email">E-Mail *</label>
                <input id="email" type="email" class="form-control form-control-lg" formControlName="email">
                <div class="invalid-feedback">Bitte geben Sie eine gültige E-Mail-Adresse ein.</div>
              </div>

              <div class="col-12">
                <label class="form-label" for="website">Bestehende Website</label>
                <input
                  id="website"
                  type="url"
                  class="form-control form-control-lg"
                  formControlName="website"
                  placeholder="https://ihre-domain.ch"
                >
                <div class="invalid-feedback">Bitte verwenden Sie eine vollständige URL.</div>
              </div>

              <div class="col-12">
                <label class="form-label" for="description">Projektbeschreibung / Wünsche *</label>
                <textarea
                  id="description"
                  rows="6"
                  class="form-control form-control-lg"
                  formControlName="description"
                ></textarea>
                <div class="invalid-feedback">
                  Bitte beschreiben Sie kurz Ihr Projekt oder Ihre Wünsche.
                </div>
              </div>

              <div class="col-12 d-flex flex-column flex-md-row gap-3 align-items-md-center">
                <button class="btn btn-gold" type="submit" [disabled]="isSubmitting()">
                  @if (isSubmitting()) {
                    Anfrage wird gesendet...
                  } @else {
                    Anfrage absenden
                  }
                </button>

                @if (successMessage()) {
                  <p class="mb-0 text-success fw-semibold">{{ successMessage() }}</p>
                }

                @if (errorMessage()) {
                  <p class="mb-0 text-danger fw-semibold">{{ errorMessage() }}</p>
                }
              </div>

              @if (reportSummary()) {
                <div class="col-12">
                  <div class="alert alert-dark border border-warning-subtle mb-0">
                    <strong>Erste Einschätzung:</strong> {{ reportSummary() }}
                  </div>
                </div>
              }
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .contact-section .form-label {
      color: var(--color-ivory);
      font-weight: 700;
    }

    .contact-section .form-control {
      background: rgba(255, 255, 255, 0.04);
      border-color: rgba(212, 175, 55, 0.2);
      color: var(--color-ivory);
    }

    .contact-section .form-control:focus {
      border-color: rgba(212, 175, 55, 0.65);
      box-shadow: 0 0 0 0.25rem rgba(212, 175, 55, 0.16);
      background: rgba(255, 255, 255, 0.05);
      color: var(--color-ivory);
    }

    .contact-section .form-control::placeholder {
      color: rgba(245, 240, 225, 0.45);
    }
  `
})
export class ContactFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly contactApi = inject(ContactApiService);

  readonly submitted = signal(false);
  readonly isSubmitting = signal(false);
  readonly successMessage = signal('');
  readonly errorMessage = signal('');
  readonly reportSummary = signal('');

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    website: ['', [Validators.pattern(/^$|https?:\/\/[\w.-]+\.[a-z]{2,}(?:[/?#].*)?$/i)]],
    description: ['', [Validators.required, Validators.minLength(20)]],
  });

  submit(): void {
    this.submitted.set(true);
    this.successMessage.set('');
    this.errorMessage.set('');
    this.reportSummary.set('');

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    const rawValue = this.form.getRawValue();
    this.contactApi
      .submitLead({
        name: rawValue.name.trim(),
        email: rawValue.email.trim(),
        website: rawValue.website.trim() || null,
        description: rawValue.description.trim(),
      })
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: (response) => {
          this.successMessage.set(response.message);
          this.reportSummary.set(response.reportSummary);
          this.form.reset();
          this.submitted.set(false);
        },
        error: (error: { error?: { message?: string } }) => {
          this.errorMessage.set(
            error.error?.message ?? 'Die Anfrage konnte momentan nicht verarbeitet werden.',
          );
        },
      });
  }
}
