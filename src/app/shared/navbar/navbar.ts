import { Component, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  host: { '[class.menu-open]': 'menuOpen()' },
})
export class NavbarComponent {
  menuOpen = signal(false);

  constructor() {
    const router = inject(Router);
    router.events
      .pipe(filter(e => e instanceof NavigationStart))
      .subscribe(() => this.menuOpen.set(false));
  }

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }
}
