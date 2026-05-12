import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

const BASE_URL = 'https://goal4kids.pl';
const DEFAULT_TITLE = 'Goal4Kids — Fundacja na rzecz dzieci i młodzieży';
const DEFAULT_DESCRIPTION =
  'Fundacja Goal4Kids wspiera wszechstronny rozwój dzieci i młodzieży poprzez sport, edukację i wsparcie społeczne.';
const DEFAULT_IMAGE = `${BASE_URL}/logo.png`;

export interface SeoData {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private document = inject(DOCUMENT);

  update(data: SeoData = {}): void {
    const title = data.title ? `${data.title} | Goal4Kids` : DEFAULT_TITLE;
    const description = data.description ?? DEFAULT_DESCRIPTION;
    const image = data.image ?? DEFAULT_IMAGE;
    const url = `${BASE_URL}${data.path ?? ''}`;

    this.title.setTitle(title);

    this.meta.updateTag({ name: 'description', content: description });

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:locale', content: 'pl_PL' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Goal4Kids' });

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.setCanonical(url);
  }

  private setCanonical(url: string): void {
    const head = this.document.head;
    let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
