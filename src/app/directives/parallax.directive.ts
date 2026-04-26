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
  selector: '[appParallax]'
})
export class ParallaxDirective implements OnInit, OnDestroy {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);
  private animationFrameId = 0;
  private readonly handleScroll = () => {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    this.animationFrameId = requestAnimationFrame(() => {
      const speed = this.parallaxSpeed();
      const offset = window.scrollY * speed;
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        'transform',
        `translate3d(0, ${offset.toFixed(2)}px, 0)`,
      );
    });
  };

  readonly parallaxSpeed = input(0.12);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    window.addEventListener('scroll', this.handleScroll, { passive: true });
    this.handleScroll();
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    window.removeEventListener('scroll', this.handleScroll);
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
