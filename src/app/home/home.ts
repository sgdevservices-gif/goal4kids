import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '../post.model';
import { PostCardComponent } from '../shared/post-card/post-card';
import posts from '../../data/posts.json';

@Component({
  selector: 'app-home',
  imports: [RouterLink, PostCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  latestPosts = signal<Post[]>((posts as Post[]).slice(0, 3));
}
