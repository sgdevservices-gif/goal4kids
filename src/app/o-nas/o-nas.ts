import { Component, inject } from '@angular/core';
import { SeoService } from '../shared/seo/seo.service';

@Component({
  selector: 'app-o-nas',
  templateUrl: './o-nas.html',
  styleUrl: './o-nas.scss',
})
export class ONas {
  constructor() {
    inject(SeoService).update({
      title: 'O nas',
      description:
        'Poznaj misję Fundacji Goal4Kids — wspieramy wszechstronny rozwój dzieci i młodzieży poprzez sport, edukację i wsparcie społeczne.',
      path: '/o-nas',
    });
  }
}
