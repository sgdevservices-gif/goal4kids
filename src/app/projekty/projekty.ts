import { Component, signal, inject } from '@angular/core';
import { Post } from '../post.model';
import { PostCardComponent } from '../shared/post-card/post-card';
import { SeoService } from '../shared/seo/seo.service';
import posts from '../../data/posts.json';

@Component({
  selector: 'app-projekty',
  imports: [PostCardComponent],
  templateUrl: './projekty.html',
  styleUrl: './projekty.scss',
})
export class Projekty {
  posts = signal<Post[]>(posts as Post[]);

  constructor() {
    inject(SeoService).update({
      title: 'Projekty',
      description:
        'Odkryj projekty i działania Fundacji Goal4Kids — szkolenia sportowe, warsztaty edukacyjne i inicjatywy wsparcia społecznego dla dzieci i młodzieży.',
      path: '/projekty',
    });
  }
}
