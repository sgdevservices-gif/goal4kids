import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { sanityClient } from '../sanity.client';
import { Post } from '../post.model';

@Component({
  selector: 'app-posts',
  imports: [RouterLink, DatePipe],
  templateUrl: './posts.html',
  styleUrl: './posts.scss',
})
export class Posts implements OnInit {
  posts = signal<Post[]>([]);

  async ngOnInit() {
    const data = await sanityClient.fetch<Post[]>(
      `*[_type == "post"] | order(publishedAt desc) { _id, title, slug, publishedAt, imageUrl }`
    );
    this.posts.set(data);
  }
}
