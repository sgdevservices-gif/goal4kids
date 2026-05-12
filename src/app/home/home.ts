import { Component, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '../post.model';
import { PostCardComponent } from '../shared/post-card/post-card';
import { SeoService } from '../shared/seo/seo.service';
import posts from '../../data/posts.json';

@Component({
  selector: 'app-home',
  imports: [RouterLink, PostCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  latestPosts = signal<Post[]>((posts as Post[]).slice(0, 3));

  constructor() {
    inject(SeoService).update({
      path: '/',
    });
  }
}
