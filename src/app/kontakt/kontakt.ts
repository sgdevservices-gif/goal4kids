import { Component, inject } from '@angular/core';
import { SeoService } from '../shared/seo/seo.service';

@Component({
  selector: 'app-kontakt',
  templateUrl: './kontakt.html',
  styleUrl: './kontakt.scss',
})
export class Kontakt {
  constructor() {
    inject(SeoService).update({
      title: 'Kontakt',
      description:
        'Skontaktuj się z Fundacją Goal4Kids — napisz do nas lub zadzwoń. Chętnie odpowiemy na pytania i opowiemy o naszych działaniach.',
      path: '/kontakt',
    });
  }
}
