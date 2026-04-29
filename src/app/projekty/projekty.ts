import { Component, signal } from '@angular/core';
import { Post } from '../post.model';
import { PostCardComponent } from '../shared/post-card/post-card';
import posts from '../../data/posts.json';

@Component({
  selector: 'app-projekty',
  imports: [PostCardComponent],
  templateUrl: './projekty.html',
  styleUrl: './projekty.scss',
})
export class Projekty {
  posts = signal<Post[]>(posts as Post[]);
}
