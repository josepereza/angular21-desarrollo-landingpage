import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  inject,
  input,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appRevealOnScroll]'
})
export class RevealOnScrollDirective implements OnInit, OnDestroy {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  readonly revealDelay = input(0);

  ngOnInit(): void {
    this.renderer.addClass(this.elementRef.nativeElement, 'reveal');

    if (!isPlatformBrowser(this.platformId)) {
      this.renderer.addClass(this.elementRef.nativeElement, 'is-visible');
      return;
    }

    const delay = this.revealDelay();
    if (delay > 0) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'transition-delay', `${delay}ms`);
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        this.renderer.addClass(this.elementRef.nativeElement, 'is-visible');
        this.observer?.disconnect();
      },
      { threshold: 0.2 },
    );

    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
